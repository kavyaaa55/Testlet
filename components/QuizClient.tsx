'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { QuizQuestion, AnswerResponse } from '@/types'

const TOTAL_QUESTIONS = 15
const TIME_PER_QUESTION = 30

interface QuizClientProps {
  subject: string
  sessionId: string
  subjectName: string
}

type AnswerState = {
  selectedOption: number
  isCorrect: boolean
  explanation: string
  newRating: number
  ratingDelta: number
}

export default function QuizClient({ subject, sessionId, subjectName }: QuizClientProps) {
  const router = useRouter()
  const [question, setQuestion] = useState<QuizQuestion | null>(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [answered, setAnswered] = useState<AnswerState | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [completedIds, setCompletedIds] = useState<number[]>([]) // 1-indexed answered q numbers
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Fetch first question from sessionStorage (passed via URL) or re-fetch
  useEffect(() => {
    const stored = sessionStorage.getItem(`quiz_first_${sessionId}`)
    if (stored) {
      setQuestion(JSON.parse(stored))
      sessionStorage.removeItem(`quiz_first_${sessionId}`)
    }
  }, [sessionId])

  // Timer
  useEffect(() => {
    if (answered) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          // Auto-submit with option -1 (timeout) — pick option 0 as default
          handleSubmit(0, true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, answered])

  const handleSubmit = useCallback(async (selectedOption: number, isTimeout = false) => {
    if (!question || answered || loading) return
    if (timerRef.current) clearInterval(timerRef.current)

    const timeTaken = isTimeout ? TIME_PER_QUESTION : TIME_PER_QUESTION - timeLeft
    setLoading(true)

    try {
      const res = await fetch('/api/quiz/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, questionId: question.id, selectedOption, timeTaken }),
      })
      const data: AnswerResponse = await res.json()
      if (!res.ok) throw new Error((data as unknown as { error: string }).error ?? 'Failed to submit')

      setAnswered({
        selectedOption,
        isCorrect: data.isCorrect,
        explanation: data.explanation,
        newRating: data.newRating,
        ratingDelta: data.ratingDelta,
      })
      setCompletedIds((prev) => [...prev, questionNumber])

      if (data.sessionComplete) {
        setTimeout(() => router.push(`/quiz/${subject}/result?session=${sessionId}`), 1800)
      } else {
        // Store next question for when user clicks Next
        if (data.nextQuestion) {
          sessionStorage.setItem(`quiz_next_${sessionId}`, JSON.stringify(data.nextQuestion))
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [question, answered, loading, timeLeft, sessionId, questionNumber, router, subject])

  function handleNext() {
    const stored = sessionStorage.getItem(`quiz_next_${sessionId}`)
    if (stored) {
      setQuestion(JSON.parse(stored))
      sessionStorage.removeItem(`quiz_next_${sessionId}`)
    }
    setAnswered(null)
    setTimeLeft(TIME_PER_QUESTION)
    setQuestionNumber((n) => n + 1)
  }

  const optionLabels = ['A', 'B', 'C', 'D']
  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100
  const timerColor = timeLeft <= 10 ? 'text-[#ba1a1a]' : timeLeft <= 20 ? 'text-orange-500' : 'text-[#16182c]'

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-[#ba1a1a] font-semibold mb-4">{error}</p>
          <button onClick={() => router.push(`/subjects/${subject}`)} className="px-6 py-3 bg-[#2b2d42] text-white rounded-lg font-semibold">
            Back to Subject
          </button>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2b2d42] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#535f72]">Loading question...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row p-4 md:p-6 gap-6 max-w-6xl mx-auto w-full">
      {/* Question area */}
      <div className="flex-[3] flex flex-col gap-6">
        {/* Mobile progress */}
        <div className="md:hidden flex justify-between items-center">
          <span className="font-bold text-[#16182c]">Q{questionNumber}/{TOTAL_QUESTIONS}</span>
          <span className={`font-bold tabular-nums ${timerColor}`}>{String(Math.floor(timeLeft / 60)).padStart(2,'0')}:{String(timeLeft % 60).padStart(2,'0')}</span>
        </div>

        {/* Main card */}
        <div className="bg-white border border-[#c7c5cd] p-8 rounded-xl shadow-sm">
          <div className="mb-8">
            <span className="bg-[#2b2d42] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4 inline-block">
              {question.topicId.replace(/-/g, ' ')}
            </span>
            <h1 className="text-2xl font-bold text-[#16182c] mt-2">
              Q{questionNumber}: {question.text}
            </h1>
            <p className="text-[#535f72] mt-3 text-base">Choose the most accurate answer.</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, idx) => {
              let cls = 'border border-[#c7c5cd] bg-white hover:border-[#2b2d42] hover:shadow-md'
              let labelCls = 'bg-[#ebe7e9] text-[#535f72] group-hover:bg-[#2b2d42] group-hover:text-white'
              let icon = null

              if (answered) {
                if (idx === answered.selectedOption && answered.isCorrect) {
                  cls = 'border-2 border-emerald-500 bg-emerald-50'
                  labelCls = 'bg-emerald-500 text-white'
                  icon = <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                } else if (idx === answered.selectedOption && !answered.isCorrect) {
                  cls = 'border-2 border-[#ba1a1a] bg-[#ffdad6]/20'
                  labelCls = 'bg-[#ba1a1a] text-white'
                  icon = <span className="material-symbols-outlined text-[#ba1a1a]">cancel</span>
                } else {
                  cls = 'border border-[#c7c5cd] bg-white opacity-60'
                }
              }

              return (
                <button
                  key={idx}
                  disabled={!!answered || loading}
                  onClick={() => handleSubmit(idx)}
                  className={`group flex items-center text-left p-6 rounded-xl transition-all duration-200 ${cls}`}
                >
                  <span className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold mr-4 transition-colors shrink-0 ${labelCls}`}>
                    {optionLabels[idx]}
                  </span>
                  <span className="flex-1 text-base text-[#1c1b1d]">{option}</span>
                  {icon}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div className="mt-8 p-6 bg-[#d7e3fa]/30 border-l-4 border-[#2b2d42] rounded-r-lg">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#2b2d42] mt-0.5">info</span>
                <div>
                  <h4 className="font-bold text-sm text-[#16182c] mb-1">Expert Explanation</h4>
                  <p className="text-sm text-[#535f72] leading-relaxed">{answered.explanation}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className={`text-sm font-bold ${answered.isCorrect ? 'text-emerald-600' : 'text-[#ba1a1a]'}`}>
                      {answered.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-sm text-[#535f72]">
                      Rating: {answered.newRating}
                      <span className={`ml-1 font-semibold ${answered.ratingDelta >= 0 ? 'text-emerald-600' : 'text-[#ba1a1a]'}`}>
                        ({answered.ratingDelta >= 0 ? '+' : ''}{answered.ratingDelta})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => router.push(`/subjects/${subject}`)}
              className="flex items-center gap-2 px-6 py-3 border border-[#c7c5cd] rounded-lg text-sm font-semibold text-[#535f72] hover:bg-[#f0edef] transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Exit Quiz
            </button>
            {answered && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-[#2b2d42] text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Next Question
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Timer */}
        <div className="bg-white border border-[#c7c5cd] p-6 rounded-xl text-center">
          <p className="text-xs font-bold text-[#535f72] tracking-widest uppercase mb-2">Time Remaining</p>
          <div className={`text-5xl tabular-nums font-black ${timerColor}`}>
            {String(Math.floor(timeLeft / 60)).padStart(2,'0')}:{String(timeLeft % 60).padStart(2,'0')}
          </div>
          <div className="mt-3 h-1.5 w-full bg-[#ebe7e9] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${timeLeft <= 10 ? 'bg-[#ba1a1a]' : 'bg-[#2b2d42]'}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
          <div className="mt-3 flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
            <span className="text-xs text-[#ba1a1a] font-semibold">Live Quiz Active</span>
          </div>
        </div>

        {/* Progress map */}
        <div className="bg-white border border-[#c7c5cd] p-6 rounded-xl">
          <h3 className="text-sm font-bold text-[#16182c] mb-4">Question Progress</h3>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
              const num = i + 1
              const isDone = completedIds.includes(num)
              const isCurrent = num === questionNumber
              return (
                <div
                  key={num}
                  className={`h-10 flex items-center justify-center rounded-lg text-sm font-bold border ${
                    isCurrent
                      ? 'border-2 border-[#d90429] bg-slate-50 text-[#d90429]'
                      : isDone
                      ? 'border-2 border-emerald-500 bg-emerald-50 text-emerald-600'
                      : 'border border-[#c7c5cd] text-[#535f72]'
                  }`}
                >
                  {num}
                </div>
              )
            })}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#535f72] mb-1">
              <span>Completion</span>
              <span>{Math.round(((questionNumber - 1) / TOTAL_QUESTIONS) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-[#ebe7e9] rounded-full">
              <div
                className="h-full bg-[#d90429] rounded-full transition-all"
                style={{ width: `${((questionNumber - 1) / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tip card */}
        <div className="bg-[#2b2d42] text-white p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined">lightbulb</span>
            <h3 className="text-sm font-bold">Quick Tip</h3>
          </div>
          <p className="text-xs text-blue-100 leading-relaxed">
            Harder questions answered correctly give a bigger rating boost. Don&apos;t rush — think carefully.
          </p>
        </div>
      </div>
    </div>
  )
}
