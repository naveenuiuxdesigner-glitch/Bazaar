import { photoList } from '../data/photos'

const AREA = { hero: 'Home banner', side: 'Home promo', promo: 'Home promo', cat: 'Category tile' }

export default function Credits() {
  return (
    <div className="container-page max-w-4xl">
      <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] sm:text-[36px]">Photo credits</h1>
      <p className="mt-2 text-sm text-ink-600">
        Homepage photography comes from Wikimedia Commons under Creative Commons or public-domain licences. Photos are resized and cropped.
        Product photo credits appear on each product page.
      </p>
      <ul className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
        {photoList.map((p) => (
          <li key={p.id} className="flex items-center gap-4 py-3">
            <img src={p.src} alt="" loading="lazy" decoding="async" className="size-14 shrink-0 rounded-md object-cover" />
            <div className="min-w-0 text-[13px] leading-5 text-ink-600">
              <p className="truncate font-medium text-ink-900">
                <a href={p.source} target="_blank" rel="noreferrer" className="hover:underline">
                  {p.title}
                </a>
              </p>
              <p className="truncate">
                {AREA[p.id.split('-')[0]]} · by {p.author} ·{' '}
                {p.licenseUrl ? (
                  <a href={p.licenseUrl} target="_blank" rel="noreferrer license" className="underline decoration-ink-300 underline-offset-2 hover:text-ink-800">
                    {p.license}
                  </a>
                ) : (
                  p.license
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
