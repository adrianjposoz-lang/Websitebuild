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
    location: "Petersburg, FL",
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
    <section
      aria-labelledby="sample-scenarios"
      data-sample-scenarios=""
      className="border-t border-rule py-20 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-[1.125rem] lg:grid-cols-12 lg:gap-x-14 lg:px-8">
        <div className="lg:col-span-4">
          <h2 id="sample-scenarios" className="text-[2.5rem] leading-[1.05] text-navy lg:text-[3.5rem]">
            Sample scenarios
          </h2>
          <p
            id="sample-scenarios-note"
            className="mt-5 border-l-2 border-navy pl-4 text-lg font-semibold leading-[1.5] text-ink"
          >
            Illustrative examples, not actual funded loans.
          </p>
          <p className="mt-4 text-lg leading-[1.6] text-ink">
            Examples of the kinds of loans we structure.
          </p>
        </div>
        <ul aria-describedby="sample-scenarios-note" className="border-t border-rule lg:col-span-8">
          {scenarios.map((scenario) => (
            <li
              key={`${scenario.location}-${scenario.amount}`}
              className="grid gap-4 border-b border-rule py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:py-7"
            >
              <div>
                <h3 className="text-2xl leading-[1.2] text-navy lg:text-[1.75rem]">{scenario.type}</h3>
                <p className="mt-1 font-serif text-base italic text-warm">{scenario.location}</p>
              </div>
              <dl className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-base leading-normal">
                <dt className="font-serif italic text-warm">Loan amount</dt>
                <dd className="font-display text-xl tabular-nums text-navy">{scenario.amount}</dd>
                <dt className="font-serif italic text-warm">Program</dt>
                <dd>
                  <Link
                    href={scenario.program.href}
                    className="font-semibold text-navy underline transition-colors duration-150 hover:decoration-cta"
                  >
                    {scenario.program.label}
                  </Link>
                </dd>
                <dt className="font-serif italic text-warm">Purpose</dt>
                <dd className="text-ink">{scenario.purpose}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
