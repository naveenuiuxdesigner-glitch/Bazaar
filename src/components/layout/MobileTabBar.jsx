import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Flame, Heart, Home, LayoutGrid, User } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/categories', label: 'Categories', icon: LayoutGrid },
  { to: '/deals', label: 'Deals', icon: Flame },
  { to: '/wishlist', label: 'Wishlist', icon: Heart, count: 'wishlist' },
  { to: '/account', label: 'Account', icon: User },
]

export function MobileTabBar() {
  const { wishlist } = useStore()
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-150 bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 lg:hidden">
      <ul className="mx-auto grid h-16 max-w-[560px] grid-cols-5">
        {tabs.map(({ to, label, icon: Icon, end, count }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={({ isActive }) => `relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${isActive ? 'text-brand-700' : 'text-ink-500'} active:scale-95`}>
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="tab-indicator" className="absolute top-0 h-[3px] w-8 rounded-b-full bg-brand-600" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                  <span className="relative">
                    <Icon className="size-[22px]" strokeWidth={isActive ? 2.25 : 1.75} />
                    {count && wishlist.length > 0 && <span className="absolute -right-1.5 -top-1 size-2 rounded-full bg-deal-500 ring-2 ring-white" />}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
