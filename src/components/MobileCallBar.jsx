import { directionsUrl, shop } from '../data/site'
import './MobileCallBar.css'

function MobileCallBar() {
  return (
    <div className="call-bar" aria-label="Quick actions">
      <a className="call-bar__button call-bar__button--solid" href={shop.phoneHref}>
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
