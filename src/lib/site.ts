export const site = {
  name: "RSC Private Lending",
  legalName: "Red Sun Capital, LLC",
  url: "https://rscprivatelending.com",
  description:
    "RSC Private Lending (Red Sun Capital, LLC) provides hard money and private lending for real estate investors.",
  phoneDisplay: "+1-832-648-4619",
  phoneHref: "tel:+18326484619",
  phoneLocal: "832-648-4619",
  email: "info@rscprivatelending.com",
  addressLines: ["118 Vintage Park Blvd #W317", "Houston,\u00a0TX 77070"],
  address: {
    street: "118 Vintage Park Blvd #W317",
    locality: "Houston",
    region: "TX",
    postalCode: "77070",
  },
  /** External sign-in. Link with a plain `<a>`, never next/link. */
  portalUrl: "https://homebase.rscprivatelending.com/portal/auth/login",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/loan-products", label: "Loan Products" },
  { href: "/funded-loans", label: "Funded Loans" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

/** Publishable figures only. Each needs a source. Render as a sentence until there are 3 or more. */
export const verifiedFacts = [
  {
    id: "lending-states",
    value: "38",
    label: "states where we lend",
    source:
      "Adrian 2026-10-07: all except VT MN UT NV ND SD WV ME OR ID. Updated 2026-10-09: CA and AZ removed per Adrian (not licensed in CA)",
  },
] as const;

/** All 50 states except VT, MN, UT, NV, ND, SD, WV, ME, OR, ID, CA, and AZ. DC is not a state and is not listed. */
export const lendingStates = [
  "Alabama",
  "Alaska",
  "Arkansas",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "Ohio",
  "Oklahoma",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "Tennessee",
  "Texas",
  "Virginia",
  "Washington",
  "Wisconsin",
  "Wyoming",
] as const;

export const youtubeChannelUrl = "https://www.youtube.com/@rscprivatelending";

export type VideoPlacement =
  | "home-deals"
  | "home-explainers"
  | "loan-products-deals"
  | "contact"
  | `program:${string}`;

/**
 * RSC's own YouTube videos. Titles are verbatim and durations come from the channel's videos tab
 * (2026-10-08). Each video's poster is its own YouTube thumbnail, self-hosted at
 * public/video-thumbs/<id>.jpg (see video-thumbs.ts). Never feature 8CTBPkEEN9A, oiWG4yO81Wk,
 * X6OaUKN9nps, svQIB5oWumw, or LDSxPywBu5Q, or show their titles.
 */
export const videos = {
  A8AWfpc4oag: {
    id: "A8AWfpc4oag",
    title: "How This $4.3M Dallas Home Got Funded (Real Numbers)",
    duration: "3:59",
    placement: ["home-deals", "loan-products-deals"],
  },
  Lt3MwArGP_Q: {
    id: "Lt3MwArGP_Q",
    title: "How We Closed a $1.6 Million Honolulu Flip in 5 Days",
    duration: "6:57",
    placement: ["home-deals", "loan-products-deals"],
  },
  pPumrpAaiwc: {
    id: "pPumrpAaiwc",
    title: "$1,000,000+ Hard Money real estate deal (in person walkthrough)",
    caption: "Fix and flip walkthrough",
    duration: "6:39",
    placement: ["home-explainers"],
  },
  bMoVComyyfI: {
    id: "bMoVComyyfI",
    title: "Hard Money Loans for Beginners (Only Video You Will Ever Need)",
    duration: "9:09",
    placement: ["home-explainers"],
  },
  ncIvS1Es3uc: {
    id: "ncIvS1Es3uc",
    title: "How to Get Your Hard Money Loan Funded Fast (6 Steps)",
    duration: "5:05",
    placement: ["home-explainers"],
  },
  rrFlOT9AbeE: {
    id: "rrFlOT9AbeE",
    title: "How Hard Money Lenders Calculate Your Loan Amount (From a Lender)",
    duration: "6:31",
    placement: ["home-explainers"],
  },
  "-jjMuLRIk4s": {
    id: "-jjMuLRIk4s",
    title: "What Most Investors Don't Know About Fix and Flip Loan Draws",
    duration: "7:49",
    placement: ["program:fix-and-flip"],
  },
  XTrthacQyiw: {
    id: "XTrthacQyiw",
    title: "DSCR Loans Explained (How Rental Property Financing Really Works)",
    duration: "7:29",
    placement: ["program:dscr"],
  },
  lNZkzlCaoIU: {
    id: "lNZkzlCaoIU",
    title: "How to Use Hard Money and Refinance into a DSCR Loan (BRRRR Method)",
    duration: "9:06",
    placement: ["program:bridge"],
  },
  "V8--nI2muqQ": {
    id: "V8--nI2muqQ",
    title: "What's an Interest Reserve and Should You Use One?",
    duration: "5:12",
    placement: ["program:ground-up", "program:mid-construction"],
  },
  ajg_JxlUPVM: {
    id: "ajg_JxlUPVM",
    title: "Applying For Hard Money? Send These Documents First",
    duration: "7:28",
    placement: ["contact"],
  },
} as const satisfies Record<
  string,
  {
    id: string;
    title: string;
    /** Shown under the poster instead of the title, and names the play button and the modal. */
    caption?: string;
    duration: string;
    placement: readonly VideoPlacement[];
  }
>;

export type Video = (typeof videos)[keyof typeof videos];

export function videosFor(placement: VideoPlacement): Video[] {
  return Object.values(videos).filter((video) => (video.placement as readonly string[]).includes(placement));
}

export const officeLine = `Office: ${site.address.street}, Houston,\u00a0TX ${site.address.postalCode}.`;

export type Product = {
  slug: string;
  name: string;
  href: string;
  summary: string;
  body: string;
  showConstructionBudget: boolean;
  /**
   * Hero definition list. Every row restates a fact already published on the site or confirmed by
   * Adrian. Interest reserves are Fix & Flip, Ground-Up and Mid-Construction only, never DSCR or Bridge.
   */
  facts: { term: string; detail: string }[];
};

const businessPurpose = { term: "Loan purpose", detail: "Business purpose only." };
const interestReserves = {
  term: "Interest reserves",
  detail: "Full interest reserves available. No borrower liquidity required.",
};
const noConstructionBudget = {
  term: "Construction budget",
  detail: "Not part of this program.",
};

export const products: Product[] = [
  {
    slug: "dscr",
    name: "DSCR",
    href: "/loan-products/dscr",
    summary:
      "Rental loans weighed on the property’s debt-service coverage rather than a consumer mortgage application.",
    body: "DSCR is for rented investment property, where the payment is compared with the income the property produces. Submit a scenario to discuss leverage, reserves, and pricing for your property.",
    showConstructionBudget: false,
    facts: [
      {
        term: "What it covers",
        detail: "Rented investment property, weighed on the income the property produces.",
      },
      noConstructionBudget,
      {
        term: "Leverage & pricing",
        detail: "Discussed when you submit a scenario. Not published here.",
      },
      businessPurpose,
    ],
  },
  {
    slug: "bridge",
    name: "Bridge",
    href: "/loan-products/bridge",
    summary:
      "Short-term capital while an investor buys, refinances, or sells an investment property.",
    body: "Bridge is a short hold between a purchase, a refinance, or a sale. Submit a scenario to discuss term length and pricing for your deal.",
    showConstructionBudget: false,
    facts: [
      {
        term: "What it covers",
        detail: "A short hold between a purchase, a refinance, or a sale.",
      },
      noConstructionBudget,
      {
        term: "Term & pricing",
        detail: "Discussed when you submit a scenario. Not published here.",
      },
      businessPurpose,
    ],
  },
  {
    slug: "fix-and-flip",
    name: "Fix & Flip",
    href: "/loan-products/fix-and-flip",
    summary: "Capital for buying and renovating an investment property you plan to sell.",
    body: "Fix & Flip covers acquisition and renovation for a resale. Add your construction budget to the example calculator below, and submit a scenario to discuss draws and pricing.",
    showConstructionBudget: true,
    facts: [
      {
        term: "What it covers",
        detail: "Purchase and renovation of an investment property you intend to resell.",
      },
      interestReserves,
      { term: "Construction budget", detail: "Can be included in your scenario." },
      {
        term: "Draws & pricing",
        detail: "Discussed when you submit a scenario. Not published here.",
      },
      businessPurpose,
    ],
  },
  {
    slug: "ground-up",
    name: "Ground-Up",
    href: "/loan-products/ground-up",
    summary: "Financing for a new investment-property build that starts from the ground up.",
    body: "Ground-Up is for new construction. Add your construction budget to the example calculator below, and submit a scenario to discuss inspections, draws, and pricing.",
    showConstructionBudget: true,
    facts: [
      { term: "What it covers", detail: "A new investment-property build." },
      interestReserves,
      { term: "Construction budget", detail: "Can be included in your scenario." },
      {
        term: "Inspections, draws & pricing",
        detail: "Discussed when you submit a scenario. Not published here.",
      },
      businessPurpose,
    ],
  },
  {
    slug: "mid-construction",
    name: "Mid-Construction",
    href: "/loan-products/mid-construction",
    summary: "Financing for an investment build that is already underway.",
    body: "Mid-Construction is for a project already in progress. Add your remaining construction budget to the example calculator below, and submit a scenario to discuss the rest of the build.",
    showConstructionBudget: true,
    facts: [
      { term: "What it covers", detail: "An investment build that is already underway." },
      interestReserves,
      {
        term: "Construction budget",
        detail: "The remaining budget can be included in your scenario.",
      },
      {
        term: "The rest of the build",
        detail: "Discussed when you submit a scenario. Pricing is not published here.",
      },
      businessPurpose,
    ],
  },
];

export function getProduct(slug: string): Product {
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Unknown product: ${slug}`);
  }
  return product;
}

export const processSteps = [
  {
    title: "Submit a Scenario",
    text: "Send the property, the program, and what you need through the scenario form.",
  },
  {
    title: "Evaluation & Term Sheet",
    text: "We review the scenario and, if it fits, issue a term sheet.",
  },
  {
    title: "Processing & Underwriting",
    text: "We collect documents and underwrite the deal.",
  },
  {
    title: "Closing & Funding",
    text: "Sign closing documents and the loan funds.",
  },
] as const;

export const faqs = [
  {
    id: "what-rsc-does",
    question: "What does RSC Private Lending do?",
    answer:
      "RSC Private Lending is the public name of Red Sun Capital, LLC. The firm provides hard money and private lending for real estate investors.",
  },
  {
    id: "consumer-mortgages",
    question: "Are these consumer mortgages?",
    answer:
      "No. Lending is for business purposes. Loans are for investment real estate and are not for personal, family, or household use.",
  },
  {
    id: "which-programs",
    question: "Which loan programs do you offer?",
    answer:
      "DSCR, Bridge, Fix & Flip, Ground-Up, and Mid-Construction. Each program has its own page under Loan Products.",
  },
  {
    id: "cash-reserves",
    question: "Do I need cash reserves?",
    answer:
      "Not on Fix & Flip, Ground-Up, or Mid-Construction loans. Full interest reserves can be built into the loan, so no borrower liquidity is required.",
  },
  {
    id: "where-we-lend",
    question: "Where do you lend?",
    answer: `We lend in ${lendingStates.length} states: ${lendingStates.slice(0, -1).join(", ")}, and ${lendingStates.at(-1)}.`,
    list: lendingStates,
  },
  {
    id: "how-to-apply",
    question: "How do I start a loan file?",
    answer:
      "Use Submit a Scenario on the contact page. For an existing loan, sign in to the Borrower Portal.",
  },
  {
    id: "office",
    question: "Where is the office?",
    answer:
      "118 Vintage Park Blvd #W317, Houston,\u00a0TX 77070. Phone +1-832-648-4619. Email info@rscprivatelending.com.",
  },
  {
    id: "rates",
    question: "Are rates published here?",
    answer:
      "No. Product pages include an example calculator that uses numbers you type. Those figures are not RSC pricing.",
  },
] as const;

/** Every indexable route this structure ships. Unknown URLs are not listed and must 404. */
export const shippedPaths = [
  "/",
  "/our-story",
  "/loan-products",
  "/loan-products/dscr",
  "/loan-products/bridge",
  "/loan-products/fix-and-flip",
  "/loan-products/ground-up",
  "/loan-products/mid-construction",
  "/funded-loans",
  "/faqs",
  "/contact",
  "/privacy",
  "/terms",
] as const;
