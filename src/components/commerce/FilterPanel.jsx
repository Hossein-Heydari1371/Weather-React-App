import Icon from '../ui/Icon'
import { SORT_OPTIONS } from '../../services/ProductService'
import { formatPrice, formatNumber } from '../../utils/format'

/**
 * FilterPanel — category, price, availability and sorting.
 * Rendered in the desktop sidebar and inside the mobile filter drawer.
 */
export default function FilterPanel({ facets, value, onChange, onReset, resultCount }) {
  const { priceMin, priceMax, categories } = facets

  return (
    <div className="ng-filters">
      <div className="ng-filters__head">
        <h2 className="ng-filters__title">
          <Icon name="sliders" size={18} />
          فیلترها
        </h2>
        <button type="button" className="ng-filters__reset" onClick={onReset}>
          حذف فیلترها
        </button>
      </div>

      <p className="ng-filters__count">{formatNumber(resultCount)} محصول</p>

      <fieldset className="ng-filters__group">
        <legend>دسته‌بندی</legend>
        <ul className="ng-filters__list">
          <li>
            <label className="ng-radio">
              <input
                type="radio"
                name="ng-category"
                checked={!value.category}
                onChange={() => onChange({ category: '' })}
              />
              <span>همه دسته‌ها</span>
            </label>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <label className="ng-radio">
                <input
                  type="radio"
                  name="ng-category"
                  checked={value.category === category.slug}
                  onChange={() => onChange({ category: category.slug })}
                />
                <span>{category.name}</span>
                <em>{formatNumber(category.count)}</em>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="ng-filters__group">
        <legend>حداکثر قیمت</legend>
        <input
          type="range"
          className="ng-range"
          min={priceMin}
          max={priceMax}
          step={100000}
          value={value.maxPrice || priceMax}
          onChange={(event) => onChange({ maxPrice: Number(event.target.value) })}
          aria-label="حداکثر قیمت"
        />
        <div className="ng-filters__range">
          <span>{formatPrice(priceMin)}</span>
          <strong>{formatPrice(value.maxPrice || priceMax)}</strong>
        </div>
      </fieldset>

      <fieldset className="ng-filters__group">
        <legend>موجودی</legend>
        <label className="ng-check">
          <input
            type="checkbox"
            checked={value.inStockOnly}
            onChange={(event) => onChange({ inStockOnly: event.target.checked })}
          />
          <span>فقط کالاهای موجود</span>
        </label>
      </fieldset>

      <fieldset className="ng-filters__group">
        <legend>ترتیب نمایش</legend>
        <ul className="ng-filters__list">
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <label className="ng-radio">
                <input
                  type="radio"
                  name="ng-sort"
                  checked={value.sort === option.value}
                  onChange={() => onChange({ sort: option.value })}
                />
                <span>{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  )
}
