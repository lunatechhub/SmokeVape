import Media from './Media'
import { categories } from '../data/site'
import './Categories.css'

function Categories() {
  return (
    <section className="categories section" aria-labelledby="categories-heading">
      <div className="shell">
        <div className="categories__head">
          <p className="eyebrow">What we carry</p>
          <h2 id="categories-heading" className="categories__heading">
            Three shelves, kept full.
          </h2>
        </div>

        <ul className="categories__grid">
          {categories.map((category, index) => (
            <li className="category-card" key={category.id} style={{ '--i': index }}>
              <div className="category-card__media media-frame">
                <Media className="category-card__image" image={category.image} loading="lazy" />
              </div>
              <div className="category-card__body">
                <span className="category-card__number">{category.number}</span>
                <h3 className="category-card__title">{category.title}</h3>
                <p className="category-card__stocked">{category.stocked}</p>
                <p className="category-card__blurb">{category.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Categories
