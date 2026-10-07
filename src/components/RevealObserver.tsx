"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fade-and-rise for `[data-reveal]` blocks. Markup ships visible: only blocks that start below the
 * viewport are set to `pending`, and only when IntersectionObserver exists and motion is allowed,
 * so no-JS, reduced-motion, and unsupported browsers always see the content.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-state", "shown");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const blocks = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-state])");
    for (const block of blocks) {
      if (block.getBoundingClientRect().top < window.innerHeight) continue;
      block.setAttribute("data-reveal-state", "pending");
      observer.observe(block);
    }

    return () => {
      observer.disconnect();
      for (const block of document.querySelectorAll('[data-reveal-state="pending"]')) {
        block.removeAttribute("data-reveal-state");
      }
    };
  }, [pathname]);

  return null;
}
