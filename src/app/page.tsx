import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteLink } from "@/components/SiteLink";
import { deals, faqs, processSteps, site, whyPoints } from "@/lib/site";

export default function HomePage() {
  return (
    <main id="main">
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-100">
            {site.legalName}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Capital for real estate investors
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-white">
            Hard money and private lending for real estate investors.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <SiteLink href="/contact">Submit a Scenario</SiteLink>
            <SiteLink href="/loan-products" variant="secondary-on-dark">
              View Loan Programs
            </SiteLink>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16" aria-labelledby="programs">
        <h2 id="programs" className="text-3xl font-semibold text-navy sm:text-4xl">
          Loan programs
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Six programs, with the same names on the home page, the hub, and each product
          page.
        </p>
        <div className="mt-8">
          <ProductGrid />
        </div>
      </section>

      <section className="border-y border-line bg-paper" aria-labelledby="deals">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <h2 id="deals" className="text-3xl font-semibold text-navy sm:text-4xl">
            Deals
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
            RSC lends on investor real estate. Confirmed closings are not listed on this
            shell. These are the transaction types the programs are meant to cover.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {deals.map((deal) => (
              <li key={deal.title} className="border border-line p-5">
                <h3 className="text-2xl font-semibold text-navy">{deal.title}</h3>
                <p className="mt-3 leading-7 text-muted">{deal.text}</p>
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
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16" aria-labelledby="process">
        <h2 id="process" className="text-3xl font-semibold text-navy sm:text-4xl">
          Funding process
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border border-line bg-paper p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cta">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-navy">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy text-white" aria-labelledby="why">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <h2 id="why" className="text-3xl font-semibold sm:text-4xl">
            Why RSC
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {whyPoints.map((point) => (
              <li key={point.title} className="border border-white/20 p-5">
                <h3 className="text-2xl font-semibold">{point.title}</h3>
                <p className="mt-3 leading-7 text-slate-100">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16" aria-labelledby="faq-teaser">
        <h2 id="faq-teaser" className="text-3xl font-semibold text-navy sm:text-4xl">
          Questions
        </h2>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {faqs.slice(0, 3).map((faq) => (
            <li key={faq.id} className="py-5">
              <h3 className="text-xl font-semibold text-navy">
                <Link href={`/faqs#${faq.id}`} className="underline underline-offset-4">
                  {faq.question}
                </Link>
              </h3>
              <p className="mt-2 leading-7 text-muted">{faq.answer}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <SiteLink href="/faqs" variant="secondary">
            Read FAQs
          </SiteLink>
        </div>
      </section>

      <section className="bg-cta text-white" aria-labelledby="final-cta">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="final-cta" className="text-3xl font-semibold">
              Submit a Scenario
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-8">
              Send the property and the program through the scenario form.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center bg-white px-5 text-sm font-semibold text-navy hover:bg-slate-100"
            >
              Submit a Scenario
            </Link>
            <Link
              href="/loan-products"
              className="inline-flex min-h-11 items-center justify-center border-2 border-white px-5 text-sm font-semibold text-white hover:bg-white hover:text-cta"
            >
              View Loan Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
