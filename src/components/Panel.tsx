import type { ReactNode } from "react";
import { StatusChip } from "@/components/StatusChip";

export type PanelSkin = "light" | "dark";

const shells: Record<PanelSkin, string> = {
  light: "rounded-lg border border-line bg-paper shadow-sm",
  dark: "rounded-lg border border-white/15 bg-navy-raised shadow-[0_1px_0_0_rgb(255_255_255/0.06)_inset]",
};

export function panelClass(skin: PanelSkin) {
  return `flex flex-col overflow-hidden ${shells[skin]}`;
}

/** The strip repeats nearby headings, so it stays out of the accessibility tree. */
export function PanelHeader({
  skin,
  label,
  chip,
}: {
  skin: PanelSkin;
  label: ReactNode;
  chip?: ReactNode;
}) {
  const dark = skin === "dark";
  return (
    <div
      aria-hidden="true"
      className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-b px-5 py-2.5 ${
        dark ? "border-white/10" : "border-line bg-background/60"
      }`}
    >
      <span className={`label-mono ${dark ? "text-slate-300" : "text-muted"}`}>{label}</span>
      {chip ? <StatusChip skin={skin}>{chip}</StatusChip> : null}
    </div>
  );
}

export function Panel({
  as: Tag = "div",
  skin = "light",
  label,
  chip,
  className = "",
  bodyClassName = "p-6 lg:p-8",
  children,
  ...aria
}: {
  as?: "div" | "li" | "section" | "aside";
  skin?: PanelSkin;
  label: ReactNode;
  chip?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <Tag className={`${panelClass(skin)} ${className}`} {...aria}>
      <PanelHeader skin={skin} label={label} chip={chip} />
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}
