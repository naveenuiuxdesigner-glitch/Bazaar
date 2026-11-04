import { lazy, Suspense } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import { AccountProvider } from './context/AccountContext'
import { Layout } from './components/layout/Layout'
import { RequireAuth } from './components/auth/RequireAuth'
import Home from './pages/Home'

const Listing = lazy(() => import('./pages/Listing'))
const Product = lazy(() => import('./pages/Product'))
const Compare = lazy(() => import('./pages/Compare'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Cart = lazy(() => import('./pages/Cart'))
const Categories = lazy(() => import('./pages/Categories'))
const RecentlyViewed = lazy(() => import('./pages/RecentlyViewed'))
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderPlaced = lazy(() => import('./pages/OrderPlaced'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetail = lazy(() => import('./pages/OrderDetail'))
const ReturnRequest = lazy(() => import('./pages/ReturnRequest'))
const Invoice = lazy(() => import('./pages/Invoice'))
const AccountLayout = lazy(() => import('./pages/account/AccountLayout'))
const AccountOverview = lazy(() => import('./pages/account/Overview'))
const Profile = lazy(() => import('./pages/account/Profile'))
const Addresses = lazy(() => import('./pages/account/Addresses'))
const Payments = lazy(() => import('./pages/account/Payments'))
const Security = lazy(() => import('./pages/account/Security'))
const Plus = lazy(() => import('./pages/Plus'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Help = lazy(() => import('./pages/Help'))
const Credits = lazy(() => import('./pages/Credits'))
const NotFound = lazy(() => import('./pages/NotFound'))

const page = (el) => <Suspense fallback={<div className="min-h-[60vh]" />}>{el}</Suspense>
const guarded = (el) => page(<RequireAuth>{el}</RequireAuth>)

// The hosted preview is served from a single page URL, so it routes with the hash.
const createRouter = import.meta.env.VITE_HASH_ROUTER ? createHashRouter : createBrowserRouter

const router = createRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/c/:slug', element: page(<Listing mode="category" />) },
      { path: '/brand/:brand', element: page(<Listing mode="brand" />) },
      { path: '/search', element: page(<Listing mode="search" />) },
      { path: '/deals', element: page(<Listing mode="deals" />) },
      { path: '/p/:id', element: page(<Product />) },
      { path: '/compare', element: page(<Compare />) },
      { path: '/wishlist', element: page(<Wishlist />) },
      { path: '/cart', element: page(<Cart />) },
      { path: '/categories', element: page(<Categories />) },
      { path: '/recently-viewed', element: page(<RecentlyViewed />) },
      { path: '/login', element: page(<Login />) },
      { path: '/signup', element: page(<Signup />) },
      { path: '/forgot-password', element: page(<ForgotPassword />) },
      { path: '/checkout', element: guarded(<Checkout />) },
      { path: '/order-placed/:id', element: guarded(<OrderPlaced />) },
      { path: '/orders', element: guarded(<Orders />) },
      { path: '/orders/:id', element: guarded(<OrderDetail />) },
      { path: '/orders/:id/return', element: guarded(<ReturnRequest />) },
      { path: '/notifications', element: guarded(<Notifications />) },
      { path: '/help', element: page(<Help />) },
      { path: '/plus', element: page(<Plus />) },
      { path: '/credits', element: page(<Credits />) },
      {
        path: '/account',
        element: guarded(<AccountLayout />),
        children: [
          { index: true, element: page(<AccountOverview />) },
          { path: 'profile', element: page(<Profile />) },
          { path: 'addresses', element: page(<Addresses />) },
          { path: 'payments', element: page(<Payments />) },
          { path: 'security', element: page(<Security />) },
        ],
      },
      { path: '*', element: page(<NotFound />) },
    ],
  },
  // The invoice prints on its own, without the store chrome.
  { path: '/orders/:id/invoice', element: guarded(<Invoice />) },
])

export default function App() {
  return (
    <StoreProvider>
      <AccountProvider>
        <RouterProvider router={router} />
      </AccountProvider>
    </StoreProvider>
  )
}
