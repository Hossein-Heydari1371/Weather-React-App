# Nilgoon Galery (نیلگون گالری)

Persian (RTL) luxury handbag gallery built with React 19 + Vite (rolldown-vite).
The homepage is a single full-screen immersive experience (no vertical scroll):
wheel / swipe / arrow keys drive a 2.5D elliptical product carousel.

## Running here (Base44 sandbox)

- `docker compose -f docker-compose.base44.yml up -d` — Node 22 image, repo
  bind-mounted at `/app`, `npm install` then `vite` dev server on 5173 → host 3000.
  `node_modules` lives in a named volume (never delete it to "refresh" deps).
- No secrets / external credentials required.
- Dev server already binds 0.0.0.0 and accepts the preview host via
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (passed bare through compose env).

## Architecture notes (WordPress portability)

- `src/data/products.js` is the single source of truth for products/categories.
  It is a flat, framework-free module meant to map 1:1 to WooCommerce fields.
  Only photo-verifiable fields are filled; everything else is `null` and the UI
  shows honest placeholders (`استعلام قیمت`, `به‌زودی`). Entries with
  `pendingImages: true` await real assets.
- Product photos live in `public/images/products/*.webp` (absolute `/images/...`
  paths — adjust when migrating).
- Routing is a tiny hash router (`src/hooks/useHashRoute.js`): `#/`, `#/products`,
  `#/products?cat=<id>`, `#/about`, `#/contact`. Easy to swap for WP URLs later.
- Carousel (`src/components/home/Carousel.jsx`) is image-based 2.5D by design;
  each `RingItem` only receives an `offset`, so a real GLB/GLTF viewer can be
  dropped in per product (`product.model3D` field already reserved).

## Verify it works

1. `curl -s http://localhost:3000/` → title `نیلگون گالری | Nilooon Gallery` (RTL, lang=fa).
2. On the homepage: wheel/arrow keys change the active bag; dots jump; the ring
   loops 10 → 1 without a cut; body scroll is locked on `/` only.
3. `#/products?cat=clutch` filters the catalog; every nav icon opens a real
   overlay (search / cart / account).
