// Reference data for the simulated payment gateway.

export const UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', handle: 'okaxis', color: '#1A73E8' },
  { id: 'phonepe', name: 'PhonePe', handle: 'ybl', color: '#5F259F' },
  { id: 'paytm', name: 'Paytm', handle: 'paytm', color: '#00BAF2' },
  { id: 'bhim', name: 'BHIM', handle: 'upi', color: '#F47920' },
]

export const BANKS = [
  { id: 'sbi', name: 'State Bank of India', short: 'SBI', color: '#22409A' },
  { id: 'hdfc', name: 'HDFC Bank', short: 'HDFC', color: '#004C8F' },
  { id: 'icici', name: 'ICICI Bank', short: 'ICICI', color: '#AE282E' },
  { id: 'axis', name: 'Axis Bank', short: 'Axis', color: '#97144D' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', short: 'Kotak', color: '#ED1C24' },
  { id: 'pnb', name: 'Punjab National Bank', short: 'PNB', color: '#A6192E' },
]

export const OTHER_BANKS = ['Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IndusInd Bank', 'Yes Bank', 'IDFC FIRST Bank', 'Federal Bank', 'Bank of India', 'Indian Bank', 'RBL Bank']

// EMI: annual interest by bank. No-cost tenures waive interest as an upfront discount.
export const EMI_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', rate: 15 },
  { id: 'icici', name: 'ICICI Bank', rate: 15.5 },
  { id: 'sbi', name: 'SBI Card', rate: 14 },
  { id: 'axis', name: 'Axis Bank', rate: 15 },
]
export const EMI_TENURES = [3, 6, 9, 12]
export const EMI_MIN = 3000
export const NO_COST_MIN = 10000

/** Monthly instalment, interest and total for a plan. */
export function emiPlan(amount, months, rate, noCost) {
  if (noCost) return { months, monthly: Math.ceil(amount / months), interest: 0, total: amount, noCost: true }
  const r = rate / 1200
  const monthly = Math.ceil((amount * r * (1 + r) ** months) / ((1 + r) ** months - 1))
  return { months, monthly, interest: monthly * months - amount, total: monthly * months, noCost: false }
}
export const isNoCost = (amount, months) => amount >= NO_COST_MIN && months <= 6

export const COD_LIMIT = 50000
export const DEMO_OTP = '123456'

/** Payment-method offers applied at checkout. */
export function paymentOffer(method, total, bank) {
  if (method === 'upi' && total >= 1000) return { amount: 100, label: 'UPI offer: flat ₹100 off' }
  if ((method === 'card' || method === 'emi') && bank === 'HDFC Bank' && total >= 5000)
    return { amount: Math.min(Math.round(total * 0.1), 7500), label: 'HDFC Bank card: 10% instant discount' }
  return null
}
