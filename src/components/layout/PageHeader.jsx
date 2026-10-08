import { Link } from '../../router/Router'

/** PageHeader — breadcrumb + page title used by every inner page. */
export default function PageHeader({ title, subtitle, crumbs = [] }) {
  return (
    <header className="ng-pagehead">
      <div className="ng-pagehead__inner">
        <nav className="ng-crumbs" aria-label="مسیر صفحه">
          <Link to="/">خانه</Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="ng-crumbs__item">
              {crumb.to ? (
                <Link to={crumb.to}>{crumb.label}</Link>
              ) : (
                <span aria-current="page">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="ng-pagehead__title">{title}</h1>
        {subtitle && <p className="ng-pagehead__sub">{subtitle}</p>}
      </div>
    </header>
  )
}
