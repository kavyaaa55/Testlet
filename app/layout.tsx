import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'GoQuiz — CS Knowledge Assessment',
  description: 'IRT-based adaptive quizzing across OS, DBMS, OOP, CN, and System Design',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Lexend:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-[Lexend] text-[#1c1b1d] bg-[#fcf8fa]">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
