import type { videos } from "../lib/site";

export type Program = "Fix & Flip" | "Ground-Up" | "Mid-Construction" | "Bridge" | "DSCR";

/** Program filter and link order, matching the five program pages under /loan-products. */
export const programs = [
  { label: "Fix & Flip", slug: "fix-and-flip" },
  { label: "Ground-Up", slug: "ground-up" },
  { label: "Mid-Construction", slug: "mid-construction" },
  { label: "Bridge", slug: "bridge" },
  { label: "DSCR", slug: "dscr" },
] as const satisfies readonly { label: Program; slug: string }[];

export type ProgramSlug = (typeof programs)[number]["slug"];

export const stateNames = {
  AK: "Alaska",
  CO: "Colorado",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  NC: "North Carolina",
  TX: "Texas",
} as const;

export type StateCode = keyof typeof stateNames;

export type FundedLoan = {
  /** Also the photo file name stem: `public/deals/<id>.jpg`. */
  id: string;
  city: string;
  state: StateCode;
  /** Replaces "City, ST" as the card title, e.g. a neighborhood. */
  heading?: string;
  program: Program;
  purpose?: string;
  /** Whole dollars. */
  loanAmount: number;
  /** YYYY-MM, from the lender's loan records; never inferred. */
  closed?: `${number}-${number}`;
  /** File name in public/deals/. Without one the card shows a neutral placeholder. */
  photo?: string;
  /** Defaults to "Property in City, ST". */
  photoAlt?: string;
  /** A short visible label on the photo, for a photo that does not show the funded property as built. */
  photoCaption?: string;
  videoId?: keyof typeof videos;
  history?: string;
  copy?: string;
  /** Shown in the Funded deals bands on home and /loan-products. */
  featured: boolean;
  /** Where each displayed fact came from. Never rendered. */
  source: string | Record<string, string>;
};

/**
 * Every funded loan, highest loan amount first. City and state only: never a street, street number
 * or borrower name. Never list a deal in CA, AZ or NV. To add a photo, put the appraisal exterior in
 * public/deals/ and set `photo` to its file name.
 */
export const fundedLoans: readonly FundedLoan[] = [
  // TODO(photos): replace placeholder with appraisal photo makawao-hi.jpg
  {
    id: "makawao-hi",
    city: "Makawao",
    state: "HI",
    program: "Fix & Flip",
    purpose: "Cash-out refinance",
    loanAmount: 4_208_794,
    closed: "2026-04",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; purpose and close date from the lender's loan records, 2026-10-08",
  },
  {
    id: "dallas-tx",
    city: "Dallas",
    state: "TX",
    heading: "Preston Hollow, Dallas, TX",
    program: "Bridge",
    purpose: "Refinance",
    loanAmount: 4_080_000,
    closed: "2026-05",
    photo: "dallas-tx.jpg",
    videoId: "A8AWfpc4oag",
    history: "First funded in 2025 as a $3,847,254 mid-construction loan, then refinanced into this Bridge loan in 2026.",
    copy: "A luxury new construction home, taken from 60% built with a mid-construction takeover loan, then a bridge rate-and-term refinance with interest reserves.",
    featured: true,
    source: {
      heading:
        "video description: “a completed luxury new construction home in Preston Hollow, Dallas”; state (TX) added per Adrian/PM, 2026-10-07",
      amount: "Adrian, 2026-10-08 00:12 CDT: Bridge, Refinance, 2026, $4,080,000",
      closed: "the lender's loan records, 2026-10-08",
      history:
        "Adrian, 2026-10-08: the original 2025 loan was $3,847,254, the same loan as the live site's Dallas card; wording “mid-construction loan” per Adrian/PM, 2026-10-08",
      copy: "video description: “a mid-construction takeover loan and a bridge rate-and-term refinance with interest reserves”; interest reserves confirmed by Adrian, 2026-10-08 00:13 CDT",
    },
  },
  {
    id: "houston-tx-2",
    city: "Houston",
    state: "TX",
    program: "Mid-Construction",
    loanAmount: 4_029_512,
    closed: "2026-02",
    photo: "houston-tx-2.jpg",
    featured: true,
    source: "Adrian, 2026-10-08 00:12 CDT; program label Mid-Construction per Adrian/PM, 2026-10-08",
  },
  // TODO(photos): replace placeholder with appraisal photo dallas-tx-2.jpg
  {
    id: "dallas-tx-2",
    city: "Dallas",
    state: "TX",
    program: "Fix & Flip",
    purpose: "Rate-and-term refinance",
    loanAmount: 3_480_000,
    closed: "2026-05",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; purpose and close date from the lender's loan records, 2026-10-08",
  },
  {
    id: "houston-tx",
    city: "Houston",
    state: "TX",
    program: "Mid-Construction",
    purpose: "Refinance",
    loanAmount: 3_364_987,
    closed: "2025-06",
    photo: "houston-tx.png",
    featured: true,
    source: {
      confirmed: "real funded loan per Adrian, 2026-10-07 23:32 CDT",
      heading: "rscprivatelending.com “Recent Deals” card: “Houston, TX”",
      amount: "same card: “3,364,987.10”; shown in whole dollars, cents dropped, per Adrian/PM 2026-10-08",
      closed: "the lender's loan records, 2026-10-08",
      program: "same card: program “Mid-Construction”, purpose “Refinance”",
    },
  },
  // TODO(photos): replace placeholder with appraisal photo kailua-hi.jpg
  {
    id: "kailua-hi",
    city: "Kailua",
    state: "HI",
    program: "Fix & Flip",
    loanAmount: 3_185_545,
    closed: "2025-11",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; close date from the lender's loan records, 2026-10-08",
  },
  {
    id: "st-petersburg-fl",
    city: "St. Petersburg",
    state: "FL",
    program: "DSCR",
    purpose: "Purchase",
    loanAmount: 2_500_000,
    closed: "2025-07",
    photo: "st-petersburg-fl.png",
    featured: true,
    source: {
      confirmed: "real funded loan per Adrian, 2026-10-07 23:32 CDT",
      heading: "rscprivatelending.com “Recent Deals” card: “Petersburg, FL” (St. Petersburg per Adrian)",
      amount: "same card: “2,500,000.00”; whole dollars per Adrian/PM 2026-10-08",
      closed: "the lender's loan records, 2026-10-08",
      program: "same card: program “DSCR”; purpose “Purchase” per Adrian, 2026-10-08 (the live card says “Rental”)",
    },
  },
  {
    id: "roswell-ga",
    city: "Roswell",
    state: "GA",
    program: "Mid-Construction",
    purpose: "Refinance",
    loanAmount: 2_342_747,
    closed: "2026-04",
    photo: "roswell-ga.jpg",
    copy: "A mid-construction refinance with full interest reserves built into the loan, so no borrower liquidity was required.",
    featured: true,
    source: "Adrian, 2026-10-08 00:14 CDT; copy verbatim from Adrian, 00:15 CDT",
  },
  {
    id: "marietta-ga",
    city: "Marietta",
    state: "GA",
    program: "DSCR",
    purpose: "Rate-and-term refinance",
    loanAmount: 1_785_000,
    closed: "2026-08",
    photo: "marietta-ga.jpg",
    featured: true,
    source: "Adrian, 2026-10-08 00:12 CDT",
  },
  {
    id: "kailua-hi-2",
    city: "Kailua",
    state: "HI",
    program: "Ground-Up",
    purpose: "Rate-and-term refinance",
    loanAmount: 1_775_000,
    closed: "2026-04",
    photo: "kailua-hi-2.jpg",
    photoAlt: "Kailua, HI, the lot before construction",
    photoCaption: "Before construction",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; purpose and close date from the lender's loan records, 2026-10-08; photo from the appraisal report, pending Adrian's call (he may send a finished-home photo)",
  },
  // TODO(photos): replace placeholder with appraisal photo dallas-tx-3.jpg
  {
    id: "dallas-tx-3",
    city: "Dallas",
    state: "TX",
    program: "Fix & Flip",
    loanAmount: 1_537_500,
    closed: "2025-10",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; close date from the lender's loan records, 2026-10-08",
  },
  {
    id: "honolulu-hi",
    city: "Honolulu",
    state: "HI",
    program: "Fix & Flip",
    purpose: "Purchase",
    loanAmount: 1_475_250,
    closed: "2025-03",
    photo: "honolulu-hi.png",
    videoId: "Lt3MwArGP_Q",
    copy: "Came in from a wholesaler with a 14-day closing window and closed in 5 business days at 90% Loan-to-Cost plus 100% rehab.",
    featured: true,
    source: {
      heading: "title: “Honolulu Flip”; description: “a single-family Honolulu deal”; state (HI) added per Adrian/PM, 2026-10-07",
      amount: "rscprivatelending.com “Recent Deals” Honolulu card: “1,475,250”; lead figure per Adrian/PM, 2026-10-08",
      closed: "the lender's loan records, 2026-10-08",
      program: "Fix & Flip, purpose Purchase, per Adrian/PM 2026-10-08 (the live card says “Renovation”)",
      copy: "video description: “came to us from a wholesaler with a 14-day closing window” and “closed in 5 business days at 90% Loan-to-Cost plus 100% rehab”",
    },
  },
  // TODO(photos): replace placeholder with appraisal photo girdwood-ak.jpg
  {
    id: "girdwood-ak",
    city: "Girdwood",
    state: "AK",
    program: "Fix & Flip",
    purpose: "Cash-out refinance",
    loanAmount: 1_000_000,
    closed: "2026-02",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; purpose and close date from the lender's loan records, 2026-10-08",
  },
  // TODO(photos): replace placeholder with appraisal photo denver-co.jpg
  {
    id: "denver-co",
    city: "Denver",
    state: "CO",
    program: "Fix & Flip",
    loanAmount: 647_200,
    closed: "2026-01",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; close date from the lender's loan records, 2026-10-08",
  },
  {
    id: "hollywood-fl",
    city: "Hollywood",
    state: "FL",
    program: "DSCR",
    purpose: "Purchase",
    loanAmount: 540_000,
    closed: "2026-10",
    photo: "hollywood-fl.jpg",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; purpose and close date from the lender's loan records, 2026-10-08; photo from the appraisal report",
  },
  // TODO(photos): replace placeholder with appraisal photo fayetteville-nc.jpg
  {
    id: "fayetteville-nc",
    city: "Fayetteville",
    state: "NC",
    program: "Fix & Flip",
    loanAmount: 459_250,
    closed: "2025-03",
    featured: false,
    source: "Adrian, 2026-10-08 01:38 CDT; close date from the lender's loan records, 2026-10-08",
  },
];

export function byAmount(loans: readonly FundedLoan[]): FundedLoan[] {
  return [...loans].sort((a, b) => b.loanAmount - a.loanAmount);
}

/** The Funded deals bands on home and /loan-products, in data order. */
export const featuredLoans = fundedLoans.filter((loan) => loan.featured);

export function loanHeading(loan: FundedLoan): string {
  return loan.heading ?? `${loan.city}, ${loan.state}`;
}

export function formatAmount(dollars: number): string {
  return `$${dollars.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-02" → "Feb 2026". */
export function formatClosed(closed: string): string {
  const [year, month] = closed.split("-");
  return `${months[Number(month) - 1]} ${year}`;
}

export function programSlug(program: Program): ProgramSlug {
  return programs.find((item) => item.label === program)!.slug;
}

export function programHref(program: Program): string {
  return `/loan-products/${programSlug(program)}`;
}

/** States that have at least one loan, by full name. */
export function statesInData(loans: readonly FundedLoan[] = fundedLoans): StateCode[] {
  return [...new Set(loans.map((loan) => loan.state))].sort((a, b) => stateNames[a].localeCompare(stateNames[b]));
}

export type LoanFilter = { program?: ProgramSlug; state?: StateCode };

/** Lowercase URL values (`fix-and-flip`, `hi`) to a filter; unknown values are ignored. */
export function parseFilter(query: { program?: string; state?: string }): LoanFilter {
  const program = programs.find((item) => item.slug === query.program)?.slug;
  const state = statesInData().find((code) => code.toLowerCase() === query.state?.toLowerCase());
  return { ...(program ? { program } : {}), ...(state ? { state } : {}) };
}

export function filterLoans(loans: readonly FundedLoan[], filter: LoanFilter): FundedLoan[] {
  return byAmount(
    loans.filter(
      (loan) =>
        (!filter.program || programSlug(loan.program) === filter.program) && (!filter.state || loan.state === filter.state),
    ),
  );
}

export function filterHref(filter: LoanFilter): string {
  const query = new URLSearchParams();
  if (filter.program) query.set("program", filter.program);
  if (filter.state) query.set("state", filter.state.toLowerCase());
  const search = query.toString();
  return search ? `/funded-loans?${search}` : "/funded-loans";
}
