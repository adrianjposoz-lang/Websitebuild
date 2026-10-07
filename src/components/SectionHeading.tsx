import type { ReactNode } from "react";

export const h2Class =
  "text-[1.875rem] font-semibold leading-[1.2] tracking-[-0.02em] lg:text-[2.75rem] lg:leading-[1.18]";

export const h3Class =
  "text-[1.375rem] font-semibold leading-7 tracking-[-0.01em] lg:text-2xl lg:leading-8";

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className={`h-[3px] w-8 ${dark ? "bg-gold" : "bg-cta"}`} />
        <p
          className={`text-sm font-semibold uppercase tracking-[0.14em] ${
            dark ? "text-gold" : "text-cta"
          }`}
        >
          {eyebrow}
        </p>
      </div>
      <h2 id={id} className={`mt-3 ${h2Class} ${dark ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-4 text-lg leading-[1.875rem] lg:text-xl lg:leading-8 ${
            dark ? "text-slate-100" : "text-muted"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
