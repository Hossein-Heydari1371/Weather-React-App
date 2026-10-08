import { useEffect } from 'react'
import Icon from './Icon'

/**
 * Drawer — side sheet used for the mobile menu and the cart.
 * Rendered only while open, so closed content stays out of the tab order.
 */
export default function Drawer({ open, onClose, title, side = 'end', children, footer }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={`ng-drawer ng-drawer--${side}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="ng-drawer__backdrop" onClick={onClose} />
      <aside className="ng-drawer__panel">
        <header className="ng-drawer__head">
          <h2 className="ng-drawer__title">{title}</h2>
          <button type="button" className="ng-iconbtn" onClick={onClose} aria-label="بستن">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="ng-drawer__body">{children}</div>
        {footer && <footer className="ng-drawer__foot">{footer}</footer>}
      </aside>
    </div>
  )
}
