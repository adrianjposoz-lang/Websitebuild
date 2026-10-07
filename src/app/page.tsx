import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { FaqList } from "@/components/FaqList";
import { GlanceRow, PhotoHero } from "@/components/PhotoHero";
import { ProgramIndex } from "@/components/ProgramIndex";
import { SiteLink } from "@/components/SiteLink";
import { Timeline } from "@/components/Timeline";
import { homeHeroPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Lending for Real Estate Investors | RSC Private Lending",
  description:
    "DSCR, bridge, fix & flip, and construction financing for real estate investors. Business-purpose loans from Houston. Submit a scenario to start.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <PhotoHero
        kicker={
          <>
            Private &amp; hard-money lending&nbsp;·{" "}
            <span className="whitespace-nowrap">Houston,&nbsp;TX</span>
          </>
        }
        title="Capital for real estate investors"
        lede="Hard money and private lending for real estate investors."
        quiet={
          <>
            Returning borrower?{" "}
            <a href={site.portalUrl} className="font-semibold text-white underline">
              Borrower Portal
            </a>
          </>
        }
        photo={homeHeroPhoto}
      />
      <GlanceRow />

      <div>
        <ProgramIndex
          id="programs"
          title="Six ways we lend"
          intro={
            <p>
              From stabilized rentals to ground-up construction. Every loan is for business
              purposes on investment real estate.
            </p>
          }
        />
      </div>

      <section aria-labelledby="process" className="border-t border-rule py-24">
        <div data-reveal className="mx-auto grid w-full max-w-[76rem] gap-12 px-[1.125rem] lg:grid-cols-12 lg:gap-x-14 lg:px-8">
          <div className="lg:col-span-4">
            <h2 id="process" className="text-[2.5rem] leading-[1.05] text-navy lg:text-[3.5rem]">
              From scenario to closing
            </h2>
            <p className="mt-5 text-lg leading-[1.6] text-ink">
              Four steps, starting with the scenario form.
            </p>
          </div>
          <div className="lg:col-span-8 lg:pt-4">
            <Timeline />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-teaser" className="border-t border-rule py-20">
        <div data-reveal className="mx-auto grid w-full max-w-[76rem] gap-10 px-[1.125rem] lg:grid-cols-12 lg:gap-x-14 lg:px-8">
          <div className="lg:col-span-4">
            <h2 id="faq-teaser" className="text-[2.5rem] leading-[1.05] text-navy lg:text-[3.5rem]">
              Common questions
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs.slice(0, 3)} />
            <p className="mt-8">
              <SiteLink href="/faqs" variant="text">
                All questions
              </SiteLink>
            </p>
          </div>
        </div>
      </section>

      <ClosingBand />
    </main>
  );
}
