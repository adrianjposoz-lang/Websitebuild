import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Panel } from "@/components/Panel";
import { h3Class } from "@/components/SectionHeading";
import { SiteLink } from "@/components/SiteLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Borrower Portal",
  description: "The RSC Private Lending borrower portal is coming soon.",
};

export default function PortalPage() {
  return (
    <main id="main">
      <Hero
        as="header"
        texture="dots"
        eyebrow="Coming soon"
        title="Borrower Portal"
        lede="The borrower portal is coming soon. Until it opens, call or email the office about an existing loan."
      />
      <section className="bg-background py-16" aria-label="While the portal is coming soon">
        <ul className="mx-auto grid w-full max-w-6xl gap-6 px-5 md:grid-cols-2 lg:px-8">
          <Panel as="li" label="New deal">
            <h2 className={`text-navy ${h3Class}`}>Have a new deal?</h2>
            <p className="mt-2 leading-7 text-muted">
              Send the property, the program, and what you need.
            </p>
            <div className="mt-6">
              <SiteLink href="/contact">Submit a Scenario</SiteLink>
            </div>
          </Panel>
          <Panel as="li" label="Portal" chip="Coming soon">
            <h2 className={`text-navy ${h3Class}`}>Questions about an existing loan?</h2>
            <p className="mt-2 leading-7 text-muted">Reach the Houston office directly.</p>
            <ul className="mt-6 space-y-2 font-semibold text-navy">
              <li>
                <a href={site.phoneHref} className="underline underline-offset-4">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
              </li>
            </ul>
          </Panel>
        </ul>
      </section>
    </main>
  );
}
