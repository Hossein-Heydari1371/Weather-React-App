import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../../router/Router'
import Icon from '../ui/Icon'
import Price from '../ui/Price'
import { ProductService } from '../../services/ProductService'
import { site } from '../../data/site'
import { useUi } from '../../store/ui'

/**
 * SearchOverlay — live product suggestions.
 * Reads through ProductService, so it can be pointed at the WooCommerce search
 * endpoint (`/wp-json/wc/v3/products?search=`) without any UI change.
 */
export default function SearchOverlay() {
  const ui = useUi()
  const { navigate } = useRouter()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ products: [], categories: [] })

  useEffect(() => {
    if (!ui.searchOpen) return undefined
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => window.clearTimeout(timer)
  }, [ui.searchOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') ui.closeSearch()
    }
    if (!ui.searchOpen) return undefined
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [ui.searchOpen, ui])

  useEffect(() => {
    if (!ui.searchOpen) return undefined
    let active = true
    const timer = window.setTimeout(() => {
      ProductService.searchSuggestions(query, 5).then((found) => {
        if (active) setResults(found)
      })
    }, 140)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [query, ui.searchOpen])

  useEffect(() => {
    if (!ui.searchOpen) {
      setQuery('')
      setResults({ products: [], categories: [] })
    }
  }, [ui.searchOpen])

  if (!ui.searchOpen) return null

  const submit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    ui.closeSearch()
    navigate(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : '/products')
  }

  const hasQuery = query.trim().length > 0
  const hasResults = results.products.length > 0 || results.categories.length > 0

  return (
    <div className="ng-search" role="dialog" aria-modal="true" aria-label="جستجوی محصولات">
      <div className="ng-search__backdrop" onClick={ui.closeSearch} />
      <div className="ng-search__panel">
        <form className="ng-search__form" onSubmit={submit} role="search">
          <Icon name="search" size={20} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={site.messages.searchPlaceholder}
            aria-label="جستجو در محصولات"
          />
          <button type="button" className="ng-iconbtn" onClick={ui.closeSearch} aria-label="بستن جستجو">
            <Icon name="close" size={20} />
          </button>
        </form>

        {hasQuery && (
          <div className="ng-search__results">
            {results.categories.length > 0 && (
              <ul className="ng-search__cats">
                {results.categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/products?category=${category.slug}`}
                      className="ng-search__cat"
                      onClick={ui.closeSearch}
                    >
                      <Icon name="grid" size={16} />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {results.products.length > 0 ? (
              <ul className="ng-search__list">
                {results.products.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.slug}`}
                      className="ng-search__item"
                      onClick={ui.closeSearch}
                    >
                      <span className="ng-search__thumb">
                        <img src={product.thumbnail} alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="ng-search__info">
                        <span className="ng-search__name">{product.name}</span>
                        <span className="ng-search__cat-name">{product.category}</span>
                      </span>
                      <Price price={product.price} size="sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ng-search__empty">{site.messages.noResults}</p>
            )}

            <button type="button" className="ng-search__all" onClick={submit}>
              مشاهده همه نتایج برای «{query.trim()}»
              <Icon name="arrowLeft" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
