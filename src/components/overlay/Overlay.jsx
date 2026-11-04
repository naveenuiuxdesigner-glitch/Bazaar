import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useFocusTrap, useLockBody } from '../../hooks/useUi'

const ease = [0.2, 0.8, 0.2, 1]

/**
 * Accessible overlay surface. `variant`:
 *  - 'drawer-right' : side sheet (cart)
 *  - 'drawer-left'  : side sheet (menu)
 *  - 'modal'        : centred dialog on desktop, bottom sheet on mobile
 */
export function Overlay({ open, onClose, label, variant = 'modal', children, className = '' }) {
  const ref = useRef(null)
  useLockBody(open)
  useFocusTrap(ref, open)
  useEffect(() => {
    if (!open) return
    const on = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [open, onClose])

  const panel = {
    'drawer-right': {
      cls: 'fixed inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white shadow-drawer',
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
    'drawer-left': {
      cls: 'fixed inset-y-0 left-0 flex w-[88%] max-w-[380px] flex-col bg-white shadow-drawer',
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    modal: {
      cls: 'fixed inset-x-0 bottom-0 max-h-[92dvh] overflow-hidden rounded-t-3xl bg-white pt-2 shadow-pop md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[86vh] md:w-[min(960px,calc(100vw-48px))] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:pt-0',
      initial: { y: 48, opacity: 0, scale: 0.98 },
      animate: { y: 0, opacity: 1, scale: 1 },
      exit: { y: 32, opacity: 0, scale: 0.985 },
    },
  }[variant]

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={`${panel.cls} ${className}`}
            initial={panel.initial}
            animate={panel.animate}
            exit={panel.exit}
            // drawers settle on a soft spring; dialogs use the house ease
            transition={variant === 'modal' ? { duration: 0.3, ease } : { type: 'spring', stiffness: 380, damping: 38, mass: 0.9 }}
          >
            {variant === 'modal' && <span className="absolute left-1/2 top-2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-200 md:hidden" aria-hidden />}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
