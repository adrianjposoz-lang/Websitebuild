import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for RSC Private Lending.",
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <Hero as="header" title="Privacy" />
      <div className="bg-paper">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 lg:py-20">
          <p className="text-lg leading-8">
            Our full privacy notice will be posted on this page. For privacy questions in the
            meantime, email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
