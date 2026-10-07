import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EditorialHero } from "@/components/EditorialHero";
import { ScenarioDeliveryNotice } from "@/components/ScenarioDeliveryNotice";
import { ScenarioForm } from "@/components/ScenarioForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Submit a Scenario | RSC Private Lending",
  description:
    "Submit a Scenario to start a deal, or call or email RSC Private Lending in Houston, TX with questions about investor financing.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main">
      <EditorialHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contact"
        lede="Submit a scenario with the form on this page. Call or email for anything else."
        action={{ href: "/contact#scenario", label: "Submit a Scenario" }}
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
        <div className="mx-auto grid w-full max-w-[76rem] gap-14 px-[1.125rem] py-16 lg:grid-cols-12 lg:gap-x-14 lg:px-8 lg:py-20">
          <section id="scenario" className="scroll-mt-8 lg:col-span-6" aria-labelledby="scenario-heading">
            <h2 id="scenario-heading" className="text-[2.5rem] leading-[1.05] text-navy lg:text-[3.5rem]">
              Submit a Scenario
            </h2>
            <p className="mt-4 text-lg leading-[1.6] text-ink">
              Tell us the property, the program, and what you need.
            </p>
            <div className="mt-8 border-t border-rule pt-8">
              <ScenarioForm
                notice={
                  <Suspense fallback={null}>
                    <ScenarioDeliveryNotice />
                  </Suspense>
                }
              />
            </div>
          </section>

          <section className="lg:col-span-5 lg:col-start-8" aria-labelledby="channels-heading">
            <h2 id="channels-heading" className="scroll-mt-8 font-serif text-[1.75rem] leading-[1.2] text-navy">
              Reach the office
            </h2>
            <dl className="mt-6 border-t border-rule">
              <div className="border-b border-rule py-5">
                <dt className="font-serif text-base italic text-warm">Phone</dt>
                <dd className="mt-1 font-serif text-[1.75rem] leading-tight lg:text-[2rem]">
                  <a href={site.phoneHref} className="whitespace-nowrap text-navy underline">
                    {site.phoneLocal}
                  </a>
                </dd>
              </div>
              <div className="border-b border-rule py-5">
                <dt className="font-serif text-base italic text-warm">Email</dt>
                <dd className="mt-1 break-words font-serif text-xl lg:text-[1.375rem]">
                  <a href={`mailto:${site.email}`} className="text-navy underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="border-b border-rule py-5">
                <dt className="font-serif text-base italic text-warm">Office</dt>
                <dd className="mt-1 font-serif text-xl leading-[1.4] text-ink lg:text-[1.375rem]">
                  <address className="not-italic">
                    {site.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
            </dl>
            <p className="mt-6 leading-[1.6] text-ink">
              Returning borrower? The{" "}
              <Link href="/portal" className="font-semibold text-navy underline">
                Borrower Portal
              </Link>{" "}
              is coming soon.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
