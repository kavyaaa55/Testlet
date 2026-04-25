import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { SUBJECTS, SUBJECT_NAMES } from '@/lib/topicGraph'
import { getRatingTier } from '@/lib/rating'
import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/api/auth/signin')

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
        peakRating: sr?.peakRating ?? null,
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
      id: true, subject: true, finalRating: true,
      ratingDelta: true, correct: true, totalQ: true, completedAt: true,
    },
  })

  const totalAttempts = subjectRatings.reduce((sum, s) => sum + s.attempts, 0)
  const ratedSubjects = subjectRatings.filter(s => s.rating !== null)
  const highestRated = ratedSubjects.reduce<typeof ratedSubjects[0] | null>(
    (best, s) => (!best || (s.rating ?? 0) > (best.rating ?? 0)) ? s : best, null
  )
  const overallPeak = ratedSubjects.reduce((max, s) => Math.max(max, s.peakRating ?? 0), 0) || null

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 flex flex-col">
        <TopNav />

        <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">

          {/* Profile header */}
          <div className="bg-white border border-[#d1dce5] rounded-xl p-8 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
            {session.user.image ? (
              <Image src={session.user.image} alt="Profile" width={80} height={80} className="rounded-full border-4 border-[#2b2d42]" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#2b2d42] flex items-center justify-center text-white text-3xl font-bold">
                {session.user.name?.[0] ?? '?'}
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#16182c]">{session.user.name}</h1>
              <p className="text-[#535f72] mt-1">{session.user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#16182c]">{totalAttempts}</div>
                  <div className="text-xs text-[#535f72] uppercase tracking-wider">Total Quizzes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#16182c]">{ratedSubjects.length}/5</div>
                  <div className="text-xs text-[#535f72] uppercase tracking-wider">Subjects Rated</div>
                </div>
                {overallPeak && (
                  <div className="text-center">
                    <div className="text-2xl font-bold font-mono" style={{ color: getRatingTier(overallPeak).color }}>
                      {overallPeak.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#535f72] uppercase tracking-wider">Peak Rating</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* ── Left: Subject ratings ── */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-xl font-bold text-[#16182c]">Subject Ratings</h2>
              <div className="space-y-3">
                {subjectRatings.map((sr) => {
                  const tier = sr.rating !== null ? getRatingTier(sr.rating) : null
                  return (
                    <div key={sr.subject} className="bg-white border border-[#d1dce5] rounded-xl p-5 flex items-center justify-between hover:border-[#d90429] transition-colors group">
                      <div>
                        <h3 className="font-bold text-[#16182c]">{sr.name}</h3>
                        <p className="text-xs text-[#535f72] mt-0.5">{sr.attempts} attempt{sr.attempts !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {tier && sr.rating !== null ? (
                          <div className="text-right">
                            <div className="flex items-baseline gap-1.5 justify-end">
                              <span className="text-xl font-bold font-mono" style={{ color: tier.color }}>{sr.rating.toLocaleString()}</span>
                              <span className="text-xs font-semibold" style={{ color: tier.color }}>{tier.label}</span>
                            </div>
                            {sr.peakRating && (
                              <div className="text-[10px] text-gray-400 font-mono text-right">Peak: {sr.peakRating.toLocaleString()}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Not attempted</span>
                        )}
                        <Link href={`/subjects/${sr.subject}`} className="text-xs font-semibold text-[#2b2d42] hover:text-[#d90429] transition-colors opacity-0 group-hover:opacity-100">
                          Quiz →
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Recent sessions */}
              <div>
                <h2 className="text-xl font-bold text-[#16182c] mb-4">Recent Sessions</h2>
                {recentSessions.length === 0 ? (
                  <div className="bg-white border border-[#d1dce5] rounded-xl p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-slate-300 block mb-3">quiz</span>
                    <p className="text-[#535f72] text-sm">No quizzes taken yet.</p>
                    <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#d90429] hover:underline">Start your first quiz →</Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentSessions.map((s) => {
                      const tier = getRatingTier(s.finalRating)
                      return (
                        <Link key={s.id} href={`/quiz/${s.subject}/result?session=${s.id}`}
                          className="flex items-center justify-between bg-white border border-[#d1dce5] rounded-xl px-5 py-4 hover:border-[#d90429] hover:shadow-sm transition-all"
                        >
                          <div>
                            <span className="text-xs font-bold text-[#535f72] uppercase tracking-wider">
                              {SUBJECT_NAMES[s.subject as keyof typeof SUBJECT_NAMES]}
                            </span>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="font-bold font-mono" style={{ color: tier.color }}>{s.finalRating.toLocaleString()}</span>
                              <span className={`text-sm font-semibold ${s.ratingDelta >= 0 ? 'text-emerald-600' : 'text-[#ba1a1a]'}`}>
                                {s.ratingDelta >= 0 ? '+' : ''}{s.ratingDelta}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#16182c]">{s.correct}/{s.totalQ} correct</div>
                            <div className="text-xs text-[#535f72]">{s.completedAt ? new Date(s.completedAt).toLocaleDateString() : ''}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Rating system panel ── */}
            <div className="md:col-span-5 space-y-4">

              {/* Best subject highlight */}
              {highestRated && highestRated.rating !== null && (() => {
                const tier = getRatingTier(highestRated.rating)
                return (
                  <div className="rounded-xl p-6 text-white relative overflow-hidden" style={{ backgroundColor: tier.color }}>
                    <div className="relative z-10">
                      <div className="text-[10px] font-bold tracking-widest opacity-70 uppercase mb-1">Best Subject</div>
                      <div className="text-lg font-bold opacity-90 mb-1">{highestRated.name}</div>
                      <div className="text-5xl font-bold font-mono">{highestRated.rating.toLocaleString()}</div>
                      <div className="text-xl font-bold mt-1 opacity-90">{tier.label}</div>
                      {highestRated.peakRating && (
                        <div className="text-xs opacity-60 font-mono mt-1">Peak: {highestRated.peakRating.toLocaleString()}</div>
                      )}
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>emoji_events</span>
                    </div>
                  </div>
                )
              })()}

              {/* Rating tiers reference */}
              <div className="bg-white border border-[#d1dce5] rounded-xl p-6">
                <h3 className="text-sm font-bold text-[#16182c] uppercase tracking-wider mb-4">Rating Tiers</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Master',     color: '#ff0000', range: '1800+',       bold: true },
                    { label: 'Expert',     color: '#ff0000', range: '1500 – 1799', bold: false },
                    { label: 'Advanced',   color: '#ff8c00', range: '1300 – 1499', bold: false },
                    { label: 'Proficient', color: '#aa00aa', range: '1200 – 1299', bold: false },
                    { label: 'Competent',  color: '#0000ff', range: '1100 – 1199', bold: false },
                    { label: 'Apprentice', color: '#03a89e', range: '1000 – 1099', bold: false },
                    { label: 'Novice',     color: '#008000', range: '900 – 999',   bold: false },
                    { label: 'Beginner',   color: '#808080', range: '800 – 899',   bold: false },
                  ].map(tier => {
                    // highlight current user's tier
                    const userBestRating = highestRated?.rating ?? null
                    const isCurrentTier = userBestRating !== null && getRatingTier(userBestRating).label === tier.label
                    return (
                      <div key={tier.label} className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${isCurrentTier ? 'bg-slate-50 ring-1 ring-slate-200' : ''}`}>
                        <div className="flex items-center gap-2">
                          {isCurrentTier && <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ color: tier.color }} />}
                          <span className={`text-sm font-${tier.bold ? 'black' : 'semibold'}`} style={{ color: tier.color }}>
                            {tier.label}
                          </span>
                          {isCurrentTier && <span className="text-[10px] text-[#535f72] font-bold uppercase tracking-wider">← you</span>}
                        </div>
                        <span className="text-xs text-gray-400 font-mono">{tier.range}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
                  Ratings use an ELO-style system. K-factor decreases as you improve — harder to gain, harder to lose at the top.
                </p>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
