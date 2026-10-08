import { Link } from '../../router/Router'

/**
 * Button — renders a <button>, an <a> or a router <Link> depending on props.
 *
 * variant: gold | outline | ghost | dark
 * size:    sm | md | lg
 */
export default function Button({
  to,
  href,
  as,
  variant = 'gold',
  size = 'md',
  block = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ng-btn',
    `ng-btn--${variant}`,
    size !== 'md' ? `ng-btn--${size}` : '',
    block ? 'ng-btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const Tag = as || 'button'
  const props = Tag === 'button' ? { type: rest.type || 'button', ...rest } : rest

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
