"use client";

import { useEffect } from "react";

/** Client-side navigation to `/faqs#…` skips the browser's own details auto-expand, so open it here. */
export function FaqHashOpener() {
  useEffect(() => {
    function openTarget() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      const details = target?.closest("details") ?? target?.querySelector("details");
      if (!details || details.open) return;
      details.open = true;
      target?.scrollIntoView({ block: "start" });
    }
    openTarget();
    window.addEventListener("hashchange", openTarget);
    return () => window.removeEventListener("hashchange", openTarget);
  }, []);

  return null;
}
