/* ==========================================================================
   Tenant: demo — Smoke & Vape Co., Colorado Springs.

   Everything that differs from one shop to the next lives in this file:
   name, contact details, hours, location, map, photos and reviews. Copy the
   file to start a new shop, register it in src/data/index.js, and add a
   matching .env.<key> containing VITE_TENANT=<key>.

   The catalog (categories and products) is shared by every shop and comes
   from ../shared — override it here only if a shop's shelves differ.
   ========================================================================== */

import { categories, products } from '../shared'

const name = 'Smoke & Vape Co.'
const location = 'Colorado Springs'
const establishedYear = 2019

export default {
  key: 'demo',
  name,
  shortName: 'Smoke & Vape',
  /* The footer masthead sets the name on two spans. */
  wordmark: ['Smoke &', 'Vape Co.'],
  location,
  tagline: 'Colorado Springs, CO — Est. smoke & vape',

  phone: '(719) 555-0142',
  phoneHref: 'tel:+17195550142',
  email: 'hello@smokeandvapeco.com',

  address: {
    line1: '2418 N Academy Blvd',
    line2: 'Colorado Springs, CO 80909',
    /* Optional. When set, "Get Directions" routes to the plus code instead
       of the street address — use it where the address geocodes badly. */
    plusCode: '',
  },

  /* Google Maps iframe src, no API key: Share → Embed a map → copy the src.
     Left empty, the Visit section renders no map at all. */
  mapEmbedSrc: '',

  reviewUrl: 'https://g.page/r/PLACEHOLDER-REVIEW-LINK/review',

  rating: {
    score: '4.9',
    count: '380+',
  },

  /* Times are 24-hour "HH:MM". A close of "24:00" is midnight at the end of
     that day (Fri/Sat close at 12 AM the following morning). `days` are
     JavaScript day numbers, Sunday = 0; `label` is what the footer prints. */
  hours: [
    { label: 'Mon – Thu', days: [1, 2, 3, 4], open: '10:00', close: '22:00' },
    { label: 'Fri – Sat', days: [5, 6], open: '10:00', close: '24:00' },
    { label: 'Sunday', days: [0], open: '12:00', close: '20:00' },
  ],

  social: {
    instagram: 'https://instagram.com/smokeandvapeco',
    tiktok: 'https://tiktok.com/@smokeandvapeco',
    facebook: 'https://facebook.com/smokeandvapeco',
  },

  establishedYear,

  categories,
  products,

  reviews: [
    {
      name: 'Marcus T.',
      stars: 5,
      quote:
        'Asked for something close to my old bar and the guy walked me through three options without upselling me. Out the door in five minutes with the right one.',
    },
    {
      name: 'Danielle R.',
      stars: 5,
      quote:
        'Only shop on Academy that actually has the Pulse X when they say they do. I call ahead, they set it aside, I grab it on the way home.',
    },
    {
      name: 'Aaron K.',
      stars: 5,
      quote:
        'Been coming here since I moved to the Springs. Clean counter, no pressure, and they always know which juice just landed.',
    },
    {
      name: 'Priya S.',
      stars: 5,
      quote:
        'Stopped in on a Sunday afternoon expecting a picked-over shelf and found exactly what I wanted. In and out in under two minutes.',
    },
  ],

  /* Photography — .jpg files under /images/demo/. width/height are the real
     intrinsic pixels of each file; the CSS crops them to the frame. */
  images: {
    /* Landscape crop of hero-square.jpg. The square original forced the hero
       to choose between cropping half the picture away and leaving a band
       of empty ground beside the text; at 3:2 it fills the slot as shot.
       The crop also drops the bottom of the frame, which carried a
       generated-image watermark. */
    hero: {
      src: '/images/demo/hero.jpg',
      alt: `Lit display cases and back wall of devices inside ${name}`,
      width: 1472,
      height: 982,
    },
    /* Not rendered anywhere yet. The file is a stock sign mockup with a
       repeated watermark — replace it before putting it on the page. */
    storefront: {
      src: '/images/demo/storefront.jpg',
      alt: `${name} storefront on North Academy Boulevard in ${location}`,
      width: 1200,
      height: 1200,
    },
    /* Not rendered anywhere yet. */
    interior: {
      src: '/images/demo/interior.jpg',
      alt: `Wall of pod systems, mods and e-liquid on lit wooden shelves inside ${name}`,
      width: 1134,
      height: 2016,
    },
  },

  /* The sentences on the page that name the town or the street. They are
     per shop because the grammar is: a possessive, a street nickname. */
  copy: {
    headline: `${location} neighborhood smoke shop.`,
    subtext:
      'Fresh disposables, pods and juice on the shelf every week — and someone behind the counter who actually knows the difference.',
    categoriesHeading: 'Three shelves, kept full.',
    pitch: 'On Academy since day one. Call ahead and we’ll hold it behind the counter.',
    reviewsNote: `Thirty seconds of your time keeps a small ${location} shop on the map.`,
    footerLine: `${location}’ neighborhood smoke shop since ${establishedYear}`,
  },

  seo: {
    title: `${name} — ${location} Smoke Shop`,
    description: `${name} is a neighborhood smoke and vape shop in ${location}, CO. Disposables, pod systems and e-liquids in stock. Call ahead and we'll hold it. 21+ only.`,
  },
}
