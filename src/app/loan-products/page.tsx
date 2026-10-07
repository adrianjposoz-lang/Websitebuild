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
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
          <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl">Loan Products</h1>
          <p className="mt-6 max-w-xl border-l-4 border-cta pl-4 text-lg font-semibold leading-7 text-white">
            Hard money and private lending for real estate investors.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            Open a program for a short description and a simplified illustration. Each card
            goes to its own page.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact">Submit a Scenario</SiteLink>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-20">
        <ProductGrid />
      </div>
    </main>
  );
}
