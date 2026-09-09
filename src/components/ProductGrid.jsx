import Media from './Media'
import { products } from '../data/site'
import './ProductGrid.css'

function ProductGrid() {
  return (
    <section className="products section section--anchor" id="products" aria-labelledby="products-heading">
      <div className="shell">
        <div className="products__head reveal">
          <p className="eyebrow">In the case</p>
          <h2 id="products-heading" className="products__heading">
            What we stock.
          </h2>
        </div>

        <ul className="products__grid">
          {products.map((product, index) => (
            <li className="product-card reveal" key={product.id} style={{ '--i': index }}>
              <div className="product-card__media media-frame">
                {product.badge && <span className="product-card__badge">{product.badge}</span>}
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

        <p className="products__footnote reveal">
          Full range in store — new drops land every week.
        </p>
      </div>
    </section>
  )
}

export default ProductGrid
