import { brands } from '../data/site'
import './BrandMarquee.css'

/* The track is rendered twice — the second copy is hidden from assistive tech
   and exists only so the CSS loop can restart seamlessly. */
function BrandMarquee() {
  const track = (hidden) => (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <li className="marquee__item" key={brand}>
          <span className="marquee__name">{brand}</span>
          <span className="marquee__slash" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <section className="marquee section--anchor" id="brands" aria-label="Brands we carry">
      <h2 className="visually-hidden">Brands we carry</h2>
      <div className="marquee__mask">
        <div className="marquee__viewport">
          {track(false)}
          {track(true)}
        </div>
      </div>
    </section>
  )
}

export default BrandMarquee
