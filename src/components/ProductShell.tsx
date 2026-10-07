import Link from "next/link";
import { LoanCalculator } from "@/components/LoanCalculator";
import { SiteLink } from "@/components/SiteLink";
import { products, type Product } from "@/lib/site";

export function ProductShell({ product }: { product: Product }) {
  const others = products.filter((item) => item.slug !== product.slug);

  return (
    <>
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-100">
            <Link href="/loan-products" className="underline underline-offset-4">
              Loan Products
            </Link>
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">{product.summary}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact">Submit a Scenario</SiteLink>
            <SiteLink href="/loan-products" variant="secondary-on-dark">
              View Loan Programs
            </SiteLink>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <p className="max-w-3xl text-lg leading-8">{product.body}</p>

        <h2 className="mt-12 text-3xl font-semibold text-navy">Illustration calculator</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Type your own figures. RSC pricing is not loaded into this calculator.
        </p>
        <div className="mt-6 max-w-3xl">
          <LoanCalculator showConstructionBudget={product.showConstructionBudget} />
        </div>

        <h2 className="mt-14 text-3xl font-semibold text-navy">Other programs</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="block border border-line bg-paper px-4 py-3 font-semibold text-navy hover:border-navy"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
