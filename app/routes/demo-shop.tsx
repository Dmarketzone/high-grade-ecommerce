import {Form, Link, useLoaderData} from 'react-router';
import type {Route} from './+types/demo-shop';
import {ProductItem} from '~/components/ProductItem';
import {Icon} from '~/components/Icon';
export const meta: Route.MetaFunction = () => [
  {title: 'mock.shop Demo Merchandise | High Grade Preview'},
  {
    name: 'description',
    content:
      'A separate mock.shop merchandise area to test product variants and the Shopify cart. No live payments.',
  },
];
export async function loader({context, request}: Route.LoaderArgs) {
  const params = new URL(request.url).searchParams;
  const q = (params.get('q') ?? '').slice(0, 100);
  const sort = params.get('sort') ?? 'title';
  const {products} = await context.storefront.query(DEMO_PRODUCTS_QUERY);
  const items = products.nodes
    .filter((product) => product.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sort === 'price-asc'
        ? Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount)
        : sort === 'price-desc'
          ? Number(b.priceRange.minVariantPrice.amount) -
            Number(a.priceRange.minVariantPrice.amount)
          : a.title.localeCompare(b.title),
    );
  return {products: items, q, sort};
}
export default function DemoShop() {
  const {products, q, sort} = useLoaderData<typeof loader>();
  return (
    <div className="demo-shop-page container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/shop">High Grade catalog</Link>
        <span>/</span>
        <span>Separate commerce demo</span>
      </nav>
      <p className="eyebrow">POWERED BY SHOPIFY MOCK.SHOP</p>
      <h1>
        A real cart.
        <br />
        Demo merchandise.
      </h1>
      <p className="page-lead">
        These are genuine mock.shop records, separate from our curated
        automotive catalog. Test variants, add items and update your cart. No
        real payments or orders are processed.
      </p>
      <Form method="get" className="demo-filters" key={`${q}-${sort}`}>
        <label>
          Search demo merchandise
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="e.g. Hoodie"
          />
        </label>
        <label>
          Sort by
          <select name="sort" defaultValue={sort}>
            <option value="title">Title A–Z</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <button className="button button-dark" type="submit">
          Update results <Icon name="arrow" size={16} />
        </button>
      </Form>
      <p className="results-bar">{products.length} demo products</p>
      <div className="products-grid">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="empty-state">
          <h2>No demo merchandise matched.</h2>
          <Link to="/demo-shop" className="text-link">
            Clear search <Icon name="arrow" />
          </Link>
        </div>
      )}
    </div>
  );
}
const DEMO_PRODUCTS_QUERY = `#graphql
  query DemoProducts($country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    products(first: 50) {nodes {id title handle featuredImage {id altText url width height} priceRange {minVariantPrice {amount currencyCode}}}}
  }
` as const;
