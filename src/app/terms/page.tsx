import type { Metadata } from "next";
import { EditorialHero } from "@/components/EditorialHero";
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
      <EditorialHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
        title="Terms"
        action={null}
      />
      <div className="border-t border-rule">
        <div className="mx-auto w-full max-w-[76rem] px-[1.125rem] py-16 lg:px-8 lg:py-20">
          <p className="max-w-[60ch] text-lg leading-[1.6]">
            Our full terms of use will be posted on this page. For questions in the meantime,
            email{" "}
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
