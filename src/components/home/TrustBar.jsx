import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Motion'
import { BadgeCheck, Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

const items = [
  { icon: Truck, title: 'Free delivery', body: 'On orders above ₹499, to 19,000+ pincodes', to: '/help#delivery' },
  { icon: RotateCcw, title: 'Easy returns', body: 'Up to 15 days, with doorstep pickup', to: '/help#returns' },
  { icon: ShieldCheck, title: 'Secure payments', body: 'UPI, cards, net banking, EMI and COD', to: '/help#payments' },
  { icon: BadgeCheck, title: '100% genuine', body: 'Authorised brands and verified sellers', to: '/help#security' },
  { icon: Headphones, title: '24×7 support', body: 'Chat or call us, any time', to: '/help#contact' },
]

export function TrustBar() {
  return (
    <Reveal as="section" aria-label="Why shop with Bazaar" className="rounded-2xl bg-ink-50 ring-1 ring-inset ring-ink-150">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-150 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, body, to }, i) => (
          <li key={title} className="bg-ink-50 last:col-span-2 lg:last:col-span-1">
            <Link to={to} className={`group flex h-full items-start gap-3 p-4 sm:p-5 lg:flex-col lg:p-6 ${i === items.length - 1 ? 'flex-row items-center' : 'flex-col'}`}>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-[background-color,color,transform] duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:bg-brand-600 group-hover:text-white">
                <Icon className="size-[18px]" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink-950 sm:text-[15px]">{title}</span>
                <span className="mt-0.5 block text-xs leading-[18px] text-ink-600 sm:text-[13px] sm:leading-5">{body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
