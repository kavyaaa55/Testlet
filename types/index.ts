// ─── Subject ──────────────────────────────────────────────────────────────────

export type SubjectId = 'os' | 'dbms' | 'oop' | 'cn' | 'sysdesign'

export interface Subject {
  id: SubjectId
  name: string
  rating: number | null
  peakRating: number | null
  attempts: number
}

export interface SubjectDetail {
  subject: SubjectId
  name: string
  topics: TopicInfo[]
  userRating: number | null
  userAttempts: number
  leaderboardPreview: LeaderboardPreviewEntry[]
}

export interface TopicInfo {
  id: string
  name: string
  prerequisites: string[]
  score: number | null
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  topicId: string
}

export interface StartQuizResponse {
  sessionId: string
  currentRating: number
  firstQuestion: QuizQuestion
}

export interface AnswerResponse {
  isCorrect: boolean
  explanation: string
  newRating: number
  ratingDelta: number
  sessionComplete: boolean
  nextQuestion: QuizQuestion | null
}

// ─── Results ──────────────────────────────────────────────────────────────────

export interface ResponseRecord {
  questionId: string
  questionText: string
  topicId: string
  selectedOpt: number
  correctOpt: number
  isCorrect: boolean
  explanation: string
  thetaBefore: number
  thetaAfter: number
}

export interface QuizResult {
  sessionId: string
  subject: SubjectId
  finalRating: number
  ratingDelta: number
  ratingLabel: string
  rank: number | null
  correct: number
  total: number
  weakTopics: string[]
  topicBreakdown: Record<string, { correct: number; total: number }>
  responses: ResponseRecord[]
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  userId: string
  userName: string
  userImage: string | null
  rating: number
  attempts: number
}

export interface LeaderboardPreviewEntry {
  userName: string
  userImage: string | null
  rating: number
}

export interface LeaderboardData {
  subject: SubjectId
  top10: LeaderboardEntry[]
  userRank: { rank: number; rating: number; attempts: number } | null
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
  subjectRatings: Array<{
    subject: SubjectId
    name: string
    rating: number | null
    theta: number | null
    attempts: number
  }>
  recentSessions: Array<{
    id: string
    subject: SubjectId
    finalRating: number
    ratingDelta: number
    correct: number
    totalQ: number
    completedAt: string | null
  }>
}
