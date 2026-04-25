import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { SUBJECTS, SUBJECT_NAMES } from '@/lib/topicGraph'
import { SUBJECTS as SUBJECT_LIST } from '@/lib/validators'
import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import LeaderboardClient from '@/components/LeaderboardClient'
import type { LeaderboardData } from '@/types'

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject } = await params
  if (!SUBJECT_LIST.includes(subject as typeof SUBJECT_LIST[number])) notFound()

  const session = await auth()

  const top10 = await db.leaderboardEntry.findMany({
    where: { subject },
    orderBy: { rating: 'desc' },
    take: 10,
    select: { userId: true, userName: true, userImage: true, rating: true, attempts: true },
  })

  let userRank: LeaderboardData['userRank'] = null
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

  const data: LeaderboardData = {
    subject: subject as LeaderboardData['subject'],
    top10,
    userRank,
  }

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 flex flex-col">
        <TopNav />
        <LeaderboardClient
          data={data}
          subjects={SUBJECTS.map((s) => ({ id: s, name: SUBJECT_NAMES[s] }))}
          currentSubject={subject}
          userName={session?.user?.name ?? null}
        />
        <Footer />
      </main>
    </div>
  )
}
