import type { Metadata } from "next";
import { ProductShell } from "@/components/ProductShell";
import { pageMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const product = getProduct("ground-up");

export const metadata: Metadata = pageMetadata({
  title: "Ground-Up Construction Loans | RSC Private Lending",
  description:
    "Private construction financing from foundation to completion for investor and developer builds. Submit your scenario to RSC.",
  path: "/loan-products/ground-up",
});

export default function GroundUpPage() {
  return (
    <main id="main">
      <ProductShell product={product} />
    </main>
  );
}
