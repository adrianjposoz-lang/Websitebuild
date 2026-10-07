import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import dealBuilds from "@/assets/images/deal-builds.jpg";
import dealRenovation from "@/assets/images/deal-renovation.jpg";
import dealStabilized from "@/assets/images/deal-stabilized.jpg";
import dealTransitional from "@/assets/images/deal-transitional.jpg";
import homeHero from "@/assets/images/home-hero.jpg";
import { FundingSteps } from "@/components/FundingSteps";
import { Hero } from "@/components/Hero";
import { HeroPreview } from "@/components/HeroPreview";
import { Panel } from "@/components/Panel";
import { ProductGrid } from "@/components/ProductGrid";
import { railItemClass, ScrollRail } from "@/components/ScrollRail";
import { h2Class, h3Class, SectionHeading } from "@/components/SectionHeading";
import { SiteLink } from "@/components/SiteLink";
import { TrustBar } from "@/components/TrustBar";
import { pageMetadata } from "@/lib/seo";
import { deals, faqs, whyPoints } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Private Lending for Real Estate Investors | RSC Private Lending",
  description:
    "DSCR, bridge, fix & flip, and construction financing for real estate investors. Business-purpose loans from Houston. Submit a scenario to start.",
  path: "/",
});

const dealImages = {
  "Stabilized rentals": { src: dealStabilized, alt: "Two-story single-family home with a two-car garage" },
  "Transitional holds": { src: dealTransitional, alt: "Row of attached townhomes with garages" },
  "Renovation for resale": { src: dealRenovation, alt: "Kitchen mid-renovation with cabinets under plastic" },
  "New or in-progress builds": { src: dealBuilds, alt: "House under construction with open wood framing" },
} as const;

export default function HomePage() {
  return (
    <main id="main">
      <Hero
        variant="home"
        image={homeHero}
        imagePosition="object-[62%_50%]"
        preload
        eyebrow={
          <>
            Private & hard-money lending&nbsp;·{" "}
            <span className="whitespace-nowrap">Houston, TX</span>
          </>
        }
        title="Capital for real estate investors"
        lede="Hard money and private lending for real estate investors."
        actions={
          <>
            <SiteLink href="/contact" size="lg">
              Submit a Scenario
            </SiteLink>
            <SiteLink href="/loan-products" variant="secondary-on-dark" size="lg">
              View Loan Programs
            </SiteLink>
          </>
        }
        footnote={
          <p>
            Returning borrower?{" "}
            <Link href="/portal" className="font-semibold text-white underline underline-offset-4">
              Borrower Portal
            </Link>
          </p>
        }
        preview={<HeroPreview />}
      />

      <TrustBar />

      <section className="bg-background py-20 lg:py-28" aria-labelledby="programs">
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <SectionHeading
            id="programs"
            eyebrow="Loan programs"
            title="Six programs for investor real estate"
            lede="From stabilized rentals to ground-up construction. Pick a program to see how it works."
          />
          <div className="mt-12">
            <ProductGrid rail />
          </div>
        </div>
      </section>

      <section className="relative isolate bg-paper py-20 lg:py-28" aria-labelledby="process">
        <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <SectionHeading id="process" eyebrow="How funding works" title="From scenario to closing" />
          <FundingSteps />
        </div>
      </section>

      <section className="border-y border-line bg-sand py-20 lg:py-28" aria-labelledby="deals">
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <SectionHeading
            id="deals"
            eyebrow="Deal types"
            title="The deals we finance"
            lede="RSC lends on investor real estate. These are the transaction types the programs cover."
          />
          <ScrollRail label="Deal types" className="mt-12 sm:grid sm:gap-6 md:grid-cols-2">
            {deals.map((deal, index) => {
              const image = dealImages[deal.title];
              return (
                <li
                  key={deal.title}
                  className={railItemClass}
                  data-reveal="rise"
                  style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as CSSProperties}
                >
                  <div className="card-lift group h-full overflow-hidden rounded-lg border border-line bg-paper shadow-sm hover:border-navy/40 focus-within:border-navy/40">
                    <div className="overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        placeholder="blur"
                        sizes="(min-width: 1024px) 544px, (min-width: 768px) 50vw, (min-width: 640px) 100vw, 85vw"
                        className="media-zoom aspect-[3/2] w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className={`text-navy ${h3Class}`}>{deal.title}</h3>
                      <p className="mt-2 text-base leading-7 text-muted">{deal.text}</p>
                      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {deal.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="font-semibold text-cta underline underline-offset-4"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ScrollRail>
        </div>
      </section>

      <section
        className="relative isolate bg-navy bg-linear-to-br from-navy-raised via-navy to-navy-deep py-20 text-white lg:py-28"
        aria-labelledby="why"
      >
        <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <SectionHeading id="why" eyebrow="Why RSC" title="A lender built for investors" tone="dark" />
          <ScrollRail
            label="Why RSC"
            tone="dark"
            className="mt-12 sm:grid sm:gap-6 md:grid-cols-2"
          >
            {whyPoints.map((point, index) => (
              <li
                key={point.title}
                className={railItemClass}
                data-reveal="rise"
                style={{ "--reveal-delay": `${(index % 2) * 120}ms` } as CSSProperties}
              >
                <Panel
                  skin="dark"
                  label={point.label}
                  chip={point.chip}
                  className="h-full transition-colors duration-300 hover:border-gold/40"
                >
                  <h3 className={`text-white ${h3Class}`}>{point.title}</h3>
                  <p className="mt-3 leading-7 text-slate-100">{point.text}</p>
                </Panel>
              </li>
            ))}
          </ScrollRail>
        </div>
      </section>

      <section
        className="relative isolate bg-paper pb-20 pt-20 lg:pb-28 lg:pt-28"
        aria-labelledby="faq-teaser"
      >
        <div aria-hidden="true" className="bg-grid-light absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
          <SectionHeading id="faq-teaser" eyebrow="Questions" title="Common questions" />
          <ul data-reveal="rise" className="mt-12 divide-y divide-line border-y border-line">
            {faqs.slice(0, 3).map((faq) => (
              <li key={faq.id}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-xl font-semibold text-navy">{faq.question}</h3>
                    <ChevronRight
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-cta transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <p className="pb-5 leading-7 text-muted">{faq.answer}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <SiteLink href="/faqs" variant="secondary">
              Read FAQs
            </SiteLink>
          </div>

          <section
            data-reveal="rise"
            className="relative isolate mt-20 overflow-hidden rounded-2xl border-t-4 border-cta bg-navy bg-linear-to-br from-navy-raised via-navy to-navy-deep px-8 py-12 text-white lg:mt-28 lg:px-14 lg:py-14"
            aria-labelledby="final-cta"
          >
            <div aria-hidden="true" className="bg-grid-dark absolute inset-0 -z-10" />
            <p className="label-mono text-gold">
              Ready when you are
            </p>
            <h2 id="final-cta" className={`mt-3 text-white ${h2Class}`}>
              Submit a Scenario
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-[1.875rem] text-slate-100">
              Send the property, the program, and what you need through the scenario form.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SiteLink href="/contact" size="lg">
                Submit a Scenario
              </SiteLink>
              <SiteLink href="/loan-products" variant="secondary-on-dark" size="lg">
                View Loan Programs
              </SiteLink>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
