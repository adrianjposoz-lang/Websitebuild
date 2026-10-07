import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Panel } from "@/components/Panel";
import { h2Class } from "@/components/SectionHeading";
import { ScenarioForm } from "@/components/ScenarioForm";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Submit a Scenario | RSC Private Lending",
  description:
    "Submit a Scenario to start a deal, or call or email RSC Private Lending in Houston, TX with questions about investor financing.",
  path: "/contact",
});

const tileClass =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-cta-tint text-cta";

export default function ContactPage() {
  return (
    <main id="main">
      <Hero
        as="header"
        eyebrow="Contact"
        title="Contact"
        lede="Submit a scenario with the form on this page. Call or email for anything else."
      />

      <div className="bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_22rem] lg:px-8 lg:py-20">
          <section id="scenario" className="scroll-mt-28" aria-labelledby="scenario-heading">
            <h2 id="scenario-heading" className={`text-navy ${h2Class}`}>
              Submit a Scenario
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-[1.875rem] text-muted">
              Tell us the property, the program, and what you need.
            </p>
            <Panel label="Scenario" chip="Form" className="mt-8" bodyClassName="">
              <ScenarioForm />
            </Panel>
          </section>

          <Panel
            as="section"
            label="Office"
            chip="Houston, TX"
            className="h-fit"
            aria-labelledby="channels-heading"
          >
            <h2 id="channels-heading" className="scroll-mt-28 text-2xl font-semibold text-navy">
              Reach the office
            </h2>
            <dl className="mt-6 space-y-6 text-base leading-7">
              <div className="relative min-h-10 pl-14">
                <dt className="font-semibold text-navy">
                  <span className={`absolute left-0 top-0 ${tileClass}`}>
                    <Phone aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  Phone
                </dt>
                <dd>
                  <a href={site.phoneHref} className="underline underline-offset-4">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="relative min-h-10 pl-14">
                <dt className="font-semibold text-navy">
                  <span className={`absolute left-0 top-0 ${tileClass}`}>
                    <Mail aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  Email
                </dt>
                <dd className="break-words">
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="relative min-h-10 pl-14">
                <dt className="font-semibold text-navy">
                  <span className={`absolute left-0 top-0 ${tileClass}`}>
                    <MapPin aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  Office
                </dt>
                <dd>
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <p className="mt-8 border-t border-line pt-6 leading-7 text-muted">
              Returning borrower? The{" "}
              <Link href="/portal" className="font-semibold text-navy underline underline-offset-4">
                Borrower Portal
              </Link>{" "}
              is coming soon.
            </p>
          </Panel>
        </div>
      </div>
    </main>
  );
}
