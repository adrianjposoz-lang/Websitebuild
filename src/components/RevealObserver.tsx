"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SHOWN_EDGE = 0.92;

/**
 * Server HTML has no reveal state, so content is visible without JS. Only elements that start
 * below the fold are marked pending; anything on screen at load is never hidden.
 * A scroll/resize check runs alongside IntersectionObserver so content still appears if the
 * observer never fires. Motion and the reduced-motion override live in globals.css.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = new Set<HTMLElement>();
    const show = (el: HTMLElement) => {
      el.dataset.revealState = "shown";
      pending.delete(el);
      observer?.unobserve(el);
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) show(entry.target as HTMLElement);
              }
            },
            { rootMargin: "0px 0px -8% 0px" },
          )
        : null;
    if (!observer) return;

    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.dataset.revealState) continue;
      if (el.getBoundingClientRect().top < window.innerHeight * SHOWN_EDGE) continue;
      el.dataset.revealState = "pending";
      pending.add(el);
      observer.observe(el);
    }

    let frame = 0;
    const sweep = () => {
      frame = 0;
      for (const el of pending) {
        if (el.getBoundingClientRect().top < window.innerHeight * SHOWN_EDGE) show(el);
      }
    };
    const onScroll = () => {
      if (!frame && pending.size) frame = requestAnimationFrame(sweep);
    };
    const showAll = () => [...pending].forEach(show);
    const onFocus = (event: FocusEvent) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>('[data-reveal-state="pending"]');
      if (el) show(el);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("beforeprint", showAll);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("beforeprint", showAll);
      document.removeEventListener("focusin", onFocus);
      for (const el of pending) delete el.dataset.revealState;
    };
  }, [pathname]);

  return null;
}
