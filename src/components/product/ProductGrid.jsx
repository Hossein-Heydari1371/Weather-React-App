import Icon from '../ui/Icon'
import ProductCard from './ProductCard'
import { site } from '../../data/site'

/**
 * ProductGrid — responsive grid (4 / 3 / 2 / 2 columns via CSS).
 * Pure layout: every new product returned by the service shows up here.
 */
export default function ProductGrid({ products = [], emptyMessage }) {
  if (!products.length) {
    return (
      <div className="ng-empty ng-empty--inline">
        <span className="ng-empty__icon">
          <Icon name="search" size={28} />
        </span>
        <p className="ng-empty__title">{emptyMessage || site.messages.noResults}</p>
      </div>
    )
  }

  return (
    <div className="ng-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
