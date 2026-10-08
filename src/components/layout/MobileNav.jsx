import { useState } from 'react'
import { Link } from '../../router/Router'
import Icon from '../ui/Icon'
import Drawer from '../ui/Drawer'
import Logo from '../ui/Logo'
import { site } from '../../data/site'

/**
 * MobileNav — a purpose-built mobile experience: full-height sheet with an
 * account shortcut, an expandable category list and quick contact actions.
 * (Not a shrunken desktop bar.)
 */
export default function MobileNav({ open, onClose, categories, onOpenSearch, onOpenCart, cartCount }) {
  const [productsOpen, setProductsOpen] = useState(true)

  return (
    <Drawer open={open} onClose={onClose} title="منو" side="end">
      <div className="ng-mobile">
        <div className="ng-mobile__head">
          <Logo />
          <p className="ng-mobile__tagline">{site.tagline}</p>
        </div>

        <nav className="ng-mobile__nav" aria-label="ناوبری موبایل">
          <Link to="/" className="ng-mobile__link" onClick={onClose}>
            <Icon name="grid" size={18} />
            <span>خانه</span>
          </Link>

          <div className="ng-mobile__group">
            <button
              type="button"
              className="ng-mobile__link ng-mobile__link--toggle"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
            >
              <Icon name="bag" size={18} />
              <span>محصولات</span>
              <Icon
                name="chevronDown"
                size={18}
                className={`ng-mobile__chevron ${productsOpen ? 'is-open' : ''}`}
              />
            </button>
            {productsOpen && (
              <ul className="ng-mobile__sub">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/products?category=${category.slug}`}
                      className="ng-mobile__sublink"
                      onClick={onClose}
                    >
                      <span className="ng-mobile__thumb">
                        <img src={category.image} alt="" loading="lazy" decoding="async" />
                      </span>
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/products" className="ng-mobile__sublink ng-mobile__sublink--all" onClick={onClose}>
                    همه محصولات
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link to="/about" className="ng-mobile__link" onClick={onClose}>
            <Icon name="sparkle" size={18} />
            <span>درباره ما</span>
          </Link>
          <Link to="/contact" className="ng-mobile__link" onClick={onClose}>
            <Icon name="mail" size={18} />
            <span>تماس با ما</span>
          </Link>
        </nav>

        <div className="ng-mobile__actions">
          <button
            type="button"
            className="ng-mobile__action"
            onClick={() => {
              onClose()
              onOpenSearch()
            }}
          >
            <Icon name="search" size={18} />
            جستجو
          </button>
          <Link to="/wishlist" className="ng-mobile__action" onClick={onClose}>
            <Icon name="heart" size={18} />
            علاقه‌مندی‌ها
          </Link>
          <Link to="/account" className="ng-mobile__action" onClick={onClose}>
            <Icon name="user" size={18} />
            حساب کاربری
          </Link>
          <button
            type="button"
            className="ng-mobile__action"
            onClick={() => {
              onClose()
              onOpenCart()
            }}
          >
            <Icon name="cart" size={18} />
            سبد خرید
            {cartCount > 0 && <span className="ng-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </Drawer>
  )
}
