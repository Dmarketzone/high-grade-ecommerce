import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/catalog.$slug';
import {PRODUCTS, CATEGORIES} from '~/data/catalog';
import {ProductGallery} from '~/components/ProductGallery';
import {CuratedProductCard} from '~/components/CuratedProductCard';
import {Icon} from '~/components/Icon';
export function loader({params}: Route.LoaderArgs) {
  const product = PRODUCTS.find((item) => item.slug === params.slug);
  if (!product) throw new Response('Product not found', {status: 404});
  return {
    product,
    related: PRODUCTS.filter(
      (item) =>
        item.slug !== product.slug && item.category === product.category,
    ).slice(0, 3),
  };
}
export const meta: Route.MetaFunction = ({data}) => [
  {
    title: `${data?.product.brand ?? ''} ${data?.product.name ?? 'Product'} | High Grade`,
  },
  {
    name: 'description',
    content: data?.product.summary ?? 'Explore the High Grade catalog.',
  },
];
export default function ProductDetail() {
  const {product, related} = useLoaderData<typeof loader>();
  const category = CATEGORIES.find((item) => item.slug === product.category);
  return (
    <div className="product-detail-page">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`}>{category?.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
        <div className="detail-grid">
          <ProductGallery key={product.slug} product={product} />
          <div className="detail-main">
            <p className="eyebrow">
              {product.brand} <span> / {product.family}</span>
            </p>
            <h1>{product.name}</h1>
            <p className="product-subtitle">{product.summary}</p>
            <div className="detail-price">
              <span>Expert advice. A system that fits.</span>
              <strong>Pricing on consultation</strong>
              <p>
                We’ll confirm product availability and build a proposal around
                your vehicle.
              </p>
            </div>
            <Link
              to={`/consultation?product=${product.slug}`}
              className="button button-primary"
            >
              Request a consultation <Icon name="arrow" />
            </Link>
            <Link
              to={`/consultation?product=${product.slug}&topic=fitment`}
              className="button button-outline"
            >
              Verify vehicle compatibility <Icon name="car" />
            </Link>
            <div className="fitment-note">
              <Icon name="shield" size={23} />
              <p>
                <strong>Designed as part of your system</strong>
                {product.fitment.note}
              </p>
            </div>
            <ul className="product-highlights">
              {product.specs.slice(0, 3).map((spec) => (
                <li key={spec.label}>
                  <Icon name="check" size={15} />
                  <span>
                    {spec.label}: {spec.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="small-note">
              Catalog preview · This product is not connected to Shopify
              checkout.
            </p>
          </div>
        </div>
        <div className="product-information">
          <section>
            <p className="eyebrow">A CLOSER LISTEN</p>
            <h2>
              Considered engineering.
              <br />
              Personal performance.
            </h2>
            <p>{product.description}</p>
            <div className="manufacturer-reference">
              <strong>Manufacturer reference</strong>
              <p>{product.manufacturerStatus}</p>
              <a
                className="text-link"
                href={product.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                View official product details ↗
              </a>
            </div>
          </section>
          <section>
            <h2>Technical details</h2>
            <dl className="specification-table">
              {product.specs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="small-note">
              Manufacturer information checked {product.checkedAt}.
              Specifications and installation requirements should be reconfirmed
              for your project.
            </p>
          </section>
        </div>
        {related.length > 0 && (
          <section className="section related-products">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CONTINUE EXPLORING</p>
                <h2>Build a better system.</h2>
              </div>
              <Link to={`/shop/${product.category}`} className="text-link">
                Explore the category <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className="product-grid">
              {related.map((item) => (
                <CuratedProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
