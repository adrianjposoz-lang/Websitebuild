import Link from "next/link";
import type { ReactNode } from "react";
import { products } from "@/lib/site";

/** Text-only program tiles, 3×2 from `lg`. No icons; hover only turns the border navy. */
export function ProgramIndex({ id, title, intro }: { id: string; title: string; intro: ReactNode }) {
  return (
    <section aria-labelledby={id} className="py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] lg:px-8">
        <div data-reveal className="max-w-[44rem]">
          <h2 id={id} className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
            {title}
          </h2>
          <div className="mt-4 text-lg leading-[1.6] text-body">{intro}</div>
        </div>
        <ul data-reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <li key={product.slug}>
              <Link
                href={product.href}
                className="flex h-full flex-col rounded-lg border border-hair bg-white p-6 no-underline transition-colors duration-150 hover:border-navy"
              >
                <h3 className="text-xl leading-[1.625rem]">{product.name}</h3>
                <span className="mt-2 block flex-1 text-base leading-[1.6] text-body">{product.summary}</span>
                <span className="mt-5 block text-[0.9375rem] font-semibold text-navy underline">
                  View program
                  <span aria-hidden="true"> →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
