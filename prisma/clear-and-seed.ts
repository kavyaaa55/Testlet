import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

interface QuestionData {
  topicId: string
  subject: string
  tag: string
  text: string
  options: string[]
  answer: number
  explanation: string
  beta: number
}

async function main() {
  console.log('Clearing all data...')

  // Clear in correct order respecting foreign keys
  await db.response.deleteMany({})
  await db.userQuestionHistory.deleteMany({})
  await db.quizSession.deleteMany({})
  await db.question.deleteMany({})
  await db.topicScore.deleteMany({})
  await db.subjectRating.deleteMany({})
  await db.leaderboardEntry.deleteMany({})
  await db.account.deleteMany({})
  await db.session.deleteMany({})
  await db.verificationToken.deleteMany({})
  await db.user.deleteMany({})

  console.log('All data cleared.')

  // Read and seed new questions
  const fs = require('fs')
  const path = require('path')

  const questionsData = fs.readFileSync(
    path.join(__dirname, '..', 'questions.json'),
    'utf-8'
  )
  const questions: QuestionData[] = JSON.parse(questionsData)

  console.log(`Seeding ${questions.length} questions...`)

  await db.question.createMany({
    data: questions.map(q => ({
      topicId: q.topicId,
      subject: q.subject,
      tag: q.tag,
      text: q.text,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      beta: q.beta,
    })),
  })

  console.log(`Seeded ${questions.length} questions successfully.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
