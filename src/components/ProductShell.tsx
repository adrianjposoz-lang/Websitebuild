import { Phone } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PreviewField, previewShellClass } from "@/components/HeroPreview";
import { LoanCalculator } from "@/components/LoanCalculator";
import { Panel, PanelHeader } from "@/components/Panel";
import { ProductIcon } from "@/components/ProductIcon";
import { h2Class } from "@/components/SectionHeading";
import { SiteLink } from "@/components/SiteLink";
import { products, site, type Product } from "@/lib/site";

function programChip(product: Product) {
  return product.showConstructionBudget ? "Construction budget" : "Business purpose";
}

/** Decorative, like the home hero preview: it mirrors the calculator fields further down the page. */
function ProgramPreview({ product }: { product: Product }) {
  return (
    <div aria-hidden="true" className={previewShellClass}>
      <PanelHeader skin="dark" label="Example calculator" chip={programChip(product)} />
      <div className="space-y-5 px-5 py-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-lg border border-white/15 bg-navy text-gold">
            <ProductIcon slug={product.slug} className="size-5" strokeWidth={1.75} />
          </span>
          <p className="text-lg font-semibold text-white">{product.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <PreviewField label="Loan amount" width="w-3/5" />
          <PreviewField label="Interest rate" width="w-1/3" />
        </div>
        {product.showConstructionBudget ? (
          <PreviewField label="Construction budget" width="w-1/2" />
        ) : null}
      </div>
      <p className="border-t border-white/10 px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-slate-400">
        Example only, not a quote
      </p>
    </div>
  );
}

export function ProductShell({ product }: { product: Product }) {
  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <Hero
        as="header"
        eyebrow={
          <Link href="/loan-products" className="underline underline-offset-4">
            Loan products
          </Link>
        }
        title={product.name}
        lede={product.summary}
        actions={
          <>
            <SiteLink href="/contact" size="lg">
              Submit a Scenario
            </SiteLink>
            <SiteLink href="/loan-products" variant="secondary-on-dark" size="lg">
              View Loan Programs
            </SiteLink>
          </>
        }
        preview={<ProgramPreview product={product} />}
      />

      <div className="bg-paper">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_20rem] lg:px-8 lg:py-20">
          <div>
            <p className="max-w-3xl text-lg leading-8">{product.body}</p>
            <h2 className={`mt-12 text-navy ${h2Class}`}>Example calculator</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              Type your own figures. Results are a rough example, not RSC pricing or a quote.
            </p>
            <div className="mt-6 max-w-3xl">
              <LoanCalculator showConstructionBudget={product.showConstructionBudget} />
            </div>
          </div>
          <Panel
            as="aside"
            skin="dark"
            label="Next step"
            chip={programChip(product)}
            aria-labelledby="ready-heading"
            className="h-fit text-white lg:sticky lg:top-28"
            bodyClassName="p-6"
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
          </Panel>
        </div>
      </div>

      <section className="border-t border-line bg-background py-16 lg:py-20" aria-labelledby="other-programs">
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <h2 id="other-programs" className={`text-navy ${h2Class}`}>
            Other programs
          </h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {others.map((item) => (
              <li
                key={item.slug}
                className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-1.5rem)/3)]"
              >
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
