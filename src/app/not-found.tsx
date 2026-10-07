import type { Metadata } from "next";
import { EditorialHero } from "@/components/EditorialHero";
import { SiteLink } from "@/components/SiteLink";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not a page on RSC Private Lending.",
};

export default function NotFound() {
  return (
    <main id="main">
      <EditorialHero
        title="This page is not on the site."
        lede="The address does not match a published page. Check the link or return to the catalog."
        quiet={
          <SiteLink href="/" variant="text">
            Home
          </SiteLink>
        }
      />
    </main>
  );
}
