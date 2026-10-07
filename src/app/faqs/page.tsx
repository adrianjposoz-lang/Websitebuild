import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { EditorialHero } from "@/components/EditorialHero";
import { FaqList } from "@/components/FaqList";
import { faqPageJsonLd, jsonLdHtml, pageMetadata } from "@/lib/seo";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Lending FAQs | RSC Private Lending",
  description:
    "Answers about RSC Private Lending: business-purpose loans, our six programs, how to start a loan file, and how to reach the Houston office.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqPageJsonLd) }}
      />
      <EditorialHero
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
        title="Frequently asked questions"
        lede="Answers about RSC Private Lending, its programs, and how to get in touch."
        quiet={
          <>
            or call the Houston office,{" "}
            <a href={site.phoneHref} className="whitespace-nowrap font-semibold text-navy underline">
              {site.phoneLocal}
            </a>
          </>
        }
      />
      <div className="border-t border-rule">
        <div className="mx-auto w-full max-w-[76rem] px-[1.125rem] py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <FaqList items={faqs} headingLevel="h2" />
          </div>
        </div>
      </div>
      <ClosingBand />
    </main>
  );
}
