import Media from './Media'
import { badgeLegend, products } from '../data/site'
import './ProductGrid.css'

/* The badge is a coloured dot that grows into a labelled pill on hover or
   focus. The label is always in the DOM inside an sr-only span, so the
   meaning never depends on seeing the colour — and the legend under the grid
   makes the three colours decodable for everyone else. */
function Badge({ badge }) {
  return (
    <span className={`badge badge--${badge.id}`}>
      <span className="badge__dot" aria-hidden="true" />
      <span className="badge__label" aria-hidden="true">
        {badge.label}
      </span>
      <span className="visually-hidden">{badge.label}</span>
    </span>
  )
}

function ProductGrid() {
  return (
    <section
      className="products section section--anchor"
      id="products"
      aria-labelledby="products-heading"
    >
      <div className="shell">
        <div className="products__head reveal">
          <p className="eyebrow">In the case</p>
          <h2 id="products-heading" className="products__heading">
            What we stock.
          </h2>
          <p className="products__intro">
            Full range in store — new drops land every week.
          </p>
        </div>

        <ul className="products__grid">
          {products.map((product, index) => (
            <li className="product-card reveal" key={product.id} style={{ '--i': index }}>
              <div className="product-card__media media-frame">
                {product.badge && <Badge badge={product.badge} />}
                <Media className="product-card__image" image={product.image} loading="lazy" />
              </div>
              <div className="product-card__body">
                <p className="product-card__meta">{product.meta}</p>
                <h3 className="product-card__name">{product.name}</h3>
                {product.flavour && <p className="product-card__flavour">{product.flavour}</p>}
              </div>
            </li>
          ))}
        </ul>

        <ul className="products__legend reveal">
          {badgeLegend.map((badge) => (
            <li className="products__legend-item" key={badge.id}>
              <span className={`products__legend-dot badge--${badge.id}`} aria-hidden="true" />
              {badge.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductGrid
