/* ==========================================================================
   Tenant: premium-cigar — Golden Vape & Smoke - Premium Cigar, Golden.

   Values that start with "TODO" are unconfirmed, and empty values are
   absent. The page treats both as not set (isSet in src/data/index.js), so
   the email line, the TikTok link and the review button do not render.

   Hours are the owner's, given for the full week: 8 AM Tuesday to Friday,
   9 AM the rest, 9 PM close every day. With hours on file the hero carries a
   live open/closed status and the footer carries an Hours column.

   This shop trades as Golden Vape & Smoke - Premium Cigar: the same brand as
   the Lakewood and Littleton shops, carrying its own cigar-led name on the
   end. It stocks more than they do — premium cigars and kratom included — so
   its categories are its own. The product list is the shared catalog; confirm
   it against the shelf before launch.

   The navbar prints site.name verbatim (Navbar.jsx), so the full name lives
   on the `name` const. `wordmark` splits it across the footer masthead's two
   lines, and `shortName` is read by nothing today.

   Two things still carry the older Golden Smoke Shop branding: the Instagram
   handle and the Facebook page. Both are left live because they resolve. The
   logo is unset too, though now that the name leads with Golden Vape & Smoke
   that badge may suit again — see the note on it below.
   ========================================================================== */

import { categories as sharedCategories, products as catalog } from '../shared'

/* The navbar prints this verbatim — Navbar.jsx takes site.name straight, so
   the full trading name belongs here rather than in shortName or wordmark. */
const name = 'Golden Vape & Smoke - Premium Cigar'
const location = 'Golden'

const sharedImage = (id) => sharedCategories.find((category) => category.id === id).image

export default {
  key: 'premium-cigar',
  name,
  /* Rendered nowhere today — no component reads it — but kept in step with
     the name so it is not stale if something starts to. */
  shortName: 'Premium Cigar',
  /* The footer masthead sets these on two spans, one per line, so the brand
     and this shop's own name each get their own line rather than running as
     one long string across the footer. */
  wordmark: ['Golden Vape & Smoke', 'Premium Cigar'],
  /* The small line under the navbar name. The name now shares "Golden Vape &
     Smoke" with the Lakewood and Littleton sites again, so this is what says
     which town you are looking at. */
  branch: 'Golden',
  /* Unset, so the navbar and the footer's legal line fall back to the text
     mark. Worth revisiting: the badge on disk at /images/premium-cigar/logo.png
     reads "Golden Smoke Shop", which sat badly beside a wordmark saying only
     "Premium Cigars", but now that the name leads with Golden Vape & Smoke it
     is close enough that you may well want it back. Uncomment to try it. */
  // logo: '/images/premium-cigar/logo.png',
  location,
  tagline: 'Golden, CO · S Golden Rd',

  phone: '(303) 963-5345',
  phoneHref: 'tel:+13039635345',
  email: 'TODO — confirm with owner',

  address: {
    line1: '15750 S Golden Rd, Unit B',
    line2: 'Golden, CO 80401',
    plusCode: '',
  },

  /* Google Maps iframe src, no API key. */
  mapEmbedSrc: 'https://maps.google.com/maps?q=39.7335327,-105.1767202&z=16&output=embed',
  /* Every Get Directions / Directions link uses this when it is set. */
  mapsUrl: 'https://maps.google.com/maps?daddr=15750+S+Golden+Rd+B,+Golden,+CO+80401',

  reviewUrl: "TODO — owner's Google review short link",

  rating: {
    score: '4.9',
    count: '765',
  },

  /* Supplied by the owner for the full week. Times are 24-hour "HH:MM" and
     `days` are JavaScript day numbers, 0 = Sunday. These drive two things:
     the footer's Hours column and the hero's live open/closed status.

     Monday opens at 9, Tuesday through Friday at 8, the weekend at 9, and
     every day closes at 9 PM — the same week the Lakewood shop keeps. */
  hours: [
    { label: 'Monday', days: [1], open: '09:00', close: '21:00' },
    { label: 'Tue – Fri', days: [2, 3, 4, 5], open: '08:00', close: '21:00' },
    { label: 'Sat – Sun', days: [6, 0], open: '09:00', close: '21:00' },
  ],

  /* Both handles still carry the older Golden Smoke Shop branding, so someone
     following them from a Premium Cigars page lands on a differently named
     account. They are left live because they resolve and are this shop's real
     accounts — swap them once Premium Cigars handles exist. */
  social: {
    instagram: 'https://www.instagram.com/golden_smokeshop/',
    /* Empty renders nothing: no TikTok link in the footer. */
    tiktok: '',
    facebook: 'https://www.facebook.com/p/Golden-S-100046469266024',
  },

  establishedYear: 'TODO',

  categories: [
    {
      id: 'disposables',
      number: '01',
      title: 'Disposables',
      stocked: 'Flavoured disposables',
      blurb: 'One reviewer says we have every flavour. Test us on yours.',
      image: sharedImage('disposables'),
    },
    {
      id: 'vape-kits-pods',
      number: '02',
      title: 'Vape Kits & Pods',
      stocked: 'Kits and replacement pods',
      blurb:
        'Refillable kits and the pods that fit them. Bring in the device you already own and Kesav will match the pod.',
      image: sharedImage('pod-systems'),
    },
    {
      id: 'e-liquids',
      number: '03',
      title: 'E-Liquids',
      stocked: 'Fruit through menthol tobacco',
      blurb: 'More than one review calls the selection huge. Ask if your flavour is not out.',
      image: sharedImage('e-liquids'),
    },
    {
      id: 'coils-hardware',
      number: '04',
      title: 'Coils & Hardware',
      stocked: 'Coils for the kits we sell',
      blurb: 'A burnt coil should not mean a new device. Bring the old one in and we will match it.',
      image: {
        src: '/images/premium-cigar/category-coils.jpg',
        alt: `Replacement coils and vape hardware at ${name} in ${location}`,
        width: 736,
        height: 736,
      },
    },
    {
      id: 'premium-cigars',
      number: '05',
      title: 'Premium Cigars',
      stocked: 'Sold right beside the vapes',
      blurb:
        'The name on the door. Premium cigars share the shop with the vapes, so one stop on S Golden Rd covers both. Ask Kesav what we have in.',
      image: {
        src: '/images/premium-cigar/category-cigars.jpg',
        alt: `Premium cigars at ${name} in ${location}`,
        width: 1200,
        height: 1281,
      },
    },
    {
      id: 'kratom',
      number: '06',
      title: 'Kratom',
      stocked: 'Ask at the counter',
      blurb: 'Reviewers call our kratom cheap. Ask at the counter for what is in.',
      image: {
        src: '/images/premium-cigar/category-kratom.jpg',
        alt: `Kratom at ${name} in ${location}`,
        width: 736,
        height: 1104,
      },
    },
  ],

  /* The shared catalog, without the demo shop's badges: "Best Seller" and
     "Staff Pick" are claims this shop has not made. Confirm the list, and
     add the cigar and kratom lines the shop carries, with their real
     names, once the owner supplies them. */
  products: catalog.map((product) => ({ ...product, badge: null })),

  /* Real Google reviews, trimmed to one line, first name and initial only.
     These render inside quotation marks, so check each line against the
     review's own wording before launch. */
  reviews: [
    { name: 'Gwedo S.', stars: 5, quote: 'Great selection, fast service and fair prices.' },
    { name: 'Haley W.', stars: 5, quote: 'Cheap kratom, and the vapes are always reasonable.' },
    { name: 'Jeffery D.', stars: 5, quote: 'Huge selection. They have every flavour.' },
    {
      name: 'Christopher A.',
      stars: 5,
      quote: 'Friendly workers at a small family-owned business.',
    },
    { name: 'Victoria T.', stars: 5, quote: 'Always helpful, with a great selection.' },
    { name: 'Muge K.', stars: 5, quote: 'Great service from Kesav.' },
  ],

  /* Photos under /images/premium-cigar/. width and height must be the file's real
     pixel size; the CSS crops each photo to its frame. */
  images: {
    /* The same storefront artwork this shop was already showing, at the size
       it was actually drawn at rather than a sixth of it. The old hero.png
       was 199x159 — a thumbnail stretched across the whole frame, which is
       what made this section look soft. The full-resolution file is WebP, so
       it carries the extension it really is instead of a .jpg name. */
    hero: {
      src: '/images/premium-cigar/hero.webp',
      alt: `The ${name} storefront in ${location}`,
      width: 1275,
      height: 1020,
    },
    /* UNUSABLE — a grey placeholder graphic that reads "placeholder" across
       the middle, not a photograph. Nothing renders it today. Replace it
       with a real storefront shot before anything points at it. */
    storefront: {
      src: '/images/premium-cigar/storefront.jpg',
      alt: `${name} storefront at 15750 S Golden Rd in ${location}`,
      width: 1600,
      height: 900,
    },
    /* UNUSABLE — this is not this shop. It is an AI-generated blue-neon
       interior carrying an "imagined with AI" watermark, and the identical
       file also sits at yours/storefront.jpg, lakewood/storefront.jpg and
       littleton/storefront.jpg. Nothing renders it today. */
    interior: {
      src: '/images/premium-cigar/interior.jpg',
      alt: `Cigars and vape shelves inside ${name} in ${location}`,
      width: 736,
      height: 736,
    },
  },

  copy: {
    headline: 'Cigars and vapes, one family counter.',
    subtext:
      'Tuesday through Friday the doors open at 8 AM. We’re a small family-owned shop on S Golden Rd, selling premium cigars right alongside a flavour selection reviewers call huge. Ask Kesav. Regulars say our kratom is cheap.',
    categoriesHeading: 'Cigars live here too.',
    pitch: 'Unit B on S Golden Rd. Call ahead and we’ll hold it behind the counter.',
    reviewsNote: 'A review is how the next cigar smoker in Golden finds us.',
    /* Add "since <year>" once establishedYear is confirmed. */
    footerLine: `${location}’s family-owned vape and cigar shop`,
  },

  seo: {
    title: 'Golden Vape & Smoke - Premium Cigar — Golden, CO Cigar & Vape Shop',
    description:
      'Golden Vape & Smoke - Premium Cigar on S Golden Rd in Golden, CO. Premium cigars, flavoured disposables, e-liquids and kratom at a family-owned shop that opens 8 AM Tue–Fri.',
  },
}
