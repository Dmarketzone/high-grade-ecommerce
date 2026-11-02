import {Analytics, getShopAnalytics, useNonce} from '@shopify/hydrogen';
import {
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  Link,
  type ShouldRevalidateFunction,
} from 'react-router';
import type {Route} from './+types/root';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import {PageLayout} from './components/PageLayout';

export type RootLoader = typeof loader;
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return defaultShouldRevalidate;
};
export async function loader({
  context: {cart, storefront, env},
}: Route.LoaderArgs) {
  const isDemo = env.PUBLIC_STORE_DOMAIN === 'mock.shop';
  return {
    cart: cart.get(),
    isDemo,
    shop: isDemo
      ? null
      : getShopAnalytics({
          storefront,
          publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
        }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  };
}
export function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="theme-color" content="#101012" />
        <link rel="stylesheet" href={resetStyles} />
        <link rel="stylesheet" href={appStyles} />
        <link
          rel="icon"
          type="image/webp"
          href="/images/high-grade-logo.webp"
        />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <Meta />
        <Links nonce={nonce} />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
export default function App() {
  const data = useRouteLoaderData<RootLoader>('root');
  if (!data) return <Outlet />;
  const page = (
    <PageLayout cart={data.cart}>
      <Outlet />
    </PageLayout>
  );
  // mock.shop has no real-store consent or tracking configuration. Commerce
  // remains active; analytics are enabled when a real store is connected.
  return data.isDemo ? (
    page
  ) : (
    <Analytics.Provider
      cart={data.cart}
      shop={data.shop}
      consent={data.consent}
    >
      {page}
    </Analytics.Provider>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;
  return (
    <div className="error-page container">
      <Link to="/" className="eyebrow">
        HIGH GRADE SOUND & SECURITY
      </Link>
      <p className="error-code">{status}</p>
      <h1>
        {status === 404
          ? 'A little off route.'
          : 'Let’s get you back on track.'}
      </h1>
      <p>
        {status === 404
          ? 'This page could not be found. Explore our catalog or speak with a High Grade advisor.'
          : 'We couldn’t load this page. Please try again, or contact the High Grade team.'}
      </p>
      <Link to="/shop" className="button button-primary">
        Explore the catalog
      </Link>
    </div>
  );
}
