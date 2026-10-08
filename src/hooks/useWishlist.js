import { useMemo, useSyncExternalStore } from 'react'
import { WishlistService } from '../services/WishlistService'

/** Subscribe a component to the wishlist. */
export function useWishlist() {
  const state = useSyncExternalStore(
    WishlistService.subscribe,
    WishlistService.getState,
    WishlistService.getState,
  )

  return useMemo(
    () => ({
      ids: state.ids,
      count: state.ids.length,
      has: (id) => state.ids.includes(String(id)),
      toggle: WishlistService.toggle,
      remove: WishlistService.remove,
      clear: WishlistService.clear,
    }),
    [state],
  )
}
