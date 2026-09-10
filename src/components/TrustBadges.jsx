import { trustBadges } from '../data/site'
import './TrustBadges.css'

/* Thin line icons, inline — no icon library. */
const icons = {
  badge: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M8.5 15.5 7 22l5-2.5 5 2.5-1.5-6.5" />
    </>
  ),
  box: (
    <>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    </>
  ),
  phone: (
    <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" />
  ),
  shield: (
    <>
      <path d="M12 3 20 6v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
}

/* The display serif sets figures at x-height, so the 1 in "21+ Verified"
   reads as a lowercase L — "2l+". A leading run of digits is split off and
   set in the sans face with lining figures, so the numeral is unambiguous.
   The text itself is untouched: the label still reads "21+ Verified", it is
   only which face draws the first three characters that changes. */
function Label({ text }) {
  const match = /^([\d+]+)(.*)$/.exec(text)
  if (!match) return text
  return (
    <>
      <span className="trust__figure">{match[1]}</span>
      {match[2]}
    </>
  )
}

function TrustBadges() {
  return (
    <section className="trust section" aria-labelledby="trust-heading">
      <div className="shell">
        <h2 id="trust-heading" className="visually-hidden">
          Why people shop with us
        </h2>
        <ul className="trust__grid">
          {trustBadges.map((badge) => (
            <li className="trust__item" key={badge.id}>
              <svg
                className="trust__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {icons[badge.icon]}
              </svg>
              <h3 className="trust__title">
                <Label text={badge.title} />
              </h3>
              <p className="trust__text">{badge.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TrustBadges
