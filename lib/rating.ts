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
  const expected = expectedTheta(currentRating)
  const thetaVsExpected = finalTheta - expected
  const k = kFactor(currentRating)
  const normalizedPerf = Math.tanh(thetaVsExpected)
  const rawDelta = Math.round(k * normalizedPerf)
  const newRating = Math.max(800, currentRating + rawDelta)
  return newRating - currentRating
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

export function computeRatingUpdate(
  currentRating: number,
  currentPeakRating: number,
  finalTheta: number,
  startTheta: number,
): RatingUpdate {
  const delta = calculateRatingChange(currentRating, finalTheta, startTheta)
  const newRating = currentRating + delta

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
