import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, CATEGORY_THUMBS } from '../data/products';
import { Lotus, ChevronDown, Search, User, Bag, Menu, X, Grid } from './Icons';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import AccountModal from './AccountModal';
import './Navbar.css';

export default function Navbar({ route }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [widget, setWidget] = useState(null); // 'search' | 'cart' | 'account' | null
  const [cartCount] = useState(0);
  const closeTimer = useRef(null);

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = (delay = 140) => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(false), delay);
  };

  // Escape closes everything (dropdown / drawers / mobile menu)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (e.target.tagName === 'INPUT' && e.target.value) return;
      setDropdownOpen(false);
      setMobileOpen(false);
      setWidget(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const categoryHref = (id) => `#/products?cat=${id}`;
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="nav glass">
        <a className="brand" href="#/" aria-label="نیلگون گالری — صفحهٔ اصلی">
          <Lotus size={30} className="brand-icon" />
          <span className="brand-text">
            <b>نیلگون گالری</b>
            <i>Nilgoon Gallery</i>
          </span>
        </a>

        <nav className="nav-menu" aria-label="منوی اصلی">
          <a href="#/" className={route.path === '/' ? 'active' : ''}>خانه</a>

          <div
            className={`nav-item ${dropdownOpen ? 'open' : ''}`}
            onMouseEnter={openDropdown}
            onMouseLeave={() => closeDropdown()}
          >
            <button
              type="button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              محصولات
              <ChevronDown size={15} className={`dd-chev ${dropdownOpen ? 'up' : ''}`} />
            </button>

            <div className="dropdown" role="menu">
              {CATEGORIES.map((c) => (
                <a key={c.id} role="menuitem" href={categoryHref(c.id)} onClick={() => setDropdownOpen(false)}>
                  <span className="dd-thumb">
                    {CATEGORY_THUMBS[c.id] ? (
                      <img src={CATEGORY_THUMBS[c.id]} alt="" loading="lazy" />
                    ) : (
                      <Lotus size={18} />
                    )}
                  </span>
                  <span>{c.nameFa}</span>
                </a>
              ))}
              <div className="dropdown-divider" />
              <a role="menuitem" href="#/products" className="dd-all" onClick={() => setDropdownOpen(false)}>
                <span>همه محصولات</span>
                <Grid size={16} />
              </a>
            </div>
          </div>

          <a href="#/about" className={route.path === '/about' ? 'active' : ''}>درباره ما</a>
          <a href="#/contact" className={route.path === '/contact' ? 'active' : ''}>تماس با ما</a>
        </nav>

        <div className="nav-actions">
          <button type="button" className="icon-btn" aria-label="جستجو" onClick={() => setWidget('search')}>
            <Search />
          </button>
          <button type="button" className="icon-btn" aria-label="حساب کاربری" onClick={() => setWidget('account')}>
            <User />
          </button>
          <button type="button" className="icon-btn" aria-label="سبد خرید" onClick={() => setWidget('cart')}>
            <Bag />
            <span className="badge" aria-label={`${cartCount} محصول در سبد`}>{cartCount}</span>
          </button>
          <button type="button" className="icon-btn hamburger" aria-label="باز کردن منو" onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile drawer menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} role="dialog" aria-label="منوی موبایل">
        <button type="button" className="icon-btn mobile-close" aria-label="بستن منو" onClick={closeMobile}>
          <X />
        </button>
        <a href="#/" onClick={closeMobile}>خانه</a>
        <div className="mobile-heading">محصولات</div>
        <div className="mobile-cats">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={categoryHref(c.id)} onClick={closeMobile}>{c.nameFa}</a>
          ))}
          <a href="#/products" className="all" onClick={closeMobile}>همه محصولات</a>
        </div>
        <a href="#/about" onClick={closeMobile}>درباره ما</a>
        <a href="#/contact" onClick={closeMobile}>تماس با ما</a>
      </div>

      {widget === 'search' && <SearchOverlay onClose={() => setWidget(null)} />}
      {widget === 'cart' && <CartDrawer count={cartCount} onClose={() => setWidget(null)} />}
      {widget === 'account' && <AccountModal onClose={() => setWidget(null)} />}
    </>
  );
}
