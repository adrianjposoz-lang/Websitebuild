import type { Metadata } from "next";
import { SiteLink } from "@/components/SiteLink";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Questions about RSC Private Lending, its programs, and how to get in touch.",
};

export default function FaqsPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">FAQs</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">
            Straight answers from what this site actually publishes. Program guidelines are
            not invented here.
          </p>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <ul className="divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <li key={faq.id} id={faq.id} className="scroll-mt-28 py-6">
              <h2 className="text-2xl font-semibold text-navy">{faq.question}</h2>
              <p className="mt-3 leading-7">{faq.answer}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <SiteLink href="/contact">Submit a Scenario</SiteLink>
        </div>
      </div>
    </main>
  );
}
