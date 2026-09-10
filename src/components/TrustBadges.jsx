import { trustBadges } from '../data/site'
import './TrustBadges.css'

/* Four icon-and-sentence cards on an even grid was the most template-looking
   row on the page. The same four claims now run as one quiet line of text
   under a hairline — every word kept, the icons dropped. */
function TrustBadges() {
  return (
    <section className="trust section" aria-labelledby="trust-heading">
      <div className="shell">
        <h2 id="trust-heading" className="visually-hidden">
          Why people shop with us
        </h2>
        <p className="trust__line">
          {trustBadges.map((badge, index) => (
            <span className="trust__item" key={badge.id}>
              {index > 0 && (
                <span className="trust__sep" aria-hidden="true">
                  &nbsp;&middot;&nbsp;
                </span>
              )}
              <span className="trust__title">{badge.title}</span>
              <span className="trust__text"> {badge.text}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default TrustBadges
