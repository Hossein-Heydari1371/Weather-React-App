/**
 * WishlistService — saved products.
 *
 * Kept as a standalone store so it can later be swapped for a WordPress
 * wishlist plugin endpoint (e.g. /wp-json/wishlist/v1/items) without touching
 * the product cards that render the heart button.
 */

import { createPersistentStore } from '../store/createStore'

const store = createPersistentStore({ ids: [] }, 'nilgoon:wishlist')

export const WishlistService = {
  subscribe: store.subscribe,
  getState: store.getState,

  toggle(id) {
    const key = String(id)
    store.setState((state) => ({
      ids: state.ids.includes(key)
        ? state.ids.filter((item) => item !== key)
        : [...state.ids, key],
    }))
  },

  remove(id) {
    const key = String(id)
    store.setState((state) => ({ ids: state.ids.filter((item) => item !== key) }))
  },

  clear() {
    store.setState({ ids: [] })
  },
}

export default WishlistService
