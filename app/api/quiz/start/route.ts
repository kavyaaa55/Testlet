import { auth } from '@/auth'
import { StartQuizSchema } from '@/lib/validators'
import { startSession } from '@/lib/quizEngine'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = StartQuizSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const result = await startSession(session.user.id, parsed.data.subject)
    return Response.json({
      sessionId: result.session.id,
      currentRating: result.currentRating,
      firstQuestion: {
        id: result.firstQuestion.id,
        text: result.firstQuestion.text,
        options: result.firstQuestion.options,
        topicId: result.firstQuestion.topicId,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to start session'
    return Response.json({ error: message }, { status: 500 })
  }
}
