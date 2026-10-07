import type { Metadata } from "next";
import Link from "next/link";
import { ScenarioForm } from "@/components/ScenarioForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Submit a scenario to ${site.name}, or call and email the Houston office.`,
};

export default function ContactPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Contact</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            Submit a scenario with the form on this page. Call or email for anything else.
          </p>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
        <section id="scenario" aria-labelledby="scenario-heading">
          <h2 id="scenario-heading" className="text-3xl font-semibold text-navy">
            Submit a Scenario
          </h2>
          <p className="mt-3 leading-7 text-muted">
            Property, program, and what you need. The six programs use the same names as
            the rest of the site.
          </p>
          <div className="mt-6">
            <ScenarioForm />
          </div>
        </section>

        <section aria-labelledby="channels-heading">
          <h2 id="channels-heading" className="text-3xl font-semibold text-navy">
            Channels
          </h2>
          <dl className="mt-6 space-y-5 text-base leading-7">
            <div>
              <dt className="font-semibold text-navy">Phone</dt>
              <dd>
                <a href={site.phoneHref} className="underline underline-offset-4">
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Office</dt>
              <dd>
                {site.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <p className="mt-8 leading-7 text-muted">
            The{" "}
            <Link href="/portal" className="font-semibold text-navy underline underline-offset-4">
              Borrower Portal
            </Link>{" "}
            is a coming-soon page. It is not this form.
          </p>
        </section>
      </div>
    </main>
  );
}
