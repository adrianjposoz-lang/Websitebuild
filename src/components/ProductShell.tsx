import Link from "next/link";
import { withAmp } from "@/components/Amp";
import { ClosingBand } from "@/components/ClosingBand";
import { EditorialHero } from "@/components/EditorialHero";
import { LoanCalculator } from "@/components/LoanCalculator";
import type { SketchSlug } from "@/components/PropertySketch";
import { products, site, type Product } from "@/lib/site";

export function ProductShell({ product }: { product: Product }) {
  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <EditorialHero
        crumbs={[{ label: "Loan products", href: "/loan-products" }, { label: product.name }]}
        title={withAmp(product.name)}
        lede={product.summary}
        quiet={
          <>
            or call the Houston office,{" "}
            <a href={site.phoneHref} className="whitespace-nowrap font-semibold text-navy underline">
              {site.phoneLocal}
            </a>
          </>
        }
        facts={product.facts}
        sketch={product.slug as SketchSlug}
      />

      <section aria-labelledby="calculator" className="border-t border-rule py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-[1.125rem] lg:grid-cols-12 lg:gap-x-14 lg:px-8">
          <div className="lg:col-span-4">
            <h2 id="calculator" className="text-[2.5rem] leading-[1.05] text-navy lg:text-[3.5rem]">
              Example calculator
            </h2>
            <p className="mt-5 text-lg leading-[1.6] text-ink">
              Type your own figures. Results are an example, not RSC pricing or a quote.
            </p>
          </div>
          <div className="max-w-3xl lg:col-span-8">
            <p className="text-lg leading-[1.6] text-ink">{product.body}</p>
            <div className="mt-10">
              <LoanCalculator showConstructionBudget={product.showConstructionBudget} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="other-programs" className="border-t border-rule py-12">
        <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-3 px-[1.125rem] lg:flex-row lg:items-baseline lg:gap-6 lg:px-8">
          <h2 id="other-programs" className="font-serif text-[1.375rem] italic text-warm">
            Other programs
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[1.0625rem]">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className="font-medium text-navy underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
