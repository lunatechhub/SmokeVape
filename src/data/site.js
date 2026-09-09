/* ==========================================================================
   Every word of copy on this site lives here. Edit text in this file only.
   Single-store business: one address, one phone number, one set of hours.
   Pricing is deliberately absent — the shop sells in store only.

   Image paths are absolute, complete strings. Nothing in the app builds an
   image path by concatenation or by index — components read image.src and
   image.alt straight off these objects, so swapping a file is a one-line
   edit here (or a straight overwrite in public/images/).
   ========================================================================== */

export const shop = {
  name: 'Smoke & Vape Co.',
  wordmark: ['Smoke &', 'Vape Co.'],
  tagline: 'Colorado Springs, CO — Est. smoke & vape',
  phone: '(719) 555-0142',
  phoneHref: 'tel:+17195550142',
  email: 'hello@smokeandvapeco.com',
  address: {
    street: '2418 N Academy Blvd',
    city: 'Colorado Springs',
    state: 'CO',
    zip: '80909',
  },
}

export const addressLine1 = shop.address.street
export const addressLine2 = `${shop.address.city}, ${shop.address.state} ${shop.address.zip}`
export const fullAddress = `${addressLine1}, ${addressLine2}`

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${shop.name}, ${fullAddress}`,
)}`

/* Hours are stored as minutes-from-midnight so the "open now" line can be
   computed. A close value of 1440 rolls over to midnight (Fri/Sat close at
   12 AM the following morning).

   `open` and `close` are held apart rather than as one pre-joined string:
   the footer sets each on its own grid track, so the opening times share a
   right edge, the dashes share an x and the closing times share a right
   edge. `display` is derived from the pair, keeping one source of truth for
   anything that still wants the times as a single run of text. */
const openClose = (open, close) => ({ open, close, display: `${open} – ${close}` })

export const hours = [
  {
    id: 'mon-thu',
    label: 'Mon – Thu',
    days: [1, 2, 3, 4],
    opensAt: 10 * 60,
    closesAt: 22 * 60,
    ...openClose('10 AM', '10 PM'),
  },
  {
    id: 'fri-sat',
    label: 'Fri – Sat',
    days: [5, 6],
    opensAt: 10 * 60,
    closesAt: 24 * 60,
    ...openClose('10 AM', '12 AM'),
  },
  {
    id: 'sun',
    label: 'Sunday',
    days: [0],
    opensAt: 12 * 60,
    closesAt: 20 * 60,
    ...openClose('12 PM', '8 PM'),
  },
]

/* Photography — .jpg files under /images/lifestyle/. width/height are the
   real intrinsic pixels of each file; the CSS crops them to the frame. */
export const lifestyle = {
  shelfWall: {
    src: '/images/lifestyle/hero-storefront.jpg',
    alt: 'Wall of pod systems, mods and e-liquid on lit wooden shelves inside Smoke & Vape Co.',
    width: 1134,
    height: 2016,
  },
  neonInterior: {
    src: '/images/lifestyle/hero-interior.jpg',
    alt: 'Lit display cases and back wall of devices inside Smoke & Vape Co.',
    width: 736,
    height: 736,
  },
  storefront: {
    src: '/images/lifestyle/storefront.jpg',
    alt: 'Smoke & Vape Co. storefront on North Academy Boulevard in Colorado Springs',
    width: 1200,
    height: 1200,
  },
}

export const hero = {
  eyebrow: shop.tagline,
  headline: 'Colorado Springs neighborhood smoke shop.',
  subtext:
    'Fresh disposables, pods and juice on the shelf every week — and someone behind the counter who actually knows the difference.',
  image: lifestyle.neonInterior,
}

export const brands = [
  'Elf Bar',
  'Geek Bar',
  'Lost Mary',
  'Uwell',
  'Vaporesso',
  'VooPoo',
  'SMOK',
  'Naked 100',
  'Twist',
  'Flum',
  'Breeze',
  'Hyde',
]

/* Category shots — .jpg files under /images/categories/, cropped to the
   card frame by object-fit: cover. */
export const categories = [
  {
    id: 'disposables',
    number: '01',
    title: 'Disposables',
    stocked: '12 in store',
    blurb: 'Big-puff bars from the names people actually ask for, restocked weekly.',
    image: {
      src: '/images/categories/disposables.jpg',
      alt: 'Disposable vape bars from Geek Bar, Lost Mary and Elf Bar on a wooden shelf',
      width: 736,
      height: 967,
    },
  },
  {
    id: 'pod-systems',
    number: '02',
    title: 'Pod Systems',
    stocked: '6 in store',
    blurb: 'Refillable kits for anyone done buying a new device every week.',
    image: {
      src: '/images/categories/pod-systems.jpg',
      alt: 'Refillable pod systems from Vaporesso, Uwell and VooPoo in a glass counter',
      width: 600,
      height: 600,
    },
  },
  {
    id: 'e-liquids',
    number: '03',
    title: 'E-Liquids',
    stocked: '5 in store',
    blurb: 'Salt nic and freebase bottles, from custard to straight menthol.',
    image: {
      src: '/images/categories/e-liquids.jpg',
      alt: 'Bottles of Naked 100 and Vapetasia e-liquid on a light wooden shelf',
      width: 1080,
      height: 1350,
    },
  },
]

/* Product badges are colour-led on the card: a dot in the brand colour with
   the label revealed on hover/focus. `label` is still the full text and is
   always rendered into an sr-only span, so colour is never the only carrier
   of the meaning. `id` maps to --color-badge-* in index.css. */
export const badges = {
  best: { id: 'best', label: 'Best Seller' },
  new: { id: 'new', label: 'New' },
  staff: { id: 'staff', label: 'Staff Pick' },
}

export const badgeLegend = [badges.best, badges.new, badges.staff]

/* Product names are the real thing — never renamed, abbreviated or numbered,
   and the filename is the slugged name with no numeric prefix, puff count or
   flavour in it. Files live under /images/products/ as .jpg or .png and are
   fitted into the square card with object-fit: contain. */
export const products = [
  {
    id: 'geekbar-pulse-x',
    name: 'Geek Bar Pulse X',
    meta: 'Geek Bar / 25,000 puffs',
    flavour: 'Assorted',
    badge: badges.best,
    category: 'Disposables',
    image: {
      src: '/images/products/geekbar-pulse-x.jpg',
      alt: 'Geek Bar Pulse X — Assorted',
      width: 598,
      height: 923,
    },
  },
  {
    id: 'lostmary-mo20000-pro',
    name: 'Lost Mary MO20000 Pro',
    meta: 'Lost Mary / 20,000 puffs',
    flavour: 'Assorted',
    badge: badges.new,
    category: 'Disposables',
    image: {
      src: '/images/products/lostmary-mo20000-pro.jpg',
      alt: 'Lost Mary MO20000 Pro — Assorted',
      width: 736,
      height: 1104,
    },
  },
  {
    id: 'geekbar-pulse',
    name: 'Geek Bar Pulse',
    meta: 'Geek Bar / 15,000 puffs',
    flavour: 'Assorted',
    badge: null,
    category: 'Disposables',
    image: {
      src: '/images/products/geekbar-pulse.jpg',
      alt: 'Geek Bar Pulse — Assorted',
      width: 600,
      height: 600,
    },
  },
  {
    id: 'elfbar-bc5000',
    name: 'Elf Bar BC5000',
    meta: 'Elf Bar / 5,000 puffs',
    flavour: 'Blue Razz Ice',
    badge: badges.best,
    category: 'Disposables',
    image: {
      src: '/images/products/elfbar-bc5000.jpg',
      alt: 'Elf Bar BC5000 — Blue Razz Ice',
      width: 736,
      height: 981,
    },
  },
  {
    id: 'lostmary-os5000',
    name: 'Lost Mary OS5000',
    meta: 'Lost Mary / 5,000 puffs',
    flavour: 'Strawberry Guava Mint',
    badge: badges.staff,
    category: 'Disposables',
    image: {
      src: '/images/products/lostmary-os5000.jpg',
      alt: 'Lost Mary OS5000 — Strawberry Guava Mint',
      width: 736,
      height: 981,
    },
  },
  {
    id: 'funky-republic-ti7000',
    name: 'Funky Republic Ti7000',
    meta: 'Funky Republic / 7,000 puffs',
    flavour: 'Assorted',
    badge: null,
    category: 'Disposables',
    image: {
      src: '/images/products/funky-republic-ti7000.jpg',
      alt: 'Funky Republic Ti7000 — Assorted',
      width: 735,
      height: 1118,
    },
  },
  {
    id: 'flum-pebble',
    name: 'Flum Pebble',
    meta: 'Flum / 6,000 puffs',
    flavour: 'Assorted',
    badge: null,
    category: 'Disposables',
    image: {
      src: '/images/products/flum-pebble.jpg',
      alt: 'Flum Pebble — Assorted',
      width: 736,
      height: 989,
    },
  },
  {
    id: 'vaporesso-xros-6',
    name: 'Vaporesso XROS 6',
    meta: 'Vaporesso',
    flavour: null,
    badge: badges.new,
    category: 'Pod Systems',
    image: {
      src: '/images/products/vaporesso-xros-6.jpg',
      alt: 'Vaporesso XROS 6 refillable pod system',
      width: 1080,
      height: 1080,
    },
  },
  {
    id: 'uwell-caliburn-g5',
    name: 'Uwell Caliburn G5',
    meta: 'Uwell',
    flavour: null,
    badge: badges.best,
    category: 'Pod Systems',
    image: {
      src: '/images/products/uwell-caliburn-g5.jpg',
      alt: 'Uwell Caliburn G5 refillable pod system',
      width: 1200,
      height: 1600,
    },
  },
  {
    id: 'voopoo-drag-6',
    name: 'VooPoo Drag 6',
    meta: 'VooPoo',
    flavour: null,
    badge: null,
    category: 'Pod Systems',
    image: {
      src: '/images/products/voopoo-drag-6.jpg',
      alt: 'VooPoo Drag 6 pod mod kit',
      width: 1080,
      height: 1440,
    },
  },
  {
    id: 'naked-100-lava-flow',
    name: 'Naked 100 — Lava Flow',
    meta: 'Naked 100',
    flavour: 'Strawberry Coconut Pineapple',
    badge: badges.best,
    category: 'E-Liquids',
    image: {
      src: '/images/products/naked-100-lava-flow.jpg',
      alt: 'Naked 100 Lava Flow — Strawberry Coconut Pineapple',
      width: 675,
      height: 1200,
    },
  },
  {
    id: 'vapetasia-killer-kustard',
    name: 'Vapetasia — Killer Kustard',
    meta: 'Vapetasia',
    flavour: 'Vanilla Custard',
    badge: badges.staff,
    category: 'E-Liquids',
    image: {
      src: '/images/products/vapetasia-killer-kustard.jpg',
      alt: 'Vapetasia Killer Kustard — Vanilla Custard',
      width: 634,
      height: 1127,
    },
  },
]

export const reviews = {
  rating: '4.9',
  count: 'Based on 380+ reviews on Google',
  reviewUrl: 'https://g.page/r/PLACEHOLDER-REVIEW-LINK/review',
  items: [
    {
      id: 'marcus-t',
      name: 'Marcus T.',
      stars: 5,
      quote:
        'Asked for something close to my old bar and the guy walked me through three options without upselling me. Out the door in five minutes with the right one.',
    },
    {
      id: 'danielle-r',
      name: 'Danielle R.',
      stars: 5,
      quote:
        'Only shop on Academy that actually has the Pulse X when they say they do. I call ahead, they set it aside, I grab it on the way home.',
    },
    {
      id: 'aaron-k',
      name: 'Aaron K.',
      stars: 5,
      quote:
        'Been coming here since I moved to the Springs. Clean counter, no pressure, and they always know which juice just landed.',
    },
    {
      id: 'priya-s',
      name: 'Priya S.',
      stars: 5,
      quote:
        'Stopped in on a Sunday afternoon expecting a picked-over shelf and found exactly what I wanted. In and out in under two minutes.',
    },
  ],
}

export const trustBadges = [
  {
    id: 'authorized',
    icon: 'badge',
    title: 'Authorized Retailer',
    text: 'Every device on our shelf comes from an authorized distributor — no gray-market bars.',
  },
  {
    id: 'drops',
    icon: 'box',
    title: 'New Drops Weekly',
    text: 'Fresh flavors and new releases hit the case most Thursdays.',
  },
  {
    id: 'hold',
    icon: 'phone',
    title: "Call Ahead, We'll Hold It",
    text: 'Give us a ring and we will set it aside under your name until close.',
  },
  {
    id: 'age',
    icon: 'shield',
    title: '21+ Verified',
    text: 'We card everyone, every visit. Valid government ID required at the counter.',
  },
]

export const social = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/smokeandvapeco' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@smokeandvapeco' },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/smokeandvapeco' },
]

export const navLinks = [
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'brands', label: 'Brands', href: '#brands' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'visit', label: 'Visit', href: '#visit' },
]

export const nicotineWarning =
  'WARNING: This product contains nicotine. Nicotine is an addictive chemical.'

/* Cookie notice. The site sets no analytics or tracking cookies today — this
   is the consent gate to put them behind. `getCookieConsent()` in
   CookieConsent.jsx is what any future script should check before loading.
   Keep the wording matched to what the site actually does. */
export const cookieNotice = {
  title: 'Cookies',
  text: 'We keep a single cookie to remember this choice. Nothing tracks you across other sites, and declining leaves the whole shop working exactly as it does now.',
  accept: 'Accept',
  decline: 'Decline',
  manage: 'Cookie preferences',
}

export const legalLine = '© 2026 Smoke & Vape Co. · 21+ Only'
