import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductIcon } from "@/components/ProductIcon";
import { h3Class } from "@/components/SectionHeading";
import { products } from "@/lib/site";

export function ProductGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug}>
          <Link
            href={product.href}
            className="group flex h-full flex-col rounded-lg border border-line bg-paper p-6 shadow-sm transition hover:border-navy/40 hover:shadow-md motion-safe:hover:-translate-y-0.5 lg:p-8"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors group-hover:bg-cta group-hover:text-white">
              <ProductIcon slug={product.slug} className="size-6" strokeWidth={1.75} />
            </span>
            <h3 className={`mt-5 text-navy ${h3Class}`}>{product.name}</h3>
            <p className="mt-2 flex-1 text-base leading-7 text-muted">{product.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cta">
              Explore {product.name}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition motion-safe:group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
