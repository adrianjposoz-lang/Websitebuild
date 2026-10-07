import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { pageMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const product = getProduct("commercial-dscr");

export const metadata: Metadata = pageMetadata({
  title: "Commercial DSCR Loans | RSC Private Lending",
  description:
    "DSCR-style financing for commercial investment property, based on the property's debt-service coverage. Submit your scenario to RSC.",
  path: "/loan-products/commercial-dscr",
});

export default function CommercialDscrPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
