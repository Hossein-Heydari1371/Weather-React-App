/**
 * CartService — the cart UI's only data dependency.
 *
 * The implementation below is a local (localStorage-backed) cart so the
 * prototype works with no backend. To move to WooCommerce, implement the same
 * five methods against the Store API — the UI keeps working untouched:
 *
 *   addItem    -> POST {baseUrl}/wp-json/wc/store/v1/cart/add-item
 *   setQuantity-> POST {baseUrl}/wp-json/wc/store/v1/cart/update-item
 *   removeItem -> POST {baseUrl}/wp-json/wc/store/v1/cart/remove-item
 *   getState   -> GET  {baseUrl}/wp-json/wc/store/v1/cart
 *   clear      -> DELETE {baseUrl}/wp-json/wc/store/v1/cart/items
 */

import { createPersistentStore } from '../store/createStore'
import { effectivePrice } from './ProductService'

const store = createPersistentStore({ items: [] }, 'nilgoon:cart')

const lineKey = (product) => String(product.id)

const clampQuantity = (quantity, stock) => {
  const q = Math.max(1, Math.round(Number(quantity) || 1))
  if (typeof stock === 'number' && stock >= 0) return Math.min(q, Math.max(1, stock))
  return q
}

export const cartCount = (items) => items.reduce((sum, item) => sum + item.quantity, 0)

export const cartSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const CartService = {
  subscribe: store.subscribe,
  getState: store.getState,

  /** Add a product (by catalogue shape) to the cart. */
  addItem(product, quantity = 1) {
    if (!product) return
    if (product.available === false || product.stock === 0) return
    const key = lineKey(product)
    store.setState((state) => {
      const existing = state.items.find((item) => item.key === key)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: clampQuantity(item.quantity + quantity, item.stock) }
              : item,
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            image: product.thumbnail || product.images?.[0] || '',
            price: effectivePrice(product),
            regularPrice: product.price,
            material: product.material,
            stock: typeof product.stock === 'number' ? product.stock : null,
            quantity: clampQuantity(quantity, product.stock),
          },
        ],
      }
    })
  },

  setQuantity(key, quantity) {
    store.setState((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.key === key ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item,
      ),
    }))
  },

  removeItem(key) {
    store.setState((state) => ({
      ...state,
      items: state.items.filter((item) => item.key !== key),
    }))
  },

  clear() {
    store.setState({ items: [] })
  },
}

export default CartService
