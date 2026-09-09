import { useCallback, useEffect, useRef, useState } from 'react'
import { directionsUrl, navLinks, shop } from '../data/site'
import './Navbar.css'

const FOCUSABLE = 'a[href], button:not([disabled])'

/* The name already ends in a period ("Smoke & Vape Co."); it is split off so
   it can carry the accent colour. */
const wordmarkText = shop.name.replace(/\.$/, '')

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
        <a className="navbar__wordmark" href="#top" aria-label={`${shop.name} — back to top`}>
          <span aria-hidden="true">{wordmarkText}</span>
          <span className="navbar__wordmark-dot" aria-hidden="true">
            .
          </span>
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

        <a className="navbar__phone" href={shop.phoneHref}>
          {shop.phone}
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
          <a className="navbar__overlay-phone" href={shop.phoneHref} onClick={closeMenu}>
            {shop.phone}
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
