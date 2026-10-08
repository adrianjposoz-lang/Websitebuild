"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const STAGGER_MS = 60;
const MAX_STAGGERED = 4;

function reveal(block: Element, delay = 0) {
  if (delay) (block as HTMLElement).style.transitionDelay = `${delay}ms`;
  block.setAttribute("data-revealed", "");
}

/**
 * Fade-and-rise for section-level `[data-reveal]` blocks, once. The hidden state is scoped to
 * `.motion-ok`, which is only set here, so no-JS, reduced-motion, and browsers without
 * IntersectionObserver always see the content. Under reduced motion the observer is never attached.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blocks = [...document.querySelectorAll("[data-reveal]:not([data-revealed])")];
    for (const block of blocks) {
      if (block.getBoundingClientRect().top < window.innerHeight) reveal(block);
    }
    document.documentElement.classList.add("motion-ok");

    const observer = new IntersectionObserver(
      (entries) => {
        // A block taller than the viewport can never reach 15%, so a quarter-screen of it counts too.
        const ready = entries
          .filter(
            (entry) =>
              entry.isIntersecting &&
              (entry.intersectionRatio >= 0.15 || entry.intersectionRect.height >= window.innerHeight * 0.25),
          )
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        ready.forEach((entry, index) => {
          reveal(entry.target, Math.min(index, MAX_STAGGERED - 1) * STAGGER_MS);
          observer.unobserve(entry.target);
        });
      },
      { threshold: [0, 0.05, 0.1, 0.15] },
    );
    for (const block of blocks) {
      if (!block.hasAttribute("data-revealed")) observer.observe(block);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
