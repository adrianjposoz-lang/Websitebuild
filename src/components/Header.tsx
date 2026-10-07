"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ctaClass =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-cta text-sm font-semibold text-white transition-colors hover:bg-cta-hover";
const portalClass =
  "inline-flex min-h-11 items-center justify-center rounded-md border-2 border-gold text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy";

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
    <header className="sticky top-0 z-40 bg-navy text-white shadow-[inset_0_-1px_0_rgb(255_255_255/0.15)]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-5 lg:h-[4.5rem] lg:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Image
            src="/brand/rsc-logo-reversed.png"
            alt={site.name}
            width={360}
            height={358}
            preload
            className="h-12 w-auto lg:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`text-sm font-semibold ${
                isActive(pathname, item.href)
                  ? "underline decoration-accent-on-dark decoration-[3px] underline-offset-8"
                  : "text-slate-100 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/portal"
            aria-current={pathname === "/portal" ? "page" : undefined}
            className={`${portalClass} px-4`}
          >
            Borrower Portal
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`${ctaClass} px-4`}
          >
            Submit a Scenario
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`${ctaClass} px-3`}
          >
            Submit a Scenario
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md border-2 border-white/70 px-2.5 text-sm font-semibold"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/15 bg-navy-deep px-5 py-4 lg:hidden"
        >
          <Link
            href="/portal"
            aria-current={pathname === "/portal" ? "page" : undefined}
            className={`${portalClass} w-full px-4`}
          >
            Borrower Portal
          </Link>
          <ul className="mt-3 flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`block py-3 text-base font-semibold text-white ${
                    isActive(pathname, item.href)
                      ? "underline decoration-accent-on-dark decoration-[3px] underline-offset-4"
                      : ""
                  }`}
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
