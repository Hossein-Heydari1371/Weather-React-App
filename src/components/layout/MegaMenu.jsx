import { Link } from '../../router/Router'
import Icon from '../ui/Icon'
import { formatNumber } from '../../utils/format'

/**
 * MegaMenu — the glass dropdown under «محصولات».
 * Category thumbnails, names and counts come from CategoryService, so new
 * categories appear here automatically.
 */
export default function MegaMenu({ open, categories, onSelect }) {
  return (
    <div className={`ng-mega ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="ng-mega__panel">
        <ul className="ng-mega__list">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/products?category=${category.slug}`}
                className="ng-mega__item"
                onClick={onSelect}
                tabIndex={open ? 0 : -1}
              >
                <span className="ng-mega__thumb">
                  <img src={category.image} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="ng-mega__info">
                  <span className="ng-mega__name">{category.name}</span>
                  <span className="ng-mega__count">{formatNumber(category.count)} محصول</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/products" className="ng-mega__all" onClick={onSelect} tabIndex={open ? 0 : -1}>
          <Icon name="grid" size={18} />
          همه محصولات
        </Link>
      </div>
    </div>
  )
}
