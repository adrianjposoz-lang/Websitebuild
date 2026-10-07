import Link from "next/link";
import type { ReactNode } from "react";

export const buttonClass =
  "items-center justify-center rounded-[3px] bg-cta font-semibold tracking-[0.01em] text-white no-underline transition-colors duration-150 hover:bg-cta-hover";

const styles = {
  primary: `${buttonClass} inline-flex min-h-12 px-[1.375rem] text-[0.96875rem]`,
  text: "font-semibold text-navy underline transition-colors duration-150 hover:decoration-cta",
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
