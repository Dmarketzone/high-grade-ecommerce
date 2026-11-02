# Development environment

This storefront uses mock.shop, Hydrogen, React Router, and Netlify Edge Functions
SSR. Keep `netlifyReactRouter({edge: true})` and both Netlify Vite plugins enabled.
The Netlify build command and publish directory remain in `netlify.toml`.

## Install and run

Use Node 22 or 24 (Netlify uses Node 24) and npm:

```sh
npm ci
npm run dev
npm run build
npm run typecheck
npm audit --omit=dev
```

Keep `.env` local and `PUBLIC_STORE_DOMAIN=mock.shop`. No Shopify store connection
or access token is required for this demo data source. Do not commit `.env`.

## Temporary Netlify emulator patch

The original dependency chain was `@netlify/vite-plugin@2.11.0` →
`@netlify/dev@4.16.2` → `@netlify/edge-functions-dev@1.0.14`. The emulator runs
`deno eval --allow-scripts --quiet --no-lock ...`. Deno 2.9.8 rejects
`--allow-scripts` for `eval`, so the process exits before opening its port. The
connection timeout is a consequence of that exit, not an SSR configuration error.

As checked on November 2, 2026, both published emulator versions 1.0.24 and 2.0.5
still contain the flag; [upstream PR #790](https://github.com/netlify/primitives/pull/790)
is open. See also [CLI issue #8522](https://github.com/netlify/cli/issues/8522).

`package.json` pins the emulator to 1.0.24 through an npm override.
`patches/@netlify+edge-functions-dev+1.0.24.patch` replaces the obsolete flag with
`--node-modules-dir=manual`, following the upstream fix for projects such as this
one that install their dependencies with npm. npm owns dependency installation and
lifecycle scripts; Deno consumes the existing `node_modules` directory.

The `postinstall` script applies the checked-in patch using `patch-package
--error-on-fail`. Do not install with `--ignore-scripts`: that skips the workaround.
An unexpected patch failure stops installation instead of silently restoring the
startup bug. No developer must manually edit installed package files.

When a fixed emulator is published and adopted by `@netlify/dev`, update the
Netlify plugin, remove the emulator override and patch (and `patch-package` if no
other patches remain), regenerate the lockfile, and repeat all validation commands
plus an HTTP request to a storefront route.

## Hydrogen and React Router compatibility

Hydrogen 2026.4.8 retains the APIs, React Router preset, and Vite integration used
by this storefront. Hydrogen 2026.10.2 is a framework-agnostic SDK with a different
API surface; it removes the `react-router-preset` export and disables the old
Hydrogen dev/codegen commands. Adopting it would require a separate migration.

All React Router packages are pinned to 7.18.5. Neither the old suggested 7.9.2
nor 7.12.0 is an acceptable security downgrade. The 2026.4.8 Hydrogen release
declares `~7.16.0` peers, which also excludes current Router security fixes.
The narrowly scoped Hydrogen npm overrides point those peers at the root Router
versions. This is an application compatibility exception, not an upstream claim
of support for 7.18.5. Keep the Router packages aligned and revalidate routing,
SSR, GraphQL generation, and TypeScript when changing either dependency.

Vite remains on the maintained 6.x line at 6.4.5, with security fixes beyond the
original 6.4.1 lockfile. React remains 18.3.1.

The root `server.ts` imports `./app/lib/context` by relative path. The Windows SSR
build hands that root entry to Vite with backslash separators, where the existing
tsconfig-paths plugin did not resolve `~/lib/context`. Application aliases remain
unchanged.

## Security audit scope (November 2, 2026)

`npm audit --omit=dev` reports **0 vulnerabilities**, down from 16 (12 high).
The lodash 4.18.1 override is needed because a GraphQL codegen helper declares
`~4.17.0`, holding the shared copy on vulnerable 4.17.23. The override selects
the patched minor release; code generation must pass when updating it.

The full audit, including development tools, reports **63 affected package
entries: 32 high, 26 moderate, 5 low**. Many entries are parents of the same
advisory rather than distinct vulnerabilities. These remain in tooling:

| Underlying package | Severity | Affected tooling / limitation |
| --- | --- | --- |
| `@graphql-tools/utils` | High | GraphQL codegen and loaders; patched releases require crossing the old generators' major dependency ranges. |
| `extract-zip` | High | Netlify Functions emulator; audit offers no fix in the selected dependency graph. |
| `sharp` | High | Netlify image emulator (`ipx`); patched 0.35.x is outside its dependency range. |
| `toml` | High | Netlify function bundling; audit offers no fix in the selected graph. |
| `minimatch` | Moderate | Route discovery, ESLint, GraphQL config and Netlify tooling; fixed 11.x crosses multiple major ranges. |
| `glob` | Moderate | Netlify function tracing; audit offers no fix in the selected graph. |
| `deepmerge` | Low | Netlify config; audit offers no fix in the selected graph. |
| `esbuild` | Low | Shopify CLI's bundled/pinned build tool. |

These dependencies run on developer machines or in the build environment and are
not reported by the production-only audit. Clearing the full audit requires a
separate, validated tooling migration and upstream releases; do not apply the
audit's suggested breaking upgrades or downgrades blindly. This is not a claim
that the whole development dependency tree is vulnerability-free.

## Validation results

Validated locally on Windows with Node 24.18.0 and npm 11.16.0:

- `npm ci`: passed; automatically applied the versioned Netlify patch.
- `npm run dev`: stayed running with Netlify Edge Functions emulation enabled;
  the obsolete Deno flag and old Router mismatch warning no longer appeared.
- HTTP: `/`, `/products/hoodie`, `/collections/all`, and `/cart` returned 200;
  a missing route returned 404. SSR HTML contained mock.shop products and the
  product page's Add to cart control. Repeated home requests succeeded.
- `npm run build`: passed, including GraphQL generation and client/SSR bundles.
  `.netlify/v1/edge-functions/react-router-server.mjs` exports the custom server
  with `path: "/*"`.
- `npm run typecheck`: passed.
- `npm audit --omit=dev`: passed, 0 vulnerabilities after the clean installation.
- `npm ls`: passed with a single aligned Router version and no invalid peers.

The Codex preview rendered mock.shop content and navigated to the product page.
Its injected `div#codex-browser-sidebar-comments-root`, placed alongside `head`
and `body`, produced React 18 document hydration recovery errors. A separate
Chrome check was attempted, but Computer Use stopped because it could not verify
the current browser URL. Browser hydration without injected preview UI was
therefore not independently confirmed. No application changes were retained to
accommodate that preview injection. React Router also emits non-blocking v8
future-flag notices; mock.shop warns that real Shopify analytics/consent are
unavailable.

The local environment is usable for storefront development with the documented
Netlify patch and Hydrogen peer override. These checks do not verify a new hosted
Netlify deployment or real-store checkout/customer accounts, which were not part
of this repair.
