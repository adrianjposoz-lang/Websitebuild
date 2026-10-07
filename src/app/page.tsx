import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { FactsBand } from "@/components/FactsBand";
import { PageHero } from "@/components/PageHero";
import { ProgramIndex } from "@/components/ProgramIndex";
import { SampleScenarios } from "@/components/SampleScenarios";
import { Timeline } from "@/components/Timeline";
import { homeHeroPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Lending for Real Estate Investors | RSC Private Lending",
  description:
    "DSCR, bridge, fix & flip, and construction financing for real estate investors. Business-purpose loans from Houston. Submit a scenario to start.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <PageHero
        title="Capital for real estate investors"
        lede="Hard money and private lending for real estate investors, from Houston, TX."
        quiet={
          <>
            Returning borrower?{" "}
            <a href={site.portalUrl} className="font-semibold text-navy underline">
              Borrower Portal
            </a>
          </>
        }
        photo={homeHeroPhoto}
      />
      <FactsBand />

      <ProgramIndex
        id="programs"
        title="Six ways we lend"
        intro={
          <p>
            From stabilized rentals to ground-up construction. Every loan is for business purposes on
            investment real estate.
          </p>
        }
      />

      <section aria-labelledby="process" className="border-t border-hair py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
          <div data-reveal className="max-w-[44rem]">
            <h2 id="process" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
              From scenario to closing
            </h2>
            <p className="mt-4 text-lg leading-[1.6] text-body">
              Four steps, starting with the scenario form. Term sheets in <span className="tnum">24</span> hours
              and closings in as little as <span className="tnum">10</span> days.
            </p>
          </div>
          <div data-reveal className="mt-10">
            <Timeline />
          </div>
        </div>
      </section>

      <SampleScenarios />

      <ClosingBand />
    </main>
  );
}
