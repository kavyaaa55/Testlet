import { auth } from '@/auth'
import { db } from '@/lib/db'
import { TOPICS, SUBJECT_NAMES } from '@/lib/topicGraph'
import { SubjectParamSchema } from '@/lib/validators'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ subject: string }> }
) {
  const { subject } = await params
  const parsed = SubjectParamSchema.safeParse({ subject })
  if (!parsed.success) {
    return Response.json({ error: 'Invalid subject' }, { status: 400 })
  }

  const session = await auth()
  const topics = TOPICS.filter(t => t.subject === subject)

  let userRating: number | null = null
  let userAttempts = 0
  let topicScores: Record<string, number> = {}

  if (session?.user?.id) {
    const sr = await db.subjectRating.findUnique({
      where: { userId_subject: { userId: session.user.id, subject } },
    })
    userRating = sr?.rating ?? null
    userAttempts = sr?.attempts ?? 0

    const scores = await db.topicScore.findMany({
      where: { userId: session.user.id, subject },
    })
    topicScores = Object.fromEntries(scores.map(s => [s.topicId, s.score]))
  }

  // Leaderboard preview (top 5)
  const leaderboardPreview = await db.leaderboardEntry.findMany({
    where: { subject },
    orderBy: { rating: 'desc' },
    take: 5,
    select: { userName: true, userImage: true, rating: true },
  })

  return Response.json({
    subject,
    name: SUBJECT_NAMES[subject as keyof typeof SUBJECT_NAMES],
    topics: topics.map(t => ({
      id: t.id,
      name: t.name,
      prerequisites: t.prerequisites,
      score: topicScores[t.id] ?? null,
    })),
    userRating,
    userAttempts,
    leaderboardPreview,
  })
}
