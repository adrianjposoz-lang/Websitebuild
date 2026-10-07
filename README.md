# RSC Private Lending

Marketing site for RSC Private Lending (Red Sun Capital, LLC), a hard-money and private lender for real estate investors.

This repository is a clean Next.js app. It does not copy the live site (a client-rendered React app), and it does not include analytics or a tag manager.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- ESLint

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

`npm run dev` starts the local site at [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/our-story` | Our Story (stub) |
| `/loan-products` | Loan Products hub |
| `/loan-products/dscr` | DSCR |
| `/loan-products/bridge` | Bridge |
| `/loan-products/fix-and-flip` | Fix & Flip |
| `/loan-products/ground-up` | Ground-Up |
| `/loan-products/mid-construction` | Mid-Construction |
| `/loan-products/commercial-dscr` | Commercial DSCR |
| `/faqs` | FAQs |
| `/contact` | Contact |
| `/portal` | Borrower Portal (coming soon, `noindex`, not in the sitemap) |
| `/privacy` | Privacy stub |
| `/terms` | Terms stub |
| `/sitemap.xml` | XML sitemap of the routes above, except `/portal` |
| `/robots.txt` | Crawl rules plus the `Sitemap:` line |
| `/opengraph-image` | Default 1200×630 share image (Open Graph and Twitter) |

Unknown URLs render `not-found` and are served with an HTTP 404.

Header navigation is Home, Our Story, Loan Products, FAQs, and Contact. The primary button is **Submit a Scenario** and links to `/contact`. **Borrower Portal** links to `/portal`: a gold outline button in the desktop header, the first item in the mobile menu, and a text link under the home hero. The mobile header is one 64px row (logo, Submit a Scenario, Menu).

## Search and environments

`NEXT_PUBLIC_SITE_ENV` decides whether a build may be indexed. It is read at build time, so set it before `npm run build`.

| `NEXT_PUBLIC_SITE_ENV` | Result |
| --- | --- |
| `production` | Indexable. `robots.txt` allows `/`. |
| anything else, or unset | `<meta name="robots" content="noindex, nofollow">` on every page, an `X-Robots-Tag: noindex, nofollow` header on every response, and `robots.txt` disallows `/`. |

Unset means not production, so a preview can't be indexed by accident. The production deploy **must** set `NEXT_PUBLIC_SITE_ENV=production`, or the live site ships with `noindex`. This variable is host-agnostic. `VERCEL_ENV` is not used.

- Titles, descriptions, canonicals, and Open Graph/Twitter tags come from `pageMetadata()` in `src/lib/seo.ts`. Canonicals use the apex host `https://rscprivatelending.com` with no trailing slash.
- JSON-LD: Organization and FinancialService on every page (`src/app/layout.tsx`), and FAQPage on `/faqs`, built from the same `faqs` array the page renders.
- Redirects live in `next.config.ts` and return HTTP 301: `www.rscprivatelending.com` to the apex, `/resources` and `/faq` to `/faqs`, `/privacy-notice` to `/privacy`, and `/terms-of-service` to `/terms`. The www rule only works if requests for the www host reach this app. HTTP-to-HTTPS belongs at the host or DNS layer.

## Scenario form delivery

The form on `/contact` posts to a server action (`src/app/contact/actions.ts`). The action validates and sanitizes the fields, drops submissions that fill the hidden honeypot field, rate-limits by IP, and POSTs JSON to the GoHighLevel inbound webhook in `GHL_WEBHOOK_URL`. GoHighLevel emails the team; the site never sends email.

- Set `GHL_WEBHOOK_URL` in `.env.local` locally (see `.env.example`) or in the host's environment settings. It is read only on the server, at request time, so changing it needs a restart, not a rebuild.
- When it is unset, the form shows a "does not deliver scenarios yet" note with the phone and email, and a submit reports that nothing was sent.
- The rate limit (5 delivery attempts per IP per 10 minutes) lives in memory. Each serverless instance keeps its own count and loses it on cold start, so treat it as a speed bump, not abuse protection.
- To test, point `GHL_WEBHOOK_URL` at a local mock such as `http://localhost:4010/hook`, never at the real webhook.

## Brand and images

- Reversed logo: `public/brand/rsc-logo-reversed.png` (navy surfaces only). Favicon and app icons: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`.
- Photos are free Unsplash placeholders until real deal photos replace them. Source URLs and licenses are in `src/assets/images/CREDITS.md`.
- Icons are from `lucide-react` (ISC).
- Mono accents (eyebrows, panel labels, step numbers, chips) use IBM Plex Mono (OFL) through `next/font`. Shared card chrome lives in `src/components/Panel.tsx`.
- All animation and transitions turn off under `prefers-reduced-motion: reduce` (one rule at the end of `src/app/globals.css`).

## Motion

- Scroll reveal: add `data-reveal="rise"` to an element. `src/components/RevealObserver.tsx` (mounted in the root layout) marks only below-the-fold elements as pending and reveals them with IntersectionObserver, with a scroll/resize check, focus, and print as fallbacks. Server HTML has no reveal state, so the page renders fully without JS.
- Motion uses `transform` and `clip-path` only, never opacity on text, so contrast holds mid-animation and CLS stays at 0.
- Hero: photo settle, red glow fade-in (capped at its 18% alpha), and Scenario preview rise. Funding stepper: line draws, numbers pop, step text rises in sequence. Cards: `card-lift`, `media-zoom`, and `arrow-nudge` utilities.
- Every auto-playing animation is finite and finishes within about 5 seconds. No motion library is used.
