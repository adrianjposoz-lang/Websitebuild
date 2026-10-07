import type { Metadata } from "next";
import { EditorialHero } from "@/components/EditorialHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Borrower Portal (Coming Soon) | RSC Private Lending",
    description:
      "The RSC borrower portal is coming soon. Have a new deal? Submit a scenario. Existing loan? Call or email the Houston office.",
    path: "/portal",
  }),
  robots: { index: false, follow: true },
};

export default function PortalPage() {
  return (
    <main id="main">
      <EditorialHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Borrower Portal" }]}
        title="Borrower Portal"
        lede="The borrower portal is coming soon. Until it opens, call or email the office about an existing loan."
        quiet="Have a new deal? Send the property, the program, and what you need."
      />
      <div className="border-t border-rule">
        <div className="mx-auto w-full max-w-[76rem] px-[1.125rem] py-16 lg:px-8 lg:py-20">
          <p className="max-w-[60ch] font-serif text-[1.1875rem] leading-[1.6] text-ink lg:text-[1.3125rem]">
            Questions about an existing loan? Reach the Houston office directly at{" "}
            <a href={site.phoneHref} className="whitespace-nowrap text-navy underline">
              {site.phoneLocal}
            </a>{" "}
            or{" "}
            <a href={`mailto:${site.email}`} className="break-words text-navy underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
