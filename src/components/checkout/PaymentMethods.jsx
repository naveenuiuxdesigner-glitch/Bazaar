import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Banknote, BadgeCheck, Building2, CalendarClock, CreditCard, Loader2, Smartphone } from 'lucide-react'
import { RadioCard, SelectField, TextField, Checkbox } from '../form/Field'
import { BANKS, COD_LIMIT, EMI_BANKS, EMI_MIN, EMI_TENURES, OTHER_BANKS, UPI_APPS, emiPlan, isNoCost, paymentOffer } from '../../data/payments'
import * as v from '../../lib/validate'
import { formatPrice } from '../../lib/format'

export const initialPayment = (payments) => {
  const vpa = payments.find((p) => p.type === 'upi')
  const card = payments.find((p) => p.type === 'card')
  return {
    method: 'upi',
    upi: { choice: vpa ? vpa.id : 'app:gpay', vpa: '', verified: null },
    card: { choice: card ? card.id : 'new', number: '', expiry: '', cvv: '', name: '', save: true },
    nb: { bank: 'hdfc' },
    emi: { bank: 'hdfc', months: 6, number: '', expiry: '', cvv: '', name: '' },
  }
}

/** Validates the selected method and describes it for the order record. */
export function checkPayment(pay, payments, amount) {
  const errors = {}
  let info = null
  const saved = (id) => payments.find((p) => p.id === id)
  if (pay.method === 'upi') {
    const c = pay.upi.choice
    if (c === 'new') {
      const e = v.upiId(pay.upi.vpa)
      if (e) errors['upi.vpa'] = e
      else if (!pay.upi.verified) errors['upi.vpa'] = 'Verify your UPI ID to continue'
      info = { label: `UPI · ${pay.upi.vpa.trim()}`, short: 'UPI account', vpa: pay.upi.vpa.trim() }
    } else if (c.startsWith('app:')) {
      const app = UPI_APPS.find((a) => `app:${a.id}` === c)
      info = { label: `UPI · ${app.name}`, short: `${app.name} UPI account`, app: app.name }
    } else {
      info = { label: `UPI · ${saved(c).vpa}`, short: 'UPI account', vpa: saved(c).vpa }
    }
  }
  if (pay.method === 'card') {
    const c = pay.card.choice
    if (c === 'new') {
      const net = v.cardNetwork(pay.card.number)
      Object.assign(
        errors,
        Object.fromEntries(
          Object.entries(
            v.validate(pay.card, {
              number: v.cardNumber,
              expiry: v.expiry,
              cvv: (x) => v.cvv(x, net),
              name: (x) => (String(x).trim().length >= 2 ? '' : 'Enter the name on the card'),
            }),
          ).map(([k, m]) => [`card.${k}`, m]),
        ),
      )
      const digits = pay.card.number.replace(/\D/g, '')
      const bank = v.cardBank(digits)
      info = { label: `${bank ? `${bank} ` : ''}${net ?? 'Card'} card ending ${digits.slice(-4)}`, short: bank ? `${bank} card` : `${net ?? ''} card`.trim(), bank, network: net, last4: digits.slice(-4) }
    } else {
      const s = saved(c)
      const e = v.cvv(pay.card.cvv, s.network)
      if (e) errors['card.cvv'] = e
      info = { label: `${s.bank} ${s.network} card ending ${s.last4}`, short: `${s.bank} card`, bank: s.bank, network: s.network, last4: s.last4 }
    }
  }
  if (pay.method === 'netbanking') {
    if (!pay.nb.bank) errors['nb.bank'] = 'Choose your bank'
    const b = BANKS.find((x) => x.id === pay.nb.bank)?.name ?? pay.nb.bank
    info = { label: `Net banking · ${b}`, short: `${b} account`, bank: b }
  }
  if (pay.method === 'emi') {
    const net = v.cardNetwork(pay.emi.number)
    Object.assign(
      errors,
      Object.fromEntries(
        Object.entries(
          v.validate(pay.emi, {
            number: v.cardNumber,
            expiry: v.expiry,
            cvv: (x) => v.cvv(x, net),
            name: (x) => (String(x).trim().length >= 2 ? '' : 'Enter the name on the card'),
          }),
        ).map(([k, m]) => [`emi.${k}`, m]),
      ),
    )
    const b = EMI_BANKS.find((x) => x.id === pay.emi.bank)
    const plan = emiPlan(amount, pay.emi.months, b.rate, isNoCost(amount, pay.emi.months))
    info = { label: `${plan.noCost ? 'No-cost EMI' : 'EMI'} · ${b.name}, ${plan.months} months of ${formatPrice(plan.monthly)}`, short: `${b.name} card`, bank: b.name, plan, last4: pay.emi.number.replace(/\D/g, '').slice(-4) }
  }
  if (pay.method === 'cod') {
    if (amount > COD_LIMIT) errors.cod = `Cash on delivery is available up to ${formatPrice(COD_LIMIT)}`
    info = { label: 'Cash on delivery', short: 'cash on delivery', status: 'Pay at delivery' }
  }
  return { errors, info }
}

function CardFields({ value, onChange, errors, prefix, showSave }) {
  const net = v.cardNetwork(value.number)
  const bank = v.cardBank(value.number)
  const set = (k, fn = (x) => x) => (e) => onChange({ ...value, [k]: fn(e.target.value, value[k]) })
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      <TextField
        className="sm:col-span-2"
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
        value={value.number}
        onChange={set('number', v.formatCardNumber)}
        error={errors[`${prefix}.number`]}
        hint={net ? `${bank ? `${bank} · ` : ''}${net}` : 'Visa, Mastercard, RuPay and Amex'}
        suffix={net ? <span className="mr-2 rounded bg-ink-100 px-1.5 py-0.5 text-[11px] font-bold text-ink-700">{net}</span> : null}
      />
      <TextField label="Expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" value={value.expiry} onChange={set('expiry', v.formatExpiry)} error={errors[`${prefix}.expiry`]} />
      <TextField label="CVV" inputMode="numeric" autoComplete="cc-csc" type="password" placeholder={net === 'Amex' ? '4 digits' : '3 digits'} value={value.cvv} onChange={set('cvv', (x) => x.replace(/\D/g, '').slice(0, 4))} error={errors[`${prefix}.cvv`]} />
      <TextField className="sm:col-span-2" label="Name on card" autoComplete="cc-name" value={value.name} onChange={set('name', (x) => x.toUpperCase())} error={errors[`${prefix}.name`]} />
      {showSave && <Checkbox className="sm:col-span-2" label="Save this card for faster checkout" description="We store only the last 4 digits. CVV is never saved." checked={value.save} onChange={(e) => onChange({ ...value, save: e.target.checked })} />}
      <p className="text-xs text-ink-500 sm:col-span-2">Demo tip: 4242 4242 4242 4242 works as an HDFC Bank card, any future expiry and any CVV.</p>
    </div>
  )
}

const METHODS = [
  { id: 'upi', icon: Smartphone, title: 'UPI', body: 'Google Pay, PhonePe, Paytm or any UPI app' },
  { id: 'card', icon: CreditCard, title: 'Credit or debit card', body: 'Visa, Mastercard, RuPay, Amex' },
  { id: 'netbanking', icon: Building2, title: 'Net banking', body: 'All major banks' },
  { id: 'emi', icon: CalendarClock, title: 'EMI', body: 'No-cost EMI on orders above ₹10,000' },
  { id: 'cod', icon: Banknote, title: 'Cash on delivery', body: 'Pay with cash or UPI at your door' },
]

export function PaymentMethods({ pay, setPay, payments, amount, errors }) {
  const [verifying, setVerifying] = useState(false)
  const savedVpas = payments.filter((p) => p.type === 'upi')
  const savedCards = payments.filter((p) => p.type === 'card')
  const setPart = (part, patch) => setPay((s) => ({ ...s, [part]: { ...s[part], ...patch } }))

  const verifyVpa = async () => {
    const e = v.upiId(pay.upi.vpa)
    if (e) return setPart('upi', { verified: null, error: e })
    setVerifying(true)
    await new Promise((r) => setTimeout(r, 700))
    setVerifying(false)
    const handle = pay.upi.vpa.split('@')[0].replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim()
    setPart('upi', { verified: handle ? handle.toUpperCase() : 'VERIFIED ACCOUNT' })
  }

  const disabled = (id) => (id === 'emi' && amount < EMI_MIN) || (id === 'cod' && amount > COD_LIMIT)
  const reason = (id) => (id === 'emi' ? `Available on orders of ${formatPrice(EMI_MIN)} or more` : `Available on orders up to ${formatPrice(COD_LIMIT)}`)

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Payment method">
      <div className="mb-4 flex items-start justify-between gap-3 rounded-xl bg-brand-50/70 p-4 ring-1 ring-inset ring-brand-100">
        <div>
          <p className="text-sm font-semibold text-ink-950">Choose how you’d like to pay</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-600">Your payment details stay protected through checkout.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-save-700 ring-1 ring-inset ring-save-100"><BadgeCheck className="size-3.5" /> Secure</span>
      </div>
      {METHODS.map(({ id, icon: Icon, title, body }) => {
        const active = pay.method === id
        const off = disabled(id)
        const offer = paymentOffer(id, amount, id === 'card' ? v.cardBank(pay.card.number) ?? payments.find((p) => p.id === pay.card.choice)?.bank : id === 'emi' ? EMI_BANKS.find((b) => b.id === pay.emi.bank)?.name : null)
        return (
          <div key={id} className={`overflow-hidden rounded-xl transition-all ${active ? 'bg-brand-50/30 shadow-[0_8px_24px_-18px_rgb(11_18_32/0.6)] ring-2 ring-brand-600' : 'bg-white ring-1 ring-inset ring-ink-200 hover:ring-ink-400'} ${off ? 'opacity-55' : ''}`}>
            <label className={`flex items-center gap-3.5 p-4 ${off ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <input type="radio" name="pay-method" value={id} checked={active} disabled={off} onChange={() => setPay((s) => ({ ...s, method: id }))} className="peer sr-only" />
              <span className={`grid size-5 shrink-0 place-items-center rounded-full ring-1 ring-inset peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink-950 ${active ? 'bg-ink-950 ring-ink-950' : 'bg-white ring-ink-300'}`}>
                <span className={`size-2 rounded-full bg-white transition-transform ${active ? 'scale-100' : 'scale-0'}`} />
              </span>
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${active ? 'bg-brand-100 text-brand-700' : 'bg-ink-50 text-ink-600'}`}><Icon className="size-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-ink-950">{title}</span>
                <span className="block text-[13px] text-ink-500">{off ? reason(id) : body}</span>
              </span>
              {offer && !off && <span className="rounded-full bg-save-50 px-2 py-1 text-[10px] font-semibold text-save-700 sm:text-[11px]">{offer.amount ? `Save ${formatPrice(offer.amount)}` : 'Offer'}</span>}
            </label>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }} className="overflow-hidden">
                  <div className="border-t border-ink-150 p-4">
                    {offer && <p className="mb-4 rounded-md bg-save-50 px-3 py-2 text-[13px] font-medium text-save-700">{offer.label} applied: −{formatPrice(offer.amount)}</p>}

                    {id === 'upi' && (
                      <div className="space-y-2.5">
                        {savedVpas.map((s) => (
                          <RadioCard key={s.id} name="upi-choice" value={s.id} checked={pay.upi.choice === s.id} onChange={() => setPart('upi', { choice: s.id })} className="py-3">
                            <span className="text-sm font-medium">{s.vpa}</span>
                            <span className="block text-xs text-ink-500">Saved UPI ID</span>
                          </RadioCard>
                        ))}
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                          {UPI_APPS.map((a) => {
                            const on = pay.upi.choice === `app:${a.id}`
                            return (
                              <label key={a.id} className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg p-3 text-center ring-1 ring-inset ${on ? 'ring-2 ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'}`}>
                                <input type="radio" name="upi-choice" className="peer sr-only" checked={on} onChange={() => setPart('upi', { choice: `app:${a.id}` })} />
                                <span className="grid size-9 place-items-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: a.color }} aria-hidden>
                                  {a.name[0]}
                                </span>
                                <span className="text-[12.5px] font-medium">{a.name}</span>
                              </label>
                            )
                          })}
                        </div>
                        <RadioCard name="upi-choice" value="new" checked={pay.upi.choice === 'new'} onChange={() => setPart('upi', { choice: 'new' })} className="py-3">
                          <span className="text-sm font-medium">Enter a UPI ID</span>
                        </RadioCard>
                        {pay.upi.choice === 'new' && (
                          <div className="pl-1">
                            <TextField
                              label="UPI ID"
                              placeholder="yourname@okbank"
                              autoComplete="off"
                              value={pay.upi.vpa}
                              onChange={(e) => setPart('upi', { vpa: e.target.value.trim(), verified: null, error: '' })}
                              error={pay.upi.error || errors['upi.vpa']}
                              suffix={
                                pay.upi.verified ? (
                                  <BadgeCheck className="mr-2 size-5 text-save-700" />
                                ) : (
                                  <button type="button" onClick={verifyVpa} className="mr-1 h-8 rounded-md bg-ink-950 px-3 text-xs font-semibold text-white">
                                    {verifying ? <Loader2 className="size-4 animate-spin" /> : 'Verify'}
                                  </button>
                                )
                              }
                              hint={pay.upi.verified ? `Verified: ${pay.upi.verified}` : 'We’ll send a payment request to this ID'}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {id === 'card' && (
                      <div className="space-y-2.5">
                        {savedCards.map((s) => (
                          <RadioCard key={s.id} name="card-choice" value={s.id} checked={pay.card.choice === s.id} onChange={() => setPart('card', { choice: s.id, cvv: '' })} className="py-3">
                            <span className="flex flex-wrap items-center justify-between gap-2">
                              <span>
                                <span className="text-sm font-medium">{s.bank} {s.network} •••• {s.last4}</span>
                                <span className="block text-xs text-ink-500">Expires {s.expiry}</span>
                              </span>
                              {pay.card.choice === s.id && (
                                <input
                                  aria-label="CVV"
                                  inputMode="numeric"
                                  type="password"
                                  placeholder="CVV"
                                  value={pay.card.cvv}
                                  onChange={(e) => setPart('card', { cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                  aria-invalid={!!errors['card.cvv']}
                                  className="h-9 w-20 rounded-md px-2.5 text-sm ring-1 ring-inset ring-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:ring-danger-600"
                                />
                              )}
                            </span>
                            {pay.card.choice === s.id && errors['card.cvv'] && <span className="mt-1 block text-xs text-danger-700">{errors['card.cvv']}</span>}
                          </RadioCard>
                        ))}
                        {savedCards.length > 0 && (
                          <RadioCard name="card-choice" value="new" checked={pay.card.choice === 'new'} onChange={() => setPart('card', { choice: 'new', cvv: '' })} className="py-3">
                            <span className="text-sm font-medium">Use a new card</span>
                          </RadioCard>
                        )}
                        {pay.card.choice === 'new' && <CardFields value={pay.card} onChange={(c) => setPay((s) => ({ ...s, card: c }))} errors={errors} prefix="card" showSave />}
                      </div>
                    )}

                    {id === 'netbanking' && (
                      <div>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                          {BANKS.map((b) => {
                            const on = pay.nb.bank === b.id
                            return (
                              <label key={b.id} className={`flex cursor-pointer items-center gap-2.5 rounded-lg p-3 ring-1 ring-inset ${on ? 'ring-2 ring-ink-950' : 'ring-ink-200 hover:ring-ink-400'}`}>
                                <input type="radio" name="nb-bank" className="sr-only" checked={on} onChange={() => setPart('nb', { bank: b.id })} />
                                <span className="grid size-8 shrink-0 place-items-center rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: b.color }} aria-hidden>
                                  {b.short.slice(0, 4)}
                                </span>
                                <span className="text-[13px] font-medium leading-tight">{b.name}</span>
                              </label>
                            )
                          })}
                        </div>
                        <SelectField className="mt-3" label="Other banks" value={BANKS.some((b) => b.id === pay.nb.bank) ? '' : pay.nb.bank} onChange={(e) => setPart('nb', { bank: e.target.value || 'hdfc' })}>
                          <option value="">Choose another bank</option>
                          {OTHER_BANKS.map((b) => (
                            <option key={b}>{b}</option>
                          ))}
                        </SelectField>
                        <p className="mt-3 text-xs text-ink-500">You’ll sign in to your bank’s secure page to approve the payment.</p>
                      </div>
                    )}

                    {id === 'emi' && (
                      <div className="space-y-4">
                        <SelectField label="EMI bank" value={pay.emi.bank} onChange={(e) => setPart('emi', { bank: e.target.value })}>
                          {EMI_BANKS.map((b) => (
                            <option key={b.id} value={b.id}>{b.name} credit card</option>
                          ))}
                        </SelectField>
                        <fieldset>
                          <legend className="mb-2 text-[13px] font-medium text-ink-800">Choose a plan</legend>
                          <div className="space-y-2">
                            {EMI_TENURES.map((m) => {
                              const b = EMI_BANKS.find((x) => x.id === pay.emi.bank)
                              const plan = emiPlan(amount, m, b.rate, isNoCost(amount, m))
                              return (
                                <RadioCard key={m} name="emi-months" value={m} checked={pay.emi.months === m} onChange={() => setPart('emi', { months: m })} className="py-3">
                                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                                    <span className="text-sm font-semibold num">
                                      {formatPrice(plan.monthly)} × {m} months
                                      {plan.noCost && <span className="ml-2 rounded-sm bg-save-50 px-1.5 py-0.5 text-[11px] font-semibold text-save-700">No cost</span>}
                                    </span>
                                    <span className="text-xs text-ink-500 num">{plan.interest ? `Interest ${formatPrice(plan.interest)} · total ${formatPrice(plan.total)}` : `Total ${formatPrice(plan.total)}`}</span>
                                  </span>
                                </RadioCard>
                              )
                            })}
                          </div>
                        </fieldset>
                        <CardFields value={pay.emi} onChange={(c) => setPay((s) => ({ ...s, emi: c }))} errors={errors} prefix="emi" />
                      </div>
                    )}

                    {id === 'cod' && (
                      <div className="text-sm text-ink-700">
                        <p>Pay {formatPrice(amount)} in cash, or scan the delivery partner’s UPI QR when your order arrives.</p>
                        <p className="mt-1.5 text-xs text-ink-500">Please keep exact change handy. Prepaid orders get the UPI offer of ₹100 off.</p>
                        {errors.cod && <p className="mt-2 text-xs text-danger-700">{errors.cod}</p>}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
