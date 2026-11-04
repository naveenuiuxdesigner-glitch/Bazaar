import { AnimatePresence, motion } from 'framer-motion'
import { Check, Heart, Undo2, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { compareBarVisible } from '../product/CompareBar'
import { productById } from '../../data/products'
import { ProductArt } from '../art/ProductArt'

export function Toaster() {
  const { toasts, dismissToast, setCartOpen, compare } = useStore()
  const { pathname } = useLocation()
  // Sit above the compare tray, and above the purchase bars on product, cart and checkout pages.
  const lifted = compareBarVisible(pathname, compare.length) || /^\/(p\/|cart|checkout)/.test(pathname)
  return (
    <div aria-live="polite" className={`pointer-events-none fixed inset-x-0 z-[90] flex flex-col items-center gap-2 px-4 ${lifted ? 'bottom-[calc(140px+env(safe-area-inset-bottom))] lg:bottom-24' : 'bottom-[calc(76px+env(safe-area-inset-bottom))] md:bottom-6'}`}>
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const p = t.productId ? productById[t.productId] : null
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.16 } }}
              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
              className="pointer-events-auto flex w-full max-w-[380px] items-center gap-3 rounded-2xl bg-ink-950/95 p-2 pr-2 text-white shadow-pop ring-1 ring-white/10 backdrop-blur-xl"
              role="status"
            >
              {p ? (
                <div className="size-11 shrink-0 overflow-hidden rounded-xl bg-studio">
                  <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full" />
                </div>
              ) : (
                <span className="grid size-11 place-items-center">
                  <Check className="size-5" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  {t.kind === 'cart' && <Check className="size-4 text-save-100" strokeWidth={3} />}
                  {t.kind === 'wish' && <Heart className="size-3.5 fill-deal-400 text-deal-400" />}
                  {t.title}
                </p>
                {p && <p className="truncate text-xs text-white/65">{p.title}</p>}
              </div>
              {t.kind === 'cart' && (
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(true)
                    dismissToast(t.id)
                  }}
                  className="h-8 shrink-0 rounded-lg bg-brand-600 px-3 text-[13px] font-semibold text-white transition-colors hover:bg-brand-500"
                >
                  View cart
                </button>
              )}
              {t.kind === 'undo' && (
                <button
                  type="button"
                  onClick={() => {
                    t.onUndo?.()
                    dismissToast(t.id)
                  }}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md bg-white/10 px-3 text-[13px] font-semibold hover:bg-white/20"
                >
                  <Undo2 className="size-3.5" /> Undo
                </button>
              )}
              <button type="button" onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="grid size-8 shrink-0 place-items-center rounded-md text-white/60 hover:bg-white/10 hover:text-white">
                <X className="size-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
