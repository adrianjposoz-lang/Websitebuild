import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { PageHero } from "@/components/PageHero";
import { SiteLink } from "@/components/SiteLink";
import { ourStoryPhoto } from "@/lib/photos";
import { pageMetadata } from "@/lib/seo";
import { officeLine, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Story | RSC Private Lending",
  description:
    "Red Sun Capital, LLC d/b/a RSC Private Lending: business-purpose private lending for real estate investors from Houston, TX.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return (
    <main id="main">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Our story" }]}
        title="Our Story"
        lede={`${site.name} is the public name of ${site.legalName}, a private lender for real estate investors.`}
        quiet={
          <SiteLink href="/loan-products" variant="text">
            View loan programs
          </SiteLink>
        }
        photo={ourStoryPhoto}
      />
      <div className="border-t border-hair">
        <div className="mx-auto grid w-full max-w-[75rem] px-[1.125rem] py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
          <div data-reveal className="max-w-[60ch] lg:col-span-7 lg:col-start-2">
            <p className="text-lg leading-[1.6] text-body lg:text-xl">
              {site.name} provides hard money and private lending for real estate investors,
              across six programs from stabilized rentals to new construction. Loans are for
              business purposes on investment real estate.
            </p>
            <p className="mt-6 text-lg leading-[1.6] text-body lg:text-xl">
              {officeLine}
            </p>
          </div>
        </div>
      </div>
      <ClosingBand />
    </main>
  );
}
