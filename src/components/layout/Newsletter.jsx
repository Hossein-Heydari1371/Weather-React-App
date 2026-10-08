import { useState } from 'react'
import Button from '../ui/Button'
import { useUi } from '../../store/ui'
import { site } from '../../data/site'

/**
 * Newsletter signup.
 *
 * UI only — nothing is stored or sent. The note under the form states this so
 * the preview never implies a real subscription. In WordPress this becomes a
 * Mailchimp / newsletter-plugin form.
 */
export default function Newsletter({ variant = 'panel' }) {
  const ui = useUi()
  const [email, setEmail] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setEmail('')
    ui.showToast('به خبرنامه نیلگون خوش آمدید.')
  }

  return (
    <section className={`ng-newsletter ng-newsletter--${variant}`} aria-labelledby="ng-newsletter-title">
      <div className="ng-newsletter__text">
        <h2 id="ng-newsletter-title" className="ng-newsletter__title">
          {site.footer.newsletterTitle}
        </h2>
        <p className="ng-newsletter__sub">{site.footer.newsletterText}</p>
      </div>
      <form className="ng-newsletter__form" onSubmit={submit}>
        <label className="sr-only" htmlFor="ng-newsletter-email">
          {site.footer.newsletterPlaceholder}
        </label>
        <input
          id="ng-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={site.footer.newsletterPlaceholder}
          className="ng-input"
        />
        <Button variant="gold" type="submit">
          {site.footer.newsletterCta}
        </Button>
      </form>
      <p className="ng-newsletter__note">
        این فرم در نسخه پیش‌نمایش اطلاعاتی ذخیره نمی‌کند؛ اتصال آن به سرویس خبرنامه در نسخه وردپرس انجام می‌شود.
      </p>
    </section>
  )
}
