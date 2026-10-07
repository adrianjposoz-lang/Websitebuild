import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-[0.9375rem] font-semibold transition-colors";

const styles = {
  primary: "bg-cta text-white hover:bg-cta-hover",
  secondary: "border-2 border-navy bg-paper text-navy hover:bg-navy hover:text-white",
  "secondary-on-dark": "border-2 border-gold text-gold hover:bg-gold hover:text-navy",
} as const;

const sizes = {
  md: "min-h-11 px-5",
  lg: "min-h-12 w-full px-6 sm:w-auto",
} as const;

export function SiteLink({
  href,
  children,
  variant = "primary",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  size?: keyof typeof sizes;
}) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${sizes[size]}`}>
      {children}
    </Link>
  );
}
