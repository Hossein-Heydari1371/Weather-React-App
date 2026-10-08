import { site } from '../../data/site'

/** Brand mark: stylised lotus in muted gold + the bilingual wordmark. */
export default function Logo({ compact = false, inverted = false, className = '' }) {
  return (
    <span className={`ng-logo ${inverted ? 'ng-logo--inverted' : ''} ${className}`.trim()}>
      <span className="ng-logo__mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="presentation">
          <defs>
            <linearGradient id="ng-logo-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#EBD9AE" />
              <stop offset="0.55" stopColor="#C8A66A" />
              <stop offset="1" stopColor="#A8823F" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#ng-logo-gold)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 14c4.6 6 4.6 13 0 19-4.6-6-4.6-13 0-19Z" />
            <path d="M16.5 21c6.4 1.5 10.3 6.6 10.7 14C20.6 33.6 15.8 29.2 16.5 21Z" />
            <path d="M47.5 21c-4.7 6.2-8.3 13-10.7 14 .8-7.4 4.7-12.5 10.7-14Z" />
            <path d="M13 42c6.6 7.8 31.4 7.8 38 0" />
          </g>
          <circle cx="32" cy="39" r="2.7" fill="url(#ng-logo-gold)" />
        </svg>
      </span>
      <span className="ng-logo__text">
        <span className="ng-logo__fa">{site.name}</span>
        {!compact && <span className="ng-logo__en">{site.nameEn}</span>}
      </span>
    </span>
  )
}
