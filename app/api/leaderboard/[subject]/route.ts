import { auth } from '@/auth'
import { db } from '@/lib/db'
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

  const top10 = await db.leaderboardEntry.findMany({
    where: { subject },
    orderBy: { rating: 'desc' },
    take: 10,
    select: { userId: true, userName: true, userImage: true, rating: true, attempts: true },
  })

  let userRank: { rank: number; rating: number; attempts: number } | null = null

  if (session?.user?.id) {
    const userEntry = await db.leaderboardEntry.findUnique({
      where: { userId_subject: { userId: session.user.id, subject } },
    })

    if (userEntry) {
      const above = await db.leaderboardEntry.count({
        where: { subject, rating: { gt: userEntry.rating } },
      })
      userRank = { rank: above + 1, rating: userEntry.rating, attempts: userEntry.attempts }
    }
  }

  return Response.json({ subject, top10, userRank })
}
