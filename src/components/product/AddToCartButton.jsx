import { useEffect, useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../context/StoreContext'
import { productById } from '../../data/products'
import { productSizeOptions } from '../../lib/productOptions'

/** Primary add-to-cart control with an inline confirmation state. */
export function AddToCartButton({ id, size, color, variant = 'full', className = '', disabled, onAdded }) {
  const { addToCart, inCart, openQuickView } = useStore()
  const [justAdded, setJustAdded] = useState(false)
  useEffect(() => {
    if (!justAdded) return
    const t = setTimeout(() => setJustAdded(false), 1600)
    return () => clearTimeout(t)
  }, [justAdded])

  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const product = productById[id]
    if ((productSizeOptions(product).length && !size) || (Object.keys(product?.colorGalleries ?? {}).length > 1 && !color)) {
      openQuickView(id)
      return
    }
    addToCart(id, 1, { size, color })
    setJustAdded(true)
    onAdded?.()
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={justAdded ? 'Added to cart' : 'Add to cart'}
        className={`relative grid size-9 place-items-center rounded-full shadow-[0_2px_8px_-2px_rgb(33_73_232/0.55)] transition-[background-color,transform,box-shadow] duration-200 hover:scale-105 active:scale-90 disabled:opacity-45 disabled:shadow-none ${justAdded ? 'bg-save-600 text-white shadow-[0_2px_8px_-2px_rgb(19_138_82/0.6)]' : 'bg-brand-600 text-white hover:bg-brand-700'} ${className}`}
      >
        {/* success ring: confirms the add without moving the layout */}
        <AnimatePresence>
          {justAdded && (
            <motion.span
              key="ring"
              className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-save-500"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.7, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={String(justAdded)} initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.3, opacity: 0 }} transition={{ duration: 0.16 }}>
            {justAdded ? <Check className="size-4" strokeWidth={2.75} /> : <ShoppingBag className="size-4" strokeWidth={2.25} />}
          </motion.span>
        </AnimatePresence>
      </button>
    )
  }

  const added = justAdded
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-lg px-4 text-sm font-semibold transition-[background-color,transform] duration-200 active:scale-[0.97] disabled:opacity-45 ${added ? 'bg-save-600 text-white' : 'bg-ink-950 text-white hover:bg-ink-800'} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={String(added)}
          className="inline-flex items-center gap-2"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {added ? <Check className="size-4" strokeWidth={2.75} /> : <ShoppingBag className="size-4" />}
          {added ? 'Added' : inCart(id) ? 'Add one more' : 'Add to cart'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
