import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/*
  Scroll motion, used sparingly: sections ease in once as they enter the viewport, lists stagger so
  the eye reads them in order, and promo imagery drifts a few pixels for depth. Everything runs once,
  uses IntersectionObserver / transforms only, and is switched off for reduced-motion users.
*/
const ease = [0.2, 0.8, 0.2, 1]
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' }

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ as = 'div', children, className = '', delay = 0, y = 24, ...props }) {
  const reduced = useReducedMotion()
  const Comp = motion[as]
  if (reduced) return <Comp className={className} {...props}>{children}</Comp>
  return (
    <Comp className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.6, ease, delay }} {...props}>
      {children}
    </Comp>
  )
}

const listVariants = (step) => ({ hidden: {}, show: { transition: { staggerChildren: step } } })
const itemVariants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }

/** A list whose items (`StaggerItem`) reveal one after another as the list enters the viewport. */
export function Stagger({ as = 'ul', children, className = '', step = 0.05, ...props }) {
  const reduced = useReducedMotion()
  const Comp = motion[as]
  if (reduced) return <Comp className={className} {...props}>{children}</Comp>
  return (
    <Comp className={className} variants={listVariants(step)} initial="hidden" whileInView="show" viewport={VIEWPORT} {...props}>
      {children}
    </Comp>
  )
}

export function StaggerItem({ as = 'li', children, className = '', ...props }) {
  const Comp = motion[as]
  return (
    <Comp className={className} variants={itemVariants} {...props}>
      {children}
    </Comp>
  )
}

/** Moves its child a few pixels against the scroll for depth. `range` is the total travel in px. */
export function Drift({ children, className = '', range = 28 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-range / 2, range / 2])
  return (
    <div ref={ref} className={className}>
      <motion.div className="size-full" style={reduced ? undefined : { y, scale: 1.08 }}>
        {children}
      </motion.div>
    </div>
  )
}
