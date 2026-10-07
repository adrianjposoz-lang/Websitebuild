import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteLink } from "@/components/SiteLink";

export const metadata: Metadata = {
  title: "Loan Products",
  description:
    "DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR from RSC Private Lending.",
};

export default function LoanProductsPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Loan Products</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            Hard money and private lending programs for real estate investors. Open a
            program for a short description and an illustration calculator.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact">Submit a Scenario</SiteLink>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <ProductGrid />
      </div>
    </main>
  );
}
