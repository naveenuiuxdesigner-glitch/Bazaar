import { Star } from 'lucide-react'
import { formatCount } from '../../lib/format'

export function Rating({ value, count, size = 'sm' }) {
  const sm = size === 'sm'
  return (
    <div className={`flex items-center gap-1 ${sm ? 'text-xs' : 'text-sm'}`} aria-label={`Rated ${value} out of 5 from ${count?.toLocaleString('en-IN')} reviews`}>
      <Star className={`${sm ? 'size-3.5' : 'size-4'} fill-star text-star`} strokeWidth={0} aria-hidden />
      <span className="font-semibold text-ink-900 num">{value.toFixed(1)}</span>
      {count != null && <span className="text-ink-500 num">({formatCount(count)})</span>}
    </div>
  )
}
