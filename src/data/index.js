/* The active shop. '@tenant' is set in vite.config.js from VITE_TENANT (the
   .env.<key> file each npm script loads), and points at exactly one file in
   ./tenants/, so a build contains that shop's data and no other's. The list
   of shops lives in vite.config.js. */
import tenant from '@tenant'

export const site = tenant

/* A tenant value counts as set when it is non-empty and is not a "TODO"
   marker. Optional details (email, social links, review link) render only
   when set, so an unconfirmed value never reaches the page. */
export const isSet = (value) => Boolean(value) && !String(value).startsWith('TODO')

/* --- Derived values --------------------------------------------------------
   Worked out once from the active tenant so every component reads the same
   string. Nothing below holds shop data of its own. */

/* A tenant can pin its own directions link (mapsUrl), such as one copied
   from its Google listing. Otherwise the link is built from the plus code,
   or failing that the name and address. */
export const directionsUrl = isSet(site.mapsUrl)
  ? site.mapsUrl
  : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      site.address.plusCode || `${site.name}, ${site.address.line1}, ${site.address.line2}`,
    )}`

/* Tenants write hours as 24-hour "HH:MM"; the page needs them two ways.

   The "open now" line needs minutes from midnight, so "24:00" becomes 1440
   and simply runs to the end of the day.

   The footer needs each time split into hour and meridiem, held apart
   rather than as one pre-joined string. It gives all four parts their own
   grid track: hours align on their units digit, so a single-digit 8 sits
   under the 0 of 10, and every AM/PM starts at one x. Joined strings cannot
   do this — tabular-nums equalises digits, not string lengths, so "8 PM"
   ran 10px narrower than "10 PM" and "AM" is a further 0.95px wider than
   "PM". `display` is derived from the pair, keeping one source of truth for
   anything wanting the time as a single run of text. */
const toMinutes = (value) => {
  const [h, m] = value.split(':').map(Number)
  return h * 60 + m
}

const toTime = (value) => {
  const [h, m] = value.split(':').map(Number)
  const hour12 = h % 12 || 12
  const hour = m ? `${hour12}:${String(m).padStart(2, '0')}` : String(hour12)
  const meridiem = h % 24 < 12 ? 'AM' : 'PM'
  return { hour, meridiem, text: `${hour} ${meridiem}` }
}

export const hours = site.hours.map((block) => {
  const open = toTime(block.open)
  const close = toTime(block.close)
  return {
    id: block.label,
    label: block.label,
    days: block.days,
    opensAt: toMinutes(block.open),
    closesAt: toMinutes(block.close),
    open,
    close,
    display: `${open.text} – ${close.text}`,
  }
})
