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
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export const officeLine = `Office: ${site.address.street}, Houston,\u00a0TX ${site.address.postalCode}.`;

export type Product = {
  slug: string;
  name: string;
  href: string;
  summary: string;
  body: string;
  showConstructionBudget: boolean;
  /** Hero definition list. Every row restates a fact already published on the site. */
  facts: { term: string; detail: string }[];
};

const businessPurpose = { term: "Loan purpose", detail: "Business purpose only." };
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
  {
    slug: "commercial-dscr",
    name: "Commercial DSCR",
    href: "/loan-products/commercial-dscr",
    summary:
      "A debt-service approach for commercial investment property, not a consumer mortgage.",
    body: "Commercial DSCR applies debt-service coverage to commercial investment property. Submit a scenario to discuss leverage and pricing for your property.",
    showConstructionBudget: false,
    facts: [
      {
        term: "What it covers",
        detail: "Commercial investment property, weighed on debt-service coverage.",
      },
      noConstructionBudget,
      {
        term: "Leverage & pricing",
        detail: "Discussed when you submit a scenario. Not published here.",
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
      "DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR. Each program has its own page under Loan Products.",
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
  "/loan-products/commercial-dscr",
  "/faqs",
  "/contact",
  "/privacy",
  "/terms",
] as const;
