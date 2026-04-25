import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { getRatingTier } from '@/lib/rating'
import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'

export default async function QuizResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>
  searchParams: Promise<{ session?: string }>
}) {
  const session = await auth()
  if (!session?.user?.id) redirect('/api/auth/signin')

  const { subject } = await params
  const { session: sessionId } = await searchParams
  if (!sessionId) redirect(`/subjects/${subject}`)

  const quizSession = await db.quizSession.findUnique({
    where: { id: sessionId },
    include: {
      responses: { include: { question: true }, orderBy: { createdAt: 'asc' } },
    },
  })

  if (!quizSession) notFound()
  if (quizSession.userId !== session.user.id) redirect('/')
  if (!quizSession.completed) redirect(`/quiz/${subject}?session=${sessionId}`)

  // Fetch peak from SubjectRating
  const subjectRating = await db.subjectRating.findUnique({
    where: { userId_subject: { userId: session.user.id, subject } },
  })
  const peakRating = subjectRating?.peakRating ?? quizSession.finalRating

  // User rank
  const userEntry = await db.leaderboardEntry.findUnique({
    where: { userId_subject: { userId: session.user.id, subject } },
  })
  let rank: number | null = null
  if (userEntry) {
    const above = await db.leaderboardEntry.count({
      where: { subject, rating: { gt: userEntry.rating } },
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
  const weakTopics = Object.entries(topicMap)
    .filter(([, v]) => v.correct / v.total < 0.5)
    .map(([id]) => id)

  const oldRating = quizSession.startRating
  const newRating = quizSession.finalRating
  const delta = quizSession.ratingDelta
  const isNewPeak = newRating >= peakRating

  const oldTier = getRatingTier(oldRating)
  const newTier = getRatingTier(newRating)
  const promoted = newTier.label !== oldTier.label && delta > 0
  const demoted  = newTier.label !== oldTier.label && delta < 0

  const correctCount = quizSession.correct
  const totalQ = quizSession.totalQ
  const circumference = 2 * Math.PI * 88
  const dashOffset = circumference - (correctCount / totalQ) * circumference

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 flex flex-col">
        <TopNav showBack backHref={`/subjects/${subject}`} backLabel="Back to Subject" />

        <div className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

            {/* ── Score + Rating hero ── */}
            <div className="md:col-span-12 bg-white border border-[#d1dce5] rounded-xl shadow-[0px_4px_20px_rgba(43,45,66,0.08)] overflow-hidden mb-2">

              {/* Promotion / demotion banner */}
              {promoted && (
                <div className="px-6 py-3 text-white text-sm font-bold text-center" style={{ backgroundColor: newTier.color }}>
                  🎉 Promoted to {newTier.label}!
                </div>
              )}
              {demoted && (
                <div className="px-6 py-3 bg-slate-700 text-white text-sm font-bold text-center">
                  Dropped to {newTier.label}
                </div>
              )}
              {isNewPeak && !promoted && (
                <div className="px-6 py-3 bg-amber-500 text-white text-sm font-bold text-center">
                  ⭐ New personal best!
                </div>
              )}

              <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                {/* Correct/total ring */}
                <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle className="text-[#ebe7e9]" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8" />
                    <circle
                      cx="80" cy="80" fill="transparent" r="70"
                      stroke={delta >= 0 ? '#10b981' : '#ba1a1a'}
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={2 * Math.PI * 70 - (correctCount / totalQ) * 2 * Math.PI * 70}
                      strokeWidth="8" strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-[#16182c] block">{correctCount}/{totalQ}</span>
                    <span className="text-[10px] font-bold text-[#535f72] tracking-widest uppercase">Correct</span>
                  </div>
                </div>

                {/* Rating change */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-3 mb-3">
                    {/* Old rating */}
                    <div className="text-center">
                      <div className="text-xs font-bold text-[#535f72] uppercase tracking-wider mb-1">Before</div>
                      <span className="text-3xl font-bold font-mono" style={{ color: oldTier.color }}>
                        {oldRating.toLocaleString()}
                      </span>
                      <div className="text-xs font-semibold mt-0.5" style={{ color: oldTier.color }}>{oldTier.label}</div>
                    </div>

                    {/* Arrow + delta */}
                    <div className="flex flex-col items-center px-4">
                      <span className={`text-2xl font-bold font-mono ${delta >= 0 ? 'text-emerald-500' : 'text-[#ba1a1a]'}`}>
                        {delta >= 0 ? '+' : ''}{delta}
                      </span>
                      <span className="text-[#535f72] text-lg">→</span>
                    </div>

                    {/* New rating */}
                    <div className="text-center">
                      <div className="text-xs font-bold text-[#535f72] uppercase tracking-wider mb-1">After</div>
                      <span className="text-4xl font-bold font-mono" style={{ color: newTier.color }}>
                        {newRating.toLocaleString()}
                      </span>
                      <div className="text-sm font-bold mt-0.5" style={{ color: newTier.color }}>{newTier.label}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                    <div className="text-xs text-gray-400 font-mono">Peak: {peakRating.toLocaleString()}</div>
                    {rank && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#535f72]">
                        <span className="material-symbols-outlined text-sm">leaderboard</span>
                        Rank #{rank}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {weakTopics.length > 0 && (
                <div className="mx-8 mb-6 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-700">
                  <span className="font-semibold">Weak areas: </span>
                  {weakTopics.map(t => t.replace(/-/g, ' ')).join(', ')}
                </div>
              )}
            </div>

            {/* ── Question breakdown ── */}
            <div className="md:col-span-8 space-y-3">
              <h3 className="text-xl font-bold text-[#16182c] mb-4">Question Breakdown</h3>
              {quizSession.responses.map((r, i) => (
                <details key={r.id} className="group bg-white rounded-lg border border-[#d1dce5] overflow-hidden hover:shadow-sm transition-all">
                  <summary className={`flex justify-between items-start gap-4 p-5 cursor-pointer border-l-4 ${r.isCorrect ? 'border-emerald-500' : 'border-[#ba1a1a]'}`}>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${r.isCorrect ? 'text-emerald-600' : 'text-[#ba1a1a]'}`}>
                        Q{i + 1} — {r.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      <p className="text-sm font-semibold text-[#16182c]">{r.question.text}</p>
                    </div>
                    <span className="material-symbols-outlined text-[#535f72] shrink-0 group-open:rotate-90 transition-transform">chevron_right</span>
                  </summary>
                  <div className="px-5 pb-5 border-t border-[#d1dce5] pt-4 space-y-2">
                    <p className="text-sm text-[#535f72] leading-relaxed">{r.question.explanation}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#535f72]">
                      <span>Your answer: <strong>{(r.question.options as string[])[r.selectedOpt]}</strong></span>
                      {!r.isCorrect && (
                        <span>Correct: <strong className="text-emerald-600">{(r.question.options as string[])[r.question.answer]}</strong></span>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>

            {/* ── Sidebar ── */}
            <div className="md:col-span-4 sticky top-[105px] space-y-4">
              <div className="bg-white border border-[#d1dce5] p-6 rounded-xl">
                <h4 className="text-lg font-bold text-[#16182c] mb-4">What&apos;s next?</h4>
                <div className="space-y-3">
                  <Link href={`/subjects/${subject}`} className="w-full bg-[#2b2d42] text-white text-sm font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Back to Subject
                  </Link>
                  <Link href={`/leaderboard/${subject}`} className="w-full border border-[#77767d] text-[#535f72] text-sm font-semibold py-3 rounded-lg hover:bg-[#f0edef] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">leaderboard</span>
                    Go to Leaderboard
                  </Link>
                </div>
              </div>

              {/* Rating card */}
              <div className="p-6 rounded-xl text-white relative overflow-hidden" style={{ backgroundColor: newTier.color }}>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-widest opacity-70 uppercase mb-1 block">Current Rating</span>
                  <p className="text-4xl font-bold font-mono">{newRating.toLocaleString()}</p>
                  <p className="text-lg font-bold mt-1 opacity-90">{newTier.label}</p>
                  <p className="text-xs opacity-60 font-mono mt-1">Peak: {peakRating.toLocaleString()}</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>school</span>
                </div>
              </div>
            </div>

          </section>
        </div>

        <Footer />
      </main>
    </div>
  )
}
