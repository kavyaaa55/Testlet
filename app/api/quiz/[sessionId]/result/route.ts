import { auth } from '@/auth'
import { db } from '@/lib/db'
import { ratingLabel } from '@/lib/irt'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const quizSession = await db.quizSession.findUnique({
    where: { id: sessionId },
    include: {
      responses: {
        include: { question: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!quizSession) return Response.json({ error: 'Session not found' }, { status: 404 })
  if (quizSession.userId !== session.user.id) return Response.json({ error: 'Forbidden' }, { status: 403 })
  if (!quizSession.completed) return Response.json({ error: 'Session not completed' }, { status: 400 })

  // User's rank on leaderboard
  const userEntry = await db.leaderboardEntry.findUnique({
    where: { userId_subject: { userId: session.user.id, subject: quizSession.subject } },
  })
  let rank: number | null = null
  if (userEntry) {
    const above = await db.leaderboardEntry.count({
      where: { subject: quizSession.subject, rating: { gt: userEntry.rating } },
    })
    rank = above + 1
  }

  // Topic breakdown
  const topicMap: Record<string, { correct: number; total: number }> = {}
  for (const r of quizSession.responses) {
    if (!topicMap[r.topicId]) topicMap[r.topicId] = { correct: 0, total: 0 }
    topicMap[r.topicId].total++
    if (r.isCorrect) topicMap[r.topicId].correct++
  }

  // Weak topics: accuracy < 50%
  const weakTopics = Object.entries(topicMap)
    .filter(([, v]) => v.correct / v.total < 0.5)
    .map(([topicId]) => topicId)

  return Response.json({
    sessionId,
    subject: quizSession.subject,
    finalRating: quizSession.finalRating,
    ratingDelta: quizSession.ratingDelta,
    ratingLabel: ratingLabel(quizSession.finalRating),
    rank,
    correct: quizSession.correct,
    total: quizSession.totalQ,
    weakTopics,
    topicBreakdown: topicMap,
    responses: quizSession.responses.map(r => ({
      questionId: r.questionId,
      questionText: r.question.text,
      topicId: r.topicId,
      selectedOpt: r.selectedOpt,
      correctOpt: r.question.answer,
      isCorrect: r.isCorrect,
      explanation: r.question.explanation,
      thetaBefore: r.thetaBefore,
      thetaAfter: r.thetaAfter,
    })),
  })
}
