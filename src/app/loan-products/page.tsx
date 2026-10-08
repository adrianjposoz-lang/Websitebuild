import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { FundedDeals } from "@/components/FundedDeals";
import { PageHero } from "@/components/PageHero";
import { ProgramIndex } from "@/components/ProgramIndex";
import { SampleScenarios } from "@/components/SampleScenarios";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Investor Loan Programs: DSCR, Bridge, Fix & Flip | RSC",
  description:
    "Compare RSC programs: DSCR, bridge, fix & flip, ground-up, mid-construction, and commercial DSCR. Find the fit, then submit your scenario.",
  path: "/loan-products",
});

export default function LoanProductsPage() {
  return (
    <main id="main">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Loan products" }]}
        title="Loan Products"
        lede="Hard money and private lending for real estate investors. Each program has its own page with a short description and an example calculator."
        quiet={
          <>
            or call the Houston office,{" "}
            <a href={site.phoneHref} className="tnum whitespace-nowrap font-semibold text-navy underline">
              {site.phoneLocal}
            </a>
          </>
        }
      />

      <div className="border-t border-hair">
        <ProgramIndex
          id="all-programs"
          title="All six programs"
          intro={
            <p>
              Rentals, short-term holds, renovations, and construction. Not sure which program
              fits? Describe the property and the plan, and we will point you to the right one.
            </p>
          }
        />
      </div>

      <FundedDeals placement="loan-products-deals" />
      <SampleScenarios />

      <ClosingBand />
    </main>
  );
}
