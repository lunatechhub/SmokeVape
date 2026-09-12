import { directionsUrl, site } from '../data'
import './MobileCallBar.css'

function MobileCallBar() {
  return (
    <div className="call-bar" aria-label="Quick actions">
      <a className="call-bar__button call-bar__button--solid" href={site.phoneHref}>
        Call
      </a>
      <a
        className="call-bar__button"
        href={directionsUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        Directions
      </a>
    </div>
  )
}

export default MobileCallBar
