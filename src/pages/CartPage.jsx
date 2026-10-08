import { Link } from '../router/Router'
import PageHeader from '../components/layout/PageHeader'
import QuantityStepper from '../components/commerce/QuantityStepper'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Price from '../components/ui/Price'
import { useCart } from '../hooks/useCart'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import { formatPrice, toPersianDigits } from '../utils/format'

/** CartPage — «سبد خرید». */
export default function CartPage() {
  const { items, count, subtotal, setQuantity, removeItem } = useCart()

  useSeo({ title: 'سبد خرید', description: 'سبد خرید شما در نیلگون گالری.', canonical: '/cart' })

  return (
    <>
      <PageHeader
        title="سبد خرید"
        subtitle={count > 0 ? `${toPersianDigits(count)} کالا در سبد خرید شما` : undefined}
        crumbs={[{ label: 'سبد خرید' }]}
      />

      <section className="ng-section">
        {items.length === 0 ? (
          <div className="ng-empty">
            <span className="ng-empty__icon">
              <Icon name="cart" size={32} />
            </span>
            <p className="ng-empty__title">{site.messages.emptyCart}</p>
            <Button to="/products" variant="gold">
              {site.messages.browseProducts}
            </Button>
          </div>
        ) : (
          <div className="ng-cart">
            <ul className="ng-cart__list">
              {items.map((item) => (
                <li key={item.key} className="ng-cart__row">
                  <Link to={`/product/${item.slug}`} className="ng-cart__media">
                    <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                  </Link>

                  <div className="ng-cart__info">
                    <Link to={`/product/${item.slug}`} className="ng-cart__name">
                      {item.name}
                    </Link>
                    <span className="ng-cart__material">{item.material}</span>
                    <Price price={item.regularPrice} salePrice={item.price} size="sm" />
                  </div>

                  <div className="ng-cart__qty">
                    <QuantityStepper
                      value={item.quantity}
                      max={item.stock ?? undefined}
                      onChange={(quantity) => setQuantity(item.key, quantity)}
                    />
                  </div>

                  <div className="ng-cart__line">
                    {formatPrice(item.price * item.quantity, site.currency)}
                  </div>

                  <button
                    type="button"
                    className="ng-cart__remove"
                    onClick={() => removeItem(item.key)}
                    aria-label={`حذف ${item.name}`}
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="ng-summary" aria-label="خلاصه سفارش">
              <h2 className="ng-summary__title">خلاصه سفارش</h2>
              <div className="ng-summary__row">
                <span>جمع محصولات</span>
                <strong>{formatPrice(subtotal, site.currency)}</strong>
              </div>
              <div className="ng-summary__row">
                <span>هزینه ارسال</span>
                <span className="ng-summary__muted">در مرحله تسویه محاسبه می‌شود</span>
              </div>
              <div className="ng-summary__row ng-summary__row--total">
                <span>مبلغ نهایی</span>
                <strong>{formatPrice(subtotal, site.currency)}</strong>
              </div>

              <Button to="/checkout" variant="gold" block>
                تسویه حساب
              </Button>
              <Link to="/products" className="ng-summary__back">
                <Icon name="arrowRight" size={16} />
                ادامه خرید
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
