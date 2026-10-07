"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/** Applied below `sm` only; each caller adds its own `sm:` grid classes so wider layouts are unchanged. */
const railClass =
  "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 pt-2 focus-visible:outline-offset-[-3px] sm:mx-0 sm:snap-none sm:overflow-visible sm:p-0";

export const railItemClass = "w-[85%] shrink-0 snap-start sm:w-auto";

/**
 * A horizontal scroll-snap row on phones, a plain list from `sm` up. The row only becomes a tab
 * stop while it actually overflows, so keyboard users can scroll cards that hold no links.
 */
export function ScrollRail({
  label,
  className = "",
  tone = "light",
  children,
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
  children: ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      if (el.scrollWidth > el.clientWidth + 1) el.tabIndex = 0;
      else el.removeAttribute("tabindex");
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ul ref={ref} aria-label={label} className={`${railClass} ${className}`}>
        {children}
      </ul>
      <p
        aria-hidden="true"
        className={`label-mono mt-2 flex items-center gap-1.5 sm:hidden ${
          tone === "dark" ? "text-gold" : "text-muted"
        }`}
      >
        Swipe for more
        <ArrowRight className="size-4" />
      </p>
    </>
  );
}
