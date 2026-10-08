# AGENTS.md — working notes for this repository

Non-obvious things a future session needs. Manifests and README cover the rest.

## What this is

Nilgoon Gallery (نیلگون گالری) — a **frontend-only** luxury Persian (RTL) storefront
for handmade women's handbags. React 19 + Vite. No backend, no database, no server
routes. All commerce state lives in `localStorage` behind service modules.

## Running it (Base44 dev environment)

```bash
docker compose -f docker-compose.base44.yml up -d --build
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/   # expect 200
```

- One service, `web`, on host port **3000** → Vite dev server inside the container.
- `npm ci` runs **on container start** (not in the image) against the mounted
  `package-lock.json`; `node_modules` is a **named Docker volume** so the repo bind
  mount cannot shadow it. Dependency changes therefore need only a container restart,
  not an image rebuild.
- Live reload works: editing `src/**` hot-reloads. A compose/env change needs
  `docker compose -f docker-compose.base44.yml restart web` plus `reload_preview`.

## Sandbox / preview specifics

- The dev server runs as `vite --host 0.0.0.0 --port 3000 --strictPort`.
- Host allowlist: the platform exports `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`
  (value `.e2b.app` here). Vite ≥ 6.1 appends it to `server.allowedHosts`. Compose
  passes it through as a **bare** `environment:` entry — do not hardcode its value.
- `BASE44_PREVIEW_MODE` is likewise passed through bare. **No application code reads
  it** and there are no sandbox-only code paths — the same source runs anywhere.
- Routing is client-side via the History API (`src/router/Router.jsx`). Vite's SPA
  fallback serves `index.html` for every path, which is why `/products`, `/product/<slug>`
  etc. all return 200 on a hard reload.

## Gotchas

- **Do not use CSS `@import` between repo stylesheets.** Vite/rolldown-vite failed to
  resolve `@import "./styles/x.css"` from `src/global.css` ("Unable to resolve … from
  /app/src"). The stylesheets are imported explicitly from `src/main.jsx` in cascade
  order instead. Keep it that way.
- Vite caches a failed module transform. After fixing a broken import, a plain reload
  is not always enough — restart `web` (or force a full preview reload) before
  concluding the fix did not work.
- Product images (`public/images/*.webp`) are **1086×1448 (3:4)**. Frames use
  `aspect-ratio: 3 / 4` with `object-fit: cover`, which fills them exactly — so no
  cropping, stretching or distortion. If you add images, keep the same ratio or change
  the frame ratio with them.
- The glass navigation stays visible down to **880px**; below that `MobileNav` (a
  purpose-built sheet, not a shrunken desktop bar) takes over.

## Hero film (scroll-scrubbed)

- `src/components/home/Hero.jsx` is a **scroll-scrubbed film**, not a carousel: the
  section is a tall (`260svh`) runway whose stage is `position: sticky`, and the
  scroll position sets `video.currentTime`. Nothing autoplays; the first scroll
  primes it. The progress bar / hint fade read the `--ng-hero-progress` custom
  property that the scroll handler writes — no React re-render per frame.
- **Two `<video>` elements share one URL**: the sharp one is `object-fit: contain`
  (footage never cropped, stretched or zoomed) and a blurred `cover` copy fills the
  rest of the screen so there are no empty bars.
- The film URL is `site.hero.video` (880×720, 15 s, 361 frames, `moov` at the front
  so seeking is cheap). It is served from the media CDN, not `public/`.
- Any ancestor of `.ng-hero` that gains `overflow: hidden` silently breaks the
  sticky pinning — the stage keeps scrolling away instead of staying pinned.

## Content & terminology rules

- **Never describe the bags as embroidered.** Forbidden: `گلدوزی`, `embroider*`.
  Correct: `پارچه طرح‌دار سوزن‌دوزی هندی روی قالب خام` / "Indian needlework-patterned
  fabric on a raw bag form".
- Brand copy, navigation, contact details and legal links all live in
  `src/data/site.js`. **`site.contact.*` is intentionally empty** — no placeholder
  business information is invented, and the UI renders `—` until the real values are
  filled in.
- Catalogue data lives in `src/data/products.js` in a deliberately WooCommerce-shaped
  schema (see the header comment there).

## Architecture boundaries (keep them)

- Components never import from `src/data/*` for products/categories; they go through
  `ProductService` / `CategoryService`. Cart, wishlist, user and orders go through
  `CartService` / `WishlistService` / `UserService` / `OrderService`.
- Switching to a real backend is meant to be `apiConfig.mode` in
  `src/services/config.js` plus one implementation per service — no UI edits.
- `OrderService.placeOrder` creates a **local prototype record only**. It must not be
  turned into a fake payment-success flow; real payment is WooCommerce's job.

## Verification

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → 200.
- Interactive checks run through the live preview (mega menu, search suggestions,
  add-to-cart, cart drawer, wishlist, shop filters, product page, checkout).
- There is no test runner in this repo (`npm run lint` runs ESLint).
