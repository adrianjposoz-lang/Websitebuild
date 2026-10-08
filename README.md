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

Header navigation is Home, Our Story, Loan Products, FAQs, and Contact. The primary button is **Submit a Scenario** and links to `/contact`. **Borrower Portal** links to `https://homebase.rscprivatelending.com/portal/auth/login` (`site.portalUrl`) with a plain `<a>`, in the same tab: a text link in the desktop header and the mobile menu, the footer, the contact page, and the quiet link under the home hero. `/portal` 301-redirects there. Below the `lg` breakpoint the header is one row (logo, Submit a Scenario, Menu), and Borrower Portal moves into the menu.

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
- Phone is required and must be a US number: 10 digits, or 11 starting with 1. Punctuation, spaces, and a leading `+` are ignored. Anything else gets a field error and nothing is sent.
- `npm test` runs the name and phone helper tests and the lending-states check with `node:test` (Node 22.6 or newer).

The webhook receives one JSON object per scenario:

| Field | Value |
| --- | --- |
| `name` | Full name as typed, with whitespace collapsed |
| `firstName` | First word of `name` |
| `lastName` | The rest of `name` after the first space, or `""` for a one-word name |
| `email` | Email address |
| `phone` | US E.164, such as `+18325550123` |
| `propertyAddress` | Property address |
| `program` | Program slug, such as `fix-and-flip` |
| `programName` | Program display name |
| `notes` | Scenario notes |
| `source` | Page URL, `https://rscprivatelending.com/contact` |
| `submittedAt` | ISO 8601 timestamp |

`firstName` and `lastName` come from `splitName()` and `phone` from `toUsE164()`, both in `src/lib/contact-fields.ts`.

## Brand and images

- Full-color logo on white: `public/brand/rsc-logo.png`. Reversed logo: `public/brand/rsc-logo-reversed.png` (navy surfaces only: the footer and the share image). Favicon and app icons: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`.
- Type: Schibsted Grotesk (400, 500, 600) through `next/font/google`, with Public Sans and the system sans as fallbacks. Headings are 500. Every figure (phone numbers, amounts, step numbers, the state count) carries the `tnum` utility for tabular numerals; keep it off running prose, since the font's `tnum` also widens periods.
- Colors live in `src/app/globals.css`: white and `surface` `#f4f5f7` bands, navy `#0b1f3a` for headings, links, and the closing band, `navy-deep` `#071422` for the footer, `body` `#334155`, `muted` `#475569`, `hair` `#d9dee5` hairlines, and `field` `#64748b` input borders. Red `#cd2727` is only the Submit a Scenario button and the 3px active-nav marker.
- Submit a Scenario (red, to `/contact`) is the only filled button. Everything else is a navy underlined text link.
- Photos: licensed Unsplash stand-ins in `src/assets/images/`, credited in `src/assets/images/CREDITS.md`, with alt text in `src/lib/photos.ts`, until Adrian's own deal photos arrive. `PageHero` puts the copy on 5 columns and the photo on 7, bleeding to the right edge from `lg` (8px radius, no overlay); below `lg` the photo runs under the copy. Each page preloads its one hero photo. No captions until real deal values exist.
- Facts: `verifiedFacts` in `src/lib/site.ts`, each with a source. With fewer than 3, home shows one sentence ("We lend in 40 states.") linking to the "Where do you lend?" FAQ, which lists `lendingStates` (DC is not included). `npm test` checks the list.

## Videos

- `videos` in `src/lib/site.ts` is the single map of RSC's own YouTube videos: `{ id, title, duration, poster, placement }`. Titles are verbatim and durations come from the channel's videos tab. `videosFor(placement)` returns nothing for an empty placement, and that section does not render.

| Placement | Videos |
| --- | --- |
| `home-deals` (home "From the lender", first) and `loan-products-deals` | A8AWfpc4oag, Lt3MwArGP_Q, pPumrpAaiwc |
| `home-explainers` (home "From the lender", 3-up) | bMoVComyyfI, ncIvS1Es3uc, rrFlOT9AbeE |
| `program:fix-and-flip` | -jjMuLRIk4s |
| `program:dscr` | XTrthacQyiw |
| `program:bridge` | lNZkzlCaoIU |
| `program:ground-up`, `program:mid-construction` | V8--nI2muqQ |
| `program:commercial-dscr` | none, so no video section |
| `contact` (beside the form, below it on mobile) | ajg_JxlUPVM |

- Posters are self-hosted in `src/assets/video/` (title cards, or clean frames for the on-location deal videos), mapped in `src/lib/video-posters.ts` and rendered lazily with `next/image`. Never use the channel thumbnails.
- `VideoFacade` renders the poster and a `<button aria-label="Play: {title} ({duration})">`. Nothing loads from YouTube or Google until the click. The click swaps in `https://www.youtube-nocookie.com/embed/{id}?autoplay=1&cc_load_policy=1&cc_lang_pref=en&rel=0` (`allow="autoplay; encrypted-media; picture-in-picture"`, `allowfullscreen`) in the same 16:9 box and moves focus into it. There is no CSP in `next.config.ts`; if one is added, allow `frame-src https://www.youtube-nocookie.com`.
- `fundedDeals` are real loans (Adrian, 2026-10-07). Every displayed fact is quoted from the video's YouTube title or description and recorded in each deal's `source`. Leave a field out rather than infer it. Never put a funded deal under the illustrative label, or a sample under Funded deals.
- Never feature 8CTBPkEEN9A, oiWG4yO81Wk, X6OaUKN9nps, svQIB5oWumw, or LDSxPywBu5Q, and don't display their titles. `npm test` checks this and the placements.
- The footer links to the channel ("Watch on YouTube", new tab), as does "More on YouTube" on home.

## Home hero

`PageHero variant="full"` (home only; inner pages keep the split hero): full-bleed photo, `min-h` 88svh (80svh below `lg`), a 4:5 art-directed crop below 768px through `getImageProps` and `<picture>`, both sources preloaded with `media`, `sizes="100vw"`. The navy gradient (`.92` → `.80` at 38% → `0` at 72%) is the copy block's `::before` at 263% of its height, so the copy always sits where the shade is at least .80: white text stays at least 7:1 over any photo pixel.

## Motion

- Hover: color changes only (`transition-colors duration-150`). Program tiles turn their border navy. No lift.
- Scroll reveal: section-level blocks marked `data-reveal` fade in and rise 12px over 400ms (`cubic-bezier(.2,.7,.2,1)`), once, at 15% visibility, with up to 60ms stagger across at most 4 blocks. `RevealObserver` (root layout) sets `motion-ok` on `<html>`, and the hidden state only exists under that class, so content is visible without JS or IntersectionObserver. Blocks already on screen are marked revealed first. Opacity and transform only, so there is no layout shift.
- `prefers-reduced-motion: reduce`: the observer is never attached, `motion-ok` is never set, and CSS turns off all transitions and animations.
