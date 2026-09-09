import { nicotineWarning } from '../data/site'
import './NicotineBanner.css'

function NicotineBanner({ position = 'top' }) {
  return (
    <aside
      className={`nicotine-banner nicotine-banner--${position}`}
      aria-label="Nicotine warning"
    >
      <p className="nicotine-banner__text">{nicotineWarning}</p>
    </aside>
  )
}

export default NicotineBanner
