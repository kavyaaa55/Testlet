'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

interface TopNavProps {
  title?: string
  showBack?: boolean
  backHref?: string
  backLabel?: string
}

export default function TopNav({ title, showBack, backHref = '/', backLabel = 'Back to Dashboard' }: TopNavProps) {
  const { data: session } = useSession()

  return (
    <header className="flex justify-between items-center px-6 py-3 w-full sticky top-0 z-50 bg-white border-b border-[#d1dce5] font-[Inter] antialiased">
      <div className="flex items-center gap-4">
        {showBack ? (
          <Link href={backHref} className="flex items-center text-slate-500 hover:text-[#16182c] transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="ml-2 text-sm font-semibold">{backLabel}</span>
          </Link>
        ) : (
          <>
            <Link href="/" className="text-xl font-black text-[#2b2d42] md:hidden">GoQuiz</Link>
            {title && (
              <>
                <div className="h-6 w-px bg-[#c7c5cd] hidden md:block" />
                <span className="text-sm font-medium text-[#535f72] hidden md:block">{title}</span>
              </>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined text-slate-600">military_tech</span>
        </button>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <span className="material-symbols-outlined text-slate-600">workspace_premium</span>
        </button>

        {session?.user ? (
          <button onClick={() => signOut()} className="flex items-center gap-2 pl-2 border-l border-[#c7c5cd]">
            {session.user.image ? (
              <Image src={session.user.image} alt="Profile" width={32} height={32} className="rounded-full border border-[#c7c5cd]" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#2b2d42] flex items-center justify-center text-white text-xs font-bold">
                {session.user.name?.[0] ?? '?'}
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="px-4 py-1.5 bg-[#2b2d42] text-white text-sm font-semibold rounded-lg hover:bg-[#16182c] transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  )
}
