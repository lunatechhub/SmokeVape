/* ==========================================================================
   Tenant: yours — Yours Vape & Smoke, Centennial.

   Values that start with "TODO" are unconfirmed. The page treats them as not
   set (isSet in src/data/index.js): the email line, the social links and the
   review button do not render until a real value replaces the marker.

   Hours are confirmed, and identical every day of the week, so they are one
   row rather than three. With hours on file the hero carries a live
   open/closed status and the footer carries an Hours column.

   The rating is shown exactly as Google has it: 5.0 from 59 reviews.
   ========================================================================== */

import { categories as sharedCategories, products as catalog } from '../shared'

const name = 'Yours Vape & Smoke'
const location = 'Centennial'

const sharedImage = (id) => sharedCategories.find((category) => category.id === id).image

export default {
  key: 'yours',
  name,
  shortName: 'Yours Vape',
  /* The footer masthead sets the name on two spans. */
  wordmark: ['Yours Vape', '& Smoke'],
  /* Circular logo mark, shown at 2.5rem in the navbar and 1.25rem in the
     footer's legal line. Vector, so one file stays crisp at both sizes and
     weighs under 2KB, and it carries its own ground rather than borrowing
     the page's — the same file reads against the light page and the dark
     footer. The neutral placeholder is still beside it at logo.png, unused. */
  logo: '/images/yours/logo.svg',
  location,
  tagline: 'Centennial, CO · E Otero Ave',

  phone: '(929) 360-8997',
  phoneHref: 'tel:+19293608997',
  email: 'TODO — confirm with owner',

  address: {
    line1: '5730 E Otero Ave, Suite 700',
    line2: 'Centennial, CO 80112',
    plusCode: '',
  },

  /* Google Maps iframe src, no API key. */
  mapEmbedSrc:
    'https://maps.google.com/maps?q=5730+E+Otero+Ave+Ste+700,+Centennial,+CO+80112&z=16&output=embed',
  /* Every Get Directions / Directions link uses this when it is set. */
  mapsUrl: 'https://maps.google.com/maps?daddr=5730+E+Otero+Ave+Ste+700,+Centennial,+CO+80112',

  reviewUrl: "TODO — owner's Google review short link",

  rating: {
    score: '5.0',
    count: '59',
  },

  /* Confirmed hours. Times are 24-hour "HH:MM"; `days` are JavaScript day
     numbers, Sunday = 0; `label` is what the footer prints.

     This shop keeps the same hours every day, so it is one row covering all
     seven. It is deliberately not padded out to three rows to match the other
     shops: the footer prints one line per row, and three rows saying the same
     thing would invent a distinction the week does not have. */
  hours: [
    { label: 'Every day', days: [0, 1, 2, 3, 4, 5, 6], open: '09:00', close: '21:00' },
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
      stocked: 'Geek Bar flavours',
      blurb:
        'Reviewers ask for Geek Bar Creamy Mint and Peach Perfect Splash by name. If yours is not on the shelf, ask Lucky.',
      image: sharedImage('disposables'),
    },
    {
      id: 'vape-kits-pods',
      number: '02',
      title: 'Vape Kits & Pods',
      stocked: 'Kits and replacement pods',
      blurb:
        'Lucky helped one reviewer find exactly the kit he needed. Bring your old device in if you want a match.',
      image: sharedImage('pod-systems'),
    },
    {
      id: 'e-liquids',
      number: '03',
      title: 'E-Liquids',
      stocked: 'Ask what just came in',
      blurb: 'One review calls us finally a place with real flavour variety. That is the shelf we keep.',
      image: sharedImage('e-liquids'),
    },
    {
      id: 'tobacco',
      number: '04',
      title: 'Tobacco',
      stocked: 'Ask at the counter',
      blurb: 'Ask for your brand at the counter. 21+ with ID, same as everything here.',
      image: {
        src: '/images/yours/category-tobacco.jpg',
        alt: `Tobacco products at ${name} in ${location}`,
        width: 1200,
        height: 900,
      },
    },
    {
      id: 'torches-lighters',
      number: '05',
      title: 'Torches & Lighters',
      stocked: 'Torch lighters',
      blurb: 'A torch lighter is an easy thing to forget. Grab one at the register.',
      image: {
        src: '/images/yours/category-torches.jpg',
        alt: `Torch lighters at ${name} in ${location}`,
        width: 1200,
        height: 900,
      },
    },
    {
      id: 'smoking-accessories',
      number: '06',
      title: 'Smoking Accessories',
      stocked: 'The small parts',
      blurb: 'Grab what you need on the way out, and take your free drink with it.',
      image: {
        src: '/images/yours/category-accessories.jpg',
        alt: `Smoking accessories at ${name} in ${location}`,
        width: 1200,
        height: 900,
      },
    },
  ],

  /* The shared catalog, without the demo shop's badges: "Best Seller" and
     "Staff Pick" are claims this shop has not made. Confirm the list, and
     add the tobacco, torch and accessory lines the shop carries, with
     their real names, once the owner supplies them. */
  products: catalog.map((product) => ({ ...product, badge: null })),

  /* Real Google reviews, trimmed to one line, first name and initial only.
     These render inside quotation marks, so check each line against the
     review's own wording before launch. */
  reviews: [
    { name: 'Tony A.', stars: 5, quote: 'Better prices than any other shop, plus a free drink.' },
    { name: 'Ethan B.', stars: 5, quote: 'Finally a place with real flavour variety.' },
    { name: 'Excuti K.', stars: 5, quote: 'Lucky helped me find what I needed.' },
    { name: 'Daniel G.', stars: 5, quote: 'Great deal on vapes, with lots to choose from.' },
    {
      name: 'Nio G.',
      stars: 5,
      quote: 'Friendly and reasonable. Glad to support a local business.',
    },
    { name: 'Mary M.', stars: 5, quote: 'Clean, friendly store.' },
  ],

  /* Photos under /images/yours/. width and height must be the file's real
     pixel size; the CSS crops each photo to its frame. */
  images: {
    /* A 3:2 landscape crop of the 1521x2028 interior original, so this shop's
       hero sits in the same wide frame the other shops use rather than in the
       tall portrait one it had.

       The band was chosen rather than left to the CSS. Dropping the portrait
       file straight into a wide frame would have let object-fit: cover take
       the middle of a 3:4 shot and throw away about half its height, wherever
       that happened to land. This crop keeps the full shelf wall and the
       counter, with the red runner leading to the back of the store.

       1500x1000, cut from the original's own pixels with no upscaling — about
       2x what the ~723px frame asks for.

       The whole-photo portrait treatment is still in Hero.css and still
       applies to any shop whose hero file is taller than it is wide. The
       portrait 1200x1600 version of this photo is kept in the scratchpad. */
    hero: {
      src: '/images/yours/hero.jpg',
      alt: `Shelves of disposables and the counter inside ${name} in ${location}`,
      width: 1500,
      height: 1000,
    },
    /* UNUSABLE — an AI-generated interior that is not this shop, and it
       carries an "imagined with AI" watermark in the lower left. Nothing
       renders it today. Replace it with a real photo of the storefront
       before anything on the page points at it. */
    storefront: {
      src: '/images/yours/storefront.jpg',
      alt: `${name} storefront at 5730 E Otero Ave in ${location}`,
      width: 736,
      height: 736,
    },
    interior: {
      src: '/images/yours/interior.jpg',
      alt: `Shelves of disposables and e-liquid inside ${name}`,
      width: 1521,
      height: 2028,
    },
  },

  copy: {
    headline: 'Come for the flavours. Leave with a free drink.',
    subtext:
      'Doors open at 9 AM on E Otero Ave. People drive in from outside Centennial for the flavour selection, and reviewers keep saying our prices beat other shops. Ask for Lucky.',
    /* One understated line on the hero's address row. Several reviews
       mention it, and no other shop in the group offers it. */
    perk: 'Free drink with every purchase',
    categoriesHeading: 'Finally, real flavour variety.',
    pitch: 'Suite 700 on E Otero Ave. Call ahead and we’ll hold it behind the counter.',
    reviewsNote: 'A review is how the next person driving in finds us.',
    /* Add "since <year>" once establishedYear is confirmed. */
    footerLine: `${location}’s vape and smoke shop on E Otero Ave`,
  },

  seo: {
    title: 'Yours Vape & Smoke — Centennial, CO Vape & Smoke Shop',
    description:
      'Yours Vape & Smoke on E Otero Ave in Centennial, CO. Geek Bar disposables, e-liquids, vape kits, tobacco, torch lighters and smoking accessories.',
  },
}
