import Icon from '../ui/Icon'
import { toPersianDigits } from '../../utils/format'

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'

const toLatin = (value) =>
  String(value).replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)))

/** Accessible quantity stepper, used in the cart, product page and quick view. */
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  size = 'md',
  label = 'تعداد',
}) {
  const clamp = (next) => {
    let num = Number(next)
    if (Number.isNaN(num)) num = min
    num = Math.max(min, num)
    if (typeof max === 'number') num = Math.min(num, max)
    return num
  }

  const decrease = () => onChange(clamp(value - 1))
  const increase = () => onChange(clamp(value + 1))

  return (
    <div className={`ng-stepper ng-stepper--${size}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="کاهش تعداد"
      >
        <Icon name="minus" size={16} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={toPersianDigits(clamp(value))}
        aria-label={label}
        onChange={(event) => {
          const digits = toLatin(event.target.value).replace(/[^0-9]/g, '')
          onChange(clamp(digits === '' ? min : Number(digits)))
        }}
      />
      <button
        type="button"
        onClick={increase}
        disabled={typeof max === 'number' && value >= max}
        aria-label="افزایش تعداد"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}
