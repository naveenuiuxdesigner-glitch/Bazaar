import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from './Motion'

// Eyebrow tone tells the reader what kind of section this is: brand (blue) for shopping, violet for
// personal/curated, deal (coral) for offers.
const TONES = { brand: 'text-brand-600', violet: 'text-violet-600', deal: 'text-deal-600' }

export function SectionHeader({ eyebrow, title, subtitle, action, to, children, id, tone = 'brand' }) {
  return (
    <Reveal y={16} className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
      <div className="min-w-0">
        {eyebrow && <p className={`mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] ${TONES[tone]}`}>{eyebrow}</p>}
        <h2 id={id} className="font-display text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink-950 sm:text-[32px]">
          {title}
        </h2>
        {subtitle && <p className="mt-1.5 text-sm text-ink-500 sm:text-[15px]">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {children}
        {to && (
          <Link to={to} className="group inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 transition-[background-color,color,box-shadow] duration-200 hover:bg-ink-950 hover:text-white hover:ring-ink-950">
            <span className="sm:hidden">See all</span>
            <span className="hidden sm:inline">{action ?? 'View all'}</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  )
}
