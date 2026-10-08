import { Link } from '../../router/Router'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { site } from '../../data/site'
import { useUi } from '../../store/ui'

/** Premium footer with brand mark, link columns, contact and legal row. */
export default function Footer() {
  const ui = useUi()
  const { contact } = site

  const socials = [
    { key: 'instagram', label: 'اینستاگرام', icon: 'instagram', href: contact.instagram },
    { key: 'whatsapp', label: 'واتس‌اپ', icon: 'whatsapp', href: contact.whatsapp },
    { key: 'phone', label: 'تماس', icon: 'phone', href: contact.phone ? `tel:${contact.phone}` : '' },
    { key: 'email', label: 'ایمیل', icon: 'mail', href: contact.email ? `mailto:${contact.email}` : '' },
  ].filter((social) => social.href)

  return (
    <footer className="ng-footer">
      <div className="ng-footer__inner">
        <div className="ng-footer__brand">
          <Logo inverted />
          <p className="ng-footer__tagline">{site.tagline}</p>
          <div className="ng-footer__contact">
            <span>{contact.phone || '—'}</span>
            <span>{contact.email || '—'}</span>
          </div>
          {socials.length > 0 && (
            <ul className="ng-footer__socials">
              {socials.map((social) => (
                <li key={social.key}>
                  <a href={social.href} aria-label={social.label} rel="noopener noreferrer">
                    <Icon name={social.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="ng-footer__col" aria-label="لینک‌های فروشگاه">
          <h2 className="ng-footer__heading">فروشگاه</h2>
          <ul>
            {site.footer.links.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="ng-footer__col" aria-label="قوانین">
          <h2 className="ng-footer__heading">اطلاعات</h2>
          <ul>
            {site.footer.legal.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ng-footer__news">
          <h2 className="ng-footer__heading">خبرنامه</h2>
          <p>{site.footer.newsletterText}</p>
          <button type="button" className="ng-btn ng-btn--outline ng-btn--sm" onClick={ui.openSearch}>
            {site.footer.newsletterCta}
          </button>
        </div>
      </div>

      <div className="ng-footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.name} — {site.footer.copyright}
        </p>
        <ul className="ng-footer__legal">
          {site.footer.legal.map((link) => (
            <li key={link.label}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
