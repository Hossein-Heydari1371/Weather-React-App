import { formatPrice } from '../../utils/format'

/** Price — regular price, or sale price with the crossed-out regular price. */
export default function Price({ price, salePrice, currency = 'تومان', size = 'md', className = '' }) {
  const onSale = Boolean(salePrice) && salePrice < price

  if (onSale) {
    return (
      <span className={`ng-price ng-price--${size} ng-price--sale ${className}`.trim()}>
        <span className="ng-price__now">{formatPrice(salePrice, currency)}</span>
        <s className="ng-price__was">{formatPrice(price, currency)}</s>
      </span>
    )
  }

  return (
    <span className={`ng-price ng-price--${size} ${className}`.trim()}>
      <span className="ng-price__now">{formatPrice(price, currency)}</span>
    </span>
  )
}
