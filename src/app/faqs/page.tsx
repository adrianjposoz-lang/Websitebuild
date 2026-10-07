import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SiteLink } from "@/components/SiteLink";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Questions about RSC Private Lending, its programs, and how to get in touch.",
};

export default function FaqsPage() {
  return (
    <main id="main">
      <Hero
        as="header"
        eyebrow="FAQs"
        title="Frequently asked questions"
        lede="Answers about RSC Private Lending, its programs, and how to get in touch."
      />
      <div className="bg-paper">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 lg:py-20">
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
      </div>
    </main>
  );
}
