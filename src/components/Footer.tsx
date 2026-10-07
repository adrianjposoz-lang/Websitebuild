import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { nav, site } from "@/lib/site";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="relative z-[1] mt-auto bg-navy-deep text-white">
      <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-[1.125rem] py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/brand/rsc-logo-reversed.png"
            alt={site.name}
            width={360}
            height={358}
            className="h-16 w-auto"
          />
          <p className="mt-4 font-serif text-lg text-white">{site.legalName}</p>
          <address className="mt-1 font-serif text-base not-italic leading-7 text-slate-100">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div>
          <h2 className="font-serif text-lg italic text-slate-100">Reach us</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="whitespace-nowrap font-semibold underline">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="font-semibold underline"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg italic text-slate-100">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg italic text-slate-100">Get started</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li>
              <Link href="/contact" className="font-semibold underline">
                Submit a Scenario
              </Link>
              <p className="mt-1 text-slate-100">Tell us about the property and the program.</p>
            </li>
            <li>
              <a href={site.portalUrl} className="font-semibold underline">
                Borrower Portal
              </a>
              <p className="mt-1 text-slate-100">Sign in to manage an existing loan.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-[76rem] space-y-3 px-[1.125rem] py-6 text-sm leading-6 text-slate-100 lg:px-8">
          <p>
            <strong className="text-white">Business purpose.</strong> Loans are for
            investment real estate and are not for personal, family, or household use.
          </p>
          <p>
            Loan products may not be available in all states or jurisdictions. Nothing
            contained herein constitutes a commitment to lend. All financing is subject to
            borrower qualification, due diligence, underwriting review, and final credit
            approval at the sole discretion of RSC Private Lending.
          </p>
          <p>
            Rates, terms, programs, and fees are subject to change without notice and may vary
            based on borrower profile, property type, transaction structure, and applicable
            state regulations.
          </p>
          <p>Equal Housing Opportunity.</p>
          <p>AAPL — American Association of Private Lenders.</p>
          <p>
            © <CopyrightYear /> {site.legalName} d/b/a {site.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
