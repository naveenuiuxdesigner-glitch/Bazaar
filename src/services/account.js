import { load, save, remove, uid, wait } from '../lib/storage'
import { seedOrders } from './orders'
import { DAY } from '../lib/dates'

/*
  Mock account backend. Everything lives in localStorage under `bazaar:` keys:
  users, session, and per-user collections (`u:<id>:addresses`, `…:orders` and so on).
  Passwords are hashed with a simple non-cryptographic hash: this is a front-end demo, not real auth.
*/

export const DEMO = { email: 'aarav.sharma@example.com', password: 'Bazaar@2026' }

function hash(str, seed = 0x5bd1e995) {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
}
const pwHash = (userId, pw) => hash(`${userId}::${pw}`)

const key = (userId, name) => `u:${userId}:${name}`
export const readUserData = (userId, name, fallback) => load(key(userId, name), fallback)
export const writeUserData = (userId, name, value) => save(key(userId, name), value)

const users = () => load('users', [])
const saveUsers = (list) => save('users', list)
const publicUser = (u) => {
  if (!u) return null
  const { passwordHash: _omit, ...rest } = u
  return rest
}

/** Creates the demo shopper with addresses, saved payments and a realistic order history. */
export function ensureDemo() {
  const list = users()
  if (list.some((u) => u.id === 'u_aarav')) return
  const now = Date.now()
  const user = {
    id: 'u_aarav',
    name: 'Aarav Sharma',
    email: DEMO.email,
    phone: '9845012210',
    gender: 'Male',
    dob: '1994-08-17',
    passwordHash: pwHash('u_aarav', DEMO.password),
    createdAt: now - 410 * DAY,
    plus: { since: now - 120 * DAY, until: now + 245 * DAY },
    balance: 350,
  }
  saveUsers([...list, user])
  const addresses = [
    { id: 'a_home', name: 'Aarav Sharma', phone: '9845012210', pincode: '560001', line1: 'Flat 1204, Prestige Meridian Tower 2', line2: 'MG Road, Ashok Nagar', landmark: 'Opposite Trinity Metro', city: 'Bengaluru', state: 'Karnataka', type: 'Home', isDefault: true },
    { id: 'a_work', name: 'Aarav Sharma', phone: '9845012210', pincode: '400076', line1: '5th Floor, Delphi B Wing', line2: 'Hiranandani Gardens, Powai', landmark: 'Near Galleria Mall', city: 'Mumbai', state: 'Maharashtra', type: 'Work', isDefault: false },
    { id: 'a_parents', name: 'Meera Sharma', phone: '9810077345', pincode: '302017', line1: 'C-42, Malviya Nagar', line2: 'Sector 7', landmark: 'Behind Gaurav Tower', city: 'Jaipur', state: 'Rajasthan', type: 'Other', isDefault: false },
  ]
  writeUserData(user.id, 'addresses', addresses)
  writeUserData(user.id, 'payments', [
    { id: 'pm_card', type: 'card', network: 'Visa', bank: 'HDFC Bank', last4: '4242', name: 'AARAV SHARMA', expiry: '08/29' },
    { id: 'pm_upi', type: 'upi', vpa: 'aarav.sharma@okhdfcbank' },
  ])
  writeUserData(user.id, 'orders', seedOrders(user, addresses[0], now))
  writeUserData(user.id, 'tickets', [
    {
      id: 'T-48213',
      subject: 'Refund status for Puma running shoes',
      category: 'Returns & refunds',
      createdAt: now - 22 * DAY,
      status: 'Resolved',
      messages: [
        { from: 'you', at: now - 22 * DAY, text: 'I returned the Puma Deviate NITRO 3 two days ago. When will the refund reach my card?' },
        { from: 'agent', name: 'Priya from Bazaar', at: now - 22 * DAY + 3600000, text: 'Hi Aarav, the pickup passed quality check and the refund has been initiated. It should reach your HDFC card within 2 to 4 business days.' },
      ],
    },
  ])
}

export const auth = {
  async signIn(email, password) {
    await wait(600)
    const u = users().find((x) => x.email.toLowerCase() === email.trim().toLowerCase())
    if (!u) return { ok: false, field: 'email', error: 'No account found with this email. Check it or create an account.' }
    if (u.passwordHash !== pwHash(u.id, password)) return { ok: false, field: 'password', error: 'That password isn’t right. Try again or reset it.' }
    save('session', { userId: u.id, at: Date.now() })
    return { ok: true, user: publicUser(u) }
  },

  async signUp({ name, email, phone, password }) {
    await wait(700)
    const list = users()
    if (list.some((x) => x.email.toLowerCase() === email.trim().toLowerCase())) return { ok: false, field: 'email', error: 'An account with this email already exists. Sign in instead.' }
    if (list.some((x) => x.phone === phone)) return { ok: false, field: 'phone', error: 'This mobile number is linked to another account.' }
    const id = uid('u_')
    const user = { id, name: name.trim(), email: email.trim(), phone, gender: '', dob: '', passwordHash: pwHash(id, password), createdAt: Date.now(), plus: null, balance: 0 }
    saveUsers([...list, user])
    writeUserData(user.id, 'addresses', [])
    writeUserData(user.id, 'payments', [])
    writeUserData(user.id, 'orders', [])
    writeUserData(user.id, 'tickets', [])
    save('session', { userId: user.id, at: Date.now() })
    return { ok: true, user: publicUser(user) }
  },

  signOut() {
    remove('session')
  },

  current() {
    const s = load('session', null)
    return s ? publicUser(users().find((u) => u.id === s.userId)) : null
  },

  /** Simulated reset: the code is shown on screen instead of being emailed. */
  async requestReset(email) {
    await wait(600)
    const u = users().find((x) => x.email.toLowerCase() === email.trim().toLowerCase())
    if (!u) return { ok: false, error: 'No account found with this email.' }
    const code = String(Math.floor(100000 + Math.random() * 900000))
    save('reset', { email: u.email, code, until: Date.now() + 10 * 60000 })
    return { ok: true, code }
  },

  async resetPassword(email, code, password) {
    await wait(600)
    const r = load('reset', null)
    if (!r || r.email.toLowerCase() !== email.trim().toLowerCase() || r.code !== code.trim()) return { ok: false, field: 'code', error: 'That code isn’t right. Check it and try again.' }
    if (Date.now() > r.until) return { ok: false, field: 'code', error: 'This code has expired. Request a new one.' }
    saveUsers(users().map((u) => (u.email === r.email ? { ...u, passwordHash: pwHash(u.id, password) } : u)))
    remove('reset')
    return { ok: true }
  },

  async updateUser(id, patch) {
    await wait(450)
    const list = users()
    if (patch.email && list.some((x) => x.id !== id && x.email.toLowerCase() === patch.email.toLowerCase())) return { ok: false, field: 'email', error: 'Another account already uses this email.' }
    let updated
    saveUsers(
      list.map((u) => {
        if (u.id !== id) return u
        updated = { ...u, ...patch }
        return updated
      }),
    )
    return { ok: true, user: publicUser(updated) }
  },

  async changePassword(id, current, next) {
    await wait(500)
    const u = users().find((x) => x.id === id)
    if (u.passwordHash !== pwHash(u.id, current)) return { ok: false, field: 'current', error: 'Your current password isn’t right.' }
    saveUsers(users().map((x) => (x.id === id ? { ...x, passwordHash: pwHash(x.id, next) } : x)))
    return { ok: true }
  },
}
