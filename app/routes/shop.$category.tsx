import {useLoaderData} from 'react-router';
import type {Route} from './+types/shop.$category';
import {readCatalog} from '~/lib/catalog';
import {CATEGORIES} from '~/data/catalog';
import {CatalogView} from '~/components/CatalogView';
export const meta: Route.MetaFunction = ({data}) => [
  {title: `${data?.category.name ?? 'Category'} | High Grade Sound & Security`},
  {
    name: 'description',
    content: data?.category.description ?? 'Explore the High Grade selection.',
  },
];
export function loader({request, params}: Route.LoaderArgs) {
  const category = CATEGORIES.find((item) => item.slug === params.category);
  if (!category) throw new Response('Category not found', {status: 404});
  return {...readCatalog(request, category.slug), category};
}
export default function Category() {
  return <CatalogView {...useLoaderData<typeof loader>()} />;
}
