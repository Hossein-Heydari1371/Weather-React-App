/**
 * API abstraction configuration.
 *
 * The storefront always talks to the *services* in this folder — never to a
 * backend directly. Switching the data source is therefore a one-line change
 * here plus an implementation inside the matching service.
 *
 * ┌─ mode: 'mock' ───────────────────────────────────────────────────────────┐
 * │ Local sample catalogue from src/data. No backend required.               │
 * └──────────────────────────────────────────────────────────────────────────┘
 * ┌─ mode: 'woocommerce' ────────────────────────────────────────────────────┐
 * │ Products  -> GET  {baseUrl}/wp-json/wc/v3/products                       │
 * │ Categories-> GET  {baseUrl}/wp-json/wc/v3/products/categories            │
 * │ Cart      -> POST {baseUrl}/wp-json/wc/store/v1/cart                     │
 * │ Checkout  -> POST {baseUrl}/wp-json/wc/store/v1/checkout                 │
 * │ Orders    -> GET  {baseUrl}/wp-json/wc/v3/orders                         │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

export const apiConfig = {
  /** 'mock' | 'woocommerce' */
  mode: 'mock',

  woocommerce: {
    baseUrl: '',
    consumerKey: '',
    consumerSecret: '',
    /** Store API is cookie/session based and needs no keys. */
    storeApiVersion: 'wc/store/v1',
    apiVersion: 'wc/v3',
  },

  /** Default page size for product grids. */
  perPage: 9,
}

export const isMockMode = () => apiConfig.mode === 'mock'
