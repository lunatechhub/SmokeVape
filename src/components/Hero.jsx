import { useEffect, useState } from 'react'
import Media from './Media'
import { addressLine1, directionsUrl, hero, hours, shop } from '../data/site'
import './Hero.css'

/* Works out whether the shop is open right now from the hours data and the
   visitor's local day + time. Close times are minutes from midnight, so a
   1440 close (Fri/Sat) simply runs to the end of the day. */
export function getOpenStatus(now = new Date()) {
  const day = now.getDay()
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  const today = hours.find((block) => block.days.includes(day))

  if (!today) {
    return { isOpen: false, label: 'Closed today', todayHours: 'Closed' }
  }

  const isOpen = minutesNow >= today.opensAt && minutesNow < today.closesAt
  const label = isOpen
    ? 'Open now'
    : minutesNow < today.opensAt
      ? `Opens at ${today.display.split(' – ')[0]}`
      : 'Closed now'

  return { isOpen, label, todayHours: today.display }
}

function Hero() {
  const [status, setStatus] = useState(() => getOpenStatus())
  const [imageMissing, setImageMissing] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => setStatus(getOpenStatus()), 60000)
    return () => clearInterval(tick)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__inner shell">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__headline">{hero.headline}</h1>
          <p className="lede hero__subtext">{hero.subtext}</p>

          <p className="hero__meta">
            <span className={`hero__status ${status.isOpen ? 'hero__status--open' : ''}`}>
              <span className="hero__status-dot" aria-hidden="true" />
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

        <div className="hero__media">
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
