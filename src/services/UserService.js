/**
 * UserService — account/session state.
 *
 * Maps later onto WordPress/WooCommerce "My Account":
 *   login  -> POST {baseUrl}/wp-json/wp/v2/users/login  (+ cookie session)
 *   logout -> clear the WordPress session cookie
 *   profile-> GET  {baseUrl}/wp-json/wc/v3/customers/me
 *
 * The prototype only keeps a local session marker — no personal data is
 * invented or stored beyond what the visitor types.
 */

import { createPersistentStore } from '../store/createStore'

const store = createPersistentStore({ user: null }, 'nilgoon:user')

export const UserService = {
  subscribe: store.subscribe,
  getState: store.getState,

  async login({ phone, name = '' } = {}) {
    store.setState({
      user: {
        id: `guest-${phone || 'anon'}`,
        name,
        phone: phone || '',
        addresses: [],
      },
    })
  },

  async logout() {
    store.setState({ user: null })
  },

  isAuthenticated() {
    return Boolean(store.getState().user)
  },
}

export default UserService
