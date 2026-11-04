import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { GitCompareArrows, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { productById } from '../../data/products'
import { ProductArt } from '../art/ProductArt'

// The tray only appears where shoppers pick products to compare.
const SHOWN_ON = ['/c/', '/brand/', '/search', '/deals', '/wishlist', '/recently-viewed', '/p/']
export const compareBarVisible = (pathname, count) => count > 0 && (pathname === '/' || SHOWN_ON.some((p) => pathname.startsWith(p)))

/** Floating tray that collects products picked for comparison. */
export function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useStore()
  const { pathname } = useLocation()
  const items = compare.map((id) => productById[id]).filter(Boolean)
  const show = compareBarVisible(pathname, items.length)
  const mobileOffset = pathname.startsWith('/p/')
    ? 'bottom-[calc(140px+env(safe-area-inset-bottom))]'
    : 'bottom-[calc(72px+env(safe-area-inset-bottom))]'
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }} className={`fixed inset-x-0 ${mobileOffset} z-40 px-4 lg:bottom-6`}>
          <div className="mx-auto flex max-w-[720px] items-center gap-3 rounded-xl bg-ink-950 p-2.5 pl-4 text-white shadow-pop">
            <GitCompareArrows className="hidden size-5 shrink-0 text-white/70 sm:block" />
            <ul className="flex min-w-0 flex-1 gap-2">
              {items.map((p) => (
                <li key={p.id} className="relative">
                  <span className="block size-11 overflow-hidden rounded-md bg-studio">
                    <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full p-0.5" />
                  </span>
                  <button type="button" onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.title} from compare`} className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-white text-ink-950 shadow">
                    <X className="size-3" strokeWidth={3} />
                  </button>
                </li>
              ))}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <li key={i} className="hidden size-11 rounded-md border border-dashed border-white/25 sm:block" aria-hidden />
              ))}
            </ul>
            <button type="button" onClick={clearCompare} className="hidden text-[13px] font-medium text-white/70 hover:text-white sm:block">
              Clear
            </button>
            <Link to="/compare" className={`inline-flex h-10 shrink-0 items-center rounded-md px-4 text-sm font-semibold ${items.length > 1 ? 'bg-white text-ink-950 hover:bg-ink-100' : 'pointer-events-none bg-white/15 text-white/60'}`} aria-disabled={items.length < 2}>
              {items.length > 1 ? `Compare ${items.length}` : 'Add one more'}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
