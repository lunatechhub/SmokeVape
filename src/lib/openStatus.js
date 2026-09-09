import { hours } from '../data/site'

/* Works out whether the shop is open right now from the hours data and the
   visitor's local day + time. Close times are minutes from midnight, so a
   1440 close (Fri/Sat) simply runs to the end of the day.

   Kept out of Hero.jsx so that file exports a component and nothing else —
   a module mixing the two breaks React Fast Refresh. */
export function getOpenStatus(now = new Date()) {
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
      ? `Opens at ${today.display.split(' – ')[0]}`
      : 'Closed now'

  return { isOpen, label, todayHours: today.display }
}
