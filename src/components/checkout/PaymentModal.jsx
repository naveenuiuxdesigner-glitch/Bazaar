import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Lock, ShieldCheck, Smartphone, XCircle } from 'lucide-react'
import { Overlay } from '../overlay/Overlay'
import { Button } from '../ui/Button'
import { TextField } from '../form/Field'
import { DEMO_OTP } from '../../data/payments'
import { formatPrice } from '../../lib/format'

function Spinner({ title, body }) {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <Loader2 className="size-10 animate-spin text-ink-950" />
      <p className="mt-5 font-display text-lg font-bold">{title}</p>
      {body && <p className="mt-1 max-w-xs text-sm text-ink-500">{body}</p>}
      <p className="mt-6 text-xs text-ink-400">Please don’t close this window or press back.</p>
    </div>
  )
}

function UpiWait({ info, amount, onApprove, onCancel }) {
  const [left, setLeft] = useState(300)
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    const auto = setTimeout(onApprove, 6500)
    return () => {
      clearInterval(t)
      clearTimeout(auto)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="py-4 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-ink-100">
        <Smartphone className="size-7 text-ink-800" />
      </span>
      <p className="mt-4 font-display text-xl font-bold">Approve {formatPrice(amount)} in your UPI app</p>
      <p className="mt-1 text-sm text-ink-600">
        We sent a request to <span className="font-semibold text-ink-950">{info.vpa ?? info.app}</span>. Open the app and enter your UPI PIN.
      </p>
      <div className="mx-auto mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-ink-100">
        <motion.div className="h-full bg-ink-950" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 6.5, ease: 'linear' }} />
      </div>
      <p className="mt-3 text-sm font-medium text-ink-700 num">
        Request expires in {Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
      </p>
      <p className="mt-1 text-xs text-ink-400">This demo approves automatically in a few seconds.</p>
      <div className="mt-6 flex justify-center gap-2.5">
        <Button variant="secondary" onClick={onCancel}>Cancel payment</Button>
        <Button onClick={onApprove}>I’ve approved it</Button>
      </div>
    </div>
  )
}

function OtpStep({ info, amount, phone, onSuccess, onFail, onCancel }) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [tries, setTries] = useState(3)
  const [busy, setBusy] = useState(false)
  const [resendIn, setResendIn] = useState(30)
  const ref = useRef(null)
  useEffect(() => {
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const submit = async (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(otp)) return setError('Enter the 6-digit OTP')
    setBusy(true)
    await new Promise((r) => setTimeout(r, 900))
    setBusy(false)
    if (otp === DEMO_OTP) return onSuccess()
    const left = tries - 1
    setTries(left)
    setOtp('')
    ref.current?.focus()
    if (left === 0) return onFail('Too many incorrect OTP attempts. Your bank has blocked this transaction; no money was taken.')
    setError(`That OTP isn’t right. ${left} ${left === 1 ? 'attempt' : 'attempts'} left.`)
  }
  return (
    <form onSubmit={submit} noValidate>
      <div className="flex items-center justify-between rounded-lg bg-ink-50 px-4 py-3 text-sm ring-1 ring-inset ring-ink-150">
        <span className="font-semibold">{info.bank ?? info.network ?? 'Your bank'} · Secure</span>
        <span className="inline-flex items-center gap-1 text-xs text-ink-500"><Lock className="size-3.5" /> 3-D Secure</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm">
        <dt className="text-ink-500">Merchant</dt><dd className="text-right font-medium">BAZAAR Marketplace</dd>
        <dt className="text-ink-500">Amount</dt><dd className="text-right font-semibold num">{formatPrice(amount)}</dd>
        <dt className="text-ink-500">Card</dt><dd className="text-right num">•••• {info.last4}</dd>
      </dl>
      <p className="mt-5 text-sm text-ink-700">Enter the one-time password sent to your mobile ending {phone.slice(-3)}.</p>
      <TextField
        ref={ref}
        className="mt-3"
        label="OTP"
        inputMode="numeric"
        autoComplete="one-time-code"
        autoFocus
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
          setError('')
        }}
        error={error}
        hint={`Demo OTP: ${DEMO_OTP}`}
        inputClassName="font-mono text-lg tracking-[0.5em]"
      />
      <div className="mt-2 text-[13px]">
        {resendIn ? (
          <span className="text-ink-500 num">Resend OTP in 0:{String(resendIn).padStart(2, '0')}</span>
        ) : (
          <button type="button" onClick={() => setResendIn(30)} className="font-semibold underline underline-offset-2">Resend OTP</button>
        )}
      </div>
      <div className="mt-6 flex gap-2.5">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="flex-1" disabled={busy}>
          {busy && <Loader2 className="size-4 animate-spin" />} Verify & pay
        </Button>
      </div>
    </form>
  )
}

function BankLogin({ info, amount, onSuccess, onCancel }) {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState({})
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (id.trim().length < 4) errs.id = 'Enter your customer ID'
    if (pw.length < 4) errs.pw = 'Enter your password'
    setErr(errs)
    if (Object.keys(errs).length) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 1200))
    onSuccess()
  }
  return (
    <form onSubmit={submit} noValidate>
      <div className="rounded-lg bg-ink-950 px-4 py-3 text-white">
        <p className="text-sm font-semibold">{info.bank} NetBanking</p>
        <p className="text-xs text-white/60">Pay {formatPrice(amount)} to BAZAAR Marketplace</p>
      </div>
      <div className="mt-4 space-y-3.5">
        <TextField label="Customer ID" autoFocus value={id} onChange={(e) => setId(e.target.value)} error={err.id} hint="Demo: any 4+ characters" />
        <TextField label="Password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} error={err.pw} />
      </div>
      <div className="mt-6 flex gap-2.5">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="flex-1" disabled={busy}>
          {busy && <Loader2 className="size-4 animate-spin" />} Confirm payment
        </Button>
      </div>
    </form>
  )
}

/**
 * Simulated payment gateway: UPI collect request, card OTP (3-D Secure), bank login,
 * or straight through for cash on delivery. Calls onPaid() once the payment succeeds.
 */
export function PaymentModal({ open, method, info, amount, phone, onPaid, onClose }) {
  const [stage, setStage] = useState('start')
  const [failure, setFailure] = useState('')

  useEffect(() => {
    if (!open) return
    setFailure('')
    setStage('start')
    const t = setTimeout(() => setStage(method === 'cod' ? 'placing' : method === 'upi' ? 'upi' : method === 'netbanking' ? 'bank' : 'otp'), method === 'cod' ? 200 : 1100)
    return () => clearTimeout(t)
  }, [open, method])

  useEffect(() => {
    if (stage !== 'placing') return
    const t = setTimeout(() => {
      setStage('success')
      setTimeout(onPaid, 900)
    }, 1100)
    return () => clearTimeout(t)
  }, [stage]) // eslint-disable-line react-hooks/exhaustive-deps

  const fail = (msg) => {
    setFailure(msg)
    setStage('failed')
  }
  const cancel = () => fail('You cancelled the payment. No money was taken.')
  const busy = ['start', 'placing', 'success'].includes(stage)

  return (
    <Overlay open={open} onClose={busy ? () => {} : onClose} label="Payment" className="md:!w-[460px]">
      <div className="max-h-[92dvh] overflow-y-auto p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-ink-950 p-4 text-white shadow-lg shadow-ink-950/10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10"><ShieldCheck className="size-5 text-save-300" /></span>
            <span className="min-w-0"><span className="block text-xs font-medium text-white/65">Secure checkout</span><span className="block truncate text-sm font-semibold">{stage === 'success' ? 'Payment confirmed' : method === 'cod' ? 'Cash on delivery' : 'Complete your payment'}</span></span>
          </div>
          <span className="shrink-0 text-right"><span className="block text-[10px] font-medium uppercase tracking-wider text-white/55">Total</span><span className="block text-lg font-bold num">{formatPrice(amount)}</span></span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={stage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {stage === 'start' && <Spinner title={method === 'cod' ? 'Placing your order' : 'Connecting to secure payment'} body={method === 'cod' ? null : info.label} />}
            {stage === 'upi' && <UpiWait info={info} amount={amount} onApprove={() => setStage('placing')} onCancel={cancel} />}
            {stage === 'otp' && <OtpStep info={info} amount={amount} phone={phone} onSuccess={() => setStage('placing')} onFail={fail} onCancel={cancel} />}
            {stage === 'bank' && <BankLogin info={info} amount={amount} onSuccess={() => setStage('placing')} onCancel={cancel} />}
            {stage === 'placing' && <Spinner title={method === 'cod' ? 'Placing your order' : 'Payment received, confirming your order'} />}
            {stage === 'success' && (
              <div className="flex flex-col items-center py-10 text-center">
                <motion.span initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 420, damping: 16 }}>
                  <CheckCircle2 className="size-14 text-save-700" />
                </motion.span>
                <p className="mt-4 font-display text-xl font-bold">{method === 'cod' ? 'Order placed' : 'Payment successful'}</p>
              </div>
            )}
            {stage === 'failed' && (
              <div className="py-4 text-center">
                <XCircle className="mx-auto size-12 text-danger-600" />
                <p className="mt-4 font-display text-xl font-bold">Payment not completed</p>
                <p className="mx-auto mt-1 max-w-xs text-sm text-ink-600">{failure}</p>
                <div className="mt-6 flex justify-center gap-2.5">
                  <Button variant="secondary" onClick={onClose}>Change method</Button>
                  <Button
                    onClick={() => {
                      setStage('start')
                      setTimeout(() => setStage(method === 'upi' ? 'upi' : method === 'netbanking' ? 'bank' : 'otp'), 900)
                    }}
                  >
                    Try again
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 flex items-center justify-center gap-1.5 border-t border-ink-150 pt-4 text-xs text-ink-500">
          <ShieldCheck className="size-4" /> Simulated payment. No real money moves in this demo.
        </p>
      </div>
    </Overlay>
  )
}
