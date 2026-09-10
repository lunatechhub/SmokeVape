import { useEffect, useState } from 'react'
import Media from './Media'
import { getOpenStatus } from '../lib/openStatus'
import { addressLine1, directionsUrl, hero, shop } from '../data/site'
import './Hero.css'

function Hero() {
  const [status, setStatus] = useState(() => getOpenStatus())
  const [imageMissing, setImageMissing] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(tick)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy reveal reveal--hero">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__headline">{hero.headline}</h1>
          <p className="lede hero__subtext">{hero.subtext}</p>

          <p className="hero__meta">
            <span className={`hero__status ${status.isOpen ? 'hero__status--open' : ''}`}>
              {/* The ring is a second circle behind the dot; it only renders
                  while the shop is open, and the animation is dropped under
                  reduced motion. */}
              <span className="hero__status-light" aria-hidden="true">
                {status.isOpen && <span className="hero__status-ring" />}
                <span className="hero__status-dot" />
              </span>
              {status.label}
            </span>
            <span className="hero__meta-divider" aria-hidden="true">
              ·
            </span>
            {addressLine1}
            <span className="hero__meta-divider" aria-hidden="true">
              ·
            </span>
            <span className="hero__meta-hours">Today {status.todayHours}</span>
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
            <a className="btn btn--outline btn--lg" href={shop.phoneHref}>
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
              <p className="hero__placeholder-file">{hero.image.src}</p>
              <p className="hero__placeholder-hint">
                {hero.image.width} × {hero.image.height} — {hero.image.alt}
              </p>
            </div>
          ) : (
            <Media
              className="hero__image"
              image={hero.image}
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
