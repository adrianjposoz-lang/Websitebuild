import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice stub for RSC Private Lending.",
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <header className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Privacy</h1>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <p className="text-lg leading-8">
          This privacy notice is a stub. The final notice will be published before the site
          collects visitor data. This page is not legal advice and is not the final policy.
        </p>
      </div>
    </main>
  );
}
