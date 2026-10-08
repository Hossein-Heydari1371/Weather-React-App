import { useMemo, useSyncExternalStore } from 'react'
import { CartService, cartCount, cartSubtotal } from '../services/CartService'

/** Subscribe a component to the cart. */
export function useCart() {
  const state = useSyncExternalStore(
    CartService.subscribe,
    CartService.getState,
    CartService.getState,
  )

  return useMemo(
    () => ({
      items: state.items,
      count: cartCount(state.items),
      subtotal: cartSubtotal(state.items),
      addItem: CartService.addItem,
      setQuantity: CartService.setQuantity,
      removeItem: CartService.removeItem,
      clear: CartService.clear,
    }),
    [state],
  )
}
