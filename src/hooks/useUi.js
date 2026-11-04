import { useEffect, useRef, useState } from 'react'

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatches(m.matches)
    m.addEventListener('change', on)
    on()
    return () => m.removeEventListener('change', on)
  }, [query])
  return matches
}

export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return
    const on = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler(e)
    }
    document.addEventListener('pointerdown', on)
    return () => document.removeEventListener('pointerdown', on)
  }, [ref, handler, active])
}

/** Traps Tab focus inside `ref` while active and restores focus on close. */
export function useFocusTrap(ref, active) {
  const restore = useRef(null)
  useEffect(() => {
    if (!active || !ref.current) return
    restore.current = document.activeElement
    const node = ref.current
    const sel = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])'
    const first = node.querySelector('[data-autofocus]') || node.querySelector(sel)
    requestAnimationFrame(() => first?.focus())
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const items = [...node.querySelectorAll(sel)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const a = items[0]
      const z = items[items.length - 1]
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault()
        z.focus()
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault()
        a.focus()
      }
    }
    node.addEventListener('keydown', onKey)
    return () => {
      node.removeEventListener('keydown', onKey)
      restore.current?.focus?.()
    }
  }, [ref, active])
}

/** 'up' | 'down' scroll direction with a small threshold, plus whether we're past `offset`. */
/** Scroll direction (with a small dead-zone), whether we are past `offset`, and whether the page has scrolled at all. */
export function useScrollDirection(offset = 120) {
  const [state, setState] = useState({ dir: 'up', past: false, scrolled: false })
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const on = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - last
        setState((s) => {
          const next = { dir: s.dir, past: y > offset, scrolled: y > 8 }
          if (Math.abs(delta) > 6) next.dir = delta > 0 ? 'down' : 'up'
          return next.dir === s.dir && next.past === s.past && next.scrolled === s.scrolled ? s : next
        })
        if (Math.abs(delta) > 6) last = y
        ticking = false
      })
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [offset])
  return state
}

export function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const ms = Math.max(0, target - now)
  return { h: Math.floor(ms / 3.6e6), m: Math.floor((ms % 3.6e6) / 6e4), s: Math.floor((ms % 6e4) / 1000), done: ms === 0 }
}
