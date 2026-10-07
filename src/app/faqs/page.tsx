import type { Metadata } from "next";
import { ClosingBand } from "@/components/ClosingBand";
import { PageHero } from "@/components/PageHero";
import { FaqHashOpener } from "@/components/FaqHashOpener";
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
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
        title="Frequently asked questions"
        lede="Answers about RSC Private Lending, its programs, and how to get in touch."
        quiet={
          <>
            or call the Houston office,{" "}
            <a href={site.phoneHref} className="tnum whitespace-nowrap font-semibold text-navy underline">
              {site.phoneLocal}
            </a>
          </>
        }
      />
      <div className="border-t border-hair">
        <div className="mx-auto w-full max-w-[75rem] px-[1.125rem] py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <FaqList items={faqs} headingLevel="h2" />
            <FaqHashOpener />
          </div>
        </div>
      </div>
      <ClosingBand />
    </main>
  );
}
