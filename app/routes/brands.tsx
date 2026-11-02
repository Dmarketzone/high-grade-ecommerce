import {Link} from 'react-router';
import type {Route} from './+types/brands';
import {PRODUCTS} from '~/data/catalog';
import {Icon} from '~/components/Icon';
export const meta: Route.MetaFunction = () => [
  {title: 'Our Brand Partners | High Grade Sound & Security'},
  {
    name: 'description',
    content:
      'Explore the specialist brands behind High Grade audio and driver technology systems, including Focal, Gladen, Mosconi, HELIX, MATCH, UNIDEN and DroneMobile.',
  },
];
const BRANDS = [
  {
    name: 'Focal',
    origin: 'THE ART OF HIGH-FIDELITY',
    description:
      'From Utopia M and K2 component systems to the dedicated Focal Inside range. Discover different approaches to extraordinary in-car sound.',
  },
  {
    name: 'Gladen',
    origin: 'PRECISION IN EVERY DETAIL',
    description:
      'Explore Aerospace and Pro drivers, chosen as part of a carefully designed listening system.',
  },
  {
    name: 'Mosconi',
    origin: 'CONTROL. DYNAMICS. INTEGRATION.',
    description:
      'Pro EVO and One amplification and DSP options for considered system architecture.',
  },
  {
    name: 'HELIX',
    origin: 'SIGNAL PROCESSING & AUDIO',
    description:
      'A High Grade audio partner. Ask our advisors about available processing and amplification options.',
  },
  {
    name: 'MATCH',
    origin: 'OEM INTEGRATION',
    description:
      'A High Grade audio partner for factory-system integration. Speak with an advisor about your vehicle.',
  },
  {
    name: 'UNIDEN',
    origin: 'AWARENESS FOR THE ROAD',
    description:
      'Premium radar detection technology. Explore the hardware and plan an installation with our team.',
  },
  {
    name: 'DroneMobile',
    origin: 'CONNECTED VEHICLE TECHNOLOGY',
    description:
      'Cameras, connectivity and vehicle visibility. Features vary by hardware, installation and service plan.',
  },
];
export default function Brands() {
  return (
    <div className="brands-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">CHOSEN FOR A REASON</p>
          <h1>
            Exceptional brands.
            <br />
            One considered system.
          </h1>
          <p>
            Technology from specialists who care about the details. Guidance
            from a team that understands how it all comes together.
          </p>
        </div>
      </section>
      <div className="container brand-card-grid">
        {BRANDS.map((brand) => {
          const count = PRODUCTS.filter(
            (product) =>
              product.brand.toLowerCase() === brand.name.toLowerCase(),
          ).length;
          return (
            <article className="brand-card" key={brand.name}>
              <p className="eyebrow">{brand.origin}</p>
              <h2>{brand.name}</h2>
              <p>{brand.description}</p>
              <Link
                className="text-link"
                to={
                  count
                    ? `/shop?brand=${encodeURIComponent(brand.name)}`
                    : '/consultation'
                }
              >
                {count ? `Explore ${count} products` : 'Ask our advisors'}{' '}
                <Icon name="arrow" size={18} />
              </Link>
            </article>
          );
        })}
      </div>
      <div className="container centered-cta">
        <h2>The right combination changes everything.</h2>
        <p>Build around your vehicle and your listening goals.</p>
        <Link to="/consultation" className="button button-primary">
          Let’s plan your system <Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}
