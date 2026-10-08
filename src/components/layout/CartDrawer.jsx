import { Link, useRouter } from '../../router/Router'
import Drawer from '../ui/Drawer'
import Icon from '../ui/Icon'
import Price from '../ui/Price'
import Button from '../ui/Button'
import QuantityStepper from '../commerce/QuantityStepper'
import { useCart } from '../../hooks/useCart'
import { useUi } from '../../store/ui'
import { site } from '../../data/site'
import { formatPrice, toPersianDigits } from '../../utils/format'

/**
 * CartDrawer — the cart UI.
 * Talks to CartService only; swapping in the WooCommerce Store API cart leaves
 * this component untouched.
 */
export default function CartDrawer() {
  const { items, count, subtotal, setQuantity, removeItem } = useCart()
  const ui = useUi()
  const { navigate } = useRouter()

  const go = (to) => {
    ui.closeCart()
    navigate(to)
  }

  return (
    <Drawer
      open={ui.cartOpen}
      onClose={ui.closeCart}
      title={`سبد خرید${count > 0 ? ` (${toPersianDigits(count)})` : ''}`}
      side="end"
      footer={
        items.length > 0 ? (
          <div className="ng-cart-foot">
            <div className="ng-cart-foot__row">
              <span>جمع محصولات</span>
              <strong>{formatPrice(subtotal, site.currency)}</strong>
            </div>
            <p className="ng-cart-foot__note">هزینه ارسال در مرحله تسویه حساب محاسبه می‌شود.</p>
            <Button variant="gold" block onClick={() => go('/checkout')}>
              تسویه حساب
            </Button>
            <Button variant="outline" block onClick={() => go('/cart')}>
              مشاهده سبد خرید
            </Button>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <div className="ng-empty">
          <span className="ng-empty__icon">
            <Icon name="cart" size={30} />
          </span>
          <p className="ng-empty__title">{site.messages.emptyCart}</p>
          <Button variant="gold" onClick={() => go('/products')}>
            {site.messages.browseProducts}
          </Button>
        </div>
      ) : (
        <ul className="ng-lineitems">
          {items.map((item) => (
            <li key={item.key} className="ng-lineitem">
              <Link to={`/product/${item.slug}`} className="ng-lineitem__media" onClick={ui.closeCart}>
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
              </Link>
              <div className="ng-lineitem__info">
                <Link to={`/product/${item.slug}`} className="ng-lineitem__name" onClick={ui.closeCart}>
                  {item.name}
                </Link>
                <Price price={item.regularPrice} salePrice={item.price} size="sm" />
                <div className="ng-lineitem__controls">
                  <QuantityStepper
                    value={item.quantity}
                    max={item.stock ?? undefined}
                    size="sm"
                    onChange={(quantity) => setQuantity(item.key, quantity)}
                  />
                  <button
                    type="button"
                    className="ng-lineitem__remove"
                    onClick={() => removeItem(item.key)}
                    aria-label={`حذف ${item.name}`}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
