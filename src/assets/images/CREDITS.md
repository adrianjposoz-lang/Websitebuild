# Photo credits

Three sources: RSC's appraisal exteriors (first table), RSC's own deal photos from the live site (second table), and Unsplash stand-ins (third table). The deal photos in the first two tables live in `public/deals/`, named after the loan's `id` in `src/data/funded-loans.ts`.

## RSC deal photos (source: RSC Private Lending, from appraisal reports, used with permission)

Approved by Adrian (2026-10-08). House numbers, signs and plates were blurred before delivery, and no license plate is legible. Re-encoded (mozjpeg, quality 90) with all metadata stripped: no EXIF, GPS, XMP, IPTC or ICC. File names are city only.

| File | Used on | Source | Pixels |
| --- | --- | --- | --- |
| `dallas-tx.jpg` | Funded deal: Preston Hollow, Dallas, TX (`/`, `/loan-products`, `/funded-loans`), shown on the video facade | RSC Private Lending, from appraisal reports, used with permission | 1343×900 |
| `houston-tx-2.jpg` | Funded deal: Houston, TX $4,029,512 (`/`, `/loan-products`, `/funded-loans`) | RSC Private Lending, from appraisal reports, used with permission | 1025×768 |
| `roswell-ga.jpg` | Funded deal: Roswell, GA (`/`, `/loan-products`, `/funded-loans`) | RSC Private Lending, from appraisal reports, used with permission | 1367×1025 |
| `marietta-ga.jpg` | Funded deal: Marietta, GA (`/`, `/loan-products`, `/funded-loans`) | RSC Private Lending, from appraisal reports, used with permission | 1330×998 |
| `hollywood-fl.jpg` | Funded deal: Hollywood, FL (`/funded-loans`) | RSC Private Lending, from appraisal reports, used with permission | 736×518 |
| `kailua-hi-2.jpg` | Funded deal: Kailua, HI Ground-Up (`/funded-loans`), the lot before construction, captioned "Before construction"; pending Adrian's call on a finished-home photo | RSC Private Lending, from appraisal reports, used with permission | 907×680 |
| `denver-co.jpg` | Funded deal: Denver, CO $647,200 (`/funded-loans`), the appraisal front photo; house number blurred by the lender before delivery | RSC Private Lending, from appraisal reports, used with permission | 1367×1025 |

## RSC deal photos (source: rscprivatelending.com)

Real photos of RSC's deals, taken from the deal cards on the live site's home page (Adrian, 2026-10-07: "the photos on the deal cards at the live rscprivatelending.com are real photos of RSC's deals. Use them."). Downloaded 2026-10-08 by rendering the site in headless Chromium and reading the DOM, `srcset`, CSS backgrounds and the network log. The site serves them as fixed build assets with no resize parameters, and the bundle references no larger version, so these files are the originals byte-for-byte as served (renamed from `deal-houston-tx.png`, `deal-petersburg-fl.png` and `deal-honolulu-hi.png`). Each one is used only on a card for the same city.

| File | Used on | Source URL | Pixels | Live-site card |
| --- | --- | --- | --- | --- |
| `houston-tx.png` | Funded deal: Houston, TX (`/`, `/loan-products`, `/funded-loans`) | https://rscprivatelending.com/assets/deal-houston-tx-DCw7GBFC.png | 549×413 | Mid-Construction Refinance, Houston, TX |
| `st-petersburg-fl.png` | Funded deal: St. Petersburg, FL (`/`, `/loan-products`, `/funded-loans`) | https://rscprivatelending.com/assets/deal-petersburg-fl-DruE1Vrj.png | 468×341 | DSCR, Petersburg, FL |
| `honolulu-hi.png` | Funded deal: Honolulu, HI (`/`, `/loan-products`, `/funded-loans`) | https://rscprivatelending.com/assets/deal-honolulu-hi-BqTRQ3Wy.png | 672×414 | Fix and Flip, Honolulu, HI |

The live site's Dallas photo (https://rscprivatelending.com/assets/deal-dallas-tx-cKdfP4qU.png, 674×379) was replaced by the sharper `dallas-tx.jpg` above and is no longer in the repo.

All of these are under 700px wide, too small for the full-bleed home hero (~1920px) or a program hero (~1440px), so the heroes keep the Unsplash stand-ins below. The live site's own hero, `hero-construction-rendering-DdCogn-c.jpg` (1920×1080, alt "Construction framing transitioning to architectural rendering"), is a rendering, not a deal photo, and is not used.

## Unsplash stand-ins

Every photo in this table is from Unsplash under the [Unsplash License](https://unsplash.com/license), not Unsplash+. Each license was checked on 2026-10-07 through Unsplash's own photo data (`premium: false`, `plus: false`) and on the photo page, which reads "Free to use under the Unsplash License". Attribution is not required by the license; it is recorded here for provenance.

These are stock photos, not RSC projects. Do not caption them as RSC deals.

| File | Used on | Unsplash page | Photographer | License |
| --- | --- | --- | --- | --- |
| `home-street.jpg` | `/` hero | [4T4AcGJvARQ](https://unsplash.com/photos/suburban-street-with-houses-and-palms-4T4AcGJvARQ) | [FilterGrade](https://unsplash.com/@filtergrade) | Unsplash License |
| `dscr-rental-house.jpg` | `/loan-products/dscr` hero | [-dcznEJPmsk](https://unsplash.com/photos/white-and-brown-concrete-house--dcznEJPmsk) | [Ian MacDonald](https://unsplash.com/@imacdonald3) | Unsplash License |
| `bridge-residential-street.jpg` | `/loan-products/bridge` hero | [UYDW1oDWZtg](https://unsplash.com/photos/residential-street-with-houses-and-trees-UYDW1oDWZtg) | [Josh Lemmon](https://unsplash.com/@wolfiex2) | Unsplash License |
| `fix-and-flip-kitchen-renovation.jpg` | `/loan-products/fix-and-flip` hero | [UqNEbyRQ660](https://unsplash.com/photos/kitchen-renovation-with-white-cabinets-UqNEbyRQ660) | [immo RENOVATION](https://unsplash.com/@immorenovation) | Unsplash License |
| `ground-up-framing.jpg` | `/loan-products/ground-up` hero | [nCiRDhiVeP8](https://unsplash.com/photos/wooden-house-frame-under-construction-behind-a-fence-nCiRDhiVeP8) | [Troy Mortier](https://unsplash.com/@troyscanon) | Unsplash License |
| `mid-construction-framed-house.jpg` | `/loan-products/mid-construction` hero | [AMvfmsLllto](https://unsplash.com/photos/a-new-house-is-being-framed-AMvfmsLllto) | [Troy Mortier](https://unsplash.com/@troyscanon) | Unsplash License |
| `our-story-modern-house.jpg` | `/our-story` hero | [MUiv6OcHoto](https://unsplash.com/photos/modern-white-house-with-glass-garage-doors-and-plants-MUiv6OcHoto) | [GoodLifeConstruction](https://unsplash.com/@goodlifeconstruction) | Unsplash License |

Originals are re-encoded JPEGs (mozjpeg): `home-street.jpg` at 2400px wide, the rest at 1800px. `next/image` serves AVIF or WebP at the requested size.

## Video posters (`src/assets/video/`)

Self-hosted, so the site makes no request to YouTube or Google before a play click. None uses the channel's published thumbnails.

- Title cards: navy, the verbatim video title, and "RSC Private Lending", set in the site's Schibsted Grotesk (rendered locally, 1280×720). Used for Lt3MwArGP_Q, bMoVComyyfI, ncIvS1Es3uc, rrFlOT9AbeE, -jjMuLRIk4s, XTrthacQyiw, lNZkzlCaoIU, V8--nI2muqQ, and ajg_JxlUPVM.
- Clean in-video frames with no burned-in text, from RSC's own on-location videos via YouTube's auto-generated stills (downloaded 2026-10-08): `A8AWfpc4oag.jpg` (`maxres3`, the finished Dallas kitchen) and `pPumrpAaiwc.jpg` (`maxres1`, the street outside the walkthrough property).
- On the Dallas and Honolulu funded-deal cards, the RSC deal photo for that city replaces the poster; `A8AWfpc4oag.jpg` and `Lt3MwArGP_Q.jpg` remain the fallback for those videos anywhere a card has no deal photo.
- The play glyph and duration badge are drawn by `VideoFacade`, not baked into the image.

## Home hero mobile crop

`home-street-mobile.jpg` is a 4:5 crop (935×1169) of `home-street.jpg` (same Unsplash photo by FilterGrade, Unsplash License), cut so the houses sit above the copy on narrow screens.
