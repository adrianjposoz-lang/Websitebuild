import { Phone } from "lucide-react";
import Link from "next/link";
import { LoanCalculator } from "@/components/LoanCalculator";
import { ProductIcon } from "@/components/ProductIcon";
import { h2Class } from "@/components/SectionHeading";
import { SiteLink } from "@/components/SiteLink";
import { products, site, type Product } from "@/lib/site";

export function ProductShell({ product }: { product: Product }) {
  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 lg:grid lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              <Link href="/loan-products" className="underline underline-offset-4">
                Loan products
              </Link>
            </p>
            <span className="mt-6 inline-flex size-14 items-center justify-center rounded-lg bg-navy-raised text-gold">
              <ProductIcon slug={product.slug} className="size-7" strokeWidth={1.75} />
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.02em] lg:text-[3.25rem] lg:leading-[1.08]">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-[1.875rem] text-slate-100 lg:text-xl lg:leading-8">
              {product.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SiteLink href="/contact" size="lg">
                Submit a Scenario
              </SiteLink>
              <SiteLink href="/loan-products" variant="secondary-on-dark" size="lg">
                View Loan Programs
              </SiteLink>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="mt-10 hidden aspect-[4/3] items-center justify-center rounded-lg bg-navy-raised text-gold lg:mt-0 lg:flex"
          >
            <ProductIcon slug={product.slug} className="size-24" strokeWidth={1.25} />
          </div>
        </div>
      </header>

      <div className="bg-paper">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_20rem] lg:px-8 lg:py-20">
          <div>
            <p className="max-w-3xl text-lg leading-8">{product.body}</p>
            <h2 className={`mt-12 text-navy ${h2Class}`}>Illustration calculator</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              Type your own figures. Results are an illustration, not RSC pricing or a quote.
            </p>
            <div className="mt-6 max-w-3xl">
              <LoanCalculator showConstructionBudget={product.showConstructionBudget} />
            </div>
          </div>
          <aside
            aria-labelledby="ready-heading"
            className="h-fit rounded-lg bg-navy-raised p-6 text-white lg:sticky lg:top-28"
          >
            <h2 id="ready-heading" className="text-2xl font-semibold">
              Ready to submit?
            </h2>
            <p className="mt-3 leading-7 text-slate-100">
              Send the property and what you need for {product.name}.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <SiteLink href="/contact">Submit a Scenario</SiteLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 font-semibold underline underline-offset-4"
              >
                <Phone aria-hidden="true" className="size-4 text-gold" />
                {site.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-line bg-background py-16 lg:py-20" aria-labelledby="other-programs">
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <h2 id="other-programs" className={`text-navy ${h2Class}`}>
            Other programs
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg border border-line bg-paper px-4 py-3 font-semibold text-navy transition hover:border-navy/40 hover:shadow-sm"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-md bg-cta-tint text-cta">
                    <ProductIcon slug={item.slug} className="size-[18px]" strokeWidth={2} />
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
