import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()
async function main() {
  const updated = await db.question.updateMany({
    where: { subject: 'oops' },
    data: { subject: 'oop' },
  })
  console.log(`Updated ${updated.count} questions from 'oops' to 'oop'`)
}
main().catch(console.error).finally(() => db.$disconnect())
