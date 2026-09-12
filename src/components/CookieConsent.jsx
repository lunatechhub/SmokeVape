import { useEffect, useRef, useState } from 'react'
import { REOPEN_EVENT, getCookieConsent, setCookieConsent } from '../lib/cookieConsent'
import { cookieNotice } from '../data/shared'
import './CookieConsent.css'

function CookieConsent() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const reopenedRef = useRef(false)

  useEffect(() => {
    /* Held back a beat so the notice settles in after the hero has painted
       instead of racing it on first load. */
    let timer
    if (!getCookieConsent()) {
      timer = setTimeout(() => setOpen(true), 900)
    }

    const reopen = () => {
      reopenedRef.current = true
      setOpen(true)
    }

    window.addEventListener(REOPEN_EVENT, reopen)
    return () => {
      clearTimeout(timer)
      window.removeEventListener(REOPEN_EVENT, reopen)
    }
  }, [])

  /* Only pull focus when the visitor asked for the notice from the footer.
     Stealing it on first load would yank a reader out of the page. */
  useEffect(() => {
    if (open && reopenedRef.current && panelRef.current) {
      panelRef.current.focus()
      reopenedRef.current = false
    }
  }, [open])

  const choose = (value) => {
    setCookieConsent(value)
    setOpen(false)
  }

  if (!open) return null

  return (
    <section
      className="cookie"
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
    >
      {/* .shell keeps the copy aligned to the same column as the rest of the
          page while the bar itself runs the full width of the viewport. */}
      <div className="cookie__inner shell">
        <div className="cookie__copy">
          <p className="cookie__title" id="cookie-title">
            {cookieNotice.title}
          </p>
          <p className="cookie__text" id="cookie-text">
            {cookieNotice.text}
          </p>
        </div>

        <div className="cookie__actions">
          <button
            className="btn btn--solid cookie__btn"
            type="button"
            onClick={() => choose('accepted')}
          >
            {cookieNotice.accept}
          </button>
          <button
            className="btn btn--outline cookie__btn"
            type="button"
            onClick={() => choose('declined')}
          >
            {cookieNotice.decline}
          </button>
        </div>
      </div>
    </section>
  )
}

export default CookieConsent
