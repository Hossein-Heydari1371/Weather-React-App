/**
 * CategoryService — product categories.
 *
 * WooCommerce equivalent:
 *   GET {baseUrl}/wp-json/wc/v3/products/categories
 */

import { categories, categoryBySlug } from '../data/categories'
import { products } from '../data/products'

export const CategoryService = {
  async list() {
    return categories.map((category) => ({
      ...category,
      count: products.filter((p) => (p.categories || []).includes(category.name)).length,
    }))
  },

  async getBySlug(slug) {
    const category = categoryBySlug(slug)
    if (!category) return null
    return {
      ...category,
      count: products.filter((p) => (p.categories || []).includes(category.name)).length,
    }
  },
}

export default CategoryService
