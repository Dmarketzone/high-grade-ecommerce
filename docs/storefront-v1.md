# High Grade storefront V1

## Experience and routing

- `/`: High Grade branded homepage with approved site imagery, featured components,
  six categories, vehicle selector, brand partners, driver technology and installation.
- `/shop` and `/shop/:category`: searchable, filterable editorial catalog; URL-based
  brand/family/category filters and sorting. Filters work on the server and remain shareable.
- `/catalog/:slug`: 22 manufacturer-referenced individual models, real photo galleries,
  specification tables, source links, pricing inquiries and fitment consultations.
- `/vehicle`: Porsche, BMW and Mercedes-Benz selector and explicit unverified states.
- `/brands`: seven established High Grade partners; HELIX/MATCH direct to consultation
  until individual products are curated.
- `/consultation`: vehicle/product-aware inquiry preparation. The user reviews and sends
  a draft in their email application, or follows the existing High Grade contact form.
  No inquiry is silently sent or stored by this preview.
- `/demo-shop`, `/products/:handle`, `/cart`: separate, genuine mock.shop merchandise
  with Storefront API variants and cart add/update/remove. Checkout is disabled for mock.shop.

The Wix website, production domain, payments and existing Netlify hosting settings are unchanged.

## Reference identity and approved site assets

The homepage and `/sound-systems` on https://www.highgradeonline.com/ were visually
inspected at desktop and mobile viewport sizes. The reference uses black/white,
magenta `#e6007e`, bold Wix Madefor sans-serif headings, pill CTAs, vehicle/interior
photography, and a specialist Miami installation position. V1 preserves the logo,
color palette and confident typography while using neutral system sans-serif fonts,
more restrained shopping layouts, clear product photography, and accessible responsive navigation.
No Wix font files were copied. A narrow reference viewport initially scaled its desktop
layout; the storefront implements an independent mobile reflow.

The user approved reuse of High Grade's site assets during this task. The following
existing assets were downloaded and optimized to WebP, without inventing installations:

| Local asset                | Existing High Grade page / original Wix asset                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `high-grade-logo.webp`     | Header logo: `https://static.wixstatic.com/media/f2e227_3e7e8c3c30184d9bb58b5e8adec35eb6~mv2.png`                                   |
| `high-grade-showroom.webp` | Homepage showroom/vehicle image: `https://static.wixstatic.com/media/f2e227_e1f46eff20a8485f8050c27554910a1c~mv2.png`               |
| `high-grade-facility.webp` | Homepage facility image: `https://static.wixstatic.com/media/f2e227_7fb57c20c7394f6a8e4c2cc46fb25814~mv2.jpg`                       |
| `driver-technology.webp`   | Homepage driver-technology installation image: `https://static.wixstatic.com/media/f2e227_253daacdbea043adad034114f1107b75~mv2.png` |

Unused stock/reference image downloads and unoptimized source copies were removed.
Manufacturer photography is tracked per image in [product-image-sources.md](product-image-sources.md).
The later user instruction authorized manufacturer photography for client review;
commercial licensing still requires review before a commercial launch.

## Data boundaries

`app/data/catalog.ts` contains the curated editorial records. `product-images.ts`
contains exact-model galleries and original URLs. None has a Shopify ID, price,
inventory, warranty or promotional offer. `commerce: 'consultation'` is intentional.
Each product links to an official source; details and lifecycle caveats are in
[catalog-sources.md](catalog-sources.md). Product families are not sold as individual SKUs.

`app/data/vehicles.ts` separates selector examples from a fitment resolver. Every valid
selection returns `needs-verification`; invalid or incomplete selections return
`incomplete`. No product is marked compatible. Model/year options do not assert a
model was sold in every displayed year. The selection type reserves trim, generation
and factory audio for a future verified data source.

Hydrogen context, sessions, Storefront API and cart handlers remain intact. The root
skips real-store analytics/consent initialization for mock.shop; a real store restores
the existing analytics provider. Three legacy account loaders now await the current
Hydrogen async authentication check. No accounts are configured or promoted in V1.

The preview has a static noindex/nofollow meta tag, `X-Robots-Tag` on SSR responses,
`robots.txt` disallowing all crawling, and an empty sitemap index. Page titles,
descriptions, semantic structure and image alt text are present. Removing preview
indexing safeguards must be an explicit launch step after catalog and policy review.

## Validation

- Production Edge SSR build, route type generation, TypeScript and ESLint checked.
- Production dependency audit: 0 vulnerabilities; no dependency versions changed for V1.
- Catalog validation: 22 unique sourced products, 65 local authentic image assets,
  combined filters/sorting, empty search, category separation and safe fitment states.
- 106 HTTP checks: all product/category pages, image responses, consultation/brands,
  vehicle states, 404 and noindex behavior. Genuine mock.shop cart add, update and remove
  verified using actual product form data and session cookies; checkout disabled.
- Browser: catalog navigation, combined Focal/Utopia M filters and sort, gallery changes,
  dependent vehicle selectors and unverified result, mobile menu/filter panel, and
  mock.shop cart add/quantity/remove plus Escape/focus restoration were exercised.
- Desktop, tablet/mobile widths and broken images checked during visual QA.

The Codex in-app browser injects `div#codex-browser-sidebar-comments-root` as an extra
child of `html`, triggering React 18 full-document hydration recovery warnings in that
instrumented surface. Application-specific React prop warnings were fixed. A clean,
uninstrumented browser hydration check remains a separate verification limitation;
no DOM cleanup or suppression was added to hide this tooling artifact.

The existing Netlify site at https://glistening-cajeta-99c608.netlify.app/ returns 401
(Login Redirect). No authenticated Netlify CLI session or connector is available.
The infrastructure commit `c305ecd` was pushed to `main` before storefront changes.
Deployment success behind Netlify protection must be checked by an authorized reviewer;
a GitHub push alone is not evidence of a successful Netlify build.

## Connecting a real Shopify catalog later

1. Obtain brand/dealer image rights and verify model specifications, current product
   status, High Grade pricing, dealer stock, installation policy and warranties.
2. Create actual Shopify product/variant records with accurate options and media.
   Add a provider/adapter that normalizes those records into the existing catalog UI;
   attach real Shopify variant IDs only to the corresponding real products.
3. Store verified fitment in metafields/metaobjects or a dedicated source keyed by
   year/make/model, generation, trim and factory audio. Replace the current resolver
   with audited fitment matches; preserve explicit unknown/incompatible states.
4. Configure the authorized store environment, real-store privacy/analytics, shipping,
   taxes, returns and customer accounts as applicable. Validate payments only in an
   approved test environment before enabling real transactions.
5. Recheck Netlify Edge SSR, cart, policies, licensing, accessibility and indexing.
   Remove preview barriers and connect `shop.highgradeonline.com` only when authorized.

Retain the infrastructure workaround and security notes in
[development-environment.md](development-environment.md).
