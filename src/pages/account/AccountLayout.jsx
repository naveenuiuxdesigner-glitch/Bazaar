import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Bell, ChevronLeft, CreditCard, Heart, History, KeyRound, LayoutDashboard, LifeBuoy, LogOut, MapPin, Package, Sparkles, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAccount, initials } from '../../context/AccountContext'

export const ACCOUNT_NAV = [
  { to: '/account', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/orders', label: 'Orders & returns', icon: Package },
  { to: '/account/profile', label: 'Profile', icon: UserRound },
  { to: '/account/addresses', label: 'Addresses', icon: MapPin },
  { to: '/account/payments', label: 'Saved payments', icon: CreditCard },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/recently-viewed', label: 'Recently viewed', icon: History },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/plus', label: 'Bazaar Plus', icon: Sparkles },
  { to: '/account/security', label: 'Login & security', icon: KeyRound },
  { to: '/help', label: 'Help & support', icon: LifeBuoy },
]

export default function AccountLayout() {
  const { user, signOut, unread } = useAccount()
  const { pathname } = useLocation()
  const sub = pathname !== '/account'
  return (
    <div className="container-page pt-6 lg:pt-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-36">
            <div className="flex items-center gap-3 px-3">
              <span className="grid size-11 place-items-center rounded-full bg-ink-950 font-display text-sm font-bold text-white">{initials(user.name)}</span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink-950">{user.name}</p>
                <p className="truncate text-xs text-ink-500">{user.plus ? 'Bazaar Plus member' : user.email}</p>
              </div>
            </div>
            <nav aria-label="Account" className="mt-5 space-y-0.5">
              {ACCOUNT_NAV.map(({ to, label, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isActive ? 'bg-ink-100 font-semibold text-ink-950' : 'text-ink-700 hover:bg-ink-50 hover:text-ink-950'}`}>
                  <Icon className="size-[18px] text-ink-500" />
                  <span className="flex-1">{label}</span>
                  {to === '/notifications' && unread > 0 && <span className="rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white num">{unread}</span>}
                </NavLink>
              ))}
              <button type="button" onClick={signOut} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-700 hover:bg-ink-50 hover:text-ink-950">
                <LogOut className="size-[18px] text-ink-500" /> Sign out
              </button>
            </nav>
          </div>
        </aside>
        <div className="min-w-0">
          {sub && (
            <Link to="/account" className="mb-4 inline-flex items-center gap-1 text-[13px] font-medium text-ink-600 hover:text-ink-950 lg:hidden">
              <ChevronLeft className="size-4" /> Account
            </Link>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export function PageTitle({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
