import Link from "next/link";
import type { ReactNode } from "react";
import { withAmp } from "@/components/Amp";
import { PropertySketch, type SketchSlug } from "@/components/PropertySketch";
import { products } from "@/lib/site";

export function ProgramIndex({ id, title, intro }: { id: string; title: string; intro: ReactNode }) {
  return (
    <section aria-labelledby={id} className="py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-[1.125rem] lg:grid-cols-12 lg:gap-x-14 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-10">
            <h2 id={id} className="text-[2.5rem] leading-[1.05] text-navy lg:text-[3.5rem]">
              {title}
            </h2>
            <div className="mt-5 text-lg leading-[1.6] text-ink">{intro}</div>
          </div>
        </div>
        <ul className="border-t border-rule lg:col-span-8">
          {products.map((product) => (
            <li key={product.slug} className="border-b border-rule">
              <Link
                href={product.href}
                className="group grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-5 py-6 no-underline lg:grid-cols-[minmax(0,1fr)_7.5rem] lg:gap-10 lg:py-7"
              >
                <span className="block">
                  <span className="block font-display text-[2rem] leading-[1.1] text-navy underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors duration-150 group-hover:decoration-cta lg:text-[2.5rem]">
                    {withAmp(product.name)}
                  </span>
                  <span className="mt-2 block text-base leading-[1.6] text-ink lg:text-[1.0625rem]">
                    {product.summary}
                  </span>
                </span>
                <PropertySketch slug={product.slug as SketchSlug} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
