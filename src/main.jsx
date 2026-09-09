import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/* Browsers restore the previous scroll offset on reload, which drops a
   returning visitor halfway down the page with the reveal animations already
   spent. Take that over: reloads start at the top, and only an explicit
   #hash in the URL is allowed to scroll somewhere else.

   This runs before render so the restore never happens in the first place —
   scrolling back up afterwards would be visible as a jump. */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

if (!window.location.hash) {
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
