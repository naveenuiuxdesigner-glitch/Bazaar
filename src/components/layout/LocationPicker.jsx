import { useState } from 'react'
import { Check, Loader2, LocateFixed, MapPin, X } from 'lucide-react'
import { Overlay } from '../overlay/Overlay'
import { useStore } from '../../context/StoreContext'
import { locateNearest, lookupPincode, popularCities, savedPlaces } from '../../data/locations'
import { Button } from '../ui/Button'

export function LocationTrigger({ variant = 'desktop', onOpen }) {
  const { location } = useStore()
  if (variant === 'bar') {
    return (
      <button type="button" onClick={onOpen} className="flex w-full items-center gap-1.5 text-left text-[13px] text-ink-700">
        <MapPin className="size-4 shrink-0 text-ink-500" />
        <span className="truncate">
          Deliver to <span className="font-semibold text-ink-950">{location.area ? `${location.area}, ` : ''}{location.city} {location.pincode}</span>
        </span>
      </button>
    )
  }
  return (
    <button type="button" onClick={onOpen} className="group flex h-12 min-w-0 items-center gap-2 rounded-lg px-2.5 text-left transition-colors hover:bg-ink-100">
      <MapPin className="size-5 shrink-0 text-ink-700" />
      <span className="min-w-0 leading-tight">
        <span className="block text-[11px] text-ink-500">Deliver to</span>
        <span className="block max-w-[132px] truncate text-[13px] font-semibold text-ink-950">
          {location.city} {location.pincode}
        </span>
      </span>
    </button>
  )
}

export function LocationPicker({ open, onClose }) {
  const { location, setLocation, toast } = useStore()
  const [pin, setPin] = useState('')
  const [status, setStatus] = useState({ loading: false, error: '' })

  const choose = ({ pincode, city, area }) => {
    const loc = { pincode, city, area }
    setLocation(loc)
    toast({ title: `Delivering to ${loc.city} ${loc.pincode}`, duration: 2400 })
    onClose()
    setPin('')
  }

  const check = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, error: '' })
    const res = await lookupPincode(pin.trim())
    if (res.ok) {
      setStatus({ loading: false, error: '' })
      choose(res.location)
    } else setStatus({ loading: false, error: res.error })
  }

  return (
    <Overlay open={open} onClose={onClose} label="Choose delivery location" className="md:!w-[460px]">
      <div className="max-h-[92dvh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">Where should we deliver?</h2>
            <p className="mt-1 text-sm text-ink-500">Prices, delivery dates and offers depend on your location.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="-mr-2 -mt-1 grid size-10 place-items-center rounded-full text-ink-600 hover:bg-ink-100">
            <X className="size-5" />
          </button>
        </div>

        <ul className="mt-5 space-y-2">
          {savedPlaces.map((p) => {
            const active = p.pincode === location.pincode
            return (
              <li key={p.pincode}>
                <button type="button" onClick={() => choose(p)} className={`flex w-full items-center gap-3 rounded-lg p-3.5 text-left ring-1 ring-inset transition-colors ${active ? 'bg-ink-50 ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'}`}>
                  <MapPin className="size-5 text-ink-500" />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-ink-950">{p.label}</span>
                    <span className="block text-[13px] text-ink-600">
                      {p.area}, {p.city} {p.pincode}
                    </span>
                  </span>
                  {active && <Check className="size-5 text-ink-950" />}
                </button>
              </li>
            )
          })}
        </ul>

        <form onSubmit={check} className="mt-5">
          <label htmlFor="pincode" className="text-sm font-medium text-ink-800">
            Or enter a pincode
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="pincode"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''))
                setStatus({ loading: false, error: '' })
              }}
              placeholder="e.g. 110001"
              aria-invalid={!!status.error}
              aria-describedby={status.error ? 'pin-error' : undefined}
              className="h-11 flex-1 rounded-md px-3.5 text-[15px] tracking-wider ring-1 ring-inset ring-ink-200 placeholder:tracking-normal placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:ring-danger-600 num"
            />
            <Button type="submit" variant="dark" className="h-11! w-24" disabled={pin.length !== 6 || status.loading}>
              {status.loading ? <Loader2 className="size-4 animate-spin" /> : 'Check'}
            </Button>
          </div>
          {status.error && (
            <p id="pin-error" role="alert" className="mt-2 text-[13px] text-danger-700">
              {status.error}
            </p>
          )}
        </form>

        <button
          type="button"
          onClick={async () => {
            setStatus({ loading: true, error: '' })
            const res = await locateNearest()
            setStatus({ loading: false, error: res.ok ? '' : res.error })
            if (res.ok) choose(res.location)
          }}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink-900 hover:text-brand-700"
        >
          <LocateFixed className="size-4" /> Use my current location
        </button>

        <div className="mt-6 border-t border-ink-150 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500">Popular cities</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {popularCities.map((c) => (
              <button key={c.pincode} type="button" onClick={() => choose(c)} className="h-8 rounded-full bg-ink-100 px-3 text-[13px] text-ink-800 hover:bg-ink-150">
                {c.city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  )
}
