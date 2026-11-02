import {Suspense, useState} from 'react';
import {Await, Form, Link, NavLink, useAsyncValue} from 'react-router';
import {useOptimisticCart} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Icon} from './Icon';
import {useAside} from './Aside';
const NAV = [
  {to: '/shop', label: 'Shop all'},
  {to: '/shop/speakers-subwoofers', label: 'Car audio'},
  {to: '/shop/oem-audio', label: 'OEM upgrades'},
  {to: '/shop/radar-laser', label: 'Driver technology'},
  {to: '/vehicle', label: 'Shop by vehicle'},
];
export function Header({cart}: {cart: Promise<CartApiQueryFragment | null>}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="utility-bar">
        <div className="container">
          <span>EXPERTLY SELECTED. PROFESSIONALLY INSTALLED.</span>
          <a href="tel:+13052591035">
            Miami, FL <span className="utility-dot">·</span> (305) 259-1035{' '}
            <Icon name="arrow" size={13} />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-main">
          <Link
            to="/"
            className="brand-logo"
            aria-label="High Grade Sound & Security home"
          >
            <img
              src="/images/high-grade-logo.webp"
              width="160"
              height="114"
              alt="High Grade Sound & Security"
            />
          </Link>
          <Form
            action="/shop"
            method="get"
            className="header-search"
            role="search"
          >
            <Icon name="search" size={18} />
            <input
              aria-label="Search the High Grade catalog"
              name="q"
              placeholder="Find your next upgrade"
              type="search"
            />
            <button aria-label="Search catalog" type="submit">
              <Icon name="arrow" size={18} />
            </button>
          </Form>
          <div className="header-actions">
            <Link className="consult-link" to="/consultation">
              Speak with an expert <Icon name="arrow" size={16} />
            </Link>
            <Suspense fallback={<CartLink count={0} />}>
              <Await resolve={cart} errorElement={<CartLink count={0} />}>
                <CartCount />
              </Await>
            </Suspense>
            <button
              type="button"
              className="mobile-menu-button icon-button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
        <nav
          className="desktop-navigation container"
          aria-label="Main navigation"
        >
          <div>
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end>
                {item.label}
              </NavLink>
            ))}
          </div>
          <Link to="/brands">
            Our brands <Icon name="chevron" size={12} />
          </Link>
        </nav>
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {[
            ...NAV,
            {to: '/brands', label: 'Our brands'},
            {to: '/consultation', label: 'Book a consultation'},
            {to: '/demo-shop', label: 'Try the demo shop'},
          ].map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
              <Icon name="arrow" size={16} />
            </Link>
          ))}
        </nav>
      </header>
      <div className="demo-notice">
        HIGH GRADE PREVIEW{' '}
        <span>
          Explore the catalog. Pricing & fitment confirmed by our team.
        </span>
        <Link to="/demo-shop">
          Try the demo cart <Icon name="arrow" size={12} />
        </Link>
      </div>
    </>
  );
}
function CartLink({count}: {count: number}) {
  const {open} = useAside();
  return (
    <Link
      className="cart-link"
      to="/cart"
      aria-label={`Demo cart, ${count} items`}
      onClick={(event) => {
        event.preventDefault();
        open('cart');
      }}
    >
      <Icon name="bag" size={21} />
      <span className="cart-count">{count}</span>
    </Link>
  );
}
function CartCount() {
  const cart = useOptimisticCart(
    useAsyncValue() as CartApiQueryFragment | null,
  );
  return <CartLink count={cart?.totalQuantity ?? 0} />;
}
