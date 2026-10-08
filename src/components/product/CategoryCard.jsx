import { Link } from '../../router/Router'
import Icon from '../ui/Icon'
import { formatNumber } from '../../utils/format'

/** CategoryCard — image-led tile used in the homepage category showcase. */
export default function CategoryCard({ category, index = 0 }) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="ng-catcard"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <span className="ng-catcard__media">
        <img src={category.image} alt={category.name} loading="lazy" decoding="async" />
      </span>
      <span className="ng-catcard__scrim" aria-hidden="true" />
      <span className="ng-catcard__body">
        <span className="ng-catcard__name">{category.name}</span>
        <span className="ng-catcard__count">{formatNumber(category.count)} محصول</span>
        <span className="ng-catcard__cta">
          مشاهده
          <Icon name="arrowLeft" size={16} />
        </span>
      </span>
    </Link>
  )
}
