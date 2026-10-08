import type { StaticImageData } from "next/image";
import bridge from "@/assets/images/bridge-residential-street.jpg";
import dealDallas from "@/assets/images/dallas-tx.jpg";
import dealHonolulu from "@/assets/images/deal-honolulu-hi.png";
import dealHouston from "@/assets/images/deal-houston-tx.png";
import dealMarietta from "@/assets/images/marietta-ga.jpg";
import dealRoswell from "@/assets/images/roswell-ga.jpg";
import dealStPetersburg from "@/assets/images/deal-petersburg-fl.png";
import dscr from "@/assets/images/dscr-rental-house.jpg";
import fixAndFlip from "@/assets/images/fix-and-flip-kitchen-renovation.jpg";
import groundUp from "@/assets/images/ground-up-framing.jpg";
import homeStreet from "@/assets/images/home-street.jpg";
import homeStreetMobile from "@/assets/images/home-street-mobile.jpg";
import midConstruction from "@/assets/images/mid-construction-framed-house.jpg";
import ourStory from "@/assets/images/our-story-modern-house.jpg";

/** Licensed stock, credited in src/assets/images/CREDITS.md. Never caption these as RSC deals. */
export type Photo = { src: StaticImageData; alt: string };

/** A full-bleed photo with an art-directed 4:5 crop for screens under 768px. */
export type HeroPhoto = Photo & { mobileSrc: StaticImageData };

export const homeHeroPhoto: HeroPhoto = { src: homeStreet, mobileSrc: homeStreetMobile, alt: "" };

export const ourStoryPhoto: Photo = {
  src: ourStory,
  alt: "Modern white house with a covered entry and potted olive trees",
};

export const programPhotos: Record<string, Photo> = {
  dscr: { src: dscr, alt: "Single-family house with a covered front porch and a lawn" },
  bridge: { src: bridge, alt: "Residential street with two houses under green trees" },
  "fix-and-flip": {
    src: fixAndFlip,
    alt: "Kitchen under renovation, cabinets wrapped in plastic sheeting",
  },
  "ground-up": { src: groundUp, alt: "Timber frame of a new house behind a site fence" },
  "mid-construction": {
    src: midConstruction,
    alt: "Two-story house in framing, with roof tiles going on",
  },
};

/**
 * RSC's own deal photos, keyed by city: from the deal cards on rscprivatelending.com, or RSC's
 * appraisal exteriors (Dallas, Roswell, Marietta; house numbers and signs blurred, metadata stripped).
 * Use a photo only on a card for the same city; never borrow another city's.
 */
export const dealPhotos = {
  "dallas-tx": { src: dealDallas, alt: "Property in Dallas, TX" },
  "houston-tx": { src: dealHouston, alt: "Property in Houston, TX" },
  "st-petersburg-fl": { src: dealStPetersburg, alt: "Property in St. Petersburg, FL" },
  "honolulu-hi": { src: dealHonolulu, alt: "Property in Honolulu, HI" },
  "roswell-ga": { src: dealRoswell, alt: "Property in Roswell, GA" },
  "marietta-ga": { src: dealMarietta, alt: "Property in Marietta, GA" },
} satisfies Record<string, Photo>;

export type DealPhotoKey = keyof typeof dealPhotos;
