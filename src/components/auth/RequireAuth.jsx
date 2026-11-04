import { Navigate, useLocation } from 'react-router-dom'
import { useAccount } from '../../context/AccountContext'

/** Sends signed-out shoppers to sign in, then brings them back to where they were going. */
export function RequireAuth({ children }) {
  const { user } = useAccount()
  const loc = useLocation()
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />
  return children
}
