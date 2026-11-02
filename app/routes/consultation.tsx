import {useState} from 'react';
import {Link, useSearchParams} from 'react-router';
import type {Route} from './+types/consultation';
import {PRODUCTS} from '~/data/catalog';
import {VEHICLE_MAKES} from '~/data/vehicles';
import {Icon} from '~/components/Icon';
export const meta: Route.MetaFunction = () => [
  {title: 'Plan Your Upgrade | High Grade Sound & Security Miami'},
  {
    name: 'description',
    content:
      'Discuss premium car audio, OEM integration, radar, dash cameras and professional installation with High Grade in Miami.',
  },
];
export default function Consultation() {
  const [params] = useSearchParams();
  const product = PRODUCTS.find((item) => item.slug === params.get('product'));
  const make = VEHICLE_MAKES.find((item) => item.id === params.get('make'));
  const vehicle = [params.get('year'), make?.name, params.get('model')]
    .filter(Boolean)
    .join(' ');
  const [draft, setDraft] = useState('');
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `High Grade consultation${product ? ` — ${product.brand} ${product.name}` : ''}`;
    const body = `Hello High Grade,\n\nI would like help planning an upgrade.\n\nName: ${String(data.get('name'))}\nEmail: ${String(data.get('email'))}\nVehicle: ${String(data.get('vehicle'))}\nFactory audio / trim: ${String(data.get('factoryAudio'))}\nInterested in: ${String(data.get('interest'))}\nGoals: ${String(data.get('goals'))}\n\nPlease confirm pricing, availability and compatibility.\n`;
    setDraft(
      `mailto:info@highgradeonline.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }
  return (
    <div className="consultation-page container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Plan your upgrade</span>
      </nav>
      <div className="consultation-grid">
        <div className="consultation-intro">
          <p className="eyebrow">LET’S BUILD SOMETHING EXCEPTIONAL</p>
          <h1>
            Your next upgrade
            <br />
            starts with a conversation.
          </h1>
          <p>
            Great sound is personal. Tell us about your vehicle and your goals.
            We’ll help you choose a thoughtful path forward.
          </p>
          <div className="contact-options">
            <a href="tel:+13052591035">
              <Icon name="phone" />
              <span>
                <small>CALL THE HIGH GRADE TEAM</small>(305) 259-1035
              </span>
              <Icon name="arrow" />
            </a>
            <a
              href="https://maps.app.goo.gl/1sK29b77PDk6sw5k9"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="pin" />
              <span>
                <small>VISIT OUR MIAMI FACILITY</small>13540 SW 128th St, #201
                <br />
                Miami, FL 33186
              </span>
              <Icon name="arrow" />
            </a>
          </div>
          <img
            src="/images/high-grade-facility.webp"
            width="1100"
            height="850"
            alt="High Grade's Miami installation facility"
            loading="lazy"
          />
        </div>
        <div className="consultation-form-card">
          <h2>Plan your system</h2>
          <p>
            Prepare an inquiry for our team. You’ll review and send it in your
            email app.
          </p>
          <form onSubmit={prepare} onChange={() => setDraft('')}>
            <label>
              Your name
              <input name="name" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
              />
            </label>
            <label id="vehicle">
              Vehicle year, make & model
              <input
                name="vehicle"
                defaultValue={vehicle}
                placeholder="e.g. 2024 Porsche 911"
                required
                maxLength={200}
              />
            </label>
            <label>
              Factory audio package / trim{' '}
              <span className="optional">(if known)</span>
              <input
                name="factoryAudio"
                placeholder="Tell us what is currently installed"
                maxLength={250}
              />
            </label>
            <label>
              What are you interested in?
              <input
                name="interest"
                defaultValue={
                  product
                    ? `${product.brand} ${product.name}`
                    : params.get('topic') === 'fitment'
                      ? 'Vehicle compatibility review'
                      : ''
                }
                placeholder="A product, a category or a complete system"
                maxLength={250}
              />
            </label>
            <label>
              What would you like to improve?
              <textarea
                name="goals"
                rows={4}
                required
                maxLength={1500}
                placeholder="Listening preferences, integration needs and the experience you're looking for."
              />
            </label>
            <button className="button button-primary" type="submit">
              Prepare email inquiry <Icon name="arrow" />
            </button>
          </form>
          {draft && (
            <div className="draft-ready" role="status">
              <h3>Your inquiry is ready to review.</h3>
              <p>
                Nothing has been sent or stored on this website. Open your email
                app to review and send it.
              </p>
              <a className="button button-dark" href={draft}>
                Open email draft <Icon name="arrow" />
              </a>
            </div>
          )}
          <a
            className="text-link official-contact"
            href="https://www.highgradeonline.com/contact-us"
            target="_blank"
            rel="noreferrer"
          >
            Prefer a web form? Visit High Grade’s contact page ↗
          </a>
        </div>
      </div>
    </div>
  );
}
