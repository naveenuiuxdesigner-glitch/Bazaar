import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileTabBar } from './MobileTabBar'
import { CartDrawer } from '../cart/CartDrawer'
import { QuickView } from '../product/QuickView'
import { Toaster } from '../overlay/Toaster'
import { CompareBar } from '../product/CompareBar'

export function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
      <Header />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
      <CartDrawer />
      <QuickView />
      <CompareBar />
      <Toaster />
    </div>
  )
}
