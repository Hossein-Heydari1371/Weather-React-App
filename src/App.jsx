import { useMemo } from 'react'
import { useRouter } from './router/Router'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartDrawer from './components/layout/CartDrawer'
import SearchOverlay from './components/layout/SearchOverlay'
import QuickView from './components/product/QuickView'
import Toast from './components/ui/Toast'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import WishlistPage from './pages/WishlistPage'
import AccountPage from './pages/AccountPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * Route table.
 * Clean URLs (/products, /product/<slug>) map straight onto the permalink
 * structure a WordPress theme would register.
 */
function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return { name: 'home' }
  if (path === '/products') return { name: 'shop' }
  if (path.startsWith('/product/')) {
    return { name: 'product', slug: decodeURIComponent(path.slice('/product/'.length)) }
  }
  if (path === '/cart') return { name: 'cart' }
  if (path === '/checkout') return { name: 'checkout' }
  if (path === '/wishlist') return { name: 'wishlist' }
  if (path === '/account') return { name: 'account' }
  if (path === '/about') return { name: 'about' }
  if (path === '/contact') return { name: 'contact' }
  if (path.startsWith('/page/')) return { name: 'legal', slug: path.slice('/page/'.length) }
  return { name: '404' }
}

function Page({ route }) {
  switch (route.name) {
    case 'home':
      return <HomePage />
    case 'shop':
      return <ShopPage />
    case 'product':
      return <ProductPage slug={route.slug} />
    case 'cart':
      return <CartPage />
    case 'checkout':
      return <CheckoutPage />
    case 'wishlist':
      return <WishlistPage />
    case 'account':
      return <AccountPage />
    case 'about':
      return <AboutPage />
    case 'contact':
      return <ContactPage />
    case 'legal':
      return <LegalPage slug={route.slug} />
    default:
      return <NotFoundPage />
  }
}

export default function App() {
  const { pathname } = useRouter()
  const route = useMemo(() => resolveRoute(pathname), [pathname])

  return (
    <>
      <a className="ng-skip" href="#ng-main">
        پرش به محتوای اصلی
      </a>

      <Header />

      <main id="ng-main" className="ng-main" key={route.name === 'product' ? route.slug : route.name}>
        <Page route={route} />
      </main>

      <Footer />

      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <Toast />
    </>
  )
}
