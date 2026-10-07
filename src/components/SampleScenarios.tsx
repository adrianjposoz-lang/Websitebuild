import Link from "next/link";

/**
 * Illustrative only, never real loans. Figures must match the former live-site examples exactly:
 * no new entries, no rounding, no added rates, terms, or LTVs.
 */
const scenarios = [
  {
    type: "Mid-Construction Refinance",
    location: "Dallas, TX",
    amount: "$3,847,254.00",
    program: { label: "Mid-Construction", href: "/loan-products/mid-construction" },
    purpose: "Refinance",
  },
  {
    type: "Mid-Construction Refinance",
    location: "Houston, TX",
    amount: "$3,364,987.10",
    program: { label: "Mid-Construction", href: "/loan-products/mid-construction" },
    purpose: "Refinance",
  },
  {
    type: "DSCR",
    location: "St. Petersburg, FL",
    amount: "$2,500,000.00",
    program: { label: "DSCR", href: "/loan-products/dscr" },
    purpose: "Rental",
  },
  {
    type: "Fix and Flip",
    location: "Honolulu, HI",
    amount: "$1,475,250",
    program: { label: "Fix and Flip", href: "/loan-products/fix-and-flip" },
    purpose: "Renovation",
  },
] as const;

export function SampleScenarios() {
  return (
    <section aria-labelledby="sample-scenarios" data-sample-scenarios="" className="bg-surface py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
        <div data-reveal className="max-w-[44rem]">
          <h2 id="sample-scenarios" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
            Sample scenarios
          </h2>
          <p id="sample-scenarios-note" className="mt-4 text-lg font-semibold leading-[1.5] text-navy">
            Illustrative examples, not actual funded loans.
          </p>
          <p className="mt-2 text-lg leading-[1.6] text-body">Examples of the kinds of loans we structure.</p>
        </div>
        <ul
          data-reveal
          aria-describedby="sample-scenarios-note"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {scenarios.map((scenario) => (
            <li
              key={`${scenario.location}-${scenario.amount}`}
              className="flex flex-col rounded-lg border border-hair bg-white p-6"
            >
              <h3 className="text-xl leading-[1.625rem]">{scenario.type}</h3>
              <p className="mt-1 text-[0.9375rem] text-muted">{scenario.location}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-hair pt-4 text-[0.9375rem] leading-normal">
                <div className="col-span-2">
                  <dt className="text-sm text-muted">Loan amount</dt>
                  <dd className="tnum mt-0.5 text-[1.375rem] font-medium leading-7 text-navy">{scenario.amount}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Program</dt>
                  <dd className="mt-0.5">
                    <Link href={scenario.program.href} className="font-semibold text-navy underline">
                      {scenario.program.label}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Purpose</dt>
                  <dd className="mt-0.5 text-body">{scenario.purpose}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
