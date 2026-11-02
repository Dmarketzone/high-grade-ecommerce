import {Await} from 'react-router';
import {Suspense} from 'react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Aside} from './Aside';
import {Header} from './Header';
import {Footer} from './Footer';
import {CartMain} from './CartMain';
export function PageLayout({
  cart,
  children,
}: {
  cart: Promise<CartApiQueryFragment | null>;
  children?: React.ReactNode;
}) {
  return (
    <Aside.Provider>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header cart={cart} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <Aside type="cart" heading="Your demo cart">
        <Suspense fallback={<p>Loading cart…</p>}>
          <Await
            resolve={cart}
            errorElement={
              <p>Unable to load your cart. Please refresh the page.</p>
            }
          >
            {(resolved) => <CartMain cart={resolved} layout="aside" />}
          </Await>
        </Suspense>
      </Aside>
    </Aside.Provider>
  );
}
