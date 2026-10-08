import { useState } from 'react'
import { Link } from '../router/Router'
import PageHeader from '../components/layout/PageHeader'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { useUser } from '../hooks/useUser'
import { useWishlist } from '../hooks/useWishlist'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'
import { formatPrice, toPersianDigits } from '../utils/format'

const STATUS_LABELS = {
  pending: 'در انتظار پرداخت',
  processing: 'در حال پردازش',
  completed: 'تکمیل شده',
  cancelled: 'لغو شده',
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })

/**
 * AccountPage — «حساب کاربری».
 * Mirrors WooCommerce "My Account" sections; the session is a local prototype
 * marker until WordPress authentication is connected.
 */
export default function AccountPage() {
  const { user, isAuthenticated, orders, login, logout } = useUser()
  const { count: wishlistCount } = useWishlist()
  const [tab, setTab] = useState('orders')
  const [credentials, setCredentials] = useState({ name: '', phone: '' })

  useSeo({ title: 'حساب کاربری', description: 'حساب کاربری نیلگون گالری.', canonical: '/account' })

  const submitLogin = (event) => {
    event.preventDefault()
    login({ name: credentials.name.trim(), phone: credentials.phone.trim() })
    setCredentials({ name: '', phone: '' })
  }

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader title="حساب کاربری" crumbs={[{ label: 'حساب کاربری' }]} />
        <section className="ng-section">
          <div className="ng-account__login">
            <h2 className="ng-contact__heading">{site.account.loginTitle}</h2>
            <p className="ng-contact__note">{site.account.loginText}</p>
            <form className="ng-form" onSubmit={submitLogin}>
              <label className="ng-field">
                <span className="ng-label">نام</span>
                <input
                  className="ng-input"
                  value={credentials.name}
                  onChange={(event) => setCredentials({ ...credentials, name: event.target.value })}
                />
              </label>
              <label className="ng-field">
                <span className="ng-label">{site.account.phoneLabel}</span>
                <input
                  className="ng-input"
                  type="tel"
                  inputMode="tel"
                  required
                  value={credentials.phone}
                  onChange={(event) => setCredentials({ ...credentials, phone: event.target.value })}
                />
              </label>
              <Button variant="gold" type="submit" block>
                {site.account.loginCta}
              </Button>
              <p className="ng-form__note">
                این ورود آزمایشی است و تنها روی همین مرورگر ذخیره می‌شود؛ احراز هویت واقعی در نسخه وردپرس
                از طریق حساب کاربری ووکامرس انجام می‌شود.
              </p>
            </form>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="حساب کاربری"
        subtitle={user.name ? `${user.name} عزیز، خوش آمدید` : 'خوش آمدید'}
        crumbs={[{ label: 'حساب کاربری' }]}
      />

      <section className="ng-section">
        <div className="ng-account">
          <aside className="ng-account__side">
            <nav aria-label="بخش‌های حساب کاربری">
              <ul className="ng-account__menu">
                {site.account.menu.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      className={`ng-account__link ${tab === item.key ? 'is-active' : ''}`}
                      onClick={() => setTab(item.key)}
                      aria-current={tab === item.key}
                    >
                      <Icon name={item.icon} size={18} />
                      {item.label}
                      {item.key === 'wishlist' && wishlistCount > 0 && (
                        <span className="ng-badge ng-badge--soft">{toPersianDigits(wishlistCount)}</span>
                      )}
                    </button>
                  </li>
                ))}
                <li>
                  <button type="button" className="ng-account__link ng-account__link--out" onClick={logout}>
                    <Icon name="arrowRight" size={18} />
                    {site.account.logout}
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="ng-account__content">
            {tab === 'orders' && (
              <>
                <h2 className="ng-account__title">سفارش‌های من</h2>
                {orders.length === 0 ? (
                  <div className="ng-empty ng-empty--inline">
                    <span className="ng-empty__icon">
                      <Icon name="bag" size={28} />
                    </span>
                    <p className="ng-empty__title">هنوز سفارشی ثبت نشده است</p>
                    <Button to="/products" variant="gold">
                      {site.messages.browseProducts}
                    </Button>
                  </div>
                ) : (
                  <ul className="ng-orders">
                    {orders.map((order) => (
                      <li key={order.id} className="ng-order">
                        <div className="ng-order__head">
                          <span className="ng-order__number">سفارش {order.number}</span>
                          <span className={`ng-order__status ng-order__status--${order.status}`}>
                            {STATUS_LABELS[order.status] || order.status}
                          </span>
                        </div>
                        <p className="ng-order__meta">
                          {formatDate(order.createdAt)} — {toPersianDigits(order.items.length)} قلم کالا
                        </p>
                        <p className="ng-order__total">{formatPrice(order.totals.total, site.currency)}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {tab === 'profile' && (
              <>
                <h2 className="ng-account__title">اطلاعات حساب</h2>
                <dl className="ng-specs">
                  <div className="ng-specs__row">
                    <dt>نام</dt>
                    <dd>{user.name || '—'}</dd>
                  </div>
                  <div className="ng-specs__row">
                    <dt>{site.account.phoneLabel}</dt>
                    <dd>{user.phone || '—'}</dd>
                  </div>
                </dl>
                <p className="ng-form__note">
                  ویرایش اطلاعات حساب در نسخه وردپرس از بخش «حساب کاربری» ووکامرس انجام می‌شود.
                </p>
              </>
            )}

            {tab === 'addresses' && (
              <>
                <h2 className="ng-account__title">آدرس‌ها</h2>
                <div className="ng-empty ng-empty--inline">
                  <span className="ng-empty__icon">
                    <Icon name="pin" size={28} />
                  </span>
                  <p className="ng-empty__title">آدرسی ثبت نشده است</p>
                  <Button to="/checkout" variant="outline">
                    افزودن آدرس در تسویه حساب
                  </Button>
                </div>
              </>
            )}

            {tab === 'wishlist' && (
              <>
                <h2 className="ng-account__title">علاقه‌مندی‌ها</h2>
                <p className="ng-account__text">
                  {wishlistCount > 0
                    ? `${toPersianDigits(wishlistCount)} محصول در علاقه‌مندی‌های شما ذخیره شده است.`
                    : 'هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.'}
                </p>
                <Link to="/wishlist" className="ng-btn ng-btn--outline ng-btn--sm">
                  مشاهده علاقه‌مندی‌ها
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
