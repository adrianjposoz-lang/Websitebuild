import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not a page on RSC Private Lending.",
};

export default function NotFound() {
  return (
    <main id="main">
      <div className="mx-auto w-full max-w-3xl px-5 py-20">
        <p className="label-mono text-cta">404</p>
        <h1 className="mt-3 text-4xl font-semibold text-navy">This page is not on the site.</h1>
        <p className="mt-5 text-lg leading-8">
          The address does not match a published page. Check the link or return to the
          catalog.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <SiteLink href="/contact">Submit a Scenario</SiteLink>
          <SiteLink href="/" variant="secondary">
            Home
          </SiteLink>
        </div>
      </div>
    </main>
  );
}
