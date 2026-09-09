/* Consent storage, kept out of the component file so CookieConsent.jsx
   exports a component and nothing else (React Fast Refresh).

   Every storage call is wrapped: a private window, blocked site data, or an
   embedded preview can each make localStorage throw on access rather than
   return null. A visitor who cannot store a choice simply sees the notice
   again next visit, which is the safe direction to fail in. */
const STORAGE_KEY = 'sv-cookie-consent'

export const REOPEN_EVENT = 'cookie-consent:open'

/* The single question any future analytics script should ask before it
   loads: returns 'accepted', 'declined', or null when undecided. */
export function getCookieConsent() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

export function setCookieConsent(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* Nothing to do — the choice just won't survive the session. */
  }
}
