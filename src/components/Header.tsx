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

const activeDecoration = "underline decoration-cta decoration-[3px] underline-offset-8";

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
    <header className="border-b border-hair bg-white">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[75rem] items-center gap-10 px-[1.125rem] lg:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src="/brand/rsc-logo.png"
            alt={site.name}
            width={360}
            height={358}
            preload
            className="h-12 w-auto"
          />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`text-[0.9375rem] font-medium text-body transition-colors duration-150 hover:text-navy ${
                isActive(pathname, item.href) ? activeDecoration : "no-underline hover:underline"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-[1.375rem] lg:ml-0">
          <a href={site.portalUrl} className="hidden text-[0.9375rem] font-medium text-navy underline lg:inline">
            Borrower Portal
          </a>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`${buttonClass} inline-flex min-h-11 px-4 text-[0.9375rem] lg:px-5`}
          >
            Submit a Scenario
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-md border border-field px-3 text-[0.9375rem] font-semibold text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-hair px-[1.125rem] pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-hair">
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`block py-3 text-base font-medium text-ink ${
                    isActive(pathname, item.href) ? "underline decoration-cta decoration-[3px] underline-offset-8" : "no-underline"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.portalUrl} className="mt-5 inline-block py-2 font-semibold text-navy underline">
            Borrower Portal
          </a>
        </nav>
      ) : null}
    </header>
  );
}
