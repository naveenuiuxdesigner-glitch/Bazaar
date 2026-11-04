import { useState } from 'react'

/*
  The one way lifestyle photography is shown across the site (banners, promos, category tiles, menus).
  Image standard:
   - a soft studio-coloured placeholder holds the space, so nothing jumps while photos load;
   - photos fade in once decoded rather than painting top-to-bottom;
   - always `object-cover` with an optional focal point (`pos`, e.g. '50% 30%') so crops stay on the subject;
   - lazy + async decoding by default; pass `priority` for the first, above-the-fold image only.
  Product cut-outs are a different standard and go through ProductArt.
*/
export function Photo({ src, alt = '', pos, priority = false, className = '', imgClassName = '', children }) {
  const [ready, setReady] = useState(false)
  return (
    <span className={`relative block overflow-hidden bg-studio ${className}`}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : undefined}
          draggable={false}
          onLoad={() => setReady(true)}
          ref={(el) => {
            // cached images can finish before React attaches onLoad
            if (el?.complete && el.naturalWidth && !ready) setReady(true)
          }}
          style={pos ? { objectPosition: pos } : undefined}
          className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out-soft ${ready ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
      {children}
    </span>
  )
}
