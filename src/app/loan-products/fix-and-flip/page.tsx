import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { pageMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const product = getProduct("fix-and-flip");

export const metadata: Metadata = pageMetadata({
  title: "Fix & Flip Loans for Investors | RSC Private Lending",
  description:
    "Purchase and rehab financing with draw schedules for investors renovating to resell. See how RSC funds flips, then submit your scenario.",
  path: "/loan-products/fix-and-flip",
});

export default function FixAndFlipPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
