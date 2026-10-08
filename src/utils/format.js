/**
 * Formatting helpers.
 *
 * Pure, dependency-free utilities built on standard browser/intl APIs so they
 * keep working unchanged inside a WordPress/WooCommerce theme.
 */

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** Convert every ASCII digit in a string to its Persian counterpart. */
export function toPersianDigits(value) {
  return String(value ?? '').replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])
}

/** 2850000 -> "۲٬۸۵۰٬۰۰۰" */
export function formatNumber(value) {
  if (value === null || value === undefined || value === '') return ''
  const num = Number(value)
  if (Number.isNaN(num)) return ''
  return toPersianDigits(num.toLocaleString('en-US')).replace(/,/g, '٬')
}

/** 2850000 -> "۲٬۸۵۰٬۰۰۰ تومان" */
export function formatPrice(value, currency = 'تومان') {
  if (value === null || value === undefined || value === '') return ''
  return `${formatNumber(value)} ${currency}`
}

/** Percentage saved when a sale price is present. */
export function discountPercent(price, salePrice) {
  if (!price || !salePrice || salePrice >= price) return 0
  return Math.round(((price - salePrice) / price) * 100)
}

/** Latin, URL-safe slug. Keeps Persian text readable if ever needed. */
export function slugify(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Build a query string, skipping empty values. */
export function toQueryString(params = {}) {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    if (Array.isArray(value)) value.forEach((v) => search.append(key, v))
    else search.append(key, value)
  })
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

/** Read the current query string as a plain object. */
export function parseQuery(search = '') {
  const params = new URLSearchParams(search)
  const out = {}
  for (const [key, value] of params.entries()) out[key] = value
  return out
}
