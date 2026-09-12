import { hours } from '../data'

/* Works out whether the shop is open right now from the hours data and the
   visitor's local day + time. Close times are minutes from midnight, so a
   1440 close (a "24:00" in the tenant file) simply runs to the end of the
   day.

   Returns null when the tenant has no hours on file. A status worked out
   from missing hours would be a guess, and "Closed" on an open shop is worse
   than saying nothing, so the hero renders no status at all.

   Kept out of Hero.jsx so that file exports a component and nothing else —
   a module mixing the two breaks React Fast Refresh. */
export function getOpenStatus(now = new Date()) {
  if (hours.length === 0) return null

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
      ? `Opens at ${today.open.text}`
      : 'Closed now'

  return { isOpen, label, todayHours: today.display }
}
