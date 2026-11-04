import { Heart } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '../../context/StoreContext'

const burst = [0, 60, 120, 180, 240, 300]

export function WishlistButton({ id, className = '', size = 'md' }) {
  const { isWished, toggleWishlist } = useStore()
  const on = isWished(id)
  const dim = size === 'lg' ? 'size-11' : 'size-9'
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(id)
      }}
      aria-pressed={on}
      aria-label={on ? 'Remove from wishlist' : 'Save to wishlist'}
      className={`relative grid ${dim} place-items-center rounded-full bg-white/95 text-ink-800 shadow-[0_1px_2px_rgb(0_0_0/0.08)] ring-1 ring-ink-950/5 backdrop-blur transition-[transform,color] duration-150 hover:scale-105 hover:text-deal-600 active:scale-95 ${className}`}
    >
      <motion.span key={String(on)} initial={on ? { scale: 0.4 } : false} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 520, damping: 14 }}>
        <Heart className={`${size === 'lg' ? 'size-5' : 'size-[18px]'} ${on ? 'fill-deal-500 text-deal-500' : ''}`} strokeWidth={2} />
      </motion.span>
      <AnimatePresence>
        {on &&
          burst.map((deg) => (
            <motion.span
              key={deg}
              className="pointer-events-none absolute left-1/2 top-1/2 size-1 rounded-full bg-deal-500"
              initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
              animate={{ x: `calc(-50% + ${Math.cos((deg * Math.PI) / 180) * 18}px)`, y: `calc(-50% + ${Math.sin((deg * Math.PI) / 180) * 18}px)`, opacity: 0, scale: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            />
          ))}
      </AnimatePresence>
    </button>
  )
}
