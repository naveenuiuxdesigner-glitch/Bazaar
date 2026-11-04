const day = 86400000
export const DAY = day
export const HOUR = 3600000
export const MIN = 60000

const dFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const dShort = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
const tFmt = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })

export const formatDate = (t) => dFmt.format(new Date(t))
export const formatDay = (t) => dShort.format(new Date(t))
export const formatTime = (t) => tFmt.format(new Date(t)).replace(/\s?([ap])m/i, (_, x) => ` ${x.toUpperCase()}M`)
export const formatDateTime = (t) => `${formatDay(t)}, ${formatTime(t)}`

const startOf = (t) => {
  const d = new Date(t)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

/** "Today", "Tomorrow", "Yesterday" or a short date. */
export function relativeDay(t, now = Date.now()) {
  const diff = Math.round((startOf(t) - startOf(now)) / day)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  return formatDay(t)
}

export function timeAgo(t, now = Date.now()) {
  const s = Math.max(0, Math.round((now - t) / 1000))
  if (s < 60) return 'Just now'
  const m = Math.round(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  if (d === 1) return 'Yesterday'
  if (d < 7) return `${d} days ago`
  return formatDate(t)
}

/** Adds n days and lands on a fixed hour, so planned events read naturally. */
export const atDay = (t, n, hour = 10, minute = 0) => {
  const d = new Date(t + n * day)
  d.setHours(hour, minute, 0, 0)
  return d.getTime()
}
