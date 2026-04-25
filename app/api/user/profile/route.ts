import { auth } from '@/auth'
import { db } from '@/lib/db'
import { SUBJECTS, SUBJECT_NAMES } from '@/lib/topicGraph'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  const subjectRatings = await Promise.all(
    SUBJECTS.map(async (subject) => {
      const sr = await db.subjectRating.findUnique({
        where: { userId_subject: { userId, subject } },
      })
      return {
        subject,
        name: SUBJECT_NAMES[subject],
        rating: sr?.rating ?? null,
        theta: sr?.theta ?? null,
        attempts: sr?.attempts ?? 0,
      }
    })
  )

  const recentSessions = await db.quizSession.findMany({
    where: { userId, completed: true },
    orderBy: { completedAt: 'desc' },
    take: 10,
    select: {
      id: true,
      subject: true,
      finalRating: true,
      ratingDelta: true,
      correct: true,
      totalQ: true,
      completedAt: true,
    },
  })

  return Response.json({
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    },
    subjectRatings,
    recentSessions,
  })
}
