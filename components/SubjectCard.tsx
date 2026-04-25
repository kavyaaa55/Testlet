import Link from 'next/link'
import RatingBadge from './RatingBadge'
import type { Subject } from '@/types'

const SUBJECT_IMAGES: Record<string, string> = {
  os:        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  dbms:      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  oop:       'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  cn:        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
  sysdesign: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
}

interface SubjectCardProps {
  subject: Subject
  featured?: boolean
}

export default function SubjectCard({ subject, featured = false }: SubjectCardProps) {
  const imgSrc = SUBJECT_IMAGES[subject.id] ?? SUBJECT_IMAGES.os

  if (featured) {
    return (
      <div className="group bg-white border border-[#d1dce5] rounded-xl overflow-hidden hover:border-[#ef233c] hover:shadow-[0px_4px_20px_rgba(43,45,66,0.08)] transition-all duration-300">
        <div className="relative h-48 md:h-64 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={subject.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d42]/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-2">
              Core Requirement
            </span>
            <h3 className="text-white text-3xl font-bold">{subject.name}</h3>
          </div>
        </div>
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <RatingBadge rating={subject.rating} peakRating={subject.peakRating} attempts={subject.attempts} size="md" showPeak />
          <Link
            href={`/subjects/${subject.id}`}
            className="w-full md:w-auto px-6 py-3 bg-[#2b2d42] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all active:scale-95 text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white border border-[#d1dce5] rounded-xl overflow-hidden hover:border-[#ef233c] hover:shadow-[0px_4px_20px_rgba(43,45,66,0.08)] transition-all duration-300 flex flex-col">
      <div className="h-40 bg-[#f0edef] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt={subject.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#2b2d42] mb-3">{subject.name}</h3>
          <RatingBadge rating={subject.rating} peakRating={subject.peakRating} attempts={subject.attempts} size="sm" showPeak />
        </div>
        <Link
          href={`/subjects/${subject.id}`}
          className="mt-6 w-full py-3 border border-[#d1dce5] text-[#2b2d42] text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
