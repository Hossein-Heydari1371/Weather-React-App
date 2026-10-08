/**
 * OrderService — order placement and history.
 *
 * ⚠️ PROTOTYPE ONLY — no payment is processed here and no fake "payment
 * success" is shown. A local order record is created so the checkout flow,
 * account history and order summary can be designed and reviewed.
 *
 * Real transactions are handled by WooCommerce later:
 *   placeOrder -> POST {baseUrl}/wp-json/wc/store/v1/checkout
 *   list       -> GET  {baseUrl}/wp-json/wc/v3/orders?customer=<id>
 */

import { createPersistentStore } from '../store/createStore'
import { toPersianDigits } from '../utils/format'

const store = createPersistentStore({ orders: [] }, 'nilgoon:orders')

const nextOrderNumber = (count) => `NG-${toPersianDigits(String(1000 + count + 1))}`

export const OrderService = {
  subscribe: store.subscribe,
  getState: store.getState,

  async list() {
    return store.getState().orders
  },

  async placeOrder({ customer, items, totals }) {
    const order = {
      id: `ord-${Date.now()}`,
      number: nextOrderNumber(store.getState().orders.length),
      createdAt: new Date().toISOString(),
      status: 'pending',
      /** WooCommerce status keys keep this portable ('pending' | 'processing' | ...). */
      paymentStatus: 'unpaid',
      customer,
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totals,
    }
    store.setState((state) => ({ orders: [order, ...state.orders] }))
    return order
  },
}

export default OrderService
