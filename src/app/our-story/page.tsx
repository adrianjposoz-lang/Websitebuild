import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { EditorialHero } from "@/components/EditorialHero";
import { SiteLink } from "@/components/SiteLink";
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
      <EditorialHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Our story" }]}
        title="Our Story"
        lede={`${site.name} is the public name of ${site.legalName}, a private lender for real estate investors.`}
        quiet={
          <SiteLink href="/loan-products" variant="text">
            View loan programs
          </SiteLink>
        }
      />
      <div className="border-t border-rule">
        <div className="mx-auto grid w-full max-w-[76rem] px-[1.125rem] py-16 lg:grid-cols-12 lg:px-8 lg:py-24">
          <div className="max-w-[60ch] lg:col-span-7 lg:col-start-2">
            <p className="font-serif text-[1.1875rem] leading-[1.6] text-ink lg:text-[1.3125rem]">
              {site.name} provides hard money and private lending for real estate investors,
              across six programs from stabilized rentals to new construction. Loans are for
              business purposes on investment real estate.
            </p>
            <p className="mt-6 font-serif text-[1.1875rem] leading-[1.6] text-ink lg:text-[1.3125rem]">
              {officeLine}
            </p>
          </div>
        </div>
      </div>
      <ClosingBand />
    </main>
  );
}
