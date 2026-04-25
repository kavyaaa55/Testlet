'use client'

import { useRouter } from 'next/navigation'
import { getRatingTier } from '@/lib/rating'
import type { LeaderboardData } from '@/types'

interface LeaderboardClientProps {
  data: LeaderboardData
  subjects: { id: string; name: string }[]
  currentSubject: string
  userName: string | null
}

const SUBJECT_SHORT: Record<string, string> = {
  os: 'OS',
  dbms: 'DBMS',
  oop: 'OOP',
  cn: 'CN',
  sysdesign: 'System Design',
}

export default function LeaderboardClient({ data, subjects, currentSubject, userName }: LeaderboardClientProps) {
  const router = useRouter()
  const { top10, userRank } = data

  const [first, second, third, ...rest] = top10

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#16182c] tracking-tight">Leaderboard</h1>
          <p className="text-lg text-[#535f72] mt-2">Compete with the top minds across specialized technical domains.</p>
        </div>
        {userRank && (
          <div className="flex items-center bg-white border border-[#d1dce5] p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-[#2b2d42] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {userRank.rank}
              </div>
              <div>
                <div className="text-xs font-bold text-[#535f72] uppercase tracking-wider">Your Rank</div>
                <div className="font-bold text-[#16182c]">{userName ?? 'You'}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subject tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {subjects.map((s) => (
          <button
            key={s.id}
            onClick={() => router.push(`/leaderboard/${s.id}`)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
              s.id === currentSubject
                ? 'bg-[#16182c] text-white border-[#16182c]'
                : 'bg-white text-[#535f72] border-[#d1dce5] hover:border-[#16182c]'
            }`}
          >
            {SUBJECT_SHORT[s.id] ?? s.name}
          </button>
        ))}
      </div>

      {top10.length === 0 ? (
        <div className="bg-white border border-[#d1dce5] rounded-xl p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-slate-300 block mb-4">leaderboard</span>
          <p className="text-[#535f72]">No entries yet. Take a quiz to be the first on the leaderboard!</p>
        </div>
      ) : (
        <>
          {/* Podium — top 3 */}
          {top10.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end py-2">
              {/* Rank 2 */}
              <PodiumCard entry={second} rank={2} />
              {/* Rank 1 */}
              <PodiumCard entry={first} rank={1} featured />
              {/* Rank 3 */}
              <PodiumCard entry={third} rank={3} />
            </div>
          )}

          {/* Ranks 4+ */}
          {rest.length > 0 && (
            <div className="bg-white border border-[#d1dce5] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-[#d1dce5]">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#535f72] tracking-widest uppercase">Rank</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#535f72] tracking-widest uppercase">Student</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#535f72] tracking-widest uppercase">Rating</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-[#535f72] tracking-widest uppercase text-right">Attempts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d1dce5]">
                  {rest.map((entry, i) => {
                    const tier = getRatingTier(entry.rating)
                    return (
                    <tr key={entry.userId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#16182c]">{i + 4}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2b2d42] flex items-center justify-center text-white text-sm font-bold">
                            {entry.userName[0]}
                          </div>
                          <div>
                            <span className="font-semibold text-[#16182c]">{entry.userName}</span>
                            {'peakRating' in entry && (
                              <div className="text-xs text-gray-400 font-mono">Peak: {(entry as typeof entry & { peakRating: number }).peakRating.toLocaleString()}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold font-mono" style={{ color: tier.color }}>{entry.rating.toLocaleString()}</span>
                          <span className="text-xs font-semibold" style={{ color: tier.color }}>{tier.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-[#535f72]">{entry.attempts}</td>
                    </tr>
                    )
                  })}

                  {/* User row if outside top 10 */}
                  {userRank && userRank.rank > 10 && (
                    <tr className="bg-[#2b2d42] text-white">
                      <td className="px-6 py-4 font-bold">{userRank.rank}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                            {userName?.[0] ?? '?'}
                          </div>
                          <span className="font-semibold">{userName ?? 'You'} (You)</span>
                        </div>
                      </td>
      <td className="px-6 py-4 text-white/80">{userRank.rating.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-white/70">{userRank.attempts}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function PodiumCard({
  entry,
  rank,
  featured,
}: {
  entry: LeaderboardData['top10'][number]
  rank: number
  featured?: boolean
}) {
  if (!entry) return null

  const tier = getRatingTier(entry.rating)
  const rankColors: Record<number, string> = {
    1: 'bg-[#d90429] text-white border-[#d90429]',
    2: 'bg-slate-200 text-slate-700',
    3: 'bg-orange-100 text-orange-700',
  }

  return (
    <div className={`bg-white rounded-xl text-center relative ${featured ? 'border-2 border-[#d90429] p-8 shadow-lg scale-105 z-10 order-1 md:order-2' : 'border border-[#d1dce5] p-6 h-fit order-2 md:order-1'}`}>
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white ${rankColors[rank]}`}>
        {featured ? <span className="material-symbols-outlined text-lg">military_tech</span> : rank}
      </div>
      <div className={`${featured ? 'w-24 h-24' : 'w-16 h-16'} rounded-full mx-auto mb-4 bg-[#2b2d42] flex items-center justify-center text-white font-bold text-2xl border-4 ${featured ? 'border-[#d90429]/20' : 'border-slate-100'}`}>
        {entry.userName[0]}
      </div>
      <h3 className={`font-bold text-[#16182c] ${featured ? 'text-xl' : 'text-lg'}`}>{entry.userName}</h3>
      <div className={`font-bold font-mono mt-1 ${featured ? 'text-xl' : 'text-base'}`} style={{ color: tier.color }}>
        {entry.rating.toLocaleString()}
      </div>
      <div className="text-xs font-semibold mt-0.5" style={{ color: tier.color }}>{tier.label}</div>
    </div>
  )
}
