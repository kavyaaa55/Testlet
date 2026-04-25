import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import QuizClient from '@/components/QuizClient'
import TopNav from '@/components/TopNav'
import { SUBJECT_NAMES } from '@/lib/topicGraph'
import { SUBJECTS } from '@/lib/validators'

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>
  searchParams: Promise<{ session?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/api/auth/signin')

  const { subject } = await params
  const { session: sessionId } = await searchParams

  if (!SUBJECTS.includes(subject as typeof SUBJECTS[number])) redirect('/')
  if (!sessionId) redirect(`/subjects/${subject}`)

  const subjectName = SUBJECT_NAMES[subject as keyof typeof SUBJECT_NAMES]

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8fa]">
      <TopNav title={`${subjectName} — Live Quiz`} />
      <QuizClient subject={subject} sessionId={sessionId} subjectName={subjectName} />
    </div>
  )
}
