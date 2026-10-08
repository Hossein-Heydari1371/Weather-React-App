import { Link } from '../../router/Router'
import Icon from '../ui/Icon'
import Price from '../ui/Price'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../hooks/useWishlist'
import { useUi } from '../../store/ui'
import { discountPercent, toPersianDigits } from '../../utils/format'

/**
 * ProductCard — catalogue card with wishlist, quick view, add to cart and a
 * link to the detail page. Images keep their aspect ratio (`object-fit`) so the
 * bags are never stretched or distorted.
 */
export default function ProductCard({ product, className = '' }) {
  const { addItem } = useCart()
  const wishlist = useWishlist()
  const ui = useUi()

  const soldOut = product.available === false || product.stock === 0
  const discount = discountPercent(product.price, product.salePrice)
  const liked = wishlist.has(product.id)
  const productUrl = `/product/${product.slug}`

  const addToCart = () => {
    if (soldOut) return
    addItem(product, 1)
    ui.showToast(`«${product.name}» به سبد خرید اضافه شد.`)
  }

  const toggleWishlist = () => {
    wishlist.toggle(product.id)
    ui.showToast(liked ? `«${product.name}» از علاقه‌مندی‌ها حذف شد.` : `«${product.name}» به علاقه‌مندی‌ها اضافه شد.`)
  }

  return (
    <article className={`ng-card ${soldOut ? 'is-soldout' : ''} ${className}`.trim()}>
      <div className="ng-card__media">
        <Link to={productUrl} className="ng-card__link" aria-label={product.name}>
          <img
            className="ng-card__img"
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </Link>

        <div className="ng-card__badges">
          {discount > 0 && (
            <span className="ng-tag ng-tag--sale">{toPersianDigits(discount)}٪ تخفیف</span>
          )}
          {product.featured && <span className="ng-tag ng-tag--featured">منتخب</span>}
          {soldOut && <span className="ng-tag ng-tag--out">ناموجود</span>}
        </div>

        <button
          type="button"
          className={`ng-card__fav ${liked ? 'is-active' : ''}`}
          onClick={toggleWishlist}
          aria-pressed={liked}
          aria-label={liked ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Icon name={liked ? 'heartFilled' : 'heart'} size={18} />
        </button>

        <div className="ng-card__hover">
          <button
            type="button"
            className="ng-card__quick"
            onClick={() => ui.openQuickView(product)}
          >
            <Icon name="eye" size={16} />
            نمایش سریع
          </button>
        </div>
      </div>

      <div className="ng-card__body">
        <Link to={`/products?category=${product.categorySlug}`} className="ng-card__cat">
          {product.category}
        </Link>
        <h3 className="ng-card__name">
          <Link to={productUrl}>{product.name}</Link>
        </h3>
        <p className="ng-card__desc">{product.shortDescription}</p>

        <Price price={product.price} salePrice={product.salePrice} currency={product.currency} />

        <div className="ng-card__actions">
          <Button variant="gold" size="sm" onClick={addToCart} disabled={soldOut}>
            {soldOut ? 'ناموجود' : 'افزودن به سبد'}
          </Button>
          <Link to={productUrl} className="ng-btn ng-btn--outline ng-btn--sm">
            جزئیات
          </Link>
        </div>
      </div>
    </article>
  )
}
