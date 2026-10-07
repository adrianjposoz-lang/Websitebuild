import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { termsOfService } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | RSC Private Lending",
  description: "Terms of use for RSC Private Lending.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocument doc={termsOfService} />;
}
