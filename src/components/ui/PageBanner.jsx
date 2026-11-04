
/*
  Banner standard, shared by every page-level banner:
   - 24px corners (rounded-3xl on desktop), one photo or one colour field, never both competing;
   - a left-to-right navy scrim so white type always passes contrast on any photo;
   - eyebrow (11px bold caps) → display title (extra-bold, tight) → one supporting line → optional stats.
  `tone` picks the colour field when there is no photo: 'deal' (coral), 'brand' (blue → violet) or 'dark'.
*/
const FIELDS = {
  deal: 'bg-[radial-gradient(80%_120%_at_100%_0%,#FF8A5C,transparent_60%),linear-gradient(120deg,#C13F15,#E9511F_55%,#FF6A3D)]',
  brand: 'bg-[radial-gradient(70%_120%_at_100%_0%,rgb(124_77_255/0.9),transparent_60%),linear-gradient(120deg,#121F5C,#2149E8)]',
  dark: 'bg-[radial-gradient(70%_120%_at_100%_0%,rgb(63_216_255/0.35),transparent_60%),linear-gradient(120deg,#060A18,#0C1733)]',
}

export function PageBanner({ eyebrow, title, subtitle, photo, pos, tone = 'dark', stats = [], art, children }) {
  return (
    <div className="relative isolate overflow-hidden rounded-2xl text-white shadow-[0_24px_50px_-30px_rgb(11_18_32/0.55)] sm:rounded-3xl">
      {photo ? (
        <img src={photo} alt="" loading="eager" fetchPriority="high" draggable={false} style={pos ? { objectPosition: pos } : undefined} className="absolute inset-0 z-0 size-full scale-[1.02] object-cover" />
      ) : (
        <span className={`absolute inset-0 z-0 ${FIELDS[tone]}`} aria-hidden />
      )}
      {/* legibility scrim: strong behind the text column, clear over the subject */}
      <span
        className={`absolute inset-0 z-10 ${photo ? 'bg-[linear-gradient(90deg,rgb(11_18_32/0.88)_0%,rgb(11_18_32/0.55)_45%,rgb(11_18_32/0.05)_85%)]' : 'bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_left,black,transparent_70%)]'}`}
        aria-hidden
      />
      {art && <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[42%] sm:block">{art}</div>}
      <div className="relative z-20 flex min-h-[168px] flex-col justify-center px-5 py-7 sm:min-h-[220px] sm:px-10 sm:py-10 lg:px-12">
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">{eyebrow}</p>}
        <h1 className="mt-2 max-w-[18ch] text-balance font-display text-[30px] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[44px]">{title}</h1>
        {subtitle && <p className="mt-2 max-w-[52ch] text-sm text-white/80 sm:text-[15px]">{subtitle}</p>}
        {stats.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {stats.map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-lg font-bold num">{value}</dd>
                <span className="text-xs text-white/65" aria-hidden>
                  {label}
                </span>
              </div>
            ))}
          </dl>
        )}
        {children}
      </div>
    </div>
  )
}
