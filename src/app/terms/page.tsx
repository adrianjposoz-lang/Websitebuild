import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | RSC Private Lending",
  description: "Terms of use for RSC Private Lending.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main">
      <Hero as="header" title="Terms" />
      <div className="bg-paper">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 lg:py-20">
          <p className="text-lg leading-8">
            Our full terms of use will be posted on this page. For questions in the meantime,
            email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
