import { useEffect, useState } from 'react'
import { Link, useRouter } from '../../router/Router'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'
import { site } from '../../data/site'
import { useCart } from '../../hooks/useCart'
import { useUi } from '../../store/ui'
import useCategories from '../../hooks/useCategories'
import { toPersianDigits } from '../../utils/format'

/**
 * Header — floating glass navigation (reference image 1).
 * Brand at the start, centred nav with the «محصولات» mega menu, and the
 * account / search / bag cluster at the end.
 */
export default function Header() {
  const { pathname, search } = useRouter()
  const { count } = useCart()
  const ui = useUi()
  const categories = useCategories()
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
  }, [pathname, search])

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <>
      <header className={`ng-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="ng-header__bar">
          <Link to="/" className="ng-header__brand" aria-label={site.name}>
            <Logo />
          </Link>

          <nav className="ng-nav" aria-label="ناوبری اصلی">
            {site.nav.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className="ng-nav__mega-wrap"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  onFocus={() => setMegaOpen(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setMegaOpen(false)
                  }}
                >
                  <Link
                    to={item.to}
                    className={`ng-nav__link ${isActive(item.to) ? 'is-active' : ''}`}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <Icon
                      name="chevronDown"
                      size={16}
                      className={`ng-nav__chevron ${megaOpen ? 'is-open' : ''}`}
                    />
                  </Link>
                  <MegaMenu
                    open={megaOpen}
                    categories={categories}
                    onSelect={() => setMegaOpen(false)}
                  />
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`ng-nav__link ${isActive(item.to) ? 'is-active' : ''}`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="ng-header__actions">
            <button
              type="button"
              className="ng-iconbtn"
              onClick={ui.openSearch}
              aria-label="جستجو در محصولات"
            >
              <Icon name="search" />
            </button>
            <Link to="/account" className="ng-iconbtn" aria-label="حساب کاربری">
              <Icon name="user" />
            </Link>
            <button
              type="button"
              className="ng-iconbtn ng-iconbtn--bag"
              onClick={ui.openCart}
              aria-label={`سبد خرید، ${toPersianDigits(count)} کالا`}
            >
              <Icon name="cart" />
              {count > 0 && <span className="ng-badge">{toPersianDigits(count)}</span>}
            </button>
            <button
              type="button"
              className="ng-iconbtn ng-header__burger"
              onClick={ui.openMenu}
              aria-label="باز کردن منو"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={ui.menuOpen}
        onClose={ui.closeMenu}
        categories={categories}
        onOpenSearch={ui.openSearch}
        onOpenCart={ui.openCart}
        cartCount={count}
      />
    </>
  )
}
