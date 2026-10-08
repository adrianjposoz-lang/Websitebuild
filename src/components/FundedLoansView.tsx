import Link from "next/link";
import { ClosingBand } from "@/components/ClosingBand";
import { DealCardGrid } from "@/components/FundedDeals";
import { PageHero } from "@/components/PageHero";
import {
  filterHref,
  filterLoans,
  fundedLoans,
  programs,
  stateNames,
  statesInData,
  type LoanFilter,
} from "@/data/funded-loans";
import { jsonLdHtml, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const fundedLoansMetadata = pageMetadata({
  title: "Funded Loans by City and State | RSC Private Lending",
  description:
    "Recent fix and flip, construction, bridge and DSCR loans funded by RSC Private Lending, by city and state.",
  path: "/funded-loans",
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name: "Funded loans", item: `${site.url}/funded-loans` },
  ],
};

export function FundedLoansView({ filter }: { filter: LoanFilter }) {
  const loans = filterLoans(fundedLoans, filter);
  const filtered = Boolean(filter.program || filter.state);

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(breadcrumbJsonLd) }} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Funded loans" }]}
        title="Funded loans"
        lede="Recent loans we've closed."
        quiet={
          <>
            or call the Houston office,{" "}
            <a href={site.phoneHref} className="tnum whitespace-nowrap font-semibold text-navy underline">
              {site.phoneLocal}
            </a>
          </>
        }
      />

      <section aria-labelledby="loan-list" className="border-t border-hair bg-surface py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
          <h2 id="loan-list" className="sr-only">
            Loans
          </h2>
          <div className="grid gap-5">
            <ChipGroup
              id="filter-program"
              label="Program"
              chips={[
                { label: "All", href: filterHref({ state: filter.state }), active: !filter.program },
                ...programs.map((program) => ({
                  label: program.label,
                  href: filterHref({ program: program.slug, state: filter.state }),
                  active: filter.program === program.slug,
                })),
              ]}
            />
            <ChipGroup
              id="filter-state"
              label="State"
              chips={[
                { label: "All", href: filterHref({ program: filter.program }), active: !filter.state },
                ...statesInData().map((code) => ({
                  label: stateNames[code],
                  href: filterHref({ program: filter.program, state: code }),
                  active: filter.state === code,
                })),
              ]}
            />
          </div>

          <p role="status" className="mt-8 text-[0.9375rem] text-muted">
            Showing {loans.length} {loans.length === 1 ? "loan" : "loans"}
          </p>

          <div className="mt-6">
            {loans.length > 0 ? (
              <DealCardGrid loans={loans} headingLevel="h3" reveal={false} />
            ) : (
              <div className="rounded-lg border border-hair bg-white p-6">
                <p className="text-lg text-navy">No funded loans match these filters.</p>
                <p className="mt-3">
                  <Link href="/funded-loans" scroll={false} className="font-semibold text-navy underline decoration-1 hover:decoration-2">
                    Show all funded loans
                  </Link>
                </p>
              </div>
            )}
          </div>

          {filtered && loans.length > 0 ? (
            <p className="mt-4">
              <Link href="/funded-loans" scroll={false} className="font-semibold text-navy underline decoration-1 hover:decoration-2">
                Clear filters
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <ClosingBand />
    </main>
  );
}

function ChipGroup({
  id,
  label,
  chips,
}: {
  id: string;
  label: string;
  chips: { label: string; href: string; active: boolean }[];
}) {
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
      <p id={id} className="text-sm font-semibold text-navy md:w-20 md:shrink-0 md:pt-2.5">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.label}>
            <Link
              href={chip.href}
              scroll={false}
              aria-current={chip.active ? "true" : undefined}
              className={`inline-flex min-h-11 items-center rounded-lg border px-4 text-[0.9375rem] font-medium no-underline transition-colors duration-150 ${
                chip.active
                  ? "border-navy bg-navy text-white"
                  : "border-field bg-white text-navy hover:border-navy hover:underline"
              }`}
            >
              <span className="whitespace-nowrap">{chip.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
