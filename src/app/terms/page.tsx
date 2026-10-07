import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms stub for RSC Private Lending.",
};

export default function TermsPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Terms</h1>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <p className="text-lg leading-8">
          These terms are a stub. Final terms will be published before the site is used for
          applications. This page is not legal advice and is not the final agreement.
        </p>
      </div>
    </main>
  );
}
