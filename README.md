# High Grade Sound & Security storefront

Premium automotive audio and driver-technology storefront built with Shopify
Hydrogen 2026.4.8, React Router, TypeScript and Netlify Edge Functions SSR.

V1 is a client-review storefront. The curated automotive catalog contains verified
manufacturer product information and authentic galleries, with consultation CTAs.
The separate `/demo-shop` uses mock.shop merchandise and a working Shopify cart.
No real store, payments or production domain are connected.

## Development

Use Node 22 or 24 and npm. Netlify is configured for Node 24.

```sh
npm ci
# Configure .env from .env.example once; retain PUBLIC_STORE_DOMAIN=mock.shop.
npm run dev
npm run build
npm run typecheck
npm run lint
npm audit --omit=dev
```

`npm ci` applies a checked-in Netlify emulator patch. Do not skip installation
scripts. Keep `.env` and `.netlify` local; never commit credentials.

- [V1 features, architecture, asset provenance and launch steps](docs/storefront-v1.md)
- [Individual product facts and official sources](docs/catalog-sources.md)
- [Manufacturer photography sources and image-rights review](docs/product-image-sources.md)
- [Infrastructure fixes, dependency overrides and remaining development advisories](docs/development-environment.md)

## Hosting and review

Continue using the existing GitHub `main` branch and connected Netlify project.
`netlify.toml` runs `npm run build`, publishes `dist/client`, and preserves Edge SSR.
The preview is protected from indexing through HTML and HTTP noindex directives,
robots rules and an empty sitemap index. Remove those safeguards only as part of
an authorized commercial launch review.

The existing High Grade Wix site remains at https://www.highgradeonline.com/.
The future shop domain is intentionally not configured here.
