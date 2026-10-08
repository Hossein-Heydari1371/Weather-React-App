import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import FilterPanel from '../components/commerce/FilterPanel'
import ProductGrid from '../components/product/ProductGrid'
import Loader from '../components/ui/Loader'
import Icon from '../components/ui/Icon'
import Drawer from '../components/ui/Drawer'
import { useRouter } from '../router/Router'
import { ProductService, SORT_OPTIONS } from '../services/ProductService'
import { apiConfig } from '../services/config'
import { useSeo } from '../hooks/useSeo'
import { formatNumber, toPersianDigits } from '../utils/format'
import { site } from '../data/site'

const PER_PAGE = apiConfig.perPage

/**
 * ShopPage — «محصولات».
 * Filters live in the URL, so any view can be shared, bookmarked or rendered
 * server-side by WordPress later.
 */
export default function ShopPage() {
  const { search, navigate } = useRouter()
  const params = useMemo(() => new URLSearchParams(search), [search])

  const category = params.get('category') || ''
  const query = params.get('search') || ''
  const sort = params.get('sort') || 'newest'
  const page = Number(params.get('page') || 1)
  const maxPrice = Number(params.get('maxPrice') || 0)
  const inStockOnly = params.get('inStock') === '1'

  const [facets, setFacets] = useState({ priceMin: 0, priceMax: 0, categories: [] })
  const [result, setResult] = useState({ items: [], total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => setSearchInput(query), [query])

  useEffect(() => {
    let active = true
    ProductService.getFacets().then((data) => {
      if (active) setFacets(data)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    ProductService.list({
      category,
      search: query,
      sort,
      maxPrice: maxPrice || undefined,
      inStockOnly,
      page,
      perPage: PER_PAGE,
    }).then((data) => {
      if (!active) return
      setResult(data)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [category, query, sort, maxPrice, inStockOnly, page])

  const updateParams = (patch, { keepPage = false } = {}) => {
    const next = new URLSearchParams(search)
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value === undefined || value === null || value === false || value === 0) {
        next.delete(key)
      } else {
        next.set(key, value === true ? '1' : String(value))
      }
    })
    if (!keepPage) next.delete('page')
    const qs = next.toString()
    navigate(`/products${qs ? `?${qs}` : ''}`)
  }

  const activeFilterValue = { category, maxPrice, inStockOnly, sort }
  const activeCategory = facets.categories.find((item) => item.slug === category)

  const title = activeCategory ? activeCategory.name : 'محصولات'
  const subtitle = query
    ? `نتایج جستجو برای «${query}»`
    : activeCategory
      ? activeCategory.description
      : 'مجموعه کامل کیف‌های دست‌دوز نیلگون'

  useSeo({
    title: activeCategory ? activeCategory.name : 'محصولات',
    description: subtitle,
    canonical: '/products',
  })

  const submitSearch = (event) => {
    event.preventDefault()
    updateParams({ search: searchInput.trim() })
  }

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        crumbs={[
          { label: 'محصولات', to: activeCategory ? '/products' : undefined },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
        ]}
      />

      <div className="ng-shop">
        <aside className="ng-shop__sidebar" aria-label="فیلتر محصولات">
          <FilterPanel
            facets={facets}
            value={activeFilterValue}
            onChange={updateParams}
            onReset={() => navigate('/products')}
            resultCount={result.total}
          />
        </aside>

        <section className="ng-shop__main">
          <div className="ng-toolbar">
            <button
              type="button"
              className="ng-toolbar__filter"
              onClick={() => setFiltersOpen(true)}
            >
              <Icon name="sliders" size={18} />
              فیلترها
              <span className="ng-toolbar__count">{formatNumber(result.total)}</span>
            </button>

            <form className="ng-toolbar__search" onSubmit={submitSearch} role="search">
              <Icon name="search" size={18} />
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={site.messages.searchPlaceholder}
                aria-label="جستجو در محصولات"
              />
            </form>

            <label className="ng-toolbar__sort">
              <span className="sr-only">ترتیب نمایش</span>
              <Icon name="grid" size={16} />
              <select value={sort} onChange={(event) => updateParams({ sort: event.target.value })}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {loading ? <Loader count={6} /> : <ProductGrid products={result.items} />}

          {!loading && result.totalPages > 1 && (
            <nav className="ng-pagination" aria-label="صفحه‌بندی">
              <button
                type="button"
                disabled={result.page <= 1}
                onClick={() => updateParams({ page: result.page - 1 }, { keepPage: true })}
                aria-label="صفحه قبلی"
              >
                <Icon name="chevronRight" size={18} />
              </button>

              {Array.from({ length: result.totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index + 1 === result.page ? 'is-active' : ''}
                  aria-current={index + 1 === result.page ? 'page' : undefined}
                  onClick={() => updateParams({ page: index + 1 }, { keepPage: true })}
                >
                  {toPersianDigits(index + 1)}
                </button>
              ))}

              <button
                type="button"
                disabled={result.page >= result.totalPages}
                onClick={() => updateParams({ page: result.page + 1 }, { keepPage: true })}
                aria-label="صفحه بعدی"
              >
                <Icon name="chevronLeft" size={18} />
              </button>
            </nav>
          )}
        </section>
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="فیلترها"
        side="end"
        footer={
          <button
            type="button"
            className="ng-btn ng-btn--gold ng-btn--block"
            onClick={() => setFiltersOpen(false)}
          >
            نمایش {formatNumber(result.total)} محصول
          </button>
        }
      >
        <FilterPanel
          facets={facets}
          value={activeFilterValue}
          onChange={updateParams}
          onReset={() => navigate('/products')}
          resultCount={result.total}
        />
      </Drawer>
    </>
  )
}
