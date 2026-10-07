import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { privacyPolicy } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice | RSC Private Lending",
  description: "Privacy notice for RSC Private Lending.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}
