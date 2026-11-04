// Small pincode directory used by the mock location service.
export const savedPlaces = [
  { pincode: '560001', lat: 12.97, lng: 77.6, city: 'Bengaluru', area: 'MG Road', label: 'Home' },
  { pincode: '400076', city: 'Mumbai', area: 'Powai', label: 'Work' },
]

export const popularCities = [
  { pincode: '110001', lat: 28.63, lng: 77.22, city: 'New Delhi', area: 'Connaught Place' },
  { pincode: '400001', lat: 18.93, lng: 72.83, city: 'Mumbai', area: 'Fort' },
  { pincode: '560001', city: 'Bengaluru', area: 'MG Road' },
  { pincode: '500081', lat: 17.45, lng: 78.38, city: 'Hyderabad', area: 'HITEC City' },
  { pincode: '600017', lat: 13.04, lng: 80.23, city: 'Chennai', area: 'T. Nagar' },
  { pincode: '411001', lat: 18.52, lng: 73.87, city: 'Pune', area: 'Camp' },
  { pincode: '700016', lat: 22.55, lng: 88.35, city: 'Kolkata', area: 'Park Street' },
  { pincode: '380009', lat: 23.03, lng: 72.56, city: 'Ahmedabad', area: 'Navrangpura' },
]

const regions = { 11: 'New Delhi', 12: 'Gurugram', 20: 'Noida', 30: 'Jaipur', 38: 'Ahmedabad', 40: 'Mumbai', 41: 'Pune', 50: 'Hyderabad', 56: 'Bengaluru', 60: 'Chennai', 68: 'Kochi', 70: 'Kolkata', 75: 'Bhubaneswar', 80: 'Patna', 16: 'Chandigarh', 22: 'Lucknow', 45: 'Indore', 44: 'Nagpur' }

export async function lookupPincode(pin) {
  await new Promise((r) => setTimeout(r, 500))
  if (!/^[1-8]\d{5}$/.test(pin)) return { ok: false, error: 'Enter a valid 6-digit Indian pincode.' }
  const known = [...popularCities, ...savedPlaces].find((c) => c.pincode === pin)
  if (known) return { ok: true, location: { pincode: pin, city: known.city, area: known.area } }
  const city = regions[pin.slice(0, 2)]
  if (!city) return { ok: false, error: 'We don’t deliver to this pincode yet.' }
  return { ok: true, location: { pincode: pin, city, area: '' } }
}

/** Resolves the browser's position to the nearest serviceable city. */
export function locateNearest() {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) return resolve({ ok: false, error: 'Location isn’t available in this browser.' })
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const near = [...popularCities].sort((a, b) => Math.hypot(a.lat - coords.latitude, a.lng - coords.longitude) - Math.hypot(b.lat - coords.latitude, b.lng - coords.longitude))[0]
        resolve({ ok: true, location: { pincode: near.pincode, city: near.city, area: near.area } })
      },
      () => resolve({ ok: false, error: 'We couldn’t get your location. Allow location access or enter a pincode.' }),
      { timeout: 8000 },
    )
  })
}

// First two pincode digits → state, for address autofill.
const STATES = [
  [11, 11, 'Delhi'], [12, 13, 'Haryana'], [14, 16, 'Punjab'], [17, 17, 'Himachal Pradesh'], [18, 19, 'Jammu & Kashmir'],
  [20, 28, 'Uttar Pradesh'], [30, 34, 'Rajasthan'], [36, 39, 'Gujarat'], [40, 44, 'Maharashtra'], [45, 48, 'Madhya Pradesh'],
  [49, 49, 'Chhattisgarh'], [50, 50, 'Telangana'], [51, 53, 'Andhra Pradesh'], [56, 59, 'Karnataka'], [60, 66, 'Tamil Nadu'],
  [67, 69, 'Kerala'], [70, 74, 'West Bengal'], [75, 77, 'Odisha'], [78, 78, 'Assam'], [79, 79, 'North East'], [80, 85, 'Bihar'],
]
export const stateFor = (pin) => {
  const n = +String(pin).slice(0, 2)
  return STATES.find(([a, b]) => n >= a && n <= b)?.[2] ?? ''
}
export const STATE_NAMES = [...new Set(STATES.map((s) => s[2]))].sort()
