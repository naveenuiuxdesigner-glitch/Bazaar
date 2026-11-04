import { photoCredits } from './photoCredits'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

// Homepage lifestyle photo for a slot id (`hero-*`, `side-*`, `promo-*`, `cat-<slug>`), or null when the slot has none,
// in which case components fall back to the vector art. To change a photo, replace public/photos/<slot>.webp.
export function photo(id) {
  const p = photoCredits[id]
  return p ? { ...p, src: asset(`photos/${p.file}`) } : null
}

export const photoList = Object.entries(photoCredits).map(([id, p]) => ({ id, ...p, src: asset(`photos/${p.file}`) }))
