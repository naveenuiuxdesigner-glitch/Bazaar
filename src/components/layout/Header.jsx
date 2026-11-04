import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Bell, ChevronDown, ChevronRight, CircleHelp, Flame, Heart, LayoutGrid, LogOut, Menu, Package, ShoppingBag, Sparkles, User, X } from 'lucide-react'
import { useAccount, initials } from '../../context/AccountContext'
import { Logo } from './Logo'
import { SearchBar } from './SearchBar'
import { LocationPicker, LocationTrigger } from './LocationPicker'
import { useStore } from '../../context/StoreContext'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import { ProductArt } from '../art/ProductArt'
import { Overlay } from '../overlay/Overlay'
import { useClickOutside, useScrollDirection } from '../../hooks/useUi'
import { formatPrice } from '../../lib/format'
import { photo } from '../../data/photos'
import { Photo } from '../ui/Photo'

const NAV = ['mobiles', 'electronics', 'laptops', 'tvs', 'gaming', 'fashion', 'footwear', 'beauty', 'home', 'kitchen', 'appliances', 'grocery']

function CountBadge({ n }) {
  return (
    <AnimatePresence>
      {n > 0 && (
        <motion.span
          key={n}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 18 }}
          className="absolute -right-2.5 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[10.5px] font-bold leading-none text-white ring-2 ring-white num"
        >
          {n > 99 ? '99+' : n}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/** Shopping bag that gives a small bump whenever the cart count changes, confirming the add from anywhere. */
function BagIcon({ count, className }) {
  const [mounted] = useState(count) // no bump for the count we mounted with
  return (
    <motion.span key={count} className="block" initial={count === mounted ? false : { rotate: -14, scale: 1.18 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 12 }}>
      <ShoppingBag className={className} />
    </motion.span>
  )
}

function AccountMenu() {
  const { user, unread, signOut } = useAccount()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timer = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)
  const links = [
    { to: '/account', label: 'Your account', icon: User },
    { to: '/orders', label: 'Orders & returns', icon: Package },
    { to: '/wishlist', label: 'Wishlist', icon: Heart },
    { to: '/notifications', label: 'Notifications', icon: Bell, count: unread },
    { to: '/plus', label: 'Bazaar Plus', icon: Sparkles },
    { to: '/help', label: 'Help & support', icon: CircleHelp },
  ]
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearTimeout(timer.current)
        setOpen(true)
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => setOpen(false), 140)
      }}
    >
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" className="flex h-12 items-center gap-2 rounded-lg px-2.5 text-left transition-colors hover:bg-ink-100">
        <span className="relative">
          <User className="size-5 text-ink-800" />
          {user && unread > 0 && <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-brand-600 ring-2 ring-white" aria-label={`${unread} unread notifications`} />}
        </span>
        <span className="hidden leading-tight xl:block">
          <span className="block text-[11px] text-ink-500">{user ? `Hello, ${user.name.split(' ')[0]}` : 'Hello, sign in'}</span>
          <span className="flex items-center gap-0.5 text-[13px] font-semibold text-ink-950">
            Account <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 top-[calc(100%+4px)] z-50 w-64 rounded-xl bg-white p-2 shadow-pop ring-1 ring-ink-950/5"
          >
            {user ? (
              <div className="flex items-center gap-3 px-3 pb-3 pt-2">
                <span className="grid size-10 place-items-center rounded-full bg-ink-950 font-display text-sm font-bold text-white">{initials(user.name)}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-950">{user.name}</p>
                  <p className="truncate text-xs text-ink-500">{user.plus ? 'Bazaar Plus member' : user.email}</p>
                </div>
              </div>
            ) : (
              <div className="px-3 pb-3 pt-2">
                <Link to="/login" role="menuitem" onClick={() => setOpen(false)} className="flex h-10 items-center justify-center rounded-md bg-ink-950 text-sm font-semibold text-white hover:bg-ink-800">
                  Sign in
                </Link>
                <p className="mt-2 text-center text-xs text-ink-500">
                  New here?{' '}
                  <Link to="/signup" onClick={() => setOpen(false)} className="font-semibold text-ink-900 underline underline-offset-2">
                    Create an account
                  </Link>
                </p>
              </div>
            )}
            <div className="border-t border-ink-150 pt-1.5">
              {links.map(({ to, label, icon: Icon, count }) => (
                <Link key={to} to={to} role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-800 hover:bg-ink-100 hover:text-ink-950">
                  <Icon className="size-4 text-ink-500" /> <span className="flex-1">{label}</span>
                  {user && count > 0 && <span className="rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white num">{count}</span>}
                </Link>
              ))}
              {user && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false)
                    signOut()
                  }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-800 hover:bg-ink-100 hover:text-ink-950"
                >
                  <LogOut className="size-4 text-ink-500" /> Sign out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MegaMenu({ open, onClose }) {
  const [active, setActive] = useState(categories[0].slug)
  const cat = categories.find((c) => c.slug === active)
  const inCat = products.filter((p) => p.category === active)
  const featured = [...inCat].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 3)
  const brands = [...new Set(inCat.map((p) => p.brand))].slice(0, 10)
  const pic = photo(`cat-${active}`)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-x-0 top-full z-40 border-b border-ink-150 bg-white/95 shadow-pop backdrop-blur-xl"
        >
          <div className="container-page grid grid-cols-[230px_1fr_290px] gap-8 py-6">
            <ul className="-ml-3 max-h-[460px] overflow-y-auto pr-2" aria-label="Categories">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/c/${c.slug}`}
                    onMouseEnter={() => setActive(c.slug)}
                    onFocus={() => setActive(c.slug)}
                    onClick={onClose}
                    className={`relative flex items-center justify-between rounded-lg px-3 py-[7px] text-sm transition-colors ${active === c.slug ? 'font-semibold text-brand-700' : 'text-ink-700 hover:text-ink-950'}`}
                  >
                    {active === c.slug && <motion.span layoutId="mega-active" className="absolute inset-0 rounded-lg bg-brand-50" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                    <span className="relative">{c.name}</span>
                    {active === c.slug && <ChevronRight className="relative size-4" />}
                  </Link>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.16 }} className="grid content-start gap-6">
                <Link to={`/c/${cat.slug}`} onClick={onClose} className="group relative flex h-36 items-end overflow-hidden rounded-2xl p-5 text-white" style={{ backgroundColor: cat.tint }}>
                  {pic && <Photo src={pic.src} className="absolute inset-0" imgClassName="group-hover:scale-105" />}
                  <span className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/40 to-transparent" aria-hidden />
                  <span className="relative">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{inCat.length} products</span>
                    <span className="mt-1 flex items-center gap-2 font-display text-2xl font-extrabold tracking-[-0.03em]">
                      Shop {cat.name}
                      <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
                <div className="grid grid-cols-[1fr_1.2fr] gap-8">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Browse</p>
                    <ul className="mt-3 space-y-2">
                      {cat.subs.map((sub) => (
                        <li key={sub}>
                          <Link to={`/c/${cat.slug}?sub=${encodeURIComponent(sub)}`} onClick={onClose} className="group inline-flex items-center gap-1 text-sm text-ink-800 transition-colors hover:text-brand-700">
                            {sub}
                            <ChevronRight className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Featured brands</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {brands.map((b) => (
                        <li key={b}>
                          <Link to={`/brand/${encodeURIComponent(b)}`} onClick={onClose} className="inline-flex h-8 items-center rounded-full bg-ink-100 px-3 text-[13px] font-medium text-ink-800 transition-colors hover:bg-ink-950 hover:text-white">
                            {b}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-500">Popular right now</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }} className="mt-3 space-y-2">
                  {featured.map((p) => (
                    <li key={p.id}>
                      <Link to={`/p/${p.id}`} onClick={onClose} className="group flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-ink-50">
                        <span className="size-16 shrink-0 overflow-hidden rounded-lg bg-studio">
                          <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full p-1 transition-transform duration-500 group-hover:scale-110" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-500">{p.brand}</span>
                          <span className="line-clamp-2 text-[13px] leading-[18px] text-ink-800 group-hover:text-ink-950">{p.title}</span>
                          <span className="text-[13px] font-bold text-ink-950 num">{formatPrice(p.price)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MobileMenu({ open, onClose }) {
  const { user, unread, signOut } = useAccount()
  return (
    <Overlay open={open} onClose={onClose} label="Menu" variant="drawer-left">
      <div className="flex items-center justify-between border-b border-ink-150 px-4 py-3">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center rounded-full text-ink-600 hover:bg-ink-100">
          <X className="size-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {user ? (
          <Link to="/account" onClick={onClose} className="flex items-center gap-3 border-b border-ink-150 px-4 py-4">
            <span className="grid size-10 place-items-center rounded-full bg-ink-950 font-display text-sm font-bold text-white">{initials(user.name)}</span>
            <span className="flex-1">
              <span className="block text-sm font-semibold">Hello, {user.name.split(' ')[0]}</span>
              <span className="block text-xs text-ink-500">View your account</span>
            </span>
            <ChevronRight className="size-4 text-ink-400" />
          </Link>
        ) : (
          <div className="flex gap-2.5 border-b border-ink-150 px-4 py-4">
            <Link to="/login" onClick={onClose} className="flex h-10 flex-1 items-center justify-center rounded-md bg-ink-950 text-sm font-semibold text-white">
              Sign in
            </Link>
            <Link to="/signup" onClick={onClose} className="flex h-10 flex-1 items-center justify-center rounded-md text-sm font-semibold ring-1 ring-inset ring-ink-200">
              Create account
            </Link>
          </div>
        )}
        <p className="px-4 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500">Shop by category</p>
        <ul className="px-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/c/${c.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-md px-2 py-2 text-[15px] text-ink-800 active:bg-ink-100">
                <span className="size-10 overflow-hidden rounded-lg" style={{ backgroundColor: c.tint }}>
                  {photo(`cat-${c.slug}`) ? (
                    <img src={photo(`cat-${c.slug}`).src} alt="" loading="lazy" className="size-full object-cover" />
                  ) : (
                    <ProductArt kind={c.art} color={catColor(c.slug)} tint={c.tint} fallback="illustration" className="size-full" title="" />
                  )}
                </span>
                <span className="flex-1">{c.name}</span>
                <ChevronRight className="size-4 text-ink-300" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-ink-150 px-2 py-3">
          {[
            ['/orders', 'Orders & returns', Package],
            ['/notifications', 'Notifications', Bell],
            ['/plus', 'Bazaar Plus', Sparkles],
            ['/help', 'Help & support', CircleHelp],
          ].map(([to, label, Icon]) => (
            <Link key={to} to={to} onClick={onClose} className="flex items-center gap-3 rounded-md px-2 py-2.5 text-[15px] text-ink-800 active:bg-ink-100">
              <Icon className="size-5 text-ink-500" /> <span className="flex-1">{label}</span>
              {to === '/notifications' && user && unread > 0 && <span className="rounded-full bg-brand-600 px-1.5 text-[11px] font-bold text-white num">{unread}</span>}
            </Link>
          ))}
          {user && (
            <button
              type="button"
              onClick={() => {
                onClose()
                signOut()
              }}
              className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-[15px] text-ink-800 active:bg-ink-100"
            >
              <LogOut className="size-5 text-ink-500" /> Sign out
            </button>
          )}
        </div>
      </div>
    </Overlay>
  )
}

export const catColor = (slug) =>
  ({
    mobiles: '#3B4A7A',
    electronics: '#2E2F33',
    laptops: '#9EA3A8',
    tvs: '#1A1B1F',
    gaming: '#ECEBE8',
    fashion: '#C9A27C',
    footwear: '#E4502F',
    beauty: '#E9B45A',
    home: '#2A2B2D',
    furniture: '#2B2D30',
    kitchen: '#2D2E31',
    appliances: '#C7C9CC',
    grocery: '#3A1E14',
    sports: '#2B2C2F',
    books: '#1F4F8C',
    toys: '#C8102E',
    baby: '#E9F1F5',
    automotive: '#1F2022',
    travel: '#253A5E',
    pets: '#F2C230',
  })[slug] ?? '#9a9b93'

export function Header() {
  const { totals, wishlist, setCartOpen } = useStore()
  const [locOpen, setLocOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [menu, setMenu] = useState(false)
  const megaTimer = useRef(null)
  const { dir, past, scrolled } = useScrollDirection(160)
  const collapsed = dir === 'down' && past && !mega
  const { pathname } = useLocation()

  useEffect(() => {
    setMega(false)
  }, [pathname])

  // The header is fixed so collapsing rows never shifts page layout (which would fight scroll anchoring).
  // A spacer keeps the expanded height reserved in the document flow.
  const headerRef = useRef(null)
  const [spacer, setSpacer] = useState(0)
  const collapsedRef = useRef(collapsed)
  useEffect(() => {
    collapsedRef.current = collapsed
  }, [collapsed])
  useLayoutEffect(() => {
    const measure = () => {
      if (!collapsedRef.current && headerRef.current) setSpacer(headerRef.current.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Lets sticky page toolbars sit right under the header as it collapses.
  useEffect(() => {
    if (spacer) document.documentElement.style.setProperty('--header-h', `${spacer - (collapsed ? 56 : 0)}px`)
  }, [collapsed, spacer])

  const openMega = () => {
    clearTimeout(megaTimer.current)
    megaTimer.current = setTimeout(() => setMega(true), 80)
  }
  const closeMega = () => {
    clearTimeout(megaTimer.current)
    megaTimer.current = setTimeout(() => setMega(false), 160)
  }

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-md bg-ink-950 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? 'bg-white/80 shadow-header backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/72' : 'bg-white'}`}>
        {/* Desktop */}
        <div className="hidden lg:block">
          <motion.div initial={false} animate={{ height: collapsed ? 60 : 72 }} transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }} className="container-page flex items-center gap-3 xl:gap-5">
            <Logo className="mr-2 shrink-0" />
            <LocationTrigger onOpen={() => setLocOpen(true)} />
            <SearchBar className="mx-2 min-w-0 flex-1" />
            <nav aria-label="Your shortcuts" className="flex shrink-0 items-center gap-0.5">
              <AccountMenu />
              <Link to="/wishlist" className="relative grid size-12 place-items-center rounded-lg text-ink-800 transition-colors hover:bg-ink-100" aria-label={`Wishlist, ${wishlist.length} items`}>
                <span className="relative">
                  <Heart className="size-5" />
                  <CountBadge n={wishlist.length} />
                </span>
              </Link>
              <button type="button" onClick={() => setCartOpen(true)} className="relative ml-1 flex h-11 items-center gap-2.5 rounded-xl bg-ink-950 pl-3.5 pr-4 text-white transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.97]" aria-label={`Cart, ${totals.count} items`}>
                <span className="relative">
                  <BagIcon count={totals.count} className="size-5" />
                  <CountBadge n={totals.count} />
                </span>
                <span className="text-sm font-semibold num">{totals.count > 0 ? formatPrice(totals.total) : 'Cart'}</span>
              </button>
            </nav>
          </motion.div>

          <motion.div initial={false} animate={{ height: collapsed ? 0 : 44, opacity: collapsed ? 0 : 1 }} transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
            <div className="container-page flex h-11 items-center gap-1 text-[13.5px]">
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  type="button"
                  onClick={() => setMega((m) => !m)}
                  aria-expanded={mega}
                  className={`-ml-2.5 flex h-9 items-center gap-2 rounded-lg px-3 font-semibold transition-colors ${mega ? 'bg-brand-600 text-white' : 'text-ink-950 hover:bg-ink-100'}`}
                >
                  <LayoutGrid className="size-4" /> All categories
                  <ChevronDown className={`size-3.5 transition-transform duration-200 ${mega ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <span className="mx-2 h-4 w-px bg-ink-200" aria-hidden />
              <nav aria-label="Categories" className="scrollbar-none flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
                {NAV.map((slug) => {
                  const c = categories.find((x) => x.slug === slug)
                  return (
                    <NavLink key={slug} to={`/c/${slug}`} className={({ isActive }) => `relative shrink-0 rounded-md px-2.5 py-1.5 transition-colors ${isActive ? 'font-semibold text-ink-950' : 'text-ink-700 hover:bg-ink-100 hover:text-ink-950'}`}>
                      {({ isActive }) => (
                        <>
                          {c.name}
                          {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-2.5 -bottom-[5px] h-[2px] rounded-full bg-brand-600" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </nav>
              <div className="flex shrink-0 items-center gap-1">
                <NavLink to="/deals" className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-semibold text-deal-700 hover:bg-deal-50">
                  <Flame className="size-4" /> Today’s deals
                </NavLink>
                <NavLink to="/help" className="rounded-md px-2.5 py-1.5 text-ink-700 hover:bg-ink-100 hover:text-ink-950">
                  Help
                </NavLink>
              </div>
            </div>
          </motion.div>
          <div onMouseEnter={() => clearTimeout(megaTimer.current)} onMouseLeave={closeMega} className="relative">
            <MegaMenu open={mega} onClose={() => setMega(false)} />
          </div>
        </div>

        {/* Mobile & tablet */}
        <div className="lg:hidden">
          <motion.div initial={false} animate={{ height: collapsed ? 0 : 56 }} transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
            <div className="container-page flex h-14 items-center gap-1">
              <button type="button" onClick={() => setMenu(true)} aria-label="Open menu" className="-ml-2 grid size-10 place-items-center rounded-full text-ink-900 active:bg-ink-100">
                <Menu className="size-[22px]" />
              </button>
              <Logo className="ml-0.5" />
              <div className="ml-auto flex items-center">
                <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative grid size-10 place-items-center rounded-full text-ink-900 active:bg-ink-100">
                  <span className="relative">
                    <Heart className="size-[22px]" />
                    <CountBadge n={wishlist.length} />
                  </span>
                </Link>
                <button type="button" onClick={() => setCartOpen(true)} aria-label={`Cart, ${totals.count} items`} className="relative -mr-2 grid size-11 place-items-center rounded-full text-ink-900 active:bg-ink-100">
                  <span className="relative">
                    <BagIcon count={totals.count} className="size-[22px]" />
                    <CountBadge n={totals.count} />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
          <div className="container-page pb-2.5">
            <SearchBar size="md" />
          </div>
          <div className="border-t border-ink-150 bg-ink-50">
            <div className="container-page flex h-10 items-center">
              <LocationTrigger variant="bar" onOpen={() => setLocOpen(true)} />
            </div>
          </div>
        </div>
        <div className="h-px bg-ink-150" />
      </header>
      <div aria-hidden style={spacer ? { height: spacer } : undefined} className="h-[152px] shrink-0 lg:h-[117px]" />

      <AnimatePresence>{mega && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-30 hidden bg-ink-950/25 backdrop-blur-[2px] lg:block" aria-hidden onClick={() => setMega(false)} />}</AnimatePresence>
      <LocationPicker open={locOpen} onClose={() => setLocOpen(false)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </>
  )
}
