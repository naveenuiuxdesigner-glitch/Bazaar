import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { productById } from '../data/products'
import { load, save } from '../lib/storage'

export const COUPONS = {
  BAZAAR5: { code: 'BAZAAR5', label: '5% off, up to ₹500', min: 0, apply: (sub) => Math.min(Math.round(sub * 0.05), 500) },
  FESTIVE750: { code: 'FESTIVE750', label: 'Flat ₹750 off on orders above ₹7,500', min: 7500, apply: () => 750 },
  STYLE15: { code: 'STYLE15', label: '15% off fashion & footwear, up to ₹1,000', min: 1499, apply: (sub, items) => Math.min(Math.round(items.filter((i) => ['fashion', 'footwear'].includes(i.product.category)).reduce((s, i) => s + i.product.price * i.qty, 0) * 0.15), 1000) },
  NEWHOME: { code: 'NEWHOME', label: '10% off on Home & Kitchen, up to ₹1,500', min: 1999, apply: (sub, items) => Math.min(Math.round(items.filter((i) => ['home', 'kitchen', 'furniture'].includes(i.product.category)).reduce((s, i) => s + i.product.price * i.qty, 0) * 0.1), 1500) },
}

const initial = () => ({
  cart: load('cart', []),
  wishlist: load('wishlist', []),
  recent: load('recent', []),
  location: load('location', { pincode: '500081', city: 'Hyderabad', area: 'Madhapur' }),
  coupon: load('coupon', null),
  saved: load('saved', []),
  compare: load('compare', []),
})

function reducer(state, action) {
  switch (action.type) {
    case 'cart/add': {
      const existing = state.cart.find((i) => i.id === action.id && (i.size ?? null) === (action.size ?? null) && (i.color ?? null) === (action.color ?? null))
      const max = productById[action.id]?.stock ?? 10
      const cart = existing
        ? state.cart.map((i) => (i.id === action.id && (i.size ?? null) === (action.size ?? null) && (i.color ?? null) === (action.color ?? null) ? { ...i, qty: Math.min(i.qty + (action.qty ?? 1), Math.min(max, 10)) } : i))
        : [{ id: action.id, qty: action.qty ?? 1, ...(action.size ? { size: action.size } : {}), ...(action.color ? { color: action.color } : {}), addedAt: Date.now() }, ...state.cart]
      return { ...state, cart }
    }
    case 'cart/qty':
      return { ...state, cart: state.cart.map((i) => (i.id === action.id && (i.size ?? null) === (action.size ?? null) && (i.color ?? null) === (action.color ?? null) ? { ...i, qty: Math.max(1, Math.min(action.qty, 10)) } : i)) }
    case 'cart/remove':
      return { ...state, cart: state.cart.filter((i) => i.id !== action.id || !(action.matchVariant && (i.size ?? null) === (action.size ?? null) && (i.color ?? null) === (action.color ?? null))) }
    case 'cart/restore':
      return { ...state, cart: action.cart }
    case 'wishlist/toggle':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id) ? state.wishlist.filter((x) => x !== action.id) : [action.id, ...state.wishlist],
      }
    case 'recent/push':
      return { ...state, recent: [action.id, ...state.recent.filter((x) => x !== action.id)].slice(0, 16) }
    case 'recent/clear':
      return { ...state, recent: [] }
    case 'location/set':
      return { ...state, location: action.location }
    case 'coupon/set':
      return { ...state, coupon: action.code }
    case 'cart/clear':
      return { ...state, cart: [], coupon: null }
    case 'saved/add':
      return { ...state, cart: state.cart.filter((i) => i.id !== action.id), saved: [action.id, ...state.saved.filter((x) => x !== action.id)] }
    case 'saved/remove':
      return { ...state, saved: state.saved.filter((x) => x !== action.id) }
    case 'compare/toggle':
      return {
        ...state,
        compare: state.compare.includes(action.id) ? state.compare.filter((x) => x !== action.id) : [...state.compare, action.id].slice(-4),
      }
    case 'compare/clear':
      return { ...state, compare: [] }
    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initial)
  const [cartOpen, setCartOpen] = useState(false)
  const [quickViewId, setQuickViewId] = useState(null)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  useEffect(() => save('cart', state.cart), [state.cart])
  useEffect(() => save('wishlist', state.wishlist), [state.wishlist])
  useEffect(() => save('recent', state.recent), [state.recent])
  useEffect(() => save('location', state.location), [state.location])
  useEffect(() => save('coupon', state.coupon), [state.coupon])
  useEffect(() => save('saved', state.saved), [state.saved])
  useEffect(() => save('compare', state.compare), [state.compare])

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const toast = useCallback(
    (t) => {
      const id = ++toastId.current
      setToasts((list) => [...list.slice(-2), { id, ...t }])
      setTimeout(() => dismissToast(id), t.duration ?? 3800)
      return id
    },
    [dismissToast],
  )

  const cartItems = useMemo(
    () => state.cart.map((i) => ({ ...i, product: productById[i.id] })).filter((i) => i.product),
    [state.cart],
  )

  const totals = useMemo(() => {
    const mrp = cartItems.reduce((s, i) => s + i.product.mrp * i.qty, 0)
    const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0)
    const coupon = state.coupon ? COUPONS[state.coupon] : null
    const couponValid = coupon && subtotal >= coupon.min
    const couponDiscount = couponValid ? coupon.apply(subtotal, cartItems) : 0
    const delivery = subtotal === 0 || subtotal >= 499 ? 0 : 49
    const count = cartItems.reduce((s, i) => s + i.qty, 0)
    return { mrp, subtotal, savings: mrp - subtotal, couponDiscount, couponValid, delivery, total: subtotal - couponDiscount + delivery, count }
  }, [cartItems, state.coupon])

  const api = useMemo(
    () => ({
      ...state,
      cartItems,
      totals,
      cartOpen,
      quickViewId,
      toasts,
      // Opening the cart shows the same information as the toasts, so clear them.
      setCartOpen: (open) => {
        if (open) setToasts([])
        setCartOpen(open)
      },
      openQuickView: setQuickViewId,
      closeQuickView: () => setQuickViewId(null),
      toast,
      dismissToast,
      inCart: (id) => state.cart.some((i) => i.id === id),
      isWished: (id) => state.wishlist.includes(id),
      addToCart: (id, qty = 1, { silent = false, open = false, size, color } = {}) => {
        dispatch({ type: 'cart/add', id, qty, size, color })
        if (open) {
          setToasts([])
          setCartOpen(true)
        }
        if (!silent) toast({ kind: 'cart', productId: id, title: 'Added to cart' })
      },
      setQty: (id, qty, size, color) => dispatch({ type: 'cart/qty', id, qty, size, color }),
      removeFromCart: (id, size, color, matchVariant = false) => {
        const snapshot = state.cart
        dispatch({ type: 'cart/remove', id, size, color, matchVariant })
        toast({ kind: 'undo', title: 'Removed from cart', productId: id, onUndo: () => dispatch({ type: 'cart/restore', cart: snapshot }) })
      },
      toggleWishlist: (id) => {
        const adding = !state.wishlist.includes(id)
        dispatch({ type: 'wishlist/toggle', id })
        toast({ kind: 'wish', productId: id, title: adding ? 'Saved to wishlist' : 'Removed from wishlist', duration: 2600 })
      },
      pushRecent: (id) => dispatch({ type: 'recent/push', id }),
      clearRecent: () => dispatch({ type: 'recent/clear' }),
      setLocation: (location) => dispatch({ type: 'location/set', location }),
      applyCoupon: (code) => {
        const c = COUPONS[code.trim().toUpperCase()]
        if (!c) return { ok: false, error: 'This code isn’t valid. Check the spelling and try again.' }
        dispatch({ type: 'coupon/set', code: c.code })
        return { ok: true, coupon: c }
      },
      removeCoupon: () => dispatch({ type: 'coupon/set', code: null }),
      clearCart: () => dispatch({ type: 'cart/clear' }),
      saveForLater: (id) => {
        dispatch({ type: 'saved/add', id })
        toast({ title: 'Saved for later', productId: id, duration: 2600 })
      },
      moveToCart: (id) => {
        dispatch({ type: 'saved/remove', id })
        dispatch({ type: 'cart/add', id, qty: 1 })
        toast({ kind: 'cart', productId: id, title: 'Moved to cart' })
      },
      removeSaved: (id) => dispatch({ type: 'saved/remove', id }),
      inCompare: (id) => state.compare.includes(id),
      toggleCompare: (id) => {
        const p = productById[id]
        const adding = !state.compare.includes(id)
        const first = productById[state.compare[0]]
        if (adding && first && first.category !== p.category) {
          toast({ title: `Compare works within one category. Clear ${first.categoryName} first.`, duration: 3400 })
          return false
        }
        if (adding && state.compare.length >= 4) {
          toast({ title: 'You can compare up to 4 products. Remove one first.', duration: 3200 })
          return false
        }
        dispatch({ type: 'compare/toggle', id })
        return true
      },
      clearCompare: () => dispatch({ type: 'compare/clear' }),
    }),
    [state, cartItems, totals, cartOpen, quickViewId, toasts, toast, dismissToast],
  )

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
