import {Link} from 'react-router';
import {CATEGORIES, PRODUCTS} from '~/data/catalog';
import {CuratedProductCard} from '~/components/CuratedProductCard';
import {VehicleSelector} from '~/components/VehicleSelector';
import {Icon} from '~/components/Icon';
import type {Route} from './+types/_index';
export const meta: Route.MetaFunction = () => [
  {title: 'High Grade Sound & Security | A Higher Grade of Driving'},
  {
    name: 'description',
    content:
      'Explore premium automotive audio, OEM upgrades and driver technology with expert guidance from High Grade Sound & Security in Miami.',
  },
];
export default function Homepage() {
  const featured = PRODUCTS.filter((product) => product.featured).slice(0, 4);
  return (
    <div className="home">
      <section className="hero">
        <img
          className="hero-photo"
          src="/images/high-grade-showroom.webp"
          width="1000"
          height="1000"
          alt="Porsche at High Grade Sound & Security's automotive facility"
          {...{fetchpriority: 'high'}}
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">EXCEPTIONAL SOUND. EXTRAORDINARY DRIVES.</p>
          <h1>
            Your drive.
            <br />
            <em>Elevated.</em>
          </h1>
          <p className="hero-description">
            Reference-grade audio. Seamless factory integration.
            <br className="desktop-break" /> Driver technology that belongs in
            your vehicle.
          </p>
          <div className="hero-buttons">
            <Link to="/shop" className="button button-primary">
              Explore the collection <Icon name="arrow" />
            </Link>
            <Link to="/consultation" className="hero-secondary">
              Build your system <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="hero-location">
            <span className="tiny-line" /> HIGH GRADE SOUND & SECURITY{' '}
            <span>MIAMI, FL</span>
          </div>
        </div>
        <div className="hero-caption">
          THE HIGH GRADE EXPERIENCE{' '}
          <span>Designed around you. Installed in Miami.</span>
        </div>
      </section>
      <div className="container vehicle-home">
        <VehicleSelector />
      </div>
      <div className="container trust-row">
        <span>
          <Icon name="sound" /> Specialist audio expertise
        </span>
        <span>
          <Icon name="check" /> Thoughtful factory integration
        </span>
        <span>
          <Icon name="shield" /> Professional installation
        </span>
        <Link to="/consultation">
          Your vehicle. Your listening experience.{' '}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
      <section className="section section-light">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE HIGH GRADE SELECTION</p>
              <h2>Extraordinary starts here.</h2>
              <p>
                Discover the components behind a truly personal listening
                experience.
              </p>
            </div>
            <Link to="/shop" className="text-link">
              Explore all products <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="product-grid featured-grid">
            {featured.map((product) => (
              <CuratedProductCard key={product.slug} product={product} />
            ))}
          </div>
          <p className="section-note">
            A curated product preview. Pricing, availability and installation
            are confirmed with your High Grade advisor.
          </p>
        </div>
      </section>
      <section className="section category-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR NEXT UPGRADE</p>
              <h2>Every detail. A better drive.</h2>
            </div>
            <Link to="/shop" className="text-link">
              Shop by category <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="category-grid">
            {CATEGORIES.map((category, index) => {
              const product = PRODUCTS.find(
                (item) => item.category === category.slug,
              );
              return (
                <Link
                  key={category.slug}
                  to={`/shop/${category.slug}`}
                  className={`category-card category-${index}`}
                >
                  <span className="category-number">0{index + 1}</span>
                  {product && (
                    <img
                      src={product.imagery.images[0].src}
                      alt=""
                      loading="lazy"
                      width="360"
                      height="240"
                    />
                  )}
                  <div>
                    <h3>{category.name}</h3>
                    <span>
                      Explore category <Icon name="arrow" size={18} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="editorial-section">
        <div className="editorial-photo">
          <img
            src="/images/driver-technology.webp"
            alt="Driver technology installation shown on High Grade's existing website"
            loading="lazy"
            width="1000"
            height="720"
          />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">CONFIDENCE, BEAUTIFULLY INTEGRATED</p>
          <h2>
            A clearer view.
            <br />A smarter drive.
          </h2>
          <p>
            Explore UNIDEN detection and DroneMobile connected cameras.
            Thoughtfully chosen hardware, discreet placement and guidance on the
            features that matter to you.
          </p>
          <div className="inline-links">
            <Link to="/shop/radar-laser" className="text-link">
              Radar & laser detection <Icon name="arrow" size={17} />
            </Link>
            <Link to="/shop/dash-cameras" className="text-link">
              Dash cameras <Icon name="arrow" size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section oem-section">
        <div className="container oem-grid">
          <div>
            <p className="eyebrow">FACTORY LOOK. PERSONAL SOUND.</p>
            <h2>
              Keep what you love.
              <br />
              <span>Upgrade what you hear.</span>
            </h2>
            <p>
              Discover Focal Inside and OEM-style integration. Start with your
              vehicle, then let us verify the right speakers, wiring and system
              architecture.
            </p>
            <Link to="/shop/oem-audio" className="button button-primary">
              Explore OEM upgrades <Icon name="arrow" />
            </Link>
          </div>
          <div className="vehicle-marques">
            <Link to="/vehicle?make=porsche">
              <span>01</span> Porsche <Icon name="arrow" />
            </Link>
            <Link to="/vehicle?make=bmw">
              <span>02</span> BMW <Icon name="arrow" />
            </Link>
            <Link to="/vehicle?make=mercedes-benz">
              <span>03</span> Mercedes-Benz <Icon name="arrow" />
            </Link>
            <p>Vehicle-specific solutions are subject to verified fitment.</p>
          </div>
        </div>
      </section>
      <section className="section brand-section">
        <div className="container">
          <p className="eyebrow">GREAT SYSTEMS START WITH GREAT PARTNERS</p>
          <div className="brand-strip">
            {[
              'Focal',
              'Mosconi',
              'Gladen',
              'HELIX',
              'MATCH',
              'UNIDEN',
              'DroneMobile',
            ].map((brand) => (
              <Link key={brand} to={`/shop?brand=${encodeURIComponent(brand)}`}>
                {brand}
              </Link>
            ))}
          </div>
          <Link to="/brands" className="text-link">
            Meet our brand partners <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
      <section className="visit-section container">
        <div className="visit-photo">
          <img
            src="/images/high-grade-facility.webp"
            width="1100"
            height="850"
            alt="High Grade Sound & Security facility in Miami"
            loading="lazy"
          />
        </div>
        <div className="visit-copy">
          <p className="eyebrow">PRODUCTS ARE ONLY THE BEGINNING</p>
          <h2>
            Expert hands.
            <br />
            Exceptional results.
          </h2>
          <p>
            The right system starts with a conversation. Tell us what you drive,
            what you listen to and what you want to feel. We’ll help you plan
            the next step.
          </p>
          <Link to="/consultation" className="button button-primary">
            Plan your upgrade <Icon name="arrow" />
          </Link>
          <a href="tel:+13052591035" className="visit-call">
            <Icon name="phone" size={18} /> (305) 259-1035
          </a>
        </div>
      </section>
    </div>
  );
}
