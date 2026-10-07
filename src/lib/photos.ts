import type { StaticImageData } from "next/image";
import bridge from "@/assets/images/bridge-residential-street.jpg";
import commercialDscr from "@/assets/images/commercial-dscr-storefronts.jpg";
import dscr from "@/assets/images/dscr-rental-house.jpg";
import fixAndFlip from "@/assets/images/fix-and-flip-kitchen-renovation.jpg";
import groundUp from "@/assets/images/ground-up-framing.jpg";
import homeStreet from "@/assets/images/home-street.jpg";
import midConstruction from "@/assets/images/mid-construction-framed-house.jpg";
import ourStory from "@/assets/images/our-story-modern-house.jpg";

/** Licensed stock, credited in src/assets/images/CREDITS.md. Never caption these as RSC deals. */
export type Photo = { src: StaticImageData; alt: string };

export const homeHeroPhoto: Photo = { src: homeStreet, alt: "" };

export const ourStoryPhoto: Photo = {
  src: ourStory,
  alt: "Modern white house with a covered entry and potted olive trees",
};

export const programPhotos: Record<string, Photo> = {
  dscr: { src: dscr, alt: "Single-family house with a covered front porch and a lawn" },
  bridge: { src: bridge, alt: "Residential street with two houses under green trees" },
  "fix-and-flip": {
    src: fixAndFlip,
    alt: "Kitchen under renovation, cabinets covered in plastic and paper",
  },
  "ground-up": { src: groundUp, alt: "Timber frame of a new house behind a site fence" },
  "mid-construction": {
    src: midConstruction,
    alt: "Two-story house in framing, with roof tiles going on",
  },
  "commercial-dscr": { src: commercialDscr, alt: "Row of small brick commercial buildings on a street" },
};
