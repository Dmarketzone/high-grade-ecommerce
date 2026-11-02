import {useState} from 'react';
import type {Product} from '~/data/catalog';
export function ProductGallery({product}: {product: Product}) {
  const [index, setIndex] = useState(0);
  const images = product.imagery.images;
  const selected = images[index] ?? images[0];
  return (
    <div className="product-gallery">
      <div className="gallery-main">
        <img
          src={selected.src}
          alt={selected.alt}
          width="1000"
          height="800"
          {...{fetchpriority: 'high'}}
        />
        <span className="gallery-counter">
          {index + 1} / {images.length}
        </span>
      </div>
      <div className="gallery-thumbnails" aria-label="Product image gallery">
        {images.map((image, i) => (
          <button
            type="button"
            key={image.src}
            aria-label={`View ${product.name} image ${i + 1}`}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            <img
              src={image.src}
              alt={image.alt}
              width="110"
              height="90"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
