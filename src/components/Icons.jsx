// Minimal stroke icon set (lucide-style) — no external dependency,
// keeps the bundle light and WordPress-portable.

const Svg = ({ size = 20, children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

// Stylized lotus — the brand mark
export const Lotus = (props) => (
  <Svg {...props}>
    <path d="M12 3.5c1.7 2 2.5 4 2.5 5.9 0 2.3-1 4.2-2.5 5.4-1.5-1.2-2.5-3.1-2.5-5.4 0-1.9.8-3.9 2.5-5.9Z" />
    <path d="M4.7 8.2c2.5.4 4.4 1.5 5.6 3.1 1 1.4 1.5 3 1.3 4.6-2.4.2-4.5-.5-6-2-1.3-1.4-1.9-3.3-1.7-5.2l.8-.5Z" />
    <path d="M19.3 8.2c-2.5.4-4.4 1.5-5.6 3.1-1 1.4-1.5 3-1.3 4.6 2.4.2 4.5-.5 6-2 1.3-1.4 1.9-3.3 1.7-5.2l-.8-.5Z" />
    <path d="M4.5 17c2.3 1.6 4.7 2.4 7.5 2.4s5.2-.8 7.5-2.4" />
  </Svg>
);

export const Search = (props) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Svg>
);

export const User = (props) => (
  <Svg {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);

export const Bag = (props) => (
  <Svg {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Svg>
);

export const ChevronDown = (props) => (
  <Svg {...props}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const ChevronLeft = (props) => (
  <Svg {...props}>
    <path d="m15 18-6-6 6-6" />
  </Svg>
);

export const ChevronRight = (props) => (
  <Svg {...props}>
    <path d="m9 18 6-6-6-6" />
  </Svg>
);

export const Grid = (props) => (
  <Svg {...props}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </Svg>
);

export const Menu = (props) => (
  <Svg {...props}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </Svg>
);

export const X = (props) => (
  <Svg {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
);
