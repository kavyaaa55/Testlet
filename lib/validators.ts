import { z } from 'zod'

export const SUBJECTS = ['os', 'dbms', 'oop', 'cn', 'sysdesign'] as const

export const StartQuizSchema = z.object({
  subject: z.enum(SUBJECTS),
})

export const AnswerSchema = z.object({
  sessionId:      z.string().cuid(),
  questionId:     z.string().cuid(),
  selectedOption: z.number().int().min(0).max(3),
  timeTaken:      z.number().min(0).max(35),
})

export const SubjectParamSchema = z.object({
  subject: z.enum(SUBJECTS),
})
