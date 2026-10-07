import type { ReactNode } from "react";

const skins = {
  light: "bg-slate-200 text-navy",
  dark: "border border-gold/40 bg-gold/12 text-gold",
} as const;

export function StatusChip({
  skin = "light",
  children,
}: {
  skin?: keyof typeof skins;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs font-medium uppercase tracking-[0.06em] ${skins[skin]}`}
    >
      {skin === "dark" ? (
        <span aria-hidden="true" className="chip-dot size-1.5 rounded-full bg-gold" />
      ) : null}
      {children}
    </span>
  );
}
