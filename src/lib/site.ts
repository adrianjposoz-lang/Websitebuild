export const site = {
  name: "RSC Private Lending",
  legalName: "Red Sun Capital, LLC",
  url: "https://rscprivatelending.com",
  description:
    "RSC Private Lending (Red Sun Capital, LLC) provides hard money and private lending for real estate investors.",
  phoneDisplay: "+1-832-648-4619",
  phoneHref: "tel:+18326484619",
  email: "info@rscprivatelending.com",
  addressLines: ["118 Vintage Park Blvd #W317", "Houston, TX 77070"],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/loan-products", label: "Loan Products" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export type Product = {
  slug: string;
  name: string;
  href: string;
  summary: string;
  body: string;
  showConstructionBudget: boolean;
};

export const products: Product[] = [
  {
    slug: "dscr",
    name: "DSCR",
    href: "/loan-products/dscr",
    summary:
      "Rental loans weighed on the property’s debt-service coverage rather than a consumer mortgage application.",
    body: "DSCR is for rented investment property, where the payment is compared with the income the property produces. Leverage, reserves, and pricing are not published on this shell. The illustration on this page does not include a Construction Budget.",
    showConstructionBudget: false,
  },
  {
    slug: "bridge",
    name: "Bridge",
    href: "/loan-products/bridge",
    summary:
      "Short-term capital while an investor buys, refinances, or sells an investment property.",
    body: "Bridge is a short hold between a purchase, a refinance, or a sale. Term length and pricing are not published on this shell. The illustration on this page does not include a Construction Budget.",
    showConstructionBudget: false,
  },
  {
    slug: "fix-and-flip",
    name: "Fix & Flip",
    href: "/loan-products/fix-and-flip",
    summary:
      "Capital for buying and renovating an investment property the sponsor plans to sell.",
    body: "Fix & Flip covers acquisition and renovation for a resale. A Construction Budget can be added to the illustration below. Draw schedules and pricing are not published on this shell.",
    showConstructionBudget: true,
  },
  {
    slug: "ground-up",
    name: "Ground-Up",
    href: "/loan-products/ground-up",
    summary: "Financing for a new investment-property build that starts from the ground up.",
    body: "Ground-Up is for new construction. A Construction Budget can be added to the illustration below. Inspection, draw, and pricing rules are not published on this shell.",
    showConstructionBudget: true,
  },
  {
    slug: "mid-construction",
    name: "Mid-Construction",
    href: "/loan-products/mid-construction",
    summary: "Financing for an investment build that is already underway.",
    body: "Mid-Construction is for a project already in progress. A Construction Budget can be added to the illustration below. Remaining-budget rules and pricing are not published on this shell.",
    showConstructionBudget: true,
  },
  {
    slug: "commercial-dscr",
    name: "Commercial DSCR",
    href: "/loan-products/commercial-dscr",
    summary:
      "A debt-service approach for commercial investment property, not a consumer mortgage.",
    body: "Commercial DSCR applies debt-service coverage to commercial investment property. Leverage and pricing are not published on this shell. The illustration on this page does not include a Construction Budget.",
    showConstructionBudget: false,
  },
];

export function getProduct(slug: string): Product {
  const product = products.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Unknown product: ${slug}`);
  }
  return product;
}

export const deals = [
  {
    title: "Stabilized rentals",
    text: "Occupied or otherwise income-producing investment property considered under DSCR or Commercial DSCR.",
    links: [
      { href: "/loan-products/dscr", label: "DSCR" },
      { href: "/loan-products/commercial-dscr", label: "Commercial DSCR" },
    ],
  },
  {
    title: "Transitional holds",
    text: "A purchase, refinance, or sale that needs short-term capital under Bridge.",
    links: [{ href: "/loan-products/bridge", label: "Bridge" }],
  },
  {
    title: "Renovation for resale",
    text: "An acquisition plus repairs intended for resale, considered under Fix & Flip.",
    links: [{ href: "/loan-products/fix-and-flip", label: "Fix & Flip" }],
  },
  {
    title: "New or in-progress builds",
    text: "A new build under Ground-Up, or a build already started under Mid-Construction.",
    links: [
      { href: "/loan-products/ground-up", label: "Ground-Up" },
      { href: "/loan-products/mid-construction", label: "Mid-Construction" },
    ],
  },
] as const;

export const processSteps = [
  {
    title: "Review the programs",
    text: "Compare DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR.",
  },
  {
    title: "Submit a Scenario",
    text: "Use the scenario form on the contact page. Name the property, the program, and what you need.",
  },
  {
    title: "Share the property there",
    text: "The form is the scenario path on this site. The Borrower Portal is a separate page and is not open yet.",
  },
  {
    title: "Move to closing",
    text: "After review, terms are issued and the loan proceeds to closing. Timing is not quoted on this shell.",
  },
] as const;

export const whyPoints = [
  {
    title: "Built for investors",
    text: "RSC Private Lending is hard money and private lending for real estate investors, offered by Red Sun Capital, LLC.",
  },
  {
    title: "Six named programs",
    text: "The catalog is DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR — the same names on every page.",
  },
  {
    title: "Business purpose only",
    text: "These loans are for investment real estate. They are not for personal, family, or household use.",
  },
  {
    title: "A Houston office",
    text: "The published office is 118 Vintage Park Blvd #W317, Houston, TX 77070. Call or email for a general question.",
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
    question: "Which programs are on this site?",
    answer:
      "DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR. Each program has its own page under Loan Products.",
  },
  {
    id: "how-to-apply",
    question: "How do I start a loan file?",
    answer:
      "Use Submit a Scenario on the contact page. The Borrower Portal is a coming-soon page and is not the form.",
  },
  {
    id: "office",
    question: "Where is the office?",
    answer:
      "118 Vintage Park Blvd #W317, Houston, TX 77070. Phone +1-832-648-4619. Email info@rscprivatelending.com.",
  },
  {
    id: "rates",
    question: "Are rates published here?",
    answer:
      "No. Product pages include an illustration calculator that uses numbers you type. Those figures are not RSC pricing.",
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
  "/loan-products/commercial-dscr",
  "/faqs",
  "/contact",
  "/portal",
  "/privacy",
  "/terms",
] as const;
