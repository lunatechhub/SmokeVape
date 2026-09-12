/* ==========================================================================
   Tenant: lakewood — Golden Vape & Smoke, Lakewood.

   Values that start with "TODO" are unconfirmed. The page treats them as not
   set (isSet in src/data/index.js): the email line, the social links and the
   review button do not render until a real value replaces the marker.

   This shop carries glass and kratom, which the demo shop does not, so its
   categories and products are its own. Product photos come from the shared
   /images/products/ folder wherever one exists.
   ========================================================================== */

import { categories as sharedCategories, products as catalog } from '../shared'

const name = 'Golden Vape & Smoke'
const location = 'Lakewood'

const fromCatalog = (id, overrides = {}) => ({
  ...catalog.find((product) => product.id === id),
  badge: null,
  ...overrides,
})

const sharedImage = (id) => sharedCategories.find((category) => category.id === id).image

export default {
  key: 'lakewood',
  name,
  shortName: 'Golden Vape',
  /* The footer masthead sets the name on two spans. */
  wordmark: ['Golden Vape', '& Smoke'],
  /* The group's real mark, the same file all three locations carry. Note it
     reads "Golden Smoke Shop" rather than "Golden Vape & Smoke" — confirm
     with the owner which name the brand is trading under before launch. */
  logo: '/images/lakewood/logo.png',
  location,
  tagline: 'Lakewood, CO · S Union Blvd',

  phone: '(720) 589-3410',
  phoneHref: 'tel:+17205893410',
  email: 'TODO — confirm with owner',

  address: {
    line1: '195 S Union Blvd, Unit 145',
    line2: 'Lakewood, CO 80228',
    plusCode: 'PV68+W8 Lakewood, Colorado',
  },

  /* Google Maps iframe src, no API key. */
  mapEmbedSrc:
    'https://maps.google.com/maps?q=195+S+Union+Blvd+Unit+145,+Lakewood,+CO+80228&z=16&output=embed',
  /* Every Get Directions / Directions link uses this when it is set. */
  mapsUrl: 'https://maps.google.com/maps?daddr=195+S+Union+Blvd+Unit+145,+Lakewood,+CO+80228',

  reviewUrl: "TODO — owner's Google review short link",

  rating: {
    score: '4.9',
    count: '789',
  },

  /* Verified hours. Times are 24-hour "HH:MM"; `days` are JavaScript day
     numbers, Sunday = 0; `label` is what the footer prints. Monday is its
     own row because it opens an hour later than Tuesday to Friday. */
  hours: [
    { label: 'Monday', days: [1], open: '09:00', close: '21:00' },
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
      stocked: 'Geek Bar Pulse and Pulse X',
      blurb:
        'People leave reviews about our Geek Bar selection. If your flavour is not on the wall, ask.',
      image: sharedImage('disposables'),
    },
    {
      id: 'pods-devices',
      number: '02',
      title: 'Pods & Devices',
      stocked: 'Lookah 510 batteries',
      blurb: 'Refillable pod kits, and the Lookah 510 batteries customers ask for by name.',
      image: sharedImage('pod-systems'),
    },
    {
      id: 'e-liquids',
      number: '03',
      title: 'E-Liquids',
      stocked: 'Zero-nic on the shelf',
      blurb:
        'Naked 100 and zero-nicotine bottles. One customer drove down from Loveland because nobody closer had zero-nic in stock.',
      image: sharedImage('e-liquids'),
    },
    {
      id: 'glass-accessories',
      number: '04',
      title: 'Glass & Accessories',
      stocked: 'Glass in the case',
      blurb: 'Glass pieces, and the chargers and coils that keep a device going.',
      image: {
        src: '/images/lakewood/category-glass.jpg',
        alt: `Glass pieces in the display case at ${name}`,
        width: 1126,
        height: 2000,
      },
    },
    {
      id: 'kratom',
      number: '05',
      title: 'Kratom',
      stocked: 'Ask at the counter',
      blurb: 'Regulars come in for kratom by name. Ruchi can tell you what is in this week.',
      image: {
        src: '/images/lakewood/category-kratom.jpg',
        alt: `Kratom on the shelf at ${name}`,
        width: 736,
        height: 1104,
      },
    },
  ],

  /* Only brands customers name in reviews. Confirm each is on the shelf
     before launch. The Lookah photo is a placeholder in this shop's folder;
     overwrite it with a real shot at the same path. */
  products: [
    fromCatalog('geekbar-pulse-x', { category: 'Disposables' }),
    fromCatalog('geekbar-pulse', { category: 'Disposables' }),
    fromCatalog('naked-100-lava-flow', { meta: 'Naked 100 / 0 mg to 6 mg' }),
    {
      id: 'lookah-snail-2',
      name: 'Lookah Snail 2.0',
      meta: 'Lookah / 510 thread battery',
      flavour: null,
      badge: null,
      category: 'Pods & Devices',
      image: {
        src: '/images/lakewood/lookah-snail-2.jpg',
        alt: 'Lookah Snail 2.0 510 thread battery',
        width: 736,
        height: 859,
      },
    },
  ],

  /* Real Google reviews, trimmed to one line, first name and initial only.
     These render inside quotation marks, so check each line against the
     review's own wording before launch. */
  reviews: [
    { name: 'Chuck R.', stars: 5, quote: 'Good retail hours, large selection, clean store.' },
    { name: 'Stevi M.', stars: 5, quote: 'Good prices and an amazing selection of Geek Bars.' },
    {
      name: 'Janelle G.',
      stars: 5,
      quote: 'Drove from Loveland. The only shop that had zero-nic in stock.',
    },
    { name: 'Salvador V.', stars: 5, quote: 'Ruchi is attentive and professional.' },
    { name: 'Kevin J.', stars: 5, quote: 'A hidden gem in Lakewood.' },
  ],

  /* Photos under /images/lakewood/. width and height must be the file's real
     pixel size; the CSS crops each photo to its frame. */
  images: {
    /* Already full size at 1275x1020, so nothing here needed sharpening. The
       file was WebP wearing a .jpg name — browsers sniff the bytes and render
       it anyway, which is why it never showed as broken — and it now carries
       the extension it really is. The same artwork, at the same resolution,
       is what the Golden shop shows. */
    hero: {
      src: '/images/lakewood/hero.webp',
      alt: `The ${name} storefront in ${location}`,
      width: 1275,
      height: 1020,
    },
    /* Shown in the Visit band beside the map, the same treatment the Littleton
       shop carries. A genuine 765x1020 photo of the disposable wall, sharp at
       the size it renders, and distinct from this shop's hero — the hero is the
       storefront, this is the inside.

       Opt-in, and still absent from the Golden shop and Yours: Golden has no
       real interior photo at all (its interior.jpg is AI-generated stock and
       its storefront.jpg is a grey placeholder), and the one real photo Yours
       has is already its hero. Add this field for a shop only once a real
       photo has been checked. */
    visit: {
      src: '/images/lakewood/interior.jpg',
      alt: `Shelves of disposables and e-liquid inside ${name}`,
      width: 765,
      height: 1020,
    },
    storefront: {
      src: '/images/lakewood/storefront.jpg',
      alt: `${name} storefront at 195 S Union Blvd in ${location}`,
      width: 736,
      height: 736,
    },
    interior: {
      src: '/images/lakewood/interior.jpg',
      alt: `Shelves of disposables and e-liquid inside ${name}`,
      width: 765,
      height: 1020,
    },
  },

  copy: {
    headline: `The ${location} shop people drive in for.`,
    subtext:
      'Tuesday through Friday the doors open at 8 AM, earlier than most vape shops. Parking is easy. Ask Ruchi for zero-nic; people drive down from Loveland and Summit County because we keep it on the shelf.',
    categoriesHeading: 'Heavy on the Geek Bars.',
    pitch: 'Unit 145 on S Union Blvd, where parking is never the hard part. Call ahead and we’ll hold it behind the counter.',
    reviewsNote: 'A review is how the next person from Loveland finds us.',
    /* Add "since <year>" once establishedYear is confirmed. */
    footerLine: `${location}’s vape and smoke shop on S Union Blvd`,
  },

  seo: {
    title: 'Golden Vape & Smoke — Lakewood, CO Vape & Smoke Shop',
    description:
      'Golden Vape & Smoke on S Union Blvd in Lakewood, CO: Geek Bar disposables, pods, Lookah 510 batteries, zero-nic e-liquid, glass and kratom. Opens 8 AM Tue–Fri.',
  },
}
