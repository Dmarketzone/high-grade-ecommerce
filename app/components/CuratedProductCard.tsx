import {Link} from 'react-router';
import type {Product} from '~/data/catalog';
import {Icon} from './Icon';
export function CuratedProductCard({product}: {product: Product}) {
  return (
    <article className="curated-card">
      <Link
        className="card-image-link"
        to={`/catalog/${product.slug}`}
        aria-label={`View ${product.brand} ${product.name}`}
        prefetch="intent"
      >
        <img
          src={product.imagery.images[0].src}
          alt={product.imagery.images[0].alt}
          width="480"
          height="360"
          loading="lazy"
        />
        <span className="card-family">{product.family}</span>
      </Link>
      <div className="card-content">
        <p className="eyebrow">{product.brand}</p>
        <h3>
          <Link to={`/catalog/${product.slug}`} prefetch="intent">
            {product.name}
          </Link>
        </h3>
        <p className="card-description">{product.summary}</p>
        <div className="card-bottom">
          <span>Consult for pricing</span>
          <Link
            to={`/catalog/${product.slug}`}
            aria-label={`Explore ${product.name}`}
          >
            <Icon name="arrow" size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}
