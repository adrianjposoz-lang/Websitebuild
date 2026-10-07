import type { Metadata } from "next";
import loanProductsHero from "@/assets/images/loan-products-hero.jpg";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { h2Class, SectionHeading } from "@/components/SectionHeading";
import { SiteLink } from "@/components/SiteLink";

export const metadata: Metadata = {
  title: "Loan Products",
  description:
    "DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR from RSC Private Lending.",
};

export default function LoanProductsPage() {
  return (
    <main id="main">
      <Hero
        as="header"
        image={loanProductsHero}
        imagePosition="object-[60%_60%]"
        preload
        eyebrow="Loan products"
        title="Loan Products"
        lede="Hard money and private lending for real estate investors. Each program has its own page with a short description and an illustration calculator."
        actions={
          <>
            <SiteLink href="/contact" size="lg">
              Submit a Scenario
            </SiteLink>
            <SiteLink href="/contact#channels-heading" variant="secondary-on-dark" size="lg">
              Contact the office
            </SiteLink>
          </>
        }
      />

      <section className="bg-background py-20 lg:py-28" aria-labelledby="all-programs">
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <SectionHeading
            id="all-programs"
            eyebrow="Programs"
            title="All six programs"
            lede="Rentals, short-term holds, renovations, and construction."
          />
          <div className="mt-12">
            <ProductGrid />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-16 lg:py-20" aria-labelledby="not-sure">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 id="not-sure" className={`text-navy ${h2Class}`}>
              Not sure which program fits?
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-[1.875rem] text-muted">
              Describe the property and the plan. We will point you to the right program.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact" size="lg">
              Submit a Scenario
            </SiteLink>
            <SiteLink href="/contact#channels-heading" variant="secondary" size="lg">
              Contact
            </SiteLink>
          </div>
        </div>
      </section>
    </main>
  );
}
