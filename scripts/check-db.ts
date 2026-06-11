import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Check User table columns
  const userCols = await db.$queryRaw<{column_name: string}[]>`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'User' AND table_schema = 'public'
    ORDER BY column_name
  `
  console.log('User columns:', userCols.map(c => c.column_name).join(', '))

  // Check Account table columns  
  const accountCols = await db.$queryRaw<{column_name: string}[]>`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'Account' AND table_schema = 'public'
    ORDER BY column_name
  `
  console.log('Account columns:', accountCols.map(c => c.column_name).join(', '))

  // Check all tables
  const tables = await db.$queryRaw<{tablename: string}[]>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename
  `
  console.log('Tables:', tables.map(t => t.tablename).join(', '))
}

main().catch(console.error).finally(() => db.$disconnect())
