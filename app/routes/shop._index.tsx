import {useLoaderData} from 'react-router';
import type {Route} from './+types/shop._index';
import {readCatalog} from '~/lib/catalog';
import {CatalogView} from '~/components/CatalogView';
export const meta: Route.MetaFunction = () => [
  {title: 'Shop Premium Car Audio & Driver Technology | High Grade'},
  {
    name: 'description',
    content:
      'Explore Focal, Gladen, Mosconi, UNIDEN and DroneMobile. Search and filter the High Grade specialist product selection.',
  },
];
export function loader({request}: Route.LoaderArgs) {
  return readCatalog(request);
}
export default function Shop() {
  return <CatalogView {...useLoaderData<typeof loader>()} />;
}
