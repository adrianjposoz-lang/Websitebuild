import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteLink";

export const metadata: Metadata = {
  title: "Borrower Portal",
  description: "The RSC Private Lending borrower portal is coming soon.",
};

export default function PortalPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-100">
            Coming soon
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Borrower Portal
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            The borrower portal is not open on this site yet. A public address will be
            added when it is ready. This page is the notice until then.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact">Submit a Scenario</SiteLink>
            <SiteLink href="/loan-products" variant="secondary-on-dark">
              View Loan Programs
            </SiteLink>
          </div>
        </div>
      </header>
    </main>
  );
}
