import type { Metadata } from "next";
import { EditorialHero } from "@/components/EditorialHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice | RSC Private Lending",
  description: "Privacy notice for RSC Private Lending.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main">
      <EditorialHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        title="Privacy"
        action={null}
      />
      <div className="border-t border-rule">
        <div className="mx-auto w-full max-w-[76rem] px-[1.125rem] py-16 lg:px-8 lg:py-20">
          <p className="max-w-[60ch] text-lg leading-[1.6]">
            Our full privacy notice will be posted on this page. For privacy questions in the
            meantime, email{" "}
            <a href={`mailto:${site.email}`} className="break-words font-semibold text-navy underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
