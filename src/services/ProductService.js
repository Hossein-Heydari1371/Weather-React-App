/**
 * ProductService — the single entry point for product data.
 *
 * Every component reads products through this service, so replacing the sample
 * catalogue with WooCommerce is an implementation detail, not a UI rewrite:
 *
 *   async list({ category, search, ... }) {
 *     const url = new URL(`${apiConfig.woocommerce.baseUrl}/wp-json/${apiConfig.woocommerce.apiVersion}/products`)
 *     url.searchParams.set('category', categoryId)
 *     url.searchParams.set('search', search)
 *     const res = await fetch(url, { headers: { Authorization: basicAuth } })
 *     return mapWooProducts(await res.json())
 *   }
 */

import { products } from '../data/products'
import { categories } from '../data/categories'
import { apiConfig } from './config'

const DEFAULT_PER_PAGE = apiConfig.perPage

export const effectivePrice = (product) =>
  product?.salePrice ?? product?.price ?? 0

const normalize = (value) => String(value ?? '').trim().toLowerCase()

function matchesSearch(product, query) {
  const needle = normalize(query)
  if (!needle) return true
  const haystack = [
    product.name,
    product.category,
    product.shortDescription,
    product.description,
    product.sku,
    product.color,
    product.material,
    ...(product.tags || []),
    ...(product.categories || []),
  ]
    .filter(Boolean)
    .join(' ')
  return normalize(haystack).includes(needle)
}

const sorters = {
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  'price-asc': (a, b) => effectivePrice(a) - effectivePrice(b),
  'price-desc': (a, b) => effectivePrice(b) - effectivePrice(a),
  featured: (a, b) =>
    Number(b.featured) - Number(a.featured) || new Date(b.createdAt) - new Date(a.createdAt),
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'featured', label: 'منتخب' },
]

export const ProductService = {
  /** Filtered, sorted, paginated product list. */
  async list({ category, search, sort = 'newest', maxPrice, inStockOnly, featured, page = 1, perPage = DEFAULT_PER_PAGE } = {}) {
    let items = products.slice()

    if (category) {
      // Resolve the slug to a category name and match the full category list, so
      // a product in several categories shows up under each of them (as in
      // WooCommerce) and the counts match the facet numbers.
      const resolved = categories.find((c) => c.slug === category)
      items = items.filter((p) =>
        resolved
          ? (p.categories || []).includes(resolved.name) || p.categorySlug === resolved.slug
          : false,
      )
    }
    if (search) items = items.filter((p) => matchesSearch(p, search))
    if (featured) items = items.filter((p) => p.featured)
    if (inStockOnly) items = items.filter((p) => p.available)
    if (maxPrice) items = items.filter((p) => effectivePrice(p) <= maxPrice)

    items.sort(sorters[sort] || sorters.newest)

    const total = items.length
    const totalPages = Math.max(1, Math.ceil(total / perPage))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * perPage

    return {
      items: items.slice(start, start + perPage),
      total,
      page: safePage,
      perPage,
      totalPages,
    }
  },

  async getBySlug(slug) {
    return products.find((p) => p.slug === slug) || null
  },

  async getById(id) {
    return products.find((p) => String(p.id) === String(id)) || null
  },

  async getByIds(ids = []) {
    const wanted = new Set(ids.map(String))
    return products.filter((p) => wanted.has(String(p.id)))
  },

  async getFeatured(limit = 8) {
    const { items } = await this.list({ sort: 'featured', featured: true, perPage: limit })
    return items
  },

  async getNew(limit = 4) {
    const { items } = await this.list({ sort: 'newest', perPage: limit })
    return items
  },

  async getRelated(product, limit = 4) {
    if (!product) return []
    const sameCategory = products.filter(
      (p) => p.id !== product.id && p.categorySlug === product.categorySlug,
    )
    const pool = sameCategory.length ? sameCategory : products.filter((p) => p.id !== product.id)
    return pool.slice(0, limit)
  },

  /** Lightweight suggestions for the live search overlay. */
  async searchSuggestions(query, limit = 6) {
    const needle = normalize(query)
    if (!needle) return { products: [], categories: [] }

    const matchedProducts = products
      .filter((p) => matchesSearch(p, needle))
      .slice(0, limit)
      .map((p) => ({
        id: p.id,
        type: 'product',
        name: p.name,
        slug: p.slug,
        thumbnail: p.thumbnail,
        price: effectivePrice(p),
        category: p.category,
      }))

    const matchedCategories = categories
      .filter((c) => normalize(c.name).includes(needle))
      .slice(0, 3)
      .map((c) => ({ id: c.id, type: 'category', name: c.name, slug: c.slug }))

    return { products: matchedProducts, categories: matchedCategories }
  },

  /** Filter facets: price range + category counts. */
  async getFacets() {
    const prices = products.map(effectivePrice)
    return {
      priceMin: Math.min(...prices),
      priceMax: Math.max(...prices),
      categories: categories.map((c) => ({
        ...c,
        count: products.filter((p) => (p.categories || []).includes(c.name)).length,
      })),
    }
  },
}

export default ProductService
