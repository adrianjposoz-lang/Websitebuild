import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { pageMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const product = getProduct("mid-construction");

export const metadata: Metadata = pageMetadata({
  title: "Mid-Construction Loans & Refinance | RSC Private Lending",
  description:
    "Take over a stalled build or refinance an existing construction loan with mid-construction financing. Submit your scenario to RSC.",
  path: "/loan-products/mid-construction",
});

export default function MidConstructionPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
