const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)))

export function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16))
}

export function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, '0')).join('')
}

/** amt > 0 lightens towards white, amt < 0 darkens towards black (−1…1). */
export function shade(hex, amt) {
  const rgb = hexToRgb(hex)
  const target = amt > 0 ? 255 : 0
  const a = Math.abs(amt)
  return rgbToHex(rgb.map((c) => c + (target - c) * a))
}

export function mix(a, b, t) {
  const A = hexToRgb(a)
  const B = hexToRgb(b)
  return rgbToHex(A.map((c, i) => c + (B[i] - c) * t))
}

export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const isLight = (hex) => luminance(hex) > 0.45
export const onColor = (hex) => (isLight(hex) ? '#121310' : '#ffffff')
