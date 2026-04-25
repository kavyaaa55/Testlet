// IRT (Item Response Theory) — all core functions

// Probability user answers correctly given ability (theta) and question difficulty (beta)
export function pCorrect(theta: number, beta: number): number {
  return 1 / (1 + Math.exp(-(theta - beta)))
}

// Update theta after one answer — online gradient step (equivalent to streaming MLE)
export function updateTheta(
  theta: number,
  beta: number,
  isCorrect: boolean,
  learningRate: number = 0.3
): number {
  const p = pCorrect(theta, beta)
  const response = isCorrect ? 1 : 0
  const newTheta = theta + learningRate * (response - p)
  return Math.max(-4, Math.min(4, newTheta))
}

// Fisher information: how much does this question tell us about user's ability?
// Peaks when beta ≈ theta (question difficulty matches user ability)
export function fisherInfo(theta: number, beta: number): number {
  const p = pCorrect(theta, beta)
  return p * (1 - p)
}

// Convert IRT theta (-4 to +4) to display rating (0 to 100)
export function thetaToRating(theta: number): number {
  return Math.round(((theta + 4) / 8) * 100)
}

// Convert display rating (0 to 100) back to theta (-4 to +4)
export function ratingToTheta(rating: number): number {
  return (rating / 100) * 8 - 4
}

// Rating label for display
export function ratingLabel(rating: number): string {
  if (rating <= 25) return 'Beginner'
  if (rating <= 45) return 'Basic'
  if (rating <= 65) return 'Intermediate'
  if (rating <= 85) return 'Advanced'
  return 'Expert'
}
