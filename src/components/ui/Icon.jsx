/**
 * Icon set — inline SVG, stroke-based, inherits `currentColor`.
 * No icon-font or third-party dependency, so it ports to a WordPress theme
 * as plain markup.
 */

const PATHS = {
  cart: (
    <>
      <path d="M6.5 8h11l-1 11.5h-9L6.5 8Z" />
      <path d="M9.5 8V6.8a2.5 2.5 0 0 1 5 0V8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m19.5 19.5-3.8-3.8" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.4" />
      <path d="M5.2 19.5c1.6-3.3 4-4.9 6.8-4.9s5.2 1.6 6.8 4.9" />
    </>
  ),
  heart: <path d="M12 19.6c-.5 0-6.8-4.2-6.8-9A3.7 3.7 0 0 1 12 8.1a3.7 3.7 0 0 1 6.8 2.5c0 4.8-6.3 9-6.8 9Z" />,
  heartFilled: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 19.9c-.6 0-7.1-4.4-7.1-9.3A4 4 0 0 1 12 7.9a4 4 0 0 1 7.1 2.7c0 4.9-6.5 9.3-7.1 9.3Z"
    />
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronLeft: <path d="m14.5 5-6 7 6 7" />,
  chevronRight: <path d="m9.5 5 6 7-6 7" />,
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M5 7h14" />
      <path d="M9.5 7V5.5h5V7" />
      <path d="M7 7l.8 12h8.4L17 7" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.8 12S6.4 6.6 12 6.6 21.2 12 21.2 12 17.6 17.4 12 17.4 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  expand: (
    <>
      <path d="M9 4H4v5" />
      <path d="M15 20h5v-5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
    </>
  ),
  zoom: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m19.5 19.5-3.8-3.8" />
      <path d="M11 8.5v5" />
      <path d="M8.5 11h5" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 8h14" />
      <path d="M5 16h14" />
      <circle cx="9.5" cy="8" r="1.8" />
      <circle cx="14.5" cy="16" r="1.8" />
    </>
  ),
  mouse: (
    <>
      <rect x="8" y="3.5" width="8" height="12" rx="4" />
      <path d="M12 7v2.5" />
      <path d="m12 18 2.5-2.5" />
      <path d="m12 18-2.5-2.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.6 6-10.4A6 6 0 0 0 6 10.6C6 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.2" />
    </>
  ),
  phone: <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />,
  mail: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2.4" />
      <path d="m5 8 7 5 7-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.8" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 11.7a8 8 0 0 1-11.9 7L4 20l1.4-4A8 8 0 1 1 20 11.7Z" />
      <path d="M9.2 9.4c.3-.6.6-.6.9-.6h.5l1 2-.8.9a5 5 0 0 0 2.6 2.5l.9-.8 2 1v.6c0 .4-.1.9-.9 1.2-1.6.6-4-1-5.4-3.1-1-1.4-1.1-2.9-.8-3.7Z" />
    </>
  ),
  hand: (
    <>
      <path d="M9 12V6.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11.5V8a1.5 1.5 0 0 1 3 0v6.5A5.5 5.5 0 0 1 12.5 20h-1A5.5 5.5 0 0 1 6 14.5v-2a1.5 1.5 0 0 1 3 0" />
    </>
  ),
  fabric: (
    <>
      <path d="M4 9c2.5-2.4 5-2.4 7.5 0S16.5 11.4 20 9" />
      <path d="M4 15c2.5-2.4 5-2.4 7.5 0s5 2.4 8.5 0" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 4l1.7 4.6L18.5 10l-4.8 1.4L12 16l-1.7-4.6L5.5 10l4.8-1.4L12 4Z" />
      <path d="M18 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M19 5c0 7.5-4.3 12-9.5 12A4.5 4.5 0 0 1 5 12.5C5 7.5 10 5 19 5Z" />
      <path d="M8 19c1.6-3.8 4-6.6 7.5-8.5" />
    </>
  ),
  bag: (
    <>
      <path d="M4.5 8h15l-1.2 11.5H5.7L4.5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h10v9H3z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 4l7 2.5v5.2c0 4-3 7.2-7 8.3-4-1.1-7-4.3-7-8.3V6.5L12 4Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="10" rx="1.8" />
      <path d="M12 9v10" />
      <path d="M4 13h16" />
      <path d="M12 9S10.5 4.5 8.5 5.4C7 6.1 7.6 9 12 9Zm0 0s1.5-4.5 3.5-3.6C17 6.1 16.4 9 12 9Z" />
    </>
  ),
  spark2: <path d="M12 3.5 13.6 10 20 11.6 13.6 13.2 12 19.7 10.4 13.2 4 11.6 10.4 10 12 3.5Z" />,
}

export default function Icon({ name, size = 20, strokeWidth = 1.5, className = '', ...rest }) {
  const content = PATHS[name]
  if (!content) return null
  return (
    <svg
      className={`ng-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {content}
    </svg>
  )
}
