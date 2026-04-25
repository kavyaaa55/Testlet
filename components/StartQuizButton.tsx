'use client'

import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { useState } from 'react'

interface StartQuizButtonProps {
  subject: string
  fullWidth?: boolean
}

export default function StartQuizButton({ subject, fullWidth }: StartQuizButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    if (!session) {
      signIn('google')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to start quiz')
      // Store first question so QuizClient can pick it up immediately
      sessionStorage.setItem(`quiz_first_${data.sessionId}`, JSON.stringify(data.firstQuestion))
      router.push(`/quiz/${subject}?session=${data.sessionId}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start quiz')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleStart}
      disabled={loading}
      className={`bg-[#d90429] text-white px-8 py-4 font-bold text-sm rounded-lg shadow-lg hover:bg-[#b00321] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`}
    >
      {loading ? 'Starting...' : 'START QUIZ'}
    </button>
  )
}
