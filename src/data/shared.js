/* ==========================================================================
   Content every shop shares: the catalog, the brand list, the trust points,
   navigation, and the warning and cookie copy. Nothing in this file names a
   shop, a place, a phone number or an hour — all of that lives in
   src/data/tenants/<key>.js and is read through `site` from src/data.

   Pricing is deliberately absent — the shops sell in store only.

   Image paths are absolute, complete strings. Nothing in the app builds an
   image path by concatenation or by index — components read image.src and
   image.alt straight off these objects, so swapping a file is a one-line
   edit here (or a straight overwrite in public/images/).
   ========================================================================== */

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
      alt: 'Three SMOK Novo Pro refillable pod systems in carbon black, blue and green',
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

/* Display order and labels for the footer's Follow column. The URLs are per
   shop (site.social); a network the shop leaves blank is simply not listed. */
export const socialNetworks = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
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
   lib/cookieConsent.js is what any future script should check before
   loading. Keep the wording matched to what the site actually does. */
export const cookieNotice = {
  title: 'Cookies',
  text: 'We keep a single cookie to remember this choice. Nothing tracks you across other sites, and declining leaves the whole shop working exactly as it does now.',
  accept: 'Accept',
  decline: 'Decline',
  manage: 'Cookie preferences',
}

export const footerAge = '21+ only — ID required at the counter'

export const copyrightYear = 2026
