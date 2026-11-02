import {Link} from 'react-router';
import {CATEGORIES} from '~/data/catalog';
import {Icon} from './Icon';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand-logo">
            <img
              src="/images/high-grade-logo.webp"
              width="180"
              height="129"
              alt="High Grade Sound & Security"
              loading="lazy"
            />
          </Link>
          <p>
            Exceptional sound.
            <br />
            Thoughtful integration.
            <br />A higher grade of driving.
          </p>
          <a className="footer-phone" href="tel:+13052591035">
            (305) 259-1035
          </a>
        </div>
        <div>
          <h3>Explore the catalog</h3>
          {CATEGORIES.map((item) => (
            <Link key={item.slug} to={`/shop/${item.slug}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>The High Grade experience</h3>
          <Link to="/vehicle">Shop by vehicle</Link>
          <Link to="/brands">Our brand partners</Link>
          <Link to="/consultation">Installation & consultation</Link>
          <a
            href="https://www.highgradeonline.com/about"
            target="_blank"
            rel="noreferrer"
          >
            About High Grade ↗
          </a>
          <Link to="/demo-shop">mock.shop demo merchandise</Link>
        </div>
        <div className="footer-visit">
          <h3>Visit us in Miami</h3>
          <a
            href="https://maps.app.goo.gl/1sK29b77PDk6sw5k9"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="pin" size={18} />
            <span>
              13540 SW 128th St, #201
              <br />
              Miami, FL 33186
            </span>
          </a>
          <a href="mailto:info@highgradeonline.com">info@highgradeonline.com</a>
          <Link className="text-link" to="/consultation">
            Plan your visit <Icon name="arrow" size={15} />
          </Link>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/high.grade_ss/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://www.facebook.com/HighGrade3MProShopDealer/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook ↗
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 High Grade Sound & Security</span>
        <span>Client review preview · No live payments</span>
        <a
          href="https://www.highgradeonline.com/"
          target="_blank"
          rel="noreferrer"
        >
          Visit highgradeonline.com ↗
        </a>
      </div>
    </footer>
  );
}
