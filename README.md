# Smoke & Vape — multi-tenant shop sites

One React + Vite codebase that builds a separate website for each shop. Nothing
is shared at runtime: each build bundles exactly one shop's data and only that
shop's photos, so a site can never leak another shop's details.

## The shops

Each row is one Vercel project. Fill in the last two columns as you create them.

| Tenant key | Build command | Output directory | Shop name | City | Vercel project | Subdomain |
| --- | --- | --- | --- | --- | --- | --- |
| `lakewood` | `npm run build:lakewood` | `dist-lakewood` | Golden Vape & Smoke | Lakewood, CO | | |
| `littleton` | `npm run build:littleton` | `dist-littleton` | Golden Vape & Smoke | Littleton, CO | | |
| `premium-cigar` | `npm run build:premium-cigar` | `dist-premium-cigar` | Golden Vape & Smoke - Premium Cigar | Golden, CO | | |
| `yours` | `npm run build:yours` | `dist-yours` | Yours Vape & Smoke | Centennial, CO | | |
| `demo` | `npm run build:demo` | `dist-demo` | Smoke & Vape Co. | Colorado Springs, CO | not deployed | — |

`demo` is a sample shop, not a real business. `npm run build:all` deliberately
skips it and builds the four real sites.

Run one locally with `npm run dev:<key>`, e.g. `npm run dev:lakewood`. Vite
prints the port it actually took — read that line rather than assuming 5173,
because a second site started while the first is running will quietly take the
next free port.

## Vercel settings per project

All five projects point at this same repository and differ only in two fields:

- **Framework preset** — Vite
- **Build command** — `npm run build:<key>`
- **Output directory** — `dist-<key>`
- **Install command** — default

## How a build picks its shop

    .env.<key>            VITE_TENANT=<key>
      -> vite.config.js   TENANTS map: key -> data file + images folder
      -> src/data/tenants/<key>.js     that shop's content
      -> public/images/<key>/          only that shop's photos

**The five `.env.*` files must stay committed.** They hold nothing secret, only
a `VITE_TENANT` value, and every Vercel build reads one. If `.env.<key>` is
missing the build does not quietly fall back to the demo shop — `vite.config.js`
throws `No shop set for --mode <key>` and the build fails outright. Loud, but it
fails.

## What is and is not committed

- Ignored: `node_modules`, `dist`, `dist-*`
- Committed: `public/images/**` — every shop's photos ship with the repo, so a
  Vercel build needs no asset step

## Before launch

Three fields are still unconfirmed in all four real shops. They are marked
`TODO` in the tenant files, and the page is built to render nothing rather than
render a placeholder, so a site is safe to deploy with them outstanding — the
email line, the review button and the "since <year>" note simply do not appear.

| Field | lakewood | littleton | premium-cigar | yours |
| --- | --- | --- | --- | --- |
| `email` | TODO | TODO | TODO | TODO |
| `reviewUrl` | TODO | TODO | TODO | TODO |
| `establishedYear` | TODO | TODO | TODO | TODO |
| social links | TODO | TODO | real | TODO |

Also outstanding, and worth settling before these go in front of customers:

- **Littleton's hero is not its own storefront.** It is the same brand artwork
  as Lakewood and Premium Cigar (identical file), and the sign in it reads
  "Golden vape shop". Littleton's real frontage exists only as a 240x160
  thumbnail, too small to use. Replace with a real photo at 1600x1067 or larger.
- **Premium Cigar has no logo.** The badge on disk reads "Golden Smoke Shop";
  it is commented out in the tenant file, so the navbar falls back to the text
  mark. Its Instagram and Facebook links still point at `golden_smokeshop`.
- **`storefront.jpg` is AI-generated stock** in several shop folders and is not
  that shop's premises. Nothing renders it today; do not point anything at it.
- **Lakewood and Littleton share one interior photograph** (identical file).
- Hours and review counts are confirmed for all four shops and drive both the
  footer Hours column and the hero's live open/closed status.
