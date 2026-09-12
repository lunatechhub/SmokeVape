/* ==========================================================================
   Tenant: littleton — Golden Vape & Smoke, Littleton.

   Values that start with "TODO" are unconfirmed. The page treats them as not
   set (isSet in src/data/index.js): the email line, the social links and the
   review button do not render until a real value replaces the marker.

   Hours are confirmed for the full week. Monday is the odd one out: it closes
   an hour earlier than the rest of the week, 8 PM rather than 9, so it keeps
   its own row. With hours on file the hero carries a live open/closed status
   and the footer carries an Hours column.
   ========================================================================== */

import { categories as sharedCategories, products as catalog } from '../shared'

const name = 'Golden Vape & Smoke'
const location = 'Littleton'

const fromCatalog = (id, overrides = {}) => ({
  ...catalog.find((product) => product.id === id),
  badge: null,
  ...overrides,
})

const sharedImage = (id) => sharedCategories.find((category) => category.id === id).image

export default {
  key: 'littleton',
  name,
  shortName: 'Golden Vape',
  /* The footer masthead sets the name on two spans. */
  wordmark: ['Golden Vape', '& Smoke'],
  /* Shown on a small line under the navbar name, so this site is not
     mistaken for the Lakewood one, which has the same name. */
  branch: 'Littleton',
  /* The group's real mark, the same file all three locations carry. Note it
     reads "Golden Smoke Shop" rather than "Golden Vape & Smoke" — confirm
     with the owner which name the brand is trading under before launch. */
  logo: '/images/littleton/logo.png',
  location,
  tagline: 'Littleton, CO · Marina Pointe',

  phone: '(720) 318-8636',
  phoneHref: 'tel:+17203188636',
  email: 'TODO — confirm with owner',

  address: {
    line1: '7444 W Chatfield Ave, Unit K',
    line2: 'Littleton, CO 80128',
    note: 'In Marina Pointe Shopping Center',
    plusCode: '',
  },

  /* Google Maps iframe src, no API key. */
  mapEmbedSrc:
    'https://maps.google.com/maps?q=7444+W+Chatfield+Ave+Unit+K,+Littleton,+CO+80128&z=16&output=embed',
  /* Every Get Directions / Directions link uses this when it is set. */
  mapsUrl: 'https://maps.google.com/maps?daddr=7444+W+Chatfield+Ave+Unit+K,+Littleton,+CO+80128',

  reviewUrl: "TODO — owner's Google review short link",

  rating: {
    score: '4.8',
    count: '662',
  },

  /* Confirmed hours. Times are 24-hour "HH:MM"; `days` are JavaScript day
     numbers, Sunday = 0; `label` is what the footer prints.

     Monday keeps its own row because this shop closes an hour EARLIER on a
     Monday — 8 PM against 9 PM the rest of the week — not because it opens
     later. It must not be folded into the Tue – Fri group: doing so would
     tell a visitor the shop is open at 8:30 on a Monday evening when it has
     already shut. */
  hours: [
    { label: 'Monday', days: [1], open: '08:00', close: '20:00' },
    { label: 'Tue – Fri', days: [2, 3, 4, 5], open: '08:00', close: '21:00' },
    { label: 'Sat – Sun', days: [6, 0], open: '09:00', close: '21:00' },
  ],

  social: {
    instagram: 'TODO',
    tiktok: 'TODO',
    facebook: 'TODO',
  },

  establishedYear: 'TODO',

  categories: [
    {
      id: 'disposables',
      number: '01',
      title: 'Disposables',
      stocked: 'Geek Bar and Lost Mary',
      blurb:
        'RAZ and Foger sit on the same wall. One regular has come in for her Raz for two years, and it has always been there.',
      image: sharedImage('disposables'),
    },
    {
      id: 'pods-devices',
      number: '02',
      title: 'Pods & Devices',
      stocked: 'Refillable kits',
      blurb:
        'Not sure which kit you want? Ask at the counter. Helping people find the right one is what our reviews keep bringing up.',
      image: sharedImage('pod-systems'),
    },
    {
      id: 'e-liquids',
      number: '03',
      title: 'E-Liquids',
      stocked: 'Ask what just came in',
      blurb:
        'Reviewers keep mentioning how many brands and flavours we carry. Ask if yours is not on the shelf.',
      image: sharedImage('e-liquids'),
    },
    {
      id: 'glass-accessories',
      number: '04',
      title: 'Glass & Accessories',
      stocked: 'Chargers and coils too',
      blurb: 'Glass pieces for home. Grab a spare charger before you leave Unit K.',
      image: {
        src: '/images/littleton/category-glass.jpg',
        alt: `Glass pieces in the display case at ${name} in ${location}`,
        width: 1126,
        height: 2000,
      },
    },
  ],

  /* The four brands this location's Google listing names: Geek Bar, Lost
     Mary, RAZ and Foger. Confirm each model is on the shelf before launch.
     The RAZ and Foger photos are placeholders in this shop's folder;
     overwrite them with real shots at the same paths. */
  products: [
    fromCatalog('geekbar-pulse-x'),
    fromCatalog('geekbar-pulse'),
    fromCatalog('lostmary-mo20000-pro'),
    fromCatalog('lostmary-os5000'),
    {
      id: 'raz-dc25000',
      name: 'RAZ DC25000',
      meta: 'RAZ / 25,000 puffs',
      flavour: 'Assorted',
      badge: null,
      category: 'Disposables',
      image: {
        src: '/images/littleton/raz-dc25000.jpg',
        alt: 'RAZ DC25000 — Assorted',
        width: 1126,
        height: 2000,
      },
    },
    {
      id: 'foger-switch-pro',
      name: 'Foger Switch Pro',
      meta: 'Foger',
      flavour: 'Assorted',
      badge: null,
      category: 'Disposables',
      image: {
        src: '/images/littleton/foger-switch-pro.jpg',
        alt: 'Foger Switch Pro — Assorted',
        width: 1000,
        height: 1000,
      },
    },
  ],

  /* Real Google reviews, trimmed to one line, first name and initial only
     (zach d. styles his own name in lower case). These render inside
     quotation marks, so check each line against the review's own wording
     before launch. */
  reviews: [
    {
      name: 'Khayman R.',
      stars: 5,
      quote: 'They always have what I need when no one else does.',
    },
    {
      name: 'Ryan C.',
      stars: 5,
      quote: 'Open early and late, and the staff help you find what you need.',
    },
    { name: 'Lisa M.', stars: 5, quote: 'Always in stock, always fast.' },
    {
      name: 'Kirstin J.',
      stars: 5,
      quote: 'Two years of coming here, and they always have my Raz.',
    },
    { name: 'Nancy M.', stars: 5, quote: 'Lots of brands, styles and flavours.' },
    { name: 'zach d.', stars: 5, quote: 'Best vape store in town.' },
  ],

  /* Photos under /images/littleton/. width and height must be the file's real
     pixel size; the CSS crops each photo to its frame. */
  images: {
    /* This shop's own storefront photo — the unit with the nail salon beside
       it — which is the shot that belongs at the top of its page.

       It is 240x160, a thumbnail, and no larger copy exists in the repo or
       anywhere on this machine. The hero draws it far wider than that, so it
       will look soft until the full-resolution original replaces it. That
       swap is the entire fix and needs no code change: drop the bigger file
       in at this same path, then correct the width and height below to the
       new file's real pixel size.

       The disposable-wall interior that briefly sat here is still on disk at
       interior.jpg (765x1020) if it is ever wanted instead. */
    /* The 240x160 hero.jpg this used to point at is no longer in the folder,
       so the hero was rendering the "Add photo" placeholder rather than a
       photograph. This is the sharp 1275x1020 storefront that sits there now.

       Read before launch: this file is byte-identical to lakewood/hero.webp
       and premium-cigar/hero.webp (md5 2388914b…), and the sign in it reads
       "Golden vape shop". It is brand artwork carried by three sites at once,
       not a photograph of the Littleton premises — the real one had the nail
       salon beside it. Sharp and on-brand, but swap it for this shop's own
       storefront as soon as one exists. */
    hero: {
      src: '/images/littleton/hero.webp',
      alt: `A ${name} storefront`,
      width: 1275,
      height: 1020,
    },
    /* Shown in the Visit band beside the map, and the only place on the page
       a real photograph of the inside of this shop appears. The file is the
       same disposable-wall shot as interior.jpg — a genuine 765x1020 photo,
       sharp at the size it renders.

       This field is opt-in and deliberately absent from the other shops: the
       files in their storefront and interior fields are AI-generated stock,
       and nothing should put those on a page. Add it for a shop only once a
       real photo has been checked. */
    visit: {
      src: '/images/littleton/interior.jpg',
      alt: `Shelves of disposables inside ${name} in ${location}`,
      width: 765,
      height: 1020,
    },
    storefront: {
      src: '/images/littleton/storefront.jpg',
      alt: `${name} storefront in the Marina Pointe Shopping Center, ${location}`,
      width: 736,
      height: 736,
    },
    interior: {
      src: '/images/littleton/interior.jpg',
      alt: `Shelves of disposables inside ${name} in ${location}`,
      width: 765,
      height: 1020,
    },
  },

  copy: {
    headline: `In stock when the rest of ${location} isn’t.`,
    subtext:
      'Doors open at 8 AM. We’re in the Marina Pointe center on W Chatfield Ave, just off Wadsworth, and we stay open late. Regulars come in for the Raz and Geek Bar flavours other shops have run out of.',
    categoriesHeading: 'The Raz shelf stays full.',
    pitch:
      'Unit K in Marina Pointe, on W Chatfield Ave just off Wadsworth. Call ahead and we’ll hold it behind the counter.',
    reviewsNote: 'A review is how the next person hunting for Raz finds us.',
    /* Add "since <year>" once establishedYear is confirmed. */
    footerLine: `${location}’s vape shop in Marina Pointe`,
  },

  seo: {
    title: 'Golden Vape & Smoke — Littleton, CO Vape Shop',
    description:
      'Golden Vape & Smoke, 7444 W Chatfield Ave in Littleton, CO, in Marina Pointe off Wadsworth. Geek Bar, Lost Mary and Raz disposables kept in stock.',
  },
}
