import { BadgeCheck, Heart, PackageSearch, Zap } from 'lucide-react'
import { products } from '../../data/products'
import { ProductArt } from '../art/ProductArt'
import { Photo } from '../ui/Photo'
import { photo } from '../../data/photos'

const perks = [
  { icon: PackageSearch, title: 'Track every order', body: 'Live status from packing to your door.' },
  { icon: Zap, title: 'Faster checkout', body: 'Saved addresses, UPI and cards.' },
  { icon: Heart, title: 'Wishlist and price drops', body: 'We tell you when saved items get cheaper.' },
  { icon: BadgeCheck, title: 'Easy returns', body: 'Doorstep pickup and quick refunds.' },
]

const showcase = ['apple-airpods-pro-3-with-magsafe-case', 'nike-air-force-1-07-mens-sneakers-white', 'kitchenaid-artisan-stand-mixer-4-8-l-empire-red'].map((id) => products.find((p) => p.id === id)).filter(Boolean)

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="container-page pt-6 sm:pt-10">
      <div className="mx-auto grid max-w-[1040px] overflow-hidden rounded-3xl ring-1 ring-inset ring-ink-150 lg:grid-cols-[1fr_440px]">
        <div className="px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
          <h1 className="font-display text-[28px] font-bold tracking-[-0.03em] text-ink-950 sm:text-[32px]">{title}</h1>
          {subtitle && <p className="mt-1.5 text-[15px] text-ink-500">{subtitle}</p>}
          <div className="mt-8 max-w-[420px]">{children}</div>
        </div>
        <aside className="hidden flex-col bg-ink-50 p-10 lg:flex" aria-label="Why sign in">
          <Photo src={photo('side-emi')?.src} className="-mx-10 -mt-10 mb-8 h-40" />
          <div className="grid grid-cols-3 gap-2.5">
            {showcase.map((p) => (
              <div key={p.id} className="aspect-square overflow-hidden rounded-lg bg-studio ring-1 ring-inset ring-ink-150">
                <ProductArt src={p.image} kind={p.art.kind} color={p.art.color} brand={p.brand} label={p.title} className="size-full p-2" />
              </div>
            ))}
          </div>
          <p className="mt-8 font-display text-xl font-bold leading-snug tracking-tight text-ink-950">One account for 2,000+ brands and every seller on Bazaar.</p>
          <ul className="mt-6 space-y-4">
            {perks.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white ring-1 ring-inset ring-ink-150">
                  <Icon className="size-[18px] text-ink-700" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-950">{title}</span>
                  <span className="text-[13px] text-ink-500">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export function FormError({ children }) {
  if (!children) return null
  return (
    <div role="alert" className="mb-5 rounded-md bg-danger-50 px-3.5 py-3 text-[13px] font-medium text-danger-800 ring-1 ring-inset ring-danger-100">
      {children}
    </div>
  )
}
