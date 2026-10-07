import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "inline-flex min-h-11 items-center justify-center bg-cta px-5 text-sm font-semibold text-white hover:bg-cta-hover",
  secondary:
    "inline-flex min-h-11 items-center justify-center border-2 border-navy bg-paper px-5 text-sm font-semibold text-navy hover:bg-navy hover:text-white",
  "secondary-on-dark":
    "inline-flex min-h-11 items-center justify-center border-2 border-white px-5 text-sm font-semibold text-white hover:bg-white hover:text-navy",
} as const;

export function SiteLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link href={href} className={styles[variant]}>
      {children}
    </Link>
  );
}
