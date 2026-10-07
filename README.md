# RSC Private Lending

Marketing site for RSC Private Lending (Red Sun Capital, LLC), a hard-money and private lender for real estate investors.

This repository is a clean Next.js app. It does not copy the live Squarespace/CMS site, and it does not include analytics or a tag manager.

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
| `/portal` | Borrower Portal (coming soon) |
| `/privacy` | Privacy stub |
| `/terms` | Terms stub |
| `/sitemap.xml` | XML sitemap of the routes above |

Unknown URLs render `not-found` and are served with an HTTP 404.

Header navigation is Home, Our Story, Loan Products, FAQs, and Contact. The primary button is **Submit a Scenario** and links to `/contact`. **Borrower Portal** links to `/portal`: a gold outline button in the desktop header, the first item in the mobile menu, and a text link under the home hero. The mobile header is one 64px row (logo, Submit a Scenario, Menu).

## Brand and images

- Reversed logo: `public/brand/rsc-logo-reversed.png` (navy surfaces only). Favicon and app icons: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`.
- Photos are free Unsplash placeholders until real deal photos replace them. Source URLs and licenses are in `src/assets/images/CREDITS.md`.
- Icons are from `lucide-react` (ISC).
- Mono accents (eyebrows, panel labels, step numbers, chips) use IBM Plex Mono (OFL) through `next/font`. Shared card chrome lives in `src/components/Panel.tsx`.
- All animation and transitions turn off under `prefers-reduced-motion: reduce` (one rule at the end of `src/app/globals.css`).
