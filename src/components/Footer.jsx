import { Fragment, useState } from 'react'
import Media from './Media'
import { REOPEN_EVENT } from '../lib/cookieConsent'
import { directionsUrl, hours, isSet, site } from '../data'
import { cookieNotice, copyrightYear, footerAge, socialNetworks } from '../data/shared'
import './Footer.css'

/* The footer is also the "Visit" target — it carries the only copy of the
   address, hours and phone number on the page.

   Three bands: a masthead (wordmark beside the two calls to action), the
   detail columns on an even three-track grid, then the copyright row. Every
   column starts at its own track's left edge — nothing is pushed right — and
   all three share one internal rhythm so they read as a single block.

   Between the masthead and the columns sits the Visit band: the shop's own
   photograph beside its map. Both halves are optional and independent — a
   shop with neither renders nothing there. */
function Footer() {
  const social = socialNetworks.filter((network) => isSet(site.social[network.id]))
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <footer className="footer section--anchor" id="visit" aria-labelledby="footer-heading">
      <div className="shell">
        <div className="footer__masthead">
          <h2 id="footer-heading" className="footer__wordmark" aria-label={site.name}>
            <span aria-hidden="true">{site.wordmark[0]}</span>
            <span aria-hidden="true">{site.wordmark[1]}</span>
          </h2>

          <div className="footer__pitch">
            <p className="footer__pitch-text">{site.copy.pitch}</p>
            <div className="footer__actions">
              <a className="btn btn--light" href={site.phoneHref}>
                {site.phone}
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

        {/* The Visit band. The photo is opt-in per shop: images.visit is set
            only where a real, checked photograph exists, which is what keeps
            the AI-generated stock sitting in some shops' storefront and
            interior fields off the page. Either half may be absent. */}
        {(isSet(site.mapEmbedSrc) || site.images.visit) && (
          <div className={`footer__visit${site.images.visit ? ' footer__visit--split' : ''}`}>
            {site.images.visit && (
              <Media className="footer__visit-photo" image={site.images.visit} loading="lazy" />
            )}

            {/* The masthead's Directions button sits directly above the map
                and opens the same place in Google Maps in a new tab. */}
            {isSet(site.mapEmbedSrc) && (
              <div className="footer__map">
                <iframe
                  className="footer__map-frame"
                  src={site.mapEmbedSrc}
                  title={`Map to ${site.name} in ${site.location}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        )}

        <div className="footer__columns">
          <div className="footer__column">
            <h3 className="footer__label">Contact</h3>
            <address className="footer__address">
              <span>{site.address.line1}</span>
              <span>{site.address.line2}</span>
              {site.address.note && <span>{site.address.note}</span>}
            </address>
            <a className="footer__link" href={site.phoneHref}>
              {site.phone}
            </a>
            {isSet(site.email) && (
              <a className="footer__link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            )}
          </div>

          {/* No hours on file, no Hours column: an empty heading would read
              as a shop with no opening times at all. */}
          {hours.length > 0 && (
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
          )}

          {social.length > 0 && (
            <div className="footer__column">
              <h3 className="footer__label">Follow</h3>
              <ul className="footer__social">
                {social.map((network) => (
                  <li key={network.id}>
                    <a
                      className="footer__link"
                      href={site.social[network.id]}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {network.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fourth column. Three columns left the grid ending well short of
              the container; this one both closes that gap and gives the
              block the brand presence it had nowhere else. It runs without
              a heading and takes no offset for one either, so the wordmark
              starts level with the other columns' headings and all four
              blocks share a top edge. */}
          <div className="footer__column footer__column--brand">
            <p className="footer__brand-name">{site.name}</p>
            <p className="footer__brand-line">{site.copy.footerLine}</p>
            <p className="footer__brand-age">{footerAge}</p>
          </div>
        </div>

        <div className="footer__bar">
          {/* Legal and the consent re-opener travel together on the left so
              the bar still reads as two groups, not three loose items. */}
          <div className="footer__bar-group">
            <p className="footer__legal">
              {site.logo && !logoFailed && (
                <img
                  className="footer__legal-logo"
                  src={site.logo}
                  alt=""
                  width="20"
                  height="20"
                  onError={() => setLogoFailed(true)}
                />
              )}
              {`© ${copyrightYear} ${site.name} · 21+ Only`}
            </p>
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
