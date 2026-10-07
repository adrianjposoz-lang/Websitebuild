import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PanelHeader, panelClass } from "@/components/Panel";
import { ProductIcon } from "@/components/ProductIcon";
import { railItemClass, ScrollRail } from "@/components/ScrollRail";
import { h3Class } from "@/components/SectionHeading";
import { products } from "@/lib/site";

const gridClass = "sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3";

/** `rail` turns the stack into a swipeable row on phones; from `sm` up both modes are identical. */
export function ProductGrid({ rail = false }: { rail?: boolean }) {
  const items = products.map((product, index) => (
    <li
      key={product.slug}
      className={rail ? railItemClass : undefined}
      data-reveal="rise"
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as CSSProperties}
    >
      <Link
        href={product.href}
        className={`card-lift group relative h-full hover:border-navy/40 focus-visible:border-navy/40 ${panelClass("light")}`}
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-cta transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <PanelHeader
          skin="light"
          label="Program"
          chip={product.showConstructionBudget ? "Construction budget" : "Business purpose"}
        />
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <span className="inline-flex size-12 items-center justify-center rounded-lg bg-navy text-gold transition-colors duration-200 group-hover:bg-cta group-hover:text-white group-focus-visible:bg-cta group-focus-visible:text-white">
            <ProductIcon slug={product.slug} className="size-6" strokeWidth={1.75} />
          </span>
          <h3 className={`mt-5 text-navy ${h3Class}`}>{product.name}</h3>
          <p className="mt-2 flex-1 text-base leading-7 text-muted">{product.summary}</p>
          <span className="label-mono mt-6 inline-flex items-center gap-1.5 text-cta">
            Explore {product.name}
            <ArrowRight aria-hidden="true" className="arrow-nudge size-4" />
          </span>
        </div>
      </Link>
    </li>
  ));

  return rail ? (
    <ScrollRail label="Loan programs" className={gridClass}>
      {items}
    </ScrollRail>
  ) : (
    <ul className={`grid gap-6 ${gridClass}`}>{items}</ul>
  );
}
