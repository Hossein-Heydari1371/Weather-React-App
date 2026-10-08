import { useMemo, useSyncExternalStore } from 'react'
import { UserService } from '../services/UserService'
import { OrderService } from '../services/OrderService'

/** Subscribe a component to the account session and its orders. */
export function useUser() {
  const userState = useSyncExternalStore(
    UserService.subscribe,
    UserService.getState,
    UserService.getState,
  )
  const orderState = useSyncExternalStore(
    OrderService.subscribe,
    OrderService.getState,
    OrderService.getState,
  )

  return useMemo(
    () => ({
      user: userState.user,
      isAuthenticated: Boolean(userState.user),
      orders: orderState.orders,
      login: UserService.login,
      logout: UserService.logout,
    }),
    [userState, orderState],
  )
}
