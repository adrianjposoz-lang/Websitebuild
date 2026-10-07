import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `${site.name} is ${site.legalName}, a private lender for real estate investors.`,
};

export default function OurStoryPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Our Story</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            {site.name} is the public name of {site.legalName}, a private lender for real
            estate investors.
          </p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <p className="text-lg leading-8">
          This page is a stub. History, people, and proof will be added only when they are
          confirmed. It does not include volume, years in business, or borrower stories.
        </p>
        <p className="mt-6 leading-8">
          The published office is {site.addressLines.join(", ")}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SiteLink href="/contact">Submit a Scenario</SiteLink>
          <SiteLink href="/loan-products" variant="secondary">
            View Loan Programs
          </SiteLink>
        </div>
      </div>
    </main>
  );
}
