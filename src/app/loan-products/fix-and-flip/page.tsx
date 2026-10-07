import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { getProduct } from "@/lib/site";

const product = getProduct("fix-and-flip");

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

export default function FixAndFlipPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
