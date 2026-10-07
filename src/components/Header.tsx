"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/15 bg-navy text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="min-w-0">
            <span className="block text-base font-semibold tracking-tight sm:text-lg">
              {site.name}
            </span>
            <span className="block text-xs text-slate-100">{site.legalName}</span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={`text-sm font-semibold ${
                  isActive(pathname, item.href)
                    ? "underline decoration-cta decoration-2 underline-offset-8"
                    : "text-slate-100 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/portal"
              aria-current={pathname === "/portal" ? "page" : undefined}
              className="inline-flex min-h-11 items-center justify-center border-2 border-white px-4 text-sm font-semibold text-white hover:bg-white hover:text-navy"
            >
              Borrower Portal
            </Link>
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="inline-flex min-h-11 items-center justify-center bg-cta px-4 text-sm font-semibold text-white hover:bg-cta-hover"
            >
              Submit a Scenario
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 items-center border-2 border-white px-3 text-sm font-semibold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 min-[480px]:grid-cols-[1.4fr_1fr] lg:hidden">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className="inline-flex min-h-11 items-center justify-center bg-cta px-3 text-sm font-semibold text-white hover:bg-cta-hover"
          >
            Submit a Scenario
          </Link>
          <Link
            href="/portal"
            aria-current={pathname === "/portal" ? "page" : undefined}
            className="inline-flex min-h-11 items-center justify-center border-2 border-white px-3 text-sm font-semibold text-white hover:bg-white hover:text-navy"
          >
            Borrower Portal
          </Link>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/15 bg-navy-deep px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="block py-3 text-base font-semibold text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
