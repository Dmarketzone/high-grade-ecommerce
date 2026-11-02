import {PRODUCTS, type Product} from '~/data/catalog';
export interface CatalogFilters {
  q?: string;
  brand?: string;
  family?: string;
  category?: string;
  sort?: string;
}
export function filterCatalog(
  products: Product[],
  filters: CatalogFilters,
): Product[] {
  const words = (filters.q ?? '')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const selected = products.filter((product) => {
    const text =
      `${product.brand} ${product.family} ${product.name} ${product.summary}`.toLowerCase();
    return (
      words.every((word) => text.includes(word)) &&
      (!filters.brand ||
        product.brand.toLowerCase() === filters.brand.toLowerCase()) &&
      (!filters.family || product.family === filters.family) &&
      (!filters.category || product.category === filters.category)
    );
  });
  return selected.sort((a, b) =>
    filters.sort === 'name'
      ? a.name.localeCompare(b.name)
      : filters.sort === 'brand'
        ? a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)
        : Number(b.featured) - Number(a.featured) ||
          a.brand.localeCompare(b.brand),
  );
}
export function readCatalog(request: Request, category?: string) {
  const params = new URL(request.url).searchParams;
  const filters = {
    q: (params.get('q') ?? '').slice(0, 100),
    brand: params.get('brand') ?? '',
    family: params.get('family') ?? '',
    category: category ?? params.get('category') ?? '',
    sort: params.get('sort') ?? 'featured',
  };
  return {products: filterCatalog(PRODUCTS, filters), filters};
}
