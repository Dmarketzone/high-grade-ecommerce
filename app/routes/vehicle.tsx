import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/vehicle';
import {VehicleSelector} from '~/components/VehicleSelector';
import {VEHICLE_MAKES, resolveVehicle} from '~/data/vehicles';
import {Icon} from '~/components/Icon';
export const meta: Route.MetaFunction = () => [
  {title: 'Shop by Vehicle | High Grade Sound & Security'},
  {
    name: 'description',
    content:
      'Start a vehicle-specific audio or driver technology consultation for Porsche, BMW or Mercedes-Benz. All product fitment requires verification.',
  },
];
export function loader({request}: Route.LoaderArgs) {
  const params = new URL(request.url).searchParams;
  const selection = {
    make: params.get('make') ?? '',
    model: params.get('model') ?? '',
    year: params.get('year') ?? '',
  };
  return {selection, result: resolveVehicle(selection)};
}
export default function Vehicle() {
  const {selection, result} = useLoaderData<typeof loader>();
  const make = VEHICLE_MAKES.find((item) => item.id === selection.make);
  const consultationParams = new URLSearchParams(selection);
  return (
    <div className="vehicle-page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">BUILT AROUND YOUR VEHICLE</p>
          <h1>
            Factory feel.
            <br />A higher level of performance.
          </h1>
          <p>
            The right upgrade starts with knowing your vehicle. Let’s begin
            there.
          </p>
        </div>
      </section>
      <div className="container">
        <VehicleSelector key={`${selection.make}-${selection.model}-${selection.year}`} initial={selection} />
        <section className="fitment-result" aria-live="polite">
          <div className="fitment-result-icon">
            <Icon name="car" size={46} />
          </div>
          <div>
            <p className="eyebrow">
              {result.status === 'needs-verification'
                ? 'YOUR NEXT STEP'
                : 'A THOUGHTFUL START'}
            </p>
            <h2>
              {result.status === 'needs-verification'
                ? `${selection.year} ${make?.name} ${selection.model}`
                : 'Choose your vehicle above.'}
            </h2>
            <span className="status-pill">
              {result.status === 'needs-verification'
                ? 'Compatibility review required'
                : 'Selector preview'}
            </span>
            <p>{result.message}</p>
            <p>
              Our team will confirm your generation, trim, factory audio
              package, connectors and installation requirements. No product
              matches are confirmed by this preview selector.
            </p>
            <Link
              to={`/consultation?${consultationParams}`}
              className="button button-primary"
            >
              Verify with High Grade <Icon name="arrow" />
            </Link>
          </div>
        </section>
        <div className="process-grid">
          <div>
            <span>01</span>
            <h3>Tell us what you drive</h3>
            <p>
              Make, model and year are the beginning. Your factory equipment
              completes the picture.
            </p>
          </div>
          <div>
            <span>02</span>
            <h3>Define your upgrade</h3>
            <p>
              More detail, better bass or connected technology. Your goals guide
              the system.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Confirm the complete fit</h3>
            <p>
              High Grade reviews the hardware, integration and installation
              before recommending a solution.
            </p>
          </div>
        </div>
        <div className="centered-cta">
          <h2>Explore the possibilities.</h2>
          <p>
            Browse the catalog while we help you plan. Browsing does not confirm
            compatibility.
          </p>
          <Link to="/shop/oem-audio" className="text-link">
            Discover OEM-style upgrades <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
