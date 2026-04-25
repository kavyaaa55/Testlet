'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const navItems = [
  { href: '/', icon: 'dashboard', label: 'Dashboard' },
  { href: '/leaderboard/os', icon: 'leaderboard', label: 'Leaderboard' },
  { href: '/profile', icon: 'person', label: 'Profile' },
]

export default function SideNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="hidden md:flex flex-col h-screen sticky left-0 top-0 bg-white text-[#2b2d42] font-[Inter] text-sm w-64 border-r border-[#d1dce5]">
      <div className="p-6 border-b border-[#d1dce5]">
        <div className="text-lg font-black text-[#2b2d42]">GoQuiz</div>
        <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Learning Portal</div>
      </div>

      <nav className="flex-1 py-4">
        <div className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">Navigation</div>
        {navItems.map(({ href, icon, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href.split('/')[1] ? `/${href.split('/')[1]}` : href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center py-3 px-4 transition-all ${
                isActive
                  ? 'border-l-4 border-[#d90429] bg-slate-50 text-[#2b2d42] font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined mr-3">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {session?.user && (
        <div className="p-4 border-t border-[#d1dce5] flex items-center">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full mr-3 border-2 border-[#2b2d42]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full mr-3 bg-[#2b2d42] flex items-center justify-center text-white font-bold">
              {session.user.name?.[0] ?? '?'}
            </div>
          )}
          <div className="overflow-hidden">
            <div className="font-semibold truncate text-sm">{session.user.name}</div>
            <div className="text-xs text-slate-500 truncate">Student Account</div>
          </div>
        </div>
      )}
    </aside>
  )
}
