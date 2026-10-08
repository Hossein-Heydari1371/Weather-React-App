import { useEffect, useRef } from 'react'
import Icon from './Icon'

/**
 * Accessible modal: Escape to close, backdrop click to close, focus moved into
 * the panel on open, `role="dialog"` + `aria-modal`.
 */
export default function Modal({
  open,
  onClose,
  title,
  size = 'md',
  variant = 'light',
  labelledBy,
  children,
  className = '',
}) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    const timer = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      focusable?.focus()
    }, 40)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(timer)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={`ng-modal ng-modal--${size} ng-modal--${variant} ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={labelledBy ? undefined : title}
      aria-labelledby={labelledBy}
    >
      <div className="ng-modal__backdrop" onClick={onClose} />
      <div className="ng-modal__panel" ref={panelRef}>
        <button type="button" className="ng-modal__close" onClick={onClose} aria-label="بستن">
          <Icon name="close" size={18} />
        </button>
        {title && !labelledBy && <h2 className="ng-modal__title">{title}</h2>}
        <div className="ng-modal__body">{children}</div>
      </div>
    </div>
  )
}
