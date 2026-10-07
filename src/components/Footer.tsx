import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-deep text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-slate-100">{site.legalName}</p>
          <address className="mt-4 text-sm not-italic leading-6 text-slate-100">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-100">
            Reach us
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={site.phoneHref} className="font-semibold underline underline-offset-4">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="font-semibold underline underline-offset-4"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-100">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="underline underline-offset-4">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="underline underline-offset-4">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-100">
            Actions
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">
            <li>
              <Link href="/contact" className="font-semibold underline underline-offset-4">
                Submit a Scenario
              </Link>
              <p className="mt-1 text-slate-100">Scenario form on the contact page.</p>
            </li>
            <li>
              <Link href="/portal" className="font-semibold underline underline-offset-4">
                Borrower Portal
              </Link>
              <p className="mt-1 text-slate-100">Coming soon. Opens the on-site notice.</p>
            </li>
            <li>
              <p className="font-semibold">Broker Login</p>
              <p className="mt-1 text-slate-100">
                TBD — legacy LOS. No public URL is published.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl space-y-3 px-5 py-6 text-sm leading-6 text-slate-100">
          <p>
            <strong className="text-white">Business purpose.</strong> Loans are for
            investment real estate and are not for personal, family, or household use.
          </p>
          <p>Equal Housing Lender.</p>
          <p>AAPL — American Association of Private Lenders.</p>
          <p>© 2026 {site.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
