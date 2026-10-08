import type { StaticImageData } from "next/image";
import dscrExplained from "@/assets/video/XTrthacQyiw.jpg";
import fixAndFlipDraws from "@/assets/video/-jjMuLRIk4s.jpg";
import brrrr from "@/assets/video/lNZkzlCaoIU.jpg";
import dallas from "@/assets/video/A8AWfpc4oag.jpg";
import honolulu from "@/assets/video/Lt3MwArGP_Q.jpg";
import walkthrough from "@/assets/video/pPumrpAaiwc.jpg";

export const youtubeChannelUrl = "https://www.youtube.com/@rscprivatelending";

/**
 * RSC's own YouTube videos. Titles are verbatim from YouTube. Thumbnails are stored locally so
 * nothing loads from YouTube before a click. Three use a neutral in-video frame instead of the
 * published thumbnail, whose overlay text makes claims the site does not.
 */
export type Video = { id: string; title: string; thumbnail: StaticImageData };

export const videos = {
  dallas: { id: "A8AWfpc4oag", title: "How This $4.3M Dallas Home Got Funded (Real Numbers)", thumbnail: dallas },
  honolulu: { id: "Lt3MwArGP_Q", title: "How We Closed a $1.6 Million Honolulu Flip in 5 Days", thumbnail: honolulu },
  walkthrough: {
    id: "pPumrpAaiwc",
    title: "$1,000,000+ Hard Money real estate deal (in person walkthrough)",
    thumbnail: walkthrough,
  },
  dscr: {
    id: "XTrthacQyiw",
    title: "DSCR Loans Explained (How Rental Property Financing Really Works)",
    thumbnail: dscrExplained,
  },
  draws: { id: "-jjMuLRIk4s", title: "What Most Investors Don't Know About Fix and Flip Loan Draws", thumbnail: fixAndFlipDraws },
  brrrr: {
    id: "lNZkzlCaoIU",
    title: "How to Use Hard Money and Refinance into a DSCR Loan (BRRRR Method)",
    thumbnail: brrrr,
  },
} satisfies Record<string, Video>;

type DealProgram = { label: string; href: string };

/**
 * Real funded deals (Adrian, 2026-10-07). Every displayed fact is quoted from the video's YouTube
 * title or description, recorded in `source`. Leave a field out rather than infer it: no state is
 * given for Dallas or Honolulu, and no location for the walkthrough.
 */
export const fundedDeals: {
  /** The location when the video states one; otherwise a description taken from the title. */
  heading: string;
  amount: { label: string; value: string };
  programs: DealProgram[];
  story: string;
  video: Video;
  source: Record<string, string>;
}[] = [
  {
    heading: "Preston Hollow, Dallas",
    amount: { label: "Listing", value: "$4.3 million" },
    programs: [
      { label: "Mid-Construction", href: "/loan-products/mid-construction" },
      { label: "Bridge", href: "/loan-products/bridge" },
    ],
    story:
      "A luxury new construction home, taken from 60% built with a mid-construction takeover loan, then a bridge rate-and-term refinance with interest reserves.",
    video: videos.dallas,
    source: {
      heading: "description: “a completed luxury new construction home in Preston Hollow, Dallas”",
      amount: "description: “took this project from 60% built to a $4.3 million listing”",
      programs: "description: “a mid-construction takeover loan and a bridge rate-and-term refinance with interest reserves”",
      story: "description (same sentence)",
    },
  },
  {
    heading: "Honolulu",
    amount: { label: "Purchase", value: "$1.632M" },
    programs: [{ label: "Fix & Flip", href: "/loan-products/fix-and-flip" }],
    story:
      "Came in from a wholesaler with a 14-day closing window and closed in 5 business days at 90% Loan-to-Cost plus 100% rehab.",
    video: videos.honolulu,
    source: {
      heading: "title: “Honolulu Flip”; description: “a single-family Honolulu deal”",
      amount: "description: “$1.632M purchase”",
      programs: "title: “Flip”; description: “Honolulu fix-and-flip”",
      story:
        "description: “came to us from a wholesaler with a 14-day closing window” and “closed in 5 business days at 90% Loan-to-Cost plus 100% rehab”",
    },
  },
  {
    heading: "Fix and flip walkthrough",
    amount: { label: "Deal", value: "$1,000,000+" },
    programs: [{ label: "Fix & Flip", href: "/loan-products/fix-and-flip" }],
    story:
      "An in-person walk of a hoarder-house rehab mid-project, with the purchase price, rehab budget, ARV, and projected profit broken down on site.",
    video: videos.walkthrough,
    source: {
      heading: "title: “(in person walkthrough)”; description: “a real $1,000,000+ fix and flip”",
      amount: "title: “$1,000,000+ Hard Money real estate deal”",
      programs: "description: “a real $1,000,000+ fix and flip funded with hard money”",
      story:
        "description: “break down the purchase price, rehab budget, ARV, and projected profit, and show what a hoarder-house rehab actually looks like mid-project”",
    },
  },
];

/** One explainer per program page. Ground-Up has no fitting video yet, so its section is skipped. */
export const programVideos: Partial<Record<string, Video>> = {
  dscr: videos.dscr,
  "fix-and-flip": videos.draws,
  bridge: videos.brrrr,
  "mid-construction": videos.dallas,
  "commercial-dscr": videos.dscr,
};
