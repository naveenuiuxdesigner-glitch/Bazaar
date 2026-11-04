// Field validators shared by auth, address, checkout and support forms.
// Each returns an error message, or '' when the value is valid.

export const required = (v, label = 'This field') => (String(v ?? '').trim() ? '' : `${label} is required`)

export function email(v) {
  if (!String(v ?? '').trim()) return 'Enter your email address'
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid email, like name@example.com'
}

export function phone(v) {
  const d = String(v ?? '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
  if (!d) return 'Enter your mobile number'
  return /^[6-9]\d{9}$/.test(d) ? '' : 'Enter a valid 10-digit Indian mobile number'
}

export const cleanPhone = (v) => String(v ?? '').replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')

export function pincode(v) {
  if (!String(v ?? '').trim()) return 'Enter a pincode'
  return /^[1-8]\d{5}$/.test(v) ? '' : 'Enter a valid 6-digit pincode'
}

export function name(v) {
  const s = String(v ?? '').trim()
  if (!s) return 'Enter your full name'
  if (s.length < 2) return 'Name is too short'
  return /^[\p{L} .'-]+$/u.test(s) ? '' : 'Use letters only'
}

/** Password rules, each with whether it passes, so the UI can show a live checklist. */
export function passwordRules(v = '') {
  return [
    { id: 'len', label: 'At least 8 characters', ok: v.length >= 8 },
    { id: 'case', label: 'Upper and lower case letters', ok: /[a-z]/.test(v) && /[A-Z]/.test(v) },
    { id: 'num', label: 'At least one number', ok: /\d/.test(v) },
  ]
}

export function password(v) {
  if (!v) return 'Create a password'
  return passwordRules(v).every((r) => r.ok) ? '' : 'Password doesn’t meet the rules below'
}

export function passwordStrength(v = '') {
  let s = passwordRules(v).filter((r) => r.ok).length
  if (v.length >= 12) s++
  if (/[^A-Za-z0-9]/.test(v)) s++
  return Math.min(4, s) // 0-4
}

/* ── Payments ───────────────────────────────────────────────────────────── */

export function luhn(num) {
  const d = String(num).replace(/\D/g, '')
  let sum = 0
  for (let i = 0; i < d.length; i++) {
    let n = +d[d.length - 1 - i]
    if (i % 2) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  return d.length >= 12 && sum % 10 === 0
}

export function cardNetwork(num) {
  const d = String(num).replace(/\D/g, '')
  if (/^3[47]/.test(d)) return 'Amex'
  if (/^4/.test(d)) return 'Visa'
  if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard'
  if (/^(60|65|81|82|508)/.test(d)) return 'RuPay'
  return null
}

// A few well-known BIN prefixes so bank offers can apply in the demo.
const BINS = [
  ['438628', 'HDFC Bank'], ['524193', 'HDFC Bank'], ['4242', 'HDFC Bank'],
  ['437748', 'ICICI Bank'], ['5241', 'ICICI Bank'], ['4111', 'ICICI Bank'],
  ['459150', 'SBI Card'], ['5555', 'SBI Card'],
  ['438857', 'Axis Bank'], ['6522', 'Axis Bank'],
]
export const cardBank = (num) => {
  const d = String(num).replace(/\D/g, '')
  return BINS.find(([b]) => d.startsWith(b))?.[1] ?? null
}

export function cardNumber(v) {
  const d = String(v ?? '').replace(/\D/g, '')
  if (!d) return 'Enter your card number'
  const len = cardNetwork(d) === 'Amex' ? 15 : 16
  if (d.length < len) return 'Card number is incomplete'
  return luhn(d) ? '' : 'This card number isn’t valid. Check the digits.'
}

export function expiry(v, now = new Date()) {
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(String(v ?? '').trim())
  if (!m) return 'Use MM/YY'
  const mm = +m[1]
  const yy = 2000 + +m[2]
  if (mm < 1 || mm > 12) return 'Month must be 01 to 12'
  const end = new Date(yy, mm, 1)
  if (end <= now) return 'This card has expired'
  if (yy > now.getFullYear() + 20) return 'Check the expiry year'
  return ''
}

export const cvv = (v, network) => {
  const len = network === 'Amex' ? 4 : 3
  return new RegExp(`^\\d{${len}}$`).test(String(v ?? '')) ? '' : `Enter the ${len}-digit CVV`
}

export function upiId(v) {
  if (!String(v ?? '').trim()) return 'Enter your UPI ID'
  return /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/.test(v.trim()) ? '' : 'Enter a valid UPI ID, like name@okbank'
}

export const formatCardNumber = (v) => {
  const d = String(v).replace(/\D/g, '').slice(0, 19)
  return cardNetwork(d) === 'Amex' ? d.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' ')) : d.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const formatExpiry = (v, prev = '') => {
  const d = String(v).replace(/\D/g, '').slice(0, 4)
  if (d.length >= 3) return `${d.slice(0, 2)}/${d.slice(2)}`
  if (d.length === 2 && prev.length < v.length) return `${d}/`
  return d
}

/** Runs a { field: validator } map over values; returns { field: message } for failures. */
export function validate(values, rules) {
  const errors = {}
  for (const [k, fn] of Object.entries(rules)) {
    const msg = fn(values[k], values)
    if (msg) errors[k] = msg
  }
  return errors
}
