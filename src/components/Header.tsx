"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClass } from "@/components/SiteLink";
import { nav, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const activeDecoration = "underline decoration-cta decoration-2 underline-offset-8";

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
    <header className="border-b border-rule">
      <div className="mx-auto flex w-full max-w-[76rem] items-center gap-10 px-[1.125rem] py-2.5 lg:px-8 lg:py-3.5">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src="/brand/rsc-logo.png"
            alt={site.name}
            width={360}
            height={358}
            preload
            className="h-11 w-auto lg:h-[3.625rem]"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`text-[0.9375rem] font-medium text-ink transition-colors duration-150 hover:text-navy ${
                isActive(pathname, item.href) ? activeDecoration : "no-underline hover:underline"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-[1.375rem] lg:ml-0">
          <Link
            href="/portal"
            aria-current={pathname === "/portal" ? "page" : undefined}
            className="hidden text-[0.9375rem] font-medium text-navy underline lg:inline"
          >
            Borrower Portal
          </Link>
          {/* Below lg every page hero leads with a full-width Submit a Scenario, so the header drops its copy. */}
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`${buttonClass} hidden min-h-11 px-[1.125rem] text-[0.90625rem] lg:inline-flex`}
          >
            Submit a Scenario
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-[3px] border border-navy px-3 text-sm font-semibold text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule px-[1.125rem] pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`block py-3 text-base font-medium text-ink ${
                    isActive(pathname, item.href) ? "underline decoration-cta decoration-2" : "no-underline"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-4">
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className={`${buttonClass} flex min-h-12 w-full px-6`}
            >
              Submit a Scenario
            </Link>
            <Link
              href="/portal"
              aria-current={pathname === "/portal" ? "page" : undefined}
              className="font-medium text-navy underline"
            >
              Borrower Portal
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
