import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { useCart } from '../hooks/useCart'
import { useSeo } from '../hooks/useSeo'
import { OrderService } from '../services/OrderService'
import { site } from '../data/site'
import { formatPrice, toPersianDigits } from '../utils/format'

const PROVINCES = [
  'آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'البرز', 'ایلام', 'بوشهر',
  'تهران', 'چهارمحال و بختیاری', 'خراسان جنوبی', 'خراسان رضوی', 'خراسان شمالی',
  'خوزستان', 'زنجان', 'سمنان', 'سیستان و بلوچستان', 'فارس', 'قزوین', 'قم', 'کردستان',
  'کرمان', 'کرمانشاه', 'کهگیلویه و بویراحمد', 'گلستان', 'گیلان', 'لرستان', 'مازندران',
  'مرکزی', 'هرمزگان', 'همدان', 'یزد',
]

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  province: '',
  city: '',
  address: '',
  postalCode: '',
  notes: '',
}

/**
 * CheckoutPage — RTL checkout UI with a fully designed order summary.
 *
 * ⚠️ No payment is processed: the order is stored locally as a prototype record
 * and the confirmation says so explicitly. WooCommerce replaces the payment and
 * order logic later (`POST /wp-json/wc/store/v1/checkout`).
 */
export default function CheckoutPage() {
  const { items, count, subtotal, clear } = useCart()
  const [form, setForm] = useState(EMPTY_FORM)
  const [order, setOrder] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useSeo({ title: 'تسویه حساب', description: 'ثبت سفارش در نیلگون گالری.', canonical: '/checkout' })

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    if (!items.length) return
    setSubmitting(true)
    const placed = await OrderService.placeOrder({
      customer: form,
      items,
      totals: { subtotal, shipping: 0, total: subtotal, currency: site.currency },
    })
    clear()
    setOrder(placed)
    setForm(EMPTY_FORM)
    setSubmitting(false)
    window.scrollTo(0, 0)
  }

  if (order) {
    return (
      <>
        <PageHeader title="ثبت سفارش" crumbs={[{ label: 'تسویه حساب' }]} />
        <section className="ng-section">
          <div className="ng-confirm">
            <span className="ng-confirm__icon" aria-hidden="true">
              <Icon name="check" size={28} />
            </span>
            <h2 className="ng-confirm__title">سفارش شما ثبت شد</h2>
            <p className="ng-confirm__number">شماره سفارش: {order.number}</p>
            <p className="ng-confirm__note">
              این نسخه پیش‌نمایش است؛ هیچ پرداختی انجام نشده و مبلغی از حساب شما کسر نشده است.
              پرداخت و پیگیری سفارش پس از اتصال به ووکامرس فعال می‌شود.
            </p>
            <div className="ng-confirm__actions">
              <Button to="/account" variant="gold">
                مشاهده سفارش‌ها
              </Button>
              <Button to="/products" variant="outline">
                ادامه خرید
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="تسویه حساب"
        subtitle={count > 0 ? `${toPersianDigits(count)} کالا در سفارش شما` : undefined}
        crumbs={[{ label: 'سبد خرید', to: '/cart' }, { label: 'تسویه حساب' }]}
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
          <form className="ng-checkout" onSubmit={submit}>
            <div className="ng-checkout__form">
              <h2 className="ng-checkout__heading">اطلاعات گیرنده</h2>

              <div className="ng-form-grid">
                <label className="ng-field">
                  <span className="ng-label">نام</span>
                  <input className="ng-input" required value={form.firstName} onChange={update('firstName')} />
                </label>
                <label className="ng-field">
                  <span className="ng-label">نام خانوادگی</span>
                  <input className="ng-input" required value={form.lastName} onChange={update('lastName')} />
                </label>
                <label className="ng-field">
                  <span className="ng-label">شماره موبایل</span>
                  <input
                    className="ng-input"
                    type="tel"
                    inputMode="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </label>
                <label className="ng-field">
                  <span className="ng-label">ایمیل</span>
                  <input className="ng-input" type="email" value={form.email} onChange={update('email')} />
                </label>
                <label className="ng-field">
                  <span className="ng-label">استان</span>
                  <select className="ng-input" required value={form.province} onChange={update('province')}>
                    <option value="">انتخاب استان</option>
                    {PROVINCES.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="ng-field">
                  <span className="ng-label">شهر</span>
                  <input className="ng-input" required value={form.city} onChange={update('city')} />
                </label>
                <label className="ng-field ng-field--full">
                  <span className="ng-label">آدرس</span>
                  <textarea
                    className="ng-input ng-input--area"
                    rows={3}
                    required
                    value={form.address}
                    onChange={update('address')}
                  />
                </label>
                <label className="ng-field">
                  <span className="ng-label">کد پستی</span>
                  <input
                    className="ng-input"
                    inputMode="numeric"
                    value={form.postalCode}
                    onChange={update('postalCode')}
                  />
                </label>
                <label className="ng-field ng-field--full">
                  <span className="ng-label">توضیحات سفارش</span>
                  <textarea
                    className="ng-input ng-input--area"
                    rows={3}
                    value={form.notes}
                    onChange={update('notes')}
                  />
                </label>
              </div>

              <h2 className="ng-checkout__heading">روش پرداخت</h2>
              <div className="ng-pay">
                <p className="ng-pay__text">
                  درگاه پرداخت پس از اتصال فروشگاه به ووکامرس در همین مرحله نمایش داده می‌شود.
                  در این نسخه پیش‌نمایش، سفارش تنها ثبت می‌شود و پرداختی انجام نمی‌گیرد.
                </p>
              </div>
            </div>

            <aside className="ng-summary" aria-label="خلاصه سفارش">
              <h2 className="ng-summary__title">خلاصه سفارش</h2>

              <ul className="ng-summary__items">
                {items.map((item) => (
                  <li key={item.key} className="ng-summary__item">
                    <span className="ng-summary__thumb">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="ng-summary__item-info">
                      <span className="ng-summary__item-name">{item.name}</span>
                      <span className="ng-summary__item-qty">تعداد: {toPersianDigits(item.quantity)}</span>
                    </span>
                    <span className="ng-summary__item-price">
                      {formatPrice(item.price * item.quantity, site.currency)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="ng-summary__row">
                <span>جمع محصولات</span>
                <strong>{formatPrice(subtotal, site.currency)}</strong>
              </div>
              <div className="ng-summary__row">
                <span>هزینه ارسال</span>
                <span className="ng-summary__muted">در مرحله ارسال محاسبه می‌شود</span>
              </div>
              <div className="ng-summary__row ng-summary__row--total">
                <span>مبلغ نهایی</span>
                <strong>{formatPrice(subtotal, site.currency)}</strong>
              </div>

              <Button variant="gold" type="submit" block disabled={submitting}>
                ثبت سفارش
              </Button>
            </aside>
          </form>
        )}
      </section>
    </>
  )
}
