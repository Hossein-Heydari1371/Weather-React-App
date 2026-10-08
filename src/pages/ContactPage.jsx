import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import Icon from '../components/ui/Icon'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { useUi } from '../store/ui'
import { useSeo } from '../hooks/useSeo'
import { site } from '../data/site'

const ITEMS = [
  { key: 'phone', label: 'شماره تماس', icon: 'phone', href: (v) => (v ? `tel:${v}` : '') },
  { key: 'email', label: 'ایمیل', icon: 'mail', href: (v) => (v ? `mailto:${v}` : '') },
  { key: 'instagram', label: 'اینستاگرام', icon: 'instagram', href: (v) => v },
  { key: 'whatsapp', label: 'واتس‌اپ', icon: 'whatsapp', href: (v) => v },
  { key: 'address', label: 'آدرس', icon: 'pin', href: () => '' },
  { key: 'hours', label: 'ساعات کاری', icon: 'clock', href: () => '' },
]

/** ContactPage — «تماس با ما». Real business details are intentionally blank. */
export default function ContactPage() {
  const ui = useUi()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useSeo({
    title: 'تماس با ما',
    description: 'راه‌های ارتباطی با نیلگون گالری.',
    canonical: '/contact',
  })

  const submit = (event) => {
    event.preventDefault()
    setForm({ name: '', email: '', message: '' })
    ui.showToast('پیام شما ثبت شد. (نسخه پیش‌نمایش)')
  }

  return (
    <>
      <PageHeader
        title="تماس با ما"
        subtitle="برای سفارش اختصاصی، پیگیری سفارش یا هر پرسشی با ما در تماس باشید."
        crumbs={[{ label: 'تماس با ما' }]}
      />

      <section className="ng-section ng-contact">
        <div className="ng-contact__grid">
          <Reveal className="ng-contact__info">
            <h2 className="ng-contact__heading">راه‌های ارتباطی</h2>
            <ul className="ng-contact__list">
              {ITEMS.map((item) => {
                const value = site.contact[item.key]
                const href = value ? item.href(value) : ''
                return (
                  <li key={item.key} className="ng-contact__item">
                    <span className="ng-contact__icon" aria-hidden="true">
                      <Icon name={item.icon} size={18} />
                    </span>
                    <span className="ng-contact__body">
                      <span className="ng-contact__label">{item.label}</span>
                      {href ? (
                        <a href={href} className="ng-contact__value" rel="noopener noreferrer">
                          {value}
                        </a>
                      ) : (
                        <span className="ng-contact__value ng-contact__value--empty">{value || '—'}</span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="ng-contact__note">
              شماره تماس، ایمیل، آدرس و شبکه‌های اجتماعی واقعی برند را در فایل تنظیمات سایت وارد کنید؛
              هیچ اطلاعاتی به‌صورت ساختگی نمایش داده نمی‌شود.
            </p>
          </Reveal>

          <Reveal className="ng-contact__form-wrap" delay={120}>
            <h2 className="ng-contact__heading">ارسال پیام</h2>
            <form className="ng-form" onSubmit={submit}>
              <label className="ng-field">
                <span className="ng-label">نام</span>
                <input
                  className="ng-input"
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
              </label>
              <label className="ng-field">
                <span className="ng-label">ایمیل</span>
                <input
                  className="ng-input"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </label>
              <label className="ng-field">
                <span className="ng-label">پیام</span>
                <textarea
                  className="ng-input ng-input--area"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                />
              </label>
              <Button variant="gold" type="submit">
                ارسال پیام
              </Button>
              <p className="ng-form__note">
                این فرم در نسخه پیش‌نمایش پیامی ارسال نمی‌کند؛ اتصال آن به فرم تماس وردپرس در نسخه نهایی انجام می‌شود.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
