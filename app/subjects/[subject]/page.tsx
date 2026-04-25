import { notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { TOPICS, SUBJECT_NAMES } from '@/lib/topicGraph'
import { SUBJECTS } from '@/lib/validators'
import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import RatingBadge, { getRatingLabel } from '@/components/RatingBadge'
import StartQuizButton from '@/components/StartQuizButton'

const SUBJECT_IMAGES: Record<string, string> = {
  os: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
  dbms: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
  oop: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
  cn: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
  sysdesign: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
}

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject } = await params

  if (!SUBJECTS.includes(subject as typeof SUBJECTS[number])) notFound()

  const session = await auth()
  const topics = TOPICS.filter((t) => t.subject === subject)

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
    topicScores = Object.fromEntries(scores.map((s) => [s.topicId, s.score]))
  }

  const leaderboardPreview = await db.leaderboardEntry.findMany({
    where: { subject },
    orderBy: { rating: 'desc' },
    take: 5,
    select: { userName: true, userImage: true, rating: true },
  })

  const subjectName = SUBJECT_NAMES[subject as keyof typeof SUBJECT_NAMES]
  const imgSrc = SUBJECT_IMAGES[subject] ?? SUBJECT_IMAGES.os

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 flex flex-col">
        <TopNav showBack backHref="/" backLabel="Back to Dashboard" />

        {/* Hero */}
        <div className="relative w-full h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#16182c]/90 to-[#16182c]/40 z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={subjectName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-20 flex items-end p-6 md:p-12">
            <div className="max-w-4xl w-full">
              <div className="inline-flex items-center px-3 py-1 bg-[#d90429] text-white text-[10px] font-bold tracking-widest uppercase rounded mb-4">
                Computer Science • Core
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{subjectName}</h1>
              <div className="flex items-center gap-4">
                {userRating !== null ? (
                  <div className="flex items-center gap-2 text-white/90 text-sm font-semibold">
                    <span>Your Rating:</span>
                    <span className="text-white font-bold text-lg">{userRating}</span>
                    <span className="text-white/70">({getRatingLabel(userRating)})</span>
                  </div>
                ) : (
                  <span className="text-white/70 text-sm">Not attempted yet</span>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-6 right-6 z-20 hidden md:block">
            <StartQuizButton subject={subject} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Topics */}
            <div className="md:col-span-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#16182c] border-l-4 border-[#d90429] pl-4">
                Curriculum Path
              </h2>

              {topics.map((topic) => {
                const score = topicScores[topic.id] ?? null
                const prereqsMet = topic.prerequisites.every(
                  (p) => (topicScores[p] ?? 0) >= 50
                )
                const isRoot = topic.prerequisites.length === 0
                const isUnlocked = isRoot || prereqsMet

                return (
                  <div
                    key={topic.id}
                    className={`bg-white border border-[#d1dce5] rounded-xl p-6 flex items-center gap-6 transition-all ${
                      isUnlocked
                        ? 'hover:border-[#d90429] hover:shadow-[0px_4px_20px_rgba(43,45,66,0.08)]'
                        : 'opacity-60 grayscale'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center border ${isUnlocked ? 'bg-slate-50 border-[#d1dce5]' : 'bg-slate-200 border-[#d1dce5]'}`}>
                      <span className={`material-symbols-outlined text-3xl ${isUnlocked ? 'text-[#16182c]' : 'text-slate-400'}`}>
                        {isUnlocked ? 'check_circle' : 'lock'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-[#16182c]">{topic.name}</h3>
                        {score !== null && isUnlocked && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${score >= 70 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {score}% Score
                          </span>
                        )}
                      </div>
                      {isUnlocked ? (
                        <p className="text-slate-400 text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">check_circle</span>
                          Unlocked
                        </p>
                      ) : (
                        <p className="text-slate-400 text-xs">
                          Complete {topic.prerequisites.join(', ')} to unlock
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4 space-y-6">
              {/* Stats */}
              <div className="bg-white border border-[#d1dce5] rounded-xl p-6">
                <h4 className="text-lg font-bold text-[#16182c] mb-4">Your Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">Current Rating</span>
                    <RatingBadge rating={userRating} attempts={userAttempts} size="sm" />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-50">
                    <span className="text-slate-500 text-sm">Attempts</span>
                    <span className="font-bold text-[#16182c]">{userAttempts}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 text-sm">Topics Unlocked</span>
                    <span className="font-bold text-[#16182c]">
                      {topics.filter((t) => t.prerequisites.length === 0 || t.prerequisites.every((p) => (topicScores[p] ?? 0) >= 50)).length}
                      /{topics.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Leaderboard preview */}
              <div className="bg-white border border-[#d1dce5] rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold text-[#16182c]">Top Performers</h4>
                  <Link href={`/leaderboard/${subject}`} className="text-xs text-[#d90429] font-semibold hover:underline">
                    View All
                  </Link>
                </div>
                {leaderboardPreview.length === 0 ? (
                  <p className="text-sm text-slate-400">No entries yet. Be the first!</p>
                ) : (
                  <div className="space-y-3">
                    {leaderboardPreview.map((entry, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-6 text-xs font-bold text-slate-400">#{i + 1}</span>
                        <div className="w-8 h-8 rounded-full bg-[#2b2d42] flex items-center justify-center text-white text-xs font-bold">
                          {entry.userName[0]}
                        </div>
                        <span className="flex-1 text-sm font-medium text-[#16182c] truncate">{entry.userName}</span>
                        <span className="text-sm font-bold text-[#d90429]">{entry.rating}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile start quiz */}
              <div className="md:hidden">
                <StartQuizButton subject={subject} fullWidth />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
