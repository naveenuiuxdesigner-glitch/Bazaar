import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const base =
  'inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,color,box-shadow,transform,border-color] duration-200 ease-out-soft active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-45 disabled:saturate-50'

// Hierarchy: primary (electric blue) is the one action per view; dark is for strong secondary actions;
// deal is reserved for offer CTAs; secondary/ghost/soft for everything else.
const variants = {
  primary: 'bg-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_1px_2px_rgb(11_18_32/0.12)] hover:bg-brand-700 hover:shadow-glow',
  dark: 'bg-ink-950 text-white hover:bg-ink-800 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]',
  deal: 'bg-deal-600 text-white hover:bg-deal-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.16)]',
  secondary: 'bg-white text-ink-900 ring-1 ring-inset ring-ink-200 hover:ring-ink-300 hover:bg-ink-50',
  ghost: 'text-ink-800 hover:bg-ink-100',
  soft: 'bg-ink-100 text-ink-900 hover:bg-ink-150',
  link: 'text-ink-900 underline decoration-ink-300 underline-offset-4 hover:decoration-brand-600 hover:text-brand-700 px-0! h-auto!',
}

const sizes = {
  sm: 'h-8 px-3 text-[13px] rounded-lg',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-5 text-[15px] rounded-xl',
}

export const Button = forwardRef(function Button({ as, to, variant = 'primary', size = 'md', className = '', ...props }, ref) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link ref={ref} to={to} className={cls} {...props} />
  const Comp = as ?? 'button'
  return <Comp ref={ref} className={cls} {...(Comp === 'button' ? { type: props.type ?? 'button' } : {})} {...props} />
})

export const IconButton = forwardRef(function IconButton({ label, className = '', children, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={`inline-grid size-10 place-items-center rounded-full text-ink-800 transition-colors duration-150 hover:bg-ink-100 active:scale-95 active:bg-ink-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})
