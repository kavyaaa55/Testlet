import { auth } from '@/auth'
import { db } from '@/lib/db'
import { SUBJECTS, SUBJECT_NAMES } from '@/lib/topicGraph'

export async function GET() {
  const session = await auth()

  const subjects = await Promise.all(
    SUBJECTS.map(async (subject) => {
      let rating: number | null = null
      let attempts = 0

      if (session?.user?.id) {
        const sr = await db.subjectRating.findUnique({
          where: { userId_subject: { userId: session.user.id, subject } },
        })
        rating = sr?.rating ?? null
        attempts = sr?.attempts ?? 0
      }

      return {
        id: subject,
        name: SUBJECT_NAMES[subject],
        rating,
        attempts,
      }
    })
  )

  return Response.json({ subjects })
}
