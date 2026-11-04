import { useEffect, useState } from 'react'
import { CreditCard, Loader2, Plus, Smartphone } from 'lucide-react'
import { useAccount } from '../../context/AccountContext'
import { useStore } from '../../context/StoreContext'
import { TextField } from '../../components/form/Field'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/States'
import { PageTitle } from './AccountLayout'
import * as v from '../../lib/validate'

function AddCard({ onDone, onCancel }) {
  const { savePayment } = useAccount()
  const [c, setC] = useState({ number: '', expiry: '', name: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const errs = v.validate(c, { number: v.cardNumber, expiry: v.expiry, name: (x) => (x.trim().length >= 2 ? '' : 'Enter the name on the card') })
    setErrors(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 600))
    const d = c.number.replace(/\D/g, '')
    savePayment({ type: 'card', network: v.cardNetwork(d) ?? 'Card', bank: v.cardBank(d) ?? 'Card', last4: d.slice(-4), name: c.name, expiry: c.expiry })
    onDone('Card saved')
  }
  return (
    <form noValidate onSubmit={submit} className="grid gap-4 rounded-xl p-5 ring-2 ring-ink-950 sm:grid-cols-2">
      <TextField className="sm:col-span-2" label="Card number" inputMode="numeric" value={c.number} onChange={(e) => setC({ ...c, number: v.formatCardNumber(e.target.value) })} error={errors.number} hint="Try 4242 4242 4242 4242" />
      <TextField label="Expiry" placeholder="MM/YY" inputMode="numeric" value={c.expiry} onChange={(e) => setC({ ...c, expiry: v.formatExpiry(e.target.value, c.expiry) })} error={errors.expiry} />
      <TextField label="Name on card" value={c.name} onChange={(e) => setC({ ...c, name: e.target.value.toUpperCase() })} error={errors.name} />
      <p className="text-xs text-ink-500 sm:col-span-2">We save only the last four digits and expiry. You’ll enter the CVV each time you pay.</p>
      <div className="flex gap-2.5 sm:col-span-2">
        <Button type="submit" disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />} Save card</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

function AddUpi({ onDone, onCancel }) {
  const { savePayment } = useAccount()
  const [vpa, setVpa] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const err = v.upiId(vpa)
    setError(err)
    if (err) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 700))
    savePayment({ type: 'upi', vpa: vpa.trim() })
    onDone('UPI ID verified and saved')
  }
  return (
    <form noValidate onSubmit={submit} className="space-y-4 rounded-xl p-5 ring-2 ring-ink-950">
      <TextField label="UPI ID" placeholder="name@okbank" value={vpa} onChange={(e) => { setVpa(e.target.value.trim()); setError('') }} error={error} hint="We’ll verify the ID with your bank" />
      <div className="flex gap-2.5">
        <Button type="submit" disabled={busy}>{busy && <Loader2 className="size-4 animate-spin" />} Verify and save</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}

export default function Payments() {
  const { payments, removePayment } = useAccount()
  const { toast } = useStore()
  const [adding, setAdding] = useState(null)
  useEffect(() => {
    document.title = 'Saved payments · BAZAAR'
  }, [])
  const done = (msg) => {
    setAdding(null)
    toast({ title: msg })
  }
  const cards = payments.filter((p) => p.type === 'card')
  const upis = payments.filter((p) => p.type === 'upi')
  return (
    <div className="max-w-[760px]">
      <PageTitle title="Saved payments" subtitle="Cards and UPI IDs for one-tap checkout.">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setAdding('upi')}><Plus className="size-4" /> UPI ID</Button>
          <Button onClick={() => setAdding('card')}><Plus className="size-4" /> Card</Button>
        </div>
      </PageTitle>
      {adding === 'card' && <div className="mb-6"><AddCard onDone={done} onCancel={() => setAdding(null)} /></div>}
      {adding === 'upi' && <div className="mb-6"><AddUpi onDone={done} onCancel={() => setAdding(null)} /></div>}
      {payments.length === 0 && !adding ? (
        <EmptyState icon={CreditCard} title="No saved payment methods" body="Save a card or UPI ID at checkout, or add one here." />
      ) : (
        <div className="space-y-8">
          {cards.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-ink-950">Cards</h2>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {cards.map((c) => (
                  <li key={c.id} className="relative overflow-hidden rounded-xl bg-ink-950 p-5 text-white">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-semibold">{c.bank}</span>
                      <span className="text-xs font-bold tracking-wide text-white/80">{c.network}</span>
                    </div>
                    <p className="mt-8 font-mono text-lg tracking-[0.2em] num">•••• •••• •••• {c.last4}</p>
                    <div className="mt-3 flex items-end justify-between text-xs text-white/70">
                      <span>{c.name}</span>
                      <span className="num">Exp {c.expiry}</span>
                    </div>
                    <button type="button" onClick={() => { removePayment(c.id); toast({ title: 'Card removed' }) }} className="absolute right-4 top-12 text-xs font-semibold text-white/70 underline underline-offset-2 hover:text-white">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {upis.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-ink-950">UPI</h2>
              <ul className="mt-3 divide-y divide-ink-150 rounded-xl ring-1 ring-inset ring-ink-150">
                {upis.map((u) => (
                  <li key={u.id} className="flex items-center gap-3 p-4">
                    <span className="grid size-10 place-items-center rounded-full bg-ink-100"><Smartphone className="size-[18px]" /></span>
                    <span className="flex-1 text-sm font-medium">{u.vpa}</span>
                    <button type="button" onClick={() => { removePayment(u.id); toast({ title: 'UPI ID removed' }) }} className="text-[13px] font-semibold text-ink-600 hover:text-ink-950">Remove</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
