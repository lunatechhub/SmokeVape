# Smoke & Vape — multi-tenant shop sites

One React + Vite codebase that builds a separate website for each shop. Nothing
is shared at runtime: each build bundles exactly one shop's data and only that
shop's photos, so a site can never leak another shop's details.

## The shops

Each row is one Vercel project, all four pointing at this same repository.

| Tenant key | Shop name | City | Vercel project | Live URL |
| --- | --- | --- | --- | --- |
| `lakewood` | Golden Vape & Smoke | Lakewood, CO | `golden-vape-lakewood` | https://golden-vape-lakewood.vercel.app |
| `littleton` | Golden Vape & Smoke | Littleton, CO | `golden-vape-littleton` | https://golden-vape-littleton.vercel.app |
| `premium-cigar` | Golden Vape & Smoke - Premium Cigar | Golden, CO | `golden-vape-premium-cigar` | https://golden-vape-premium-cigar.vercel.app |
| `yours` | Yours Vape & Smoke | Centennial, CO | `yours-vape-centennial` | https://yours-vape-centennial.vercel.app |
| `demo` | Smoke & Vape Co. | Colorado Springs, CO | none — not deployed | — |

And the build settings each project carries:

| Tenant key | Build command | Output directory |
| --- | --- | --- |
| `lakewood` | `npm run build:lakewood` | `dist-lakewood` |
| `littleton` | `npm run build:littleton` | `dist-littleton` |
| `premium-cigar` | `npm run build:premium-cigar` | `dist-premium-cigar` |
| `yours` | `npm run build:yours` | `dist-yours` |
| `demo` | `npm run build:demo` | `dist-demo` |

`demo` is a sample shop, not a real business. `npm run build:all` deliberately
skips it and builds the four real sites.

Run one locally with `npm run dev:<key>`, e.g. `npm run dev:lakewood`. Vite
prints the port it actually took — read that line rather than assuming 5173,
because a second site started while the first is running will quietly take the
next free port.

## Vercel settings per project

The four deployed projects point at this same repository and differ only in two
fields. Get either one wrong and the build silently produces the demo shop —
that is exactly what happened to the two legacy projects noted below.

- **Framework preset** — Vite
- **Build command** — `npm run build:<key>`
- **Output directory** — `dist-<key>`
- **Install command** — default

## Deployment

All four projects are connected to `lunatechhub/SmokeVape` and rebuild on every
push to `main`. Nothing else is needed to release: commit, push, and the four
sites redeploy themselves.

Two things about URLs that look like faults but are not:

- **Only the clean URLs above are public.** Any URL carrying a build hash
  (`golden-vape-lakewood-a8yrnokeu-…`) redirects to `vercel.com/sso-api` — a
  login wall. That is the `all_except_custom_domains` SSO setting doing its job,
  keeping preview builds private. Share the clean URLs, not the ones copied from
  a deployment in the dashboard.
- **There are no custom domains.** `vercel domains ls` reports zero, so the
  Domains panel is empty by fact rather than by fault. To add one:
  `vercel domains add <domain> <project>`, then point DNS at Vercel. A custom
  domain is also the one URL SSO protection never blocks.

Two legacy projects, `smoke-vape` and `smoke-vape-rgm5`, are also connected to
this repo and still rebuild on every push. They have no `--mode` and no output
directory, so both serve the demo shop. They are redundant now and worth
disconnecting or removing.

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

- Ignored: `node_modules`, `dist`, `dist-*`, `.vercel`
- Committed: `public/images/**` — every shop's photos ship with the repo, so a
  Vercel build needs no asset step
- Committed: the five `.env.*` tenant files, and they need a guard

`vercel link` appends a blanket `.env*` rule to `.gitignore`. That rule matches
all five tenant files, and the Vercel CLI filters its upload through the same
patterns — so with the rule alone, every build ships without its `VITE_TENANT`
and dies on `No shop set for --mode <key>`. The `!.env.<key>` exceptions at the
bottom of `.gitignore` are what prevent that. Do not remove them, and if the CLI
ever re-appends `.env*`, make sure the exceptions still come after it: in
gitignore the last matching rule wins.

Check it with `git check-ignore -v --no-index .env.lakewood` — and read the exit
code, not the output. `check-ignore` prints the matching rule even when that rule
is a negation, and it skips tracked files entirely unless `--no-index` is given,
so output alone will mislead you. Exit 1 means not ignored, which is what you
want.

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
