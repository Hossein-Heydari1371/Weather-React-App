/**
 * Loader / skeleton — placeholder shown while a section fetches products.
 * Plain markup, no spinner dependency, so it ports to a WordPress theme as-is.
 */
export default function Loader({ count = 4, label = 'در حال بارگذاری' }) {
  return (
    <div className="ng-skeleton-grid" role="status" aria-live="polite">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} className="ng-skeleton" aria-hidden="true" />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  )
}
