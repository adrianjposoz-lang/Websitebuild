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
| `/privacy` | Privacy Policy, verbatim from the live site (`src/lib/legal.ts`) |
| `/terms` | Terms of Service, verbatim from the live site (`src/lib/legal.ts`) |
| `/sitemap.xml` | XML sitemap of the routes above |
| `/robots.txt` | Crawl rules plus the `Sitemap:` line |
| `/opengraph-image` | Default 1200×630 share image (Open Graph and Twitter) |

Unknown URLs render `not-found` and are served with an HTTP 404.

Header navigation is Home, Our Story, Loan Products, FAQs, and Contact. The primary button is **Submit a Scenario** and links to `/contact`. **Borrower Portal** links to `https://homebase.rscprivatelending.com/portal/auth/login` (`site.portalUrl`) with a plain `<a>`, in the same tab: a text link in the desktop header and the mobile menu, the footer, the contact page, and the quiet link under the home hero. `/portal` 301-redirects there. Below the `lg` breakpoint the header is one row (logo, Menu) and drops its Submit a Scenario button, because every page hero leads with a full-width one; the mobile menu also carries it.

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

- Full-color logo on paper: `public/brand/rsc-logo.png`. Reversed logo: `public/brand/rsc-logo-reversed.png` (navy surfaces only: the footer and the share image). Favicon and app icons: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`.
- Type: Libre Caslon Display (H1, H2), Libre Caslon Text (H3, list terms, captions, the program ampersand), and Libre Franklin (body and UI), all through `next/font/google`.
- Colors live in `src/app/globals.css`: paper `#f6f1e7`, navy `#0b1f3a` for headings, links, and line art, and red `#cd2727` for button fills and large accents only. Paper grain (4% multiply) sits on light surfaces; the navy closing band and footer sit above it.
- No stock photography. Until real RSC project photos arrive, photo slots carry the hand-drawn property sketches in `src/components/PropertySketch.tsx` (inline SVG, one per program).

## Motion

Hover color changes only (`transition-colors duration-150`), turned off under `prefers-reduced-motion: reduce`. There is no scroll-triggered or auto-playing animation.
