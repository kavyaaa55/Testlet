export interface RatingTier {
  label: string
  color: string
  minRating: number
}

export const RATING_TIERS: RatingTier[] = [
  { label: 'Beginner',   color: '#808080', minRating: 800  },
  { label: 'Novice',     color: '#008000', minRating: 900  },
  { label: 'Apprentice', color: '#03a89e', minRating: 1000 },
  { label: 'Competent',  color: '#0000ff', minRating: 1100 },
  { label: 'Proficient', color: '#aa00aa', minRating: 1200 },
  { label: 'Advanced',   color: '#ff8c00', minRating: 1300 },
  { label: 'Expert',     color: '#ff0000', minRating: 1500 },
  { label: 'Master',     color: '#ff0000', minRating: 1800 },
]

export function getRatingTier(rating: number): RatingTier {
  return [...RATING_TIERS].reverse().find(t => rating >= t.minRating) ?? RATING_TIERS[0]
}

export function ratingToColor(rating: number): string {
  return getRatingTier(rating).color
}

export function ratingToLabel(rating: number): string {
  return getRatingTier(rating).label
}

// 800 → 0.0 | 1000 → 1.0 | 1200 → 2.0 | 1400 → 3.0
export function expectedTheta(rating: number): number {
  return (rating - 800) / 200
}

function kFactor(rating: number): number {
  if (rating < 1000) return 60
  if (rating < 1200) return 45
  if (rating < 1400) return 35
  if (rating < 1600) return 25
  return 20
}

export function calculateRatingChange(
  currentRating: number,
  finalTheta: number,
  startTheta: number,
): number {
  // NOTE: startTheta is unused here — we compute performance from the quiz
  // session's responses in computeRatingUpdate instead (see below).
  void startTheta
  void finalTheta
  return 0 // placeholder; see computeRatingUpdate for the real logic
}

export interface RatingUpdate {
  oldRating: number
  newRating: number
  delta: number
  oldLabel: string
  newLabel: string
  oldColor: string
  newColor: string
  promoted: boolean
  demoted: boolean
  newPeak: boolean
}

export interface SessionQuestion {
  beta: number
  isCorrect: boolean
}

export function computeRatingUpdate(
  currentRating: number,
  currentPeakRating: number,
  finalTheta: number,
  startTheta: number,
  questions: SessionQuestion[],
): RatingUpdate {
  // ── Performance score ───────────────────────────────────────────────────────
  // Each question's difficulty (beta) is a proxy for "expected ability".
  // Performing well on hard questions (high beta) = strong performance.
  // Performing poorly on easy questions (low beta) = weak performance.
  //
  // We compute a "difficulty-weighted accuracy" score:
  //   - Correct on hard questions (high beta) → large positive contribution
  //   - Correct on easy questions (low beta)  → small positive contribution
  //   - Wrong on easy questions  (low beta)  → small negative contribution
  //   - Wrong on hard questions  (high beta)  → large negative contribution
  //
  // Then normalise to [-1, 1] via tanh so deltas are bounded and stable.
  const totalBeta = questions.reduce((sum, q) => sum + q.beta, 0)
  const score = questions.reduce((sum, q) => {
    const weight = q.beta / (totalBeta || 1)
    return sum + (q.isCorrect ? 1 : -1) * weight
  }, 0)
  const normalizedPerf = Math.tanh(score * 2) // ×2 sharpens discrimination

  // ── K-factor (smaller for higher-rated players) ─────────────────────────────
  const k = kFactor(currentRating)
  const delta = Math.round(k * normalizedPerf)
  const newRating = Math.max(800, currentRating + delta)

  const oldTier = getRatingTier(currentRating)
  const newTier = getRatingTier(newRating)

  return {
    oldRating: currentRating,
    newRating,
    delta,
    oldLabel: oldTier.label,
    newLabel: newTier.label,
    oldColor: oldTier.color,
    newColor: newTier.color,
    promoted: newTier.label !== oldTier.label && newRating > currentRating,
    demoted:  newTier.label !== oldTier.label && newRating < currentRating,
    newPeak:  newRating > currentPeakRating,
  }
}
