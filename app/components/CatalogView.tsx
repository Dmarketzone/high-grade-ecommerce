import {useState} from 'react';
import {Form, Link} from 'react-router';
import {CATEGORIES, BRANDS, PRODUCTS, type Product} from '~/data/catalog';
import type {CatalogFilters} from '~/lib/catalog';
import {CuratedProductCard} from './CuratedProductCard';
import {Icon} from './Icon';
export function CatalogView({
  products,
  filters,
  category,
}: {
  products: Product[];
  filters: CatalogFilters;
  category?: (typeof CATEGORIES)[number];
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const families = [
    ...new Set(PRODUCTS.map((product) => product.family)),
  ].sort();
  const action = category ? `/shop/${category.slug}` : '/shop';
  const active = Boolean(
    filters.q ||
    filters.brand ||
    filters.family ||
    (!category && filters.category),
  );
  return (
    <div className="catalog-page">
      <div className="catalog-heading">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            {category ? (
              <>
                <Link to="/shop">Shop</Link>
                <span>/</span>
                <span>{category.name}</span>
              </>
            ) : (
              <span>The collection</span>
            )}
          </nav>
          <p className="eyebrow">CURATED BY HIGH GRADE</p>
          <h1>{category?.name ?? 'Find your extraordinary.'}</h1>
          <p>
            {category?.description ??
              'The finest in automotive audio and driver technology. Selected with purpose. Designed around you.'}
          </p>
          <div className="category-chips">
            <Link className={!filters.category ? 'selected' : ''} to="/shop">
              All products
            </Link>
            {CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                className={filters.category === item.slug ? 'selected' : ''}
                to={`/shop/${item.slug}`}
              >
                {item.name.replace(
                  'Radar Detectors & Laser Defense',
                  'Radar & laser',
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container catalog-body">
        <aside
          className={`catalog-filters ${filtersOpen ? 'filters-open' : ''}`}
          aria-label="Catalog filters"
        >
          <div className="filter-heading">
            <h2>Refine your selection</h2>
            <button
              className="mobile-filter-toggle"
              aria-expanded={filtersOpen}
              aria-controls="catalog-filter-form"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? 'Hide filters' : 'Show filters'}{' '}
              <Icon name="chevron" size={13} />
            </button>
          </div>
          <Form
            id="catalog-filter-form"
            method="get"
            action={action}
            key={`${action}-${filters.q}-${filters.brand}-${filters.family}-${filters.sort}`}
          >
            <label>
              Search products
              <div className="filter-search">
                <input
                  name="q"
                  type="search"
                  defaultValue={filters.q}
                  placeholder="Brand, model or family"
                />
                <Icon name="search" size={16} />
              </div>
            </label>
            {!category && (
              <label>
                Category
                <select name="category" defaultValue={filters.category}>
                  <option value="">All categories</option>
                  {CATEGORIES.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              Brand
              <select name="brand" defaultValue={filters.brand}>
                <option value="">All brands</option>
                {[...new Set([...BRANDS, 'HELIX', 'MATCH'])].map((brand) => (
                  <option key={brand}>{brand}</option>
                ))}
              </select>
            </label>
            <label>
              Product family
              <select name="family" defaultValue={filters.family}>
                <option value="">All families</option>
                {families.map((family) => (
                  <option key={family}>{family}</option>
                ))}
              </select>
            </label>
            <label>
              Sort by
              <select name="sort" defaultValue={filters.sort}>
                <option value="featured">Featured selection</option>
                <option value="name">Model: A–Z</option>
                <option value="brand">Brand: A–Z</option>
              </select>
            </label>
            <button className="button button-dark" type="submit">
              Apply filters <Icon name="arrow" size={16} />
            </button>
            {active && (
              <Link to={action} className="clear-filters">
                Clear filters
              </Link>
            )}
          </Form>
          <div className="advisor-card">
            <Icon name="sound" size={24} />
            <h3>Not sure where to start?</h3>
            <p>
              The right component is part of a complete system. Let’s find
              yours.
            </p>
            <Link to="/consultation" className="text-link">
              Talk to an expert <Icon name="arrow" size={15} />
            </Link>
          </div>
        </aside>
        <div className="catalog-results">
          <div className="results-bar">
            <p aria-live="polite">
              <strong>{products.length}</strong>{' '}
              {products.length === 1 ? 'product' : 'products'}
              {filters.q && <> for “{filters.q}”</>}
            </p>
            <span>Expert guidance. Pricing on inquiry.</span>
          </div>
          {products.length ? (
            <div className="product-grid catalog-grid">
              {products.map((product) => (
                <CuratedProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={35} />
              <h2>A more personal recommendation.</h2>
              <p>
                No products match this selection in our V1 catalog. That doesn’t
                mean an upgrade isn’t possible. Our team can help you explore
                options.
              </p>
              <Link to={action} className="button button-dark">
                Reset your selection
              </Link>
              <Link to="/consultation" className="text-link">
                Ask High Grade <Icon name="arrow" size={16} />
              </Link>
            </div>
          )}
          <div className="catalog-disclaimer">
            <Icon name="check" size={18} />
            <p>
              Manufacturer-referenced product information. High Grade pricing,
              availability and vehicle fitment are confirmed individually.
              Looking to test the cart?{' '}
              <Link to="/demo-shop">Visit the separate mock.shop demo.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
