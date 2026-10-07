import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { pageMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const product = getProduct("dscr");

export const metadata: Metadata = pageMetadata({
  title: "DSCR Loans for Investors | RSC Private Lending",
  description:
    "Finance investment rentals based on property cash flow, not personal W-2 income. See how RSC DSCR loans work and submit your scenario.",
  path: "/loan-products/dscr",
});

export default function DscrPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
