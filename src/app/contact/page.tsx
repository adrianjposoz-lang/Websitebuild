import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ScenarioDeliveryNotice } from "@/components/ScenarioDeliveryNotice";
import { ScenarioForm } from "@/components/ScenarioForm";
import { VideoFacade } from "@/components/VideoFacade";
import { pageMetadata } from "@/lib/seo";
import { site, videosFor } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Submit a Scenario | RSC Private Lending",
  description:
    "Submit a Scenario to start a deal, or call or email RSC Private Lending in Houston, TX with questions about investor financing.",
  path: "/contact",
});

export default function ContactPage() {
  const [video] = videosFor("contact");
  return (
    <main id="main">
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Contact"
        lede="Submit a scenario with the form on this page. Call or email for anything else."
        action={{ href: "/contact#scenario", label: "Submit a Scenario" }}
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
        <div className="mx-auto grid w-full max-w-[75rem] gap-14 px-[1.125rem] py-16 lg:grid-cols-12 lg:gap-x-12 lg:px-8 lg:py-20">
          <section id="scenario" className="scroll-mt-8 lg:col-span-6" aria-labelledby="scenario-heading">
            <h2 id="scenario-heading" className="text-[1.75rem] leading-[2.25rem] lg:text-4xl lg:leading-10">
              Submit a Scenario
            </h2>
            <p className="mt-4 text-lg leading-[1.6] text-body">
              Tell us the property, the program, and what you need.
            </p>
            <div className="mt-8 border-t border-hair pt-8">
              <ScenarioForm
                notice={
                  <Suspense fallback={null}>
                    <ScenarioDeliveryNotice />
                  </Suspense>
                }
              />
            </div>
          </section>

          <div className="flex flex-col gap-14 lg:col-span-5 lg:col-start-8">
            {video ? (
              <section aria-labelledby="contact-video">
                <h2 id="contact-video" className="text-2xl leading-8">
                  Before you apply
                </h2>
                <p className="mt-2 text-base leading-[1.6] text-body">{video.title}</p>
                <div className="mt-5">
                  <VideoFacade video={video} sizes="(min-width: 1024px) 460px, 100vw" />
                </div>
              </section>
            ) : null}
            <section aria-labelledby="channels-heading">
              <h2 id="channels-heading" className="scroll-mt-8 text-2xl leading-8">
                Reach the office
              </h2>
              <dl className="mt-6 border-t border-hair">
                <div className="border-b border-hair py-5">
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd className="tnum mt-1 text-[1.75rem] font-medium leading-9">
                    <a href={site.phoneHref} className="whitespace-nowrap text-navy underline">
                      {site.phoneLocal}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-hair py-5">
                  <dt className="text-sm text-muted">Email</dt>
                  <dd className="mt-1 break-words text-xl font-medium">
                    <a href={`mailto:${site.email}`} className="text-navy underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-hair py-5">
                  <dt className="text-sm text-muted">Office</dt>
                  <dd className="mt-1 text-lg leading-[1.5] text-ink">
                    <address className="tnum not-italic">
                      {site.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 leading-[1.6] text-body">
                Returning borrower? Sign in to the{" "}
                <a href={site.portalUrl} className="font-semibold text-navy underline">
                  Borrower Portal
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
