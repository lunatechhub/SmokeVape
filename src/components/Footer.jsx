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
            {/* One grid for the whole block, not a grid per row: six shared
                tracks are what line the rows up. Hour and meridiem are set
                apart because a joined string cannot align — tabular-nums
                equalises digits, not string lengths, so "8 PM" ran 10px
                narrower than "10 PM". Hours are flush right (8 lands under
                the 0 of 10), meridiems flush left, and the dash is centred.

                Each time stays one <dd> carrying the text "10 AM" so screen
                readers still read a time rather than four loose tokens; the
                dd is display: contents, which lifts its two spans into the
                grid as cells of their own. The dash is decorative, so the
                reading is "Mon – Thu: 10 AM, 10 PM". */}
            <dl className="footer__hours">
              {hours.map((block) => (
                <Fragment key={block.id}>
                  <dt className="footer__hours-day">{block.label}</dt>
                  <dd className="footer__hours-time">
                    <span className="footer__hours-hour">{block.open.hour}</span>{' '}
                    <span className="footer__hours-meridiem">{block.open.meridiem}</span>
                  </dd>
                  <dd className="footer__hours-dash" aria-hidden="true">
                    &ndash;
                  </dd>
                  <dd className="footer__hours-time">
                    <span className="footer__hours-hour">{block.close.hour}</span>{' '}
                    <span className="footer__hours-meridiem">{block.close.meridiem}</span>
                  </dd>
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
              block the brand presence it had nowhere else. It runs without
              a heading and takes no offset for one either, so the wordmark
              starts level with the other columns' headings and all four
              blocks share a top edge. */}
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
