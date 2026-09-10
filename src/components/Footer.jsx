import { Fragment } from 'react'
import { REOPEN_EVENT } from '../lib/cookieConsent'
import {
  addressLine1,
  addressLine2,
  cookieNotice,
  directionsUrl,
  footerBrand,
  hours,
  legalLine,
  shop,
  social,
} from '../data/site'
import './Footer.css'

/* The footer is also the "Visit" target — it carries the only copy of the
   address, hours and phone number on the page.

   Three bands: a masthead (wordmark beside the two calls to action), the
   detail columns on an even three-track grid, then the copyright row. Every
   column starts at its own track's left edge — nothing is pushed right — and
   all three share one internal rhythm so they read as a single block. */
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
            <a className="footer__link" href={shop.phoneHref}>
              {shop.phone}
            </a>
            <a className="footer__link" href={`mailto:${shop.email}`}>
              {shop.email}
            </a>
          </div>

          <div className="footer__column">
            <h3 className="footer__label">Hours</h3>
            {/* One grid for the whole block, not a grid per row — four shared
                tracks are what make the days, the opening times, the dashes
                and the closing times each line up down the column. Splitting
                the time across three cells is the point: as one string the
                dash landed at a different x on every row. The dash is
                decorative, so the reading is "Mon – Thu: 10 AM, 10 PM". */}
            <dl className="footer__hours">
              {hours.map((block) => (
                <Fragment key={block.id}>
                  <dt className="footer__hours-day">{block.label}</dt>
                  <dd className="footer__hours-open">{block.open}</dd>
                  <dd className="footer__hours-dash" aria-hidden="true">
                    &ndash;
                  </dd>
                  <dd className="footer__hours-close">{block.close}</dd>
                </Fragment>
              ))}
            </dl>
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

          {/* Fourth column. Three columns left the grid ending well short of
              the container; this one both closes that gap and gives the
              block the brand presence it had nowhere else. It carries no
              heading, so the CSS offsets it onto the shared first-item
              baseline instead. */}
          <div className="footer__column footer__column--brand">
            <p className="footer__brand-name">{footerBrand.name}</p>
            <p className="footer__brand-line">{footerBrand.line}</p>
            <p className="footer__brand-age">{footerBrand.age}</p>
          </div>
        </div>

        <div className="footer__bar">
          {/* Legal and the consent re-opener travel together on the left so
              the bar still reads as two groups, not three loose items. */}
          <div className="footer__bar-group">
            <p className="footer__legal">{legalLine}</p>
            <button
              className="footer__link footer__top-link"
              type="button"
              onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
            >
              {cookieNotice.manage}
            </button>
          </div>
          <a className="footer__link footer__top-link" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
