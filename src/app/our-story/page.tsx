import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `${site.name} is ${site.legalName}, a private lender for real estate investors.`,
};

export default function OurStoryPage() {
  return (
    <main id="main">
      <Hero
        as="header"
        eyebrow="About RSC"
        title="Our Story"
        lede={`${site.name} is the public name of ${site.legalName}, a private lender for real estate investors.`}
      />
      <div className="bg-paper">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 lg:py-20">
          <p className="text-lg leading-8">
            {site.name} provides hard money and private lending for real estate investors,
            across six programs from stabilized rentals to new construction. Loans are for
            business purposes on investment real estate.
          </p>
          <p className="mt-6 leading-8">Our office is at {site.addressLines.join(", ")}.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact">Submit a Scenario</SiteLink>
            <SiteLink href="/loan-products" variant="secondary">
              View Loan Programs
            </SiteLink>
          </div>
        </div>
      </div>
    </main>
  );
}
