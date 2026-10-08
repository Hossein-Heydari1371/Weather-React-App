# نیلگون گالری — Nilgoon Gallery

A luxury Persian (RTL) storefront for handmade formal women's handbags.
Beauty is in the details — *زیبایی در جزئیات است.*

Built as a **React + Vite frontend** that is deliberately architected so its design
and components can be lifted into a **WordPress + WooCommerce** theme without a
rebuild.

---

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
# then open http://localhost:3000
```

The sandbox runs a live-reloading Vite dev server on port 3000. Dependencies are
installed from the lockfile when the container starts, so editing the source needs no
rebuild.

Locally without Docker:

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

**No credentials are required.** There is no backend and no third-party API call.

---

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, categories, featured, brand story, new collection, why Nilgoon, newsletter |
| `/products` | Shop — search, category / price / availability filters, sorting, pagination |
| `/product/<slug>` | Product detail — gallery, zoom, specs, add to cart, buy now, related |
| `/cart` | Cart |
| `/checkout` | RTL checkout with order summary |
| `/wishlist` | علاقه‌مندی‌های من |
| `/account` | حساب کاربری — orders, profile, addresses, wishlist |
| `/about` | درباره نیلگون |
| `/contact` | تماس با ما |
| `/page/<slug>` | Terms / privacy / purchase placeholders |

Filter and search state lives in the URL, so any view is shareable and can be
reproduced server-side later.

---

## Architecture

```
src/
  data/         products.js, categories.js, site.js   <- content, WooCommerce-shaped
  services/     ProductService, CategoryService, CartService,
                WishlistService, UserService, OrderService, config.js
  store/        createStore.js (observable + localStorage), ui.jsx (overlays)
  hooks/        useCart, useWishlist, useUser, useCategories, useSeo
  router/       Router.jsx — History API router, no dependency
  components/   layout/  ui/  home/  product/  commerce/
  pages/        one file per route
  styles/       tokens → base → layout → components → home → pages
```

**Components never talk to a backend.** They call services; services own the data
source. That is the single seam that makes the WordPress migration small.

### Editing content

- Brand name, navigation, hero copy, brand story, "why us", footer, account labels and
  **contact details** → `src/data/site.js`
  (`site.contact.*` is intentionally empty — real business details have not been
  invented; the UI shows `—` until you fill them in).
- Products → `src/data/products.js`
- Categories → `src/data/categories.js`
- Colours, type, spacing, motion → `src/styles/tokens.css`

New products and categories appear automatically in grids, search, filters, related
products and navigation.

---

## Migrating to WordPress + WooCommerce

The catalogue schema in `src/data/products.js` maps 1:1 onto WooCommerce products
(`name` → title, `description` → description, `price`/`salePrice` →
`regular_price`/`sale_price`, `sku` → SKU, `stock` → stock, `images` → gallery,
`category` → product category, …).

Swap each service implementation without touching the UI:

| Service | WooCommerce / WordPress endpoint |
| --- | --- |
| `ProductService` | `GET /wp-json/wc/v3/products` |
| `CategoryService` | `GET /wp-json/wc/v3/products/categories` |
| `CartService` | `POST /wp-json/wc/store/v1/cart/*` |
| `OrderService` | `POST /wp-json/wc/store/v1/checkout` · `GET /wp-json/wc/v3/orders` |
| `UserService` | WordPress auth + `GET /wp-json/wc/v3/customers/me` |

Set the base URL and switch mode in `src/services/config.js`.

Styles are plain CSS with custom properties and prefixed class names (no CSS-in-JS,
no CSS modules), so they translate directly into a theme stylesheet.

---

## Notes

- **No payment is processed.** Checkout stores a local prototype order and says so
  explicitly. Real payment will be WooCommerce's.
- Product photography is framed at the images' native **3:4** ratio so the bags are
  never cropped, stretched or distorted.
- Terminology: the bags use *Indian needlework-patterned fabric on a raw bag form*
  (`پارچه طرح‌دار سوزن‌دوزی هندی روی قالب خام`) — never "embroidery" / `گلدوزی`.
