import Link from "next/link";
import { products } from "@/lib/site";

export function ProductGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.slug}>
          <Link
            href={product.href}
            className="flex h-full flex-col border border-line bg-paper p-6 hover:border-navy"
          >
            <h3 className="text-2xl font-semibold leading-tight text-navy">{product.name}</h3>
            <p className="mt-3 flex-1 text-base leading-7 text-muted">{product.summary}</p>
            <span className="mt-6 text-sm font-semibold text-cta">Open {product.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
