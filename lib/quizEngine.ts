import { db } from './db'
import { questionTrie } from './trie'
import { getUnlocked } from './topicGraph'
import { updateTheta, fisherInfo } from './irt'
import { computeRatingUpdate, expectedTheta, type SessionQuestion } from './rating'

export const QUIZ_LENGTH = 15
// A question answered correctly is suppressed for this many sessions
const CORRECT_COOLDOWN_SESSIONS = 5

export interface QuestionData {
  id: string
  text: string
  options: string[]
  topicId: string
  subject: string
  beta: number
  tag: string
}

export const QUESTIONS: Record<string, QuestionData> = {}

export async function initQuestionStore() {
  const questions = await db.question.findMany()
  questionTrie.clear()
  for (const key of Object.keys(QUESTIONS)) delete QUESTIONS[key]
  for (const q of questions) {
    QUESTIONS[q.id] = {
      id: q.id,
      text: q.text,
      options: q.options as string[],
      topicId: q.topicId,
      subject: q.subject,
      beta: q.beta,
      tag: q.tag,
    }
    questionTrie.insert(q.tag, q.id)
  }
}

let storeInitialized = false
export async function ensureQuestionStore() {
  if (!storeInitialized || Object.keys(QUESTIONS).length === 0) {
    await initQuestionStore()
    storeInitialized = true
  }
}

// Returns IDs of questions the user answered correctly within the cooldown window
async function getCooldownQuestionIds(userId: string, subject: string): Promise<Set<string>> {
  const histories = await db.userQuestionHistory.findMany({
    where: {
      userId,
      subject,
      sessionsSinceCorrect: { lt: CORRECT_COOLDOWN_SESSIONS },
      totalCorrect: { gt: 0 },
    },
    select: { questionId: true },
  })
  return new Set(histories.map(h => h.questionId))
}

export function selectNextQuestion(
  theta: number,
  availableIds: string[],
  excludeIds: Set<string>,
): QuestionData | null {
  let candidates = availableIds
    .filter(id => !excludeIds.has(id))
    .map(id => QUESTIONS[id])
    .filter(Boolean)

  // If filtering by cooldown leaves nothing, fall back to just excluding already-answered this session
  if (candidates.length === 0) return null

  return candidates.reduce((best, q) =>
    fisherInfo(theta, q.beta) > fisherInfo(theta, best.beta) ? q : best,
  )
}

async function getUserTopicScores(userId: string, subject: string): Promise<Record<string, number>> {
  const scores = await db.topicScore.findMany({ where: { userId, subject } })
  return Object.fromEntries(scores.map(s => [s.topicId, s.score]))
}

function getAvailableQuestionIds(unlockedTopics: string[]): string[] {
  return unlockedTopics.flatMap(topicId => questionTrie.getByPrefix(topicId))
}

// Increment sessionsSinceCorrect for all of this user's questions in the subject
// Called at the start of each new session
async function incrementSessionCounters(userId: string, subject: string) {
  await db.userQuestionHistory.updateMany({
    where: { userId, subject },
    data: { sessionsSinceCorrect: { increment: 1 } },
  })
}

// POST /api/quiz/start
export async function startSession(userId: string, subject: string) {
  await ensureQuestionStore()

  const existing = await db.subjectRating.findUnique({
    where: { userId_subject: { userId, subject } },
  })

  const startRating = existing?.rating ?? 800
  const startTheta = existing ? expectedTheta(existing.rating) : -2.0
  // Increment cooldown counters for all questions this user has seen in this subject
  await incrementSessionCounters(userId, subject)

  const topicScores = await getUserTopicScores(userId, subject)
  const unlocked = getUnlocked(subject, topicScores)
  const allAvailableIds = getAvailableQuestionIds(unlocked)

  // Exclude questions still in cooldown
  const cooldownIds = await getCooldownQuestionIds(userId, subject)
  const eligibleIds = allAvailableIds.filter(id => !cooldownIds.has(id))

  // If cooldown filtering leaves too few questions, relax it
  const poolIds = eligibleIds.length >= 3 ? eligibleIds : allAvailableIds

  const firstQuestion = selectNextQuestion(startTheta, poolIds, new Set())
  if (!firstQuestion) throw new Error('No questions available for this subject')

  const session = await db.quizSession.create({
    data: {
      userId,
      subject,
      startTheta,
      startRating,
      finalTheta: startTheta,
      finalRating: startRating,
      totalQ: QUIZ_LENGTH,
    },
  })

  return { session, firstQuestion, currentRating: startRating }
}

// POST /api/quiz/answer
export async function submitAnswer(
  sessionId: string,
  userId: string,
  questionId: string,
  selectedOption: number,
  timeTaken: number,
) {
  await ensureQuestionStore()

  const session = await db.quizSession.findUnique({
    where: { id: sessionId },
    include: { responses: true },
  })

  if (!session) throw new Error('Session not found')
  if (session.userId !== userId) throw new Error('Unauthorized')
  if (session.completed) throw new Error('Session already completed')

  const answeredIds = new Set(session.responses.map(r => r.questionId))

  // Duplicate guard — skip silently, serve next
  if (answeredIds.has(questionId)) {
    const topicScores = await getUserTopicScores(userId, session.subject)
    const unlocked = getUnlocked(session.subject, topicScores)
    const allIds = getAvailableQuestionIds(unlocked)
    const cooldownIds = await getCooldownQuestionIds(userId, session.subject)
    const excludeIds = new Set([...answeredIds, ...cooldownIds])
    const nextQuestion = selectNextQuestion(session.finalTheta, allIds, excludeIds)
      ?? selectNextQuestion(session.finalTheta, allIds, answeredIds) // fallback: ignore cooldown

    return {
      isCorrect: false, explanation: '', thetaAfter: session.finalTheta,
      newRating: session.startRating, ratingDelta: 0, ratingUpdate: null,
      nextQuestion, sessionComplete: false, duplicate: true,
    }
  }

  const question = QUESTIONS[questionId]
  if (!question) throw new Error('Question not found')
  if (question.subject !== session.subject) throw new Error('Question subject mismatch')

  const dbQuestion = await db.question.findUnique({ where: { id: questionId } })
  if (!dbQuestion) throw new Error('Question not found in DB')

  const isCorrect = selectedOption === dbQuestion.answer
  const thetaBefore = session.finalTheta
  const thetaAfter = updateTheta(thetaBefore, question.beta, isCorrect)
  const questionsAnswered = session.responses.length + 1
  const sessionComplete = questionsAnswered >= QUIZ_LENGTH

  // Persist response
  await db.response.create({
    data: {
      sessionId, questionId,
      topicId: question.topicId,
      selectedOpt: selectedOption,
      isCorrect, timeTaken, thetaBefore, thetaAfter,
    },
  })

  // Update UserQuestionHistory
  if (isCorrect) {
    // Reset cooldown — user got it right
    await db.userQuestionHistory.upsert({
      where: { userId_questionId: { userId, questionId } },
      update: {
        lastCorrectAt: new Date(),
        sessionsSinceCorrect: 0,   // reset cooldown
        totalCorrect: { increment: 1 },
        totalSeen: { increment: 1 },
      },
      create: {
        userId, questionId,
        subject: question.subject,
        lastCorrectAt: new Date(),
        sessionsSinceCorrect: 0,
        totalCorrect: 1,
        totalSeen: 1,
      },
    })
  } else {
    // Wrong — just increment seen count, don't touch cooldown
    await db.userQuestionHistory.upsert({
      where: { userId_questionId: { userId, questionId } },
      update: { totalSeen: { increment: 1 } },
      create: {
        userId, questionId,
        subject: question.subject,
        totalCorrect: 0,
        totalSeen: 1,
      },
    })
  }

  // Update topic score
  const topicDelta = isCorrect ? 8 : -6
  await db.topicScore.upsert({
    where: { userId_topicId: { userId, topicId: question.topicId } },
    update: { score: { increment: topicDelta } },
    create: { userId, topicId: question.topicId, subject: question.subject, score: 0 + topicDelta },
  })

  // Update question global stats
  await db.question.update({
    where: { id: questionId },
    data: {
      timesShown: { increment: 1 },
      ...(isCorrect ? { timesCorrect: { increment: 1 } } : {}),
    },
  })

  // ── Session complete ───────────────────────────────────────────────────────
  if (sessionComplete) {
    // Use the session's start rating, not the current DB rating (which may have changed)
    const currentSR = await db.subjectRating.findUnique({
      where: { userId_subject: { userId, subject: session.subject } },
    })
    const currentPeak = currentSR?.peakRating ?? session.startRating

    // Build the questions array for performance scoring:
    // existing responses + the answer just submitted
    const sessionQuestions: SessionQuestion[] = [
      ...session.responses.map(r => {
        const q = QUESTIONS[r.questionId]
        return { beta: q?.beta ?? 0, isCorrect: r.isCorrect }
      }),
      { beta: question.beta, isCorrect },
    ]

    const ratingUpdate = computeRatingUpdate(
      session.startRating, currentPeak, thetaAfter, session.startTheta, sessionQuestions
    )
    const correctCount = session.responses.filter(r => r.isCorrect).length + (isCorrect ? 1 : 0)

    await db.quizSession.update({
      where: { id: sessionId },
      data: {
        finalTheta: thetaAfter,
        finalRating: ratingUpdate.newRating,
        ratingDelta: ratingUpdate.delta,
        correct: correctCount,
        completed: true,
        completedAt: new Date(),
      },
    })

    await db.subjectRating.upsert({
      where: { userId_subject: { userId, subject: session.subject } },
      update: {
        rating: ratingUpdate.newRating,
        peakRating: Math.max(ratingUpdate.newRating, currentPeak),
        theta: thetaAfter,
        attempts: { increment: 1 },
      },
      create: {
        userId, subject: session.subject,
        rating: ratingUpdate.newRating,
        peakRating: ratingUpdate.newRating,
        theta: thetaAfter, attempts: 1,
      },
    })

    const user = await db.user.findUnique({ where: { id: userId } })
    const currentLB = await db.leaderboardEntry.findUnique({
      where: { userId_subject: { userId, subject: session.subject } },
    })
    await db.leaderboardEntry.upsert({
      where: { userId_subject: { userId, subject: session.subject } },
      update: {
        rating: ratingUpdate.newRating,
        peakRating: Math.max(ratingUpdate.newRating, currentLB?.peakRating ?? 800),
        attempts: { increment: 1 },
        updatedAt: new Date(),
      },
      create: {
        userId, subject: session.subject,
        rating: ratingUpdate.newRating,
        peakRating: ratingUpdate.newRating,
        attempts: 1,
        userName: user?.name ?? 'Anonymous',
        userImage: user?.image ?? null,
      },
    })

    return {
      isCorrect, explanation: dbQuestion.explanation,
      correctOption: dbQuestion.answer,
      thetaAfter, newRating: ratingUpdate.newRating,
      ratingDelta: ratingUpdate.delta, ratingUpdate,
      nextQuestion: null, sessionComplete: true, duplicate: false,
    }
  }

  // ── Mid-session: get next question ────────────────────────────────────────
  await db.quizSession.update({
    where: { id: sessionId },
    data: {
      finalTheta: thetaAfter,
      ...(isCorrect ? { correct: { increment: 1 } } : {}),
    },
  })

  const topicScores = await getUserTopicScores(userId, session.subject)
  const unlocked = getUnlocked(session.subject, topicScores)
  const allIds = getAvailableQuestionIds(unlocked)
  const cooldownIds = await getCooldownQuestionIds(userId, session.subject)

  answeredIds.add(questionId)
  // Exclude: already answered this session + cooldown questions
  const excludeIds = new Set([...answeredIds, ...cooldownIds])
  const nextQuestion = selectNextQuestion(thetaAfter, allIds, excludeIds)
    ?? selectNextQuestion(thetaAfter, allIds, answeredIds) // fallback: ignore cooldown if pool exhausted

  return {
    isCorrect, explanation: dbQuestion.explanation,
    correctOption: dbQuestion.answer,
    thetaAfter, newRating: session.startRating,
    ratingDelta: 0, ratingUpdate: null,
    nextQuestion, sessionComplete: false, duplicate: false,
  }
}
