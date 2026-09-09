import {
  addressLine1,
  addressLine2,
  directionsUrl,
  hours,
  legalLine,
  shop,
  social,
} from '../data/site'
import './Footer.css'

/* The footer is also the "Visit" target — it carries the only copy of the
   address, hours and phone number on the page.

   Layout is three bands separated by hairlines: a masthead (wordmark beside
   the two calls to action), the detail columns, then a compact legal bar.
   Pairing the wordmark with the CTAs is what keeps the tall type from
   leaving a dead column of empty space beside it. */
function Footer() {
  return (
    <footer className="footer section--anchor" id="visit" aria-labelledby="footer-heading">
      <div className="shell">
        <div className="footer__masthead">
          <h2 id="footer-heading" className="footer__wordmark" aria-label={shop.name}>
            <span aria-hidden="true">{shop.wordmark[0]}</span>
            <span aria-hidden="true">{shop.wordmark[1]}</span>
          </h2>

          <div className="footer__pitch">
            <p className="footer__pitch-text">
              On Academy since day one. Call ahead and we&rsquo;ll hold it behind the counter.
            </p>
            <div className="footer__actions">
              <a className="btn btn--light" href={shop.phoneHref}>
                {shop.phone}
              </a>
              <a
                className="btn btn--ghost"
                href={directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Directions
              </a>
            </div>
          </div>
        </div>

        <div className="footer__columns">
          <div className="footer__column">
            <h3 className="footer__label">Contact</h3>
            <address className="footer__address">
              <span>{addressLine1}</span>
              <span>{addressLine2}</span>
            </address>
            <a className="footer__link" href={`mailto:${shop.email}`}>
              {shop.email}
            </a>
          </div>

          <div className="footer__column">
            <h3 className="footer__label">Hours</h3>
            <ul className="footer__hours">
              {hours.map((block) => (
                <li className="footer__hours-row" key={block.id}>
                  <span>{block.label}</span>
                  <span>{block.display}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__label">Follow</h3>
            <ul className="footer__social">
              {social.map((item) => (
                <li key={item.id}>
                  <a
                    className="footer__link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <p className="footer__legal">{legalLine}</p>
          <a className="footer__top-link" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
