import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { pageMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const product = getProduct("bridge");

export const metadata: Metadata = pageMetadata({
  title: "Bridge Loans for Investors | RSC Private Lending",
  description:
    "Short-term bridge financing for acquisitions, refinance windows, and timing gaps on investment property. Submit your scenario to RSC.",
  path: "/loan-products/bridge",
});

export default function BridgePage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
