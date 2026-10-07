import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { getProduct } from "@/lib/site";

const product = getProduct("ground-up");

export const metadata: Metadata = {
  title: product.name,
  description: product.summary,
};

export default function GroundUpPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
