import Icon from './Icon'
import { useUi } from '../../store/ui'

/** Toast — transient confirmation for cart / wishlist actions. */
export default function Toast() {
  const { toast } = useUi()
  if (!toast) return null

  return (
    <div className="ng-toast" role="status" aria-live="polite">
      <Icon name="check" size={16} />
      <span>{toast}</span>
    </div>
  )
}
