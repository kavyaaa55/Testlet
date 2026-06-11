import { auth } from '@/auth'
import { db } from '@/lib/db'
import { SUBJECTS, SUBJECT_NAMES } from '@/lib/topicGraph'
import SideNav from '@/components/SideNav'
import TopNav from '@/components/TopNav'
import Footer from '@/components/Footer'
import SubjectCard from '@/components/SubjectCard'
import SignInPrompt from '@/components/SignInPrompt'

export default async function DashboardPage() {
  // Wrap auth() so a transient DB error doesn't crash the page
  const session = await auth().catch(() => null)

  const subjects = await Promise.all(
    SUBJECTS.map(async (subject) => {
      let rating: number | null = null
      let peakRating: number | null = null
      let attempts = 0
      if (session?.user?.id) {
        const sr = await db.subjectRating.findUnique({
          where: { userId_subject: { userId: session.user.id, subject } },
        })
        rating = sr?.rating ?? null
        peakRating = sr?.peakRating ?? null
        attempts = sr?.attempts ?? 0
      }
      return { id: subject, name: SUBJECT_NAMES[subject], rating, peakRating, attempts }
    })
  )

  const [featured, ...rest] = subjects

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 flex flex-col">
        <TopNav />
        <div className="flex-1 p-6 md:p-8 bg-[#edf2f4]">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2b2d42] tracking-tight leading-tight">
              Academic Dashboard
            </h1>
            <p className="text-lg text-[#535f72] mt-2 max-w-2xl">
              Continue your journey through the core pillars of Computer Science. Track your progress and compete with peers.
            </p>
          </div>

          {!session && <SignInPrompt />}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured large card */}
            <div className="md:col-span-8">
              <SubjectCard subject={featured} featured />
            </div>

            {/* Remaining 4 cards */}
            {rest.map((subject) => (
              <div key={subject.id} className="md:col-span-4">
                <SubjectCard subject={subject} />
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
