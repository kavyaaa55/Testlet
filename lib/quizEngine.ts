import { db } from './db'
import { questionTrie } from './trie'
import { getUnlocked } from './topicGraph'
import { updateTheta, fisherInfo } from './irt'
import { computeRatingUpdate, expectedTheta } from './rating'

export interface QuestionData {
  id: string
  text: string
  options: string[]
  topicId: string
  subject: string
  beta: number
  tag: string
}

// In-memory question store — populated by initQuestionStore()
export const QUESTIONS: Record<string, QuestionData> = {}

export async function initQuestionStore() {
  if (Object.keys(QUESTIONS).length > 0) return

  const questions = await db.question.findMany()
  questionTrie.clear()

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

export function selectNextQuestion(
  theta: number,
  availableIds: string[],
  answeredIds: Set<string>,
): QuestionData | null {
  const candidates = availableIds
    .filter(id => !answeredIds.has(id))
    .map(id => QUESTIONS[id])
    .filter(Boolean)

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

// POST /api/quiz/start
export async function startSession(userId: string, subject: string) {
  await initQuestionStore()

  const existing = await db.subjectRating.findUnique({
    where: { userId_subject: { userId, subject } },
  })

  const startRating = existing?.rating ?? 800
  // Derive starting theta from rating: 800→0, 1000→1, 1200→2 …
  const startTheta = expectedTheta(startRating)

  const topicScores = await getUserTopicScores(userId, subject)
  const unlocked = getUnlocked(subject, topicScores)
  const availableIds = getAvailableQuestionIds(unlocked)

  const firstQuestion = selectNextQuestion(startTheta, availableIds, new Set())
  if (!firstQuestion) throw new Error('No questions available for this subject')

  const session = await db.quizSession.create({
    data: {
      userId,
      subject,
      startTheta,
      startRating,
      finalTheta: startTheta,
      finalRating: startRating,
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
  await initQuestionStore()

  const session = await db.quizSession.findUnique({
    where: { id: sessionId },
    include: { responses: true },
  })

  if (!session) throw new Error('Session not found')
  if (session.userId !== userId) throw new Error('Unauthorized')
  if (session.completed) throw new Error('Session already completed')

  const question = QUESTIONS[questionId]
  if (!question) throw new Error('Question not found')
  if (question.subject !== session.subject) throw new Error('Question subject mismatch')

  const answeredIds = new Set(session.responses.map(r => r.questionId))
  if (answeredIds.has(questionId)) throw new Error('Question already answered')

  const dbQuestion = await db.question.findUnique({ where: { id: questionId } })
  if (!dbQuestion) throw new Error('Question not found in DB')

  const isCorrect = selectedOption === dbQuestion.answer
  const thetaBefore = session.finalTheta
  const thetaAfter = updateTheta(thetaBefore, question.beta, isCorrect)
  const questionsAnswered = session.responses.length + 1
  const sessionComplete = questionsAnswered >= 15

  // Persist response
  await db.response.create({
    data: {
      sessionId,
      questionId,
      topicId: question.topicId,
      selectedOpt: selectedOption,
      isCorrect,
      timeTaken,
      thetaBefore,
      thetaAfter,
    },
  })

  // Update topic score
  const topicDelta = isCorrect ? 8 : -6
  await db.topicScore.upsert({
    where: { userId_topicId: { userId, topicId: question.topicId } },
    update: { score: { increment: topicDelta } },
    create: { userId, topicId: question.topicId, subject: question.subject, score: 50 + topicDelta },
  })

  // Update question stats
  await db.question.update({
    where: { id: questionId },
    data: {
      timesShown: { increment: 1 },
      ...(isCorrect ? { timesCorrect: { increment: 1 } } : {}),
    },
  })

  if (sessionComplete) {
    // Fetch current subject rating for peak tracking
    const currentSR = await db.subjectRating.findUnique({
      where: { userId_subject: { userId, subject: session.subject } },
    })
    const currentRating = currentSR?.rating ?? 800
    const currentPeak = currentSR?.peakRating ?? 800

    const ratingUpdate = computeRatingUpdate(
      currentRating,
      currentPeak,
      thetaAfter,
      session.startTheta,
    )

    await db.quizSession.update({
      where: { id: sessionId },
      data: {
        finalTheta: thetaAfter,
        finalRating: ratingUpdate.newRating,
        ratingDelta: ratingUpdate.delta,
        correct: { increment: isCorrect ? 1 : 0 },
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
        userId,
        subject: session.subject,
        rating: ratingUpdate.newRating,
        peakRating: ratingUpdate.newRating,
        theta: thetaAfter,
        attempts: 1,
      },
    })

    // Update leaderboard
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
        userId,
        subject: session.subject,
        rating: ratingUpdate.newRating,
        peakRating: ratingUpdate.newRating,
        attempts: 1,
        userName: user!.name,
        userImage: user!.image,
      },
    })

    return {
      isCorrect,
      explanation: dbQuestion.explanation,
      thetaAfter,
      newRating: ratingUpdate.newRating,
      ratingDelta: ratingUpdate.delta,
      ratingUpdate,
      nextQuestion: null,
      sessionComplete: true,
    }
  }

  // Mid-session: update theta only
  await db.quizSession.update({
    where: { id: sessionId },
    data: {
      finalTheta: thetaAfter,
      ...(isCorrect ? { correct: { increment: 1 } } : {}),
    },
  })

  const topicScores = await getUserTopicScores(userId, session.subject)
  const unlocked = getUnlocked(session.subject, topicScores)
  answeredIds.add(questionId)
  const availableIds = getAvailableQuestionIds(unlocked)
  const nextQuestion = selectNextQuestion(thetaAfter, availableIds, answeredIds)

  return {
    isCorrect,
    explanation: dbQuestion.explanation,
    thetaAfter,
    newRating: session.startRating, // mid-session: show start rating, delta shown at end
    ratingDelta: 0,
    ratingUpdate: null,
    nextQuestion,
    sessionComplete: false,
  }
}
