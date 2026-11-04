import { useId } from 'react'
import { Link } from 'react-router-dom'

export function Logo({ className = '', inverted = false }) {
  const grad = useId()
  return (
    <Link to="/" aria-label="BAZAAR home" className={`group inline-flex items-center gap-2 rounded-md ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0 transition-transform duration-300 ease-out-soft group-hover:-rotate-6" aria-hidden>
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3461FF" />
            <stop offset="1" stopColor="#7C4DFF" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={inverted ? '#fff' : `url(#${grad})`} />
        <path d="M10 8h7.2c3.3 0 5.3 1.7 5.3 4.3 0 1.7-.9 3-2.4 3.6 1.9.6 3.1 2 3.1 4 0 2.9-2.2 4.6-5.8 4.6H10V8Zm4 6.6h2.6c1.4 0 2.1-.6 2.1-1.6s-.7-1.6-2.1-1.6H14v3.2Zm0 6.6h3c1.5 0 2.3-.6 2.3-1.8 0-1.1-.8-1.8-2.3-1.8h-3v3.6Z" fill={inverted ? '#0B1220' : '#fff'} />
        <circle cx="25" cy="24" r="2.5" fill={inverted ? '#3461FF' : '#3FD8FF'} />
      </svg>
      <span className={`font-display text-[21px] font-extrabold leading-none tracking-[-0.045em] ${inverted ? 'text-white' : 'text-ink-950'}`}>
        bazaar<span className={inverted ? 'text-brand-400' : 'text-brand-500'}>.</span>
      </span>
    </Link>
  )
}
