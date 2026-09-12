import { useEffect, useState } from 'react'
import Media from './Media'
import { getOpenStatus } from '../lib/openStatus'
import { directionsUrl, site } from '../data'
import './Hero.css'

function Hero() {
  const [status, setStatus] = useState(() => getOpenStatus())
  const [imageMissing, setImageMissing] = useState(false)
  const image = site.images.hero

  /* A portrait hero is laid out differently from a landscape one: it is shown
     whole instead of being cropped to fill the copy column. The orientation
     is read off the file's own dimensions in the tenant data, so each shop
     gets the right treatment without this component naming any of them. */
  const isPortrait = image.height > image.width

  useEffect(() => {
    const tick = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(tick)
  }, [])

  return (
    <section className="hero" id="top">
      <div className={`hero__inner shell${isPortrait ? ' hero__inner--portrait' : ''}`}>
        <div className="hero__copy reveal reveal--hero">
          <p className="eyebrow">{site.tagline}</p>
          <h1 className="hero__headline">{site.copy.headline}</h1>
          <p className="lede hero__subtext">{site.copy.subtext}</p>

          {/* status is null when the shop has no hours on file; the line
              then carries the address alone, with no guessed status. */}
          <p className="hero__meta">
            {status && (
              <>
                <span className={`hero__status ${status.isOpen ? 'hero__status--open' : ''}`}>
                  {/* The ring is a second circle behind the dot; it only
                      renders while the shop is open, and the animation is
                      dropped under reduced motion. */}
                  <span className="hero__status-light" aria-hidden="true">
                    {status.isOpen && <span className="hero__status-ring" />}
                    <span className="hero__status-dot" />
                  </span>
                  {status.label}
                </span>
                <span className="hero__meta-divider" aria-hidden="true">
                  ·
                </span>
              </>
            )}
            {site.address.line1}
            {status && (
              <>
                <span className="hero__meta-divider" aria-hidden="true">
                  ·
                </span>
                <span className="hero__meta-hours">Today {status.todayHours}</span>
              </>
            )}
            {/* An optional perk the shop offers, set as one more item on
                this line rather than a section or badge of its own. */}
            {site.copy.perk && (
              <>
                <span className="hero__meta-divider" aria-hidden="true">
                  ·
                </span>
                <span className="hero__perk">{site.copy.perk}</span>
              </>
            )}
          </p>

          <div className="hero__actions">
            <a
              className="btn btn--solid btn--lg"
              href={directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Get Directions
            </a>
            <a className="btn btn--outline btn--lg" href={site.phoneHref}>
              Call Us
            </a>
          </div>
        </div>

        <div className="hero__media reveal reveal--hero reveal--hero-late">
          {/* Until the photo exists at the path below, a labelled slot shows
              exactly which file to drop in. It disappears on its own once the
              image loads. */}
          {imageMissing ? (
            <div className="hero__placeholder">
              <svg
                className="hero__placeholder-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="M21 16l-5-5-6 6-3-3-4 4" />
              </svg>
              <p className="hero__placeholder-label">Add photo</p>
              <p className="hero__placeholder-file">{image.src}</p>
              <p className="hero__placeholder-hint">
                {image.width} × {image.height} — {image.alt}
              </p>
            </div>
          ) : (
            <Media
              className="hero__image"
              image={image}
              fetchPriority="high"
              onError={() => setImageMissing(true)}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
