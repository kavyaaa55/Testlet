'use client'

import { signIn } from 'next-auth/react'

export default function SignInPrompt() {
  return (
    <div className="mb-6 p-4 bg-[#2b2d42] text-white rounded-xl flex items-center justify-between">
      <div>
        <p className="font-semibold">Sign in to track your progress</p>
        <p className="text-sm text-white/70">Your ratings and leaderboard position are saved when you&apos;re signed in.</p>
      </div>
      <button
        onClick={() => signIn('google')}
        className="px-5 py-2 bg-white text-[#2b2d42] text-sm font-bold rounded-lg hover:bg-slate-100 transition-colors shrink-0"
      >
        Sign in with Google
      </button>
    </div>
  )
}
