import { useCallback, useEffect, useRef, useState } from 'react'
import { directionsUrl, site } from '../data'
import { navLinks } from '../data/shared'
import './Navbar.css'

const FOCUSABLE = 'a[href], button:not([disabled])'

/* The wordmark always ends on an accent-coloured period. A name that already
   ends in one ("… Co.") has it split off so it is not doubled. */
const wordmarkText = site.name.replace(/\.$/, '')

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  /* A tenant logo that fails to load drops back to the text-only mark
     rather than leaving an empty 40px box in the bar. */
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = Boolean(site.logo) && !logoFailed
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  /* While the overlay is open: lock the page, close on Escape, and keep Tab
     cycling inside the menu. */
  useEffect(() => {
    if (!menuOpen) return undefined

    const panel = menuRef.current
    const items = panel ? Array.from(panel.querySelectorAll(FOCUSABLE)) : []
    items[0]?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== 'Tab' || items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen, closeMenu])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner shell">
        <a
          className={[
            'navbar__wordmark',
            showLogo ? 'navbar__wordmark--logo' : '',
            /* A long trading name overruns the bar on a phone. Measured at
               390px, "Golden Vape & Smoke - Premium Cigar" came to 349px
               against 375px of shell, and with the menu toggle beside it the
               page scrolled sideways — 427px of content in a 375px viewport.
               The modifier lets that one name sit a step smaller on small
               screens; shops with a short name never match it and keep the
               size they have. */
            wordmarkText.length > 28 ? 'navbar__wordmark--long' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          href="#top"
          aria-label={`${site.branch ? `${site.name} ${site.branch}` : site.name} — back to top`}
        >
          {showLogo && (
            <img
              className="navbar__logo"
              src={site.logo}
              alt=""
              width="40"
              height="40"
              onError={() => setLogoFailed(true)}
            />
          )}
          {/* A tenant that shares its name with another location sets
              `branch`, which sits on a small line under the name so the
              two sites can be told apart. Without it, the mark is the name
              alone, exactly as before. */}
          {site.branch ? (
            <span className="navbar__wordmark-lockup">
              <span className="navbar__wordmark-name">
                <span aria-hidden="true">{wordmarkText}</span>
                <span className="navbar__wordmark-dot" aria-hidden="true">
                  .
                </span>
              </span>
              <span className="navbar__wordmark-branch" aria-hidden="true">
                {site.branch}
              </span>
            </span>
          ) : (
            <>
              <span aria-hidden="true">{wordmarkText}</span>
              <span className="navbar__wordmark-dot" aria-hidden="true">
                .
              </span>
            </>
          )}
        </a>

        <nav className="navbar__nav" aria-label="Primary">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a className="navbar__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="navbar__phone" href={site.phoneHref}>
          {site.phone}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={`navbar__bars ${menuOpen ? 'navbar__bars--open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="navbar__overlay-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a className="navbar__overlay-link" href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__overlay-footer">
          <a className="navbar__overlay-phone" href={site.phoneHref} onClick={closeMenu}>
            {site.phone}
          </a>
          <a
            className="navbar__overlay-directions"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={closeMenu}
          >
            Get Directions <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
