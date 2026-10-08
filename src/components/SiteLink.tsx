import Link from "next/link";
import type { ReactNode } from "react";

/** The only filled button style on the site: red, Submit a Scenario. */
export const buttonClass =
  "items-center justify-center rounded-md bg-cta font-semibold text-white no-underline transition-colors duration-150 hover:bg-cta-hover";

const styles = {
  primary: `${buttonClass} inline-flex min-h-12 px-6 text-base`,
  text: "font-semibold text-navy underline decoration-1 hover:decoration-2",
} as const;

export function SiteLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <Link href={href} className={`${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
