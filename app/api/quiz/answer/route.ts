import { auth } from '@/auth'
import { AnswerSchema } from '@/lib/validators'
import { submitAnswer } from '@/lib/quizEngine'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = AnswerSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { sessionId, questionId, selectedOption, timeTaken } = parsed.data

  try {
    const result = await submitAnswer(
      sessionId,
      session.user.id,
      questionId,
      selectedOption,
      timeTaken
    )

    return Response.json({
      isCorrect: result.isCorrect,
      explanation: result.explanation,
      newRating: result.newRating,
      ratingDelta: result.ratingDelta,
      sessionComplete: result.sessionComplete,
      nextQuestion: result.nextQuestion
        ? {
            id: result.nextQuestion.id,
            text: result.nextQuestion.text,
            options: result.nextQuestion.options,
            topicId: result.nextQuestion.topicId,
          }
        : null,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to submit answer'
    const status = message === 'Unauthorized' ? 403
      : message === 'Session already completed' ? 409
      : message === 'Question already answered' ? 409
      : 500
    return Response.json({ error: message }, { status })
  }
}
