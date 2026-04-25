import { getRatingTier, ratingToLabel, ratingToColor } from '@/lib/rating'

// Re-export for consumers that imported from here
export { getRatingTier, ratingToLabel as getRatingLabel, ratingToColor }

interface RatingBadgeProps {
  rating: number | null
  peakRating?: number | null
  attempts?: number
  size?: 'sm' | 'md' | 'lg'
  showPeak?: boolean
}

export default function RatingBadge({ rating, peakRating, attempts, size = 'md', showPeak = false }: RatingBadgeProps) {
  if (rating === null) {
    return (
      <div>
        <span className="text-2xl font-bold text-gray-400">—</span>
        <div className="text-sm text-gray-400">Not attempted</div>
      </div>
    )
  }

  const { label, color } = getRatingTier(rating)
  const numSize  = size === 'sm' ? 'text-lg'  : size === 'lg' ? 'text-4xl' : 'text-3xl'
  const lblSize  = size === 'sm' ? 'text-xs'  : size === 'lg' ? 'text-base' : 'text-sm'
  const peakSize = size === 'sm' ? 'text-[10px]' : 'text-xs'

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className={`font-bold font-mono ${numSize}`} style={{ color }}>
          {rating.toLocaleString()}
        </span>
        <span className={`font-semibold ${lblSize}`} style={{ color }}>
          {label}
        </span>
      </div>
      {showPeak && peakRating != null && (
        <div className={`text-gray-400 font-mono mt-0.5 ${peakSize}`}>
          Peak: {peakRating.toLocaleString()}
        </div>
      )}
    </div>
  )
}
