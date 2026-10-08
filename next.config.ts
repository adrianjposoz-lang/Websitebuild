import type { NextConfig } from "next";
import { programs } from "./src/data/funded-loans";

const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production";

const programQuery = {
  type: "query",
  key: "program",
  value: `(?<program>${programs.map((program) => program.slug).join("|")})`,
} as const;

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rscprivatelending.com" }],
        destination: "https://rscprivatelending.com/:path*",
        statusCode: 301,
      },
      { source: "/resources", destination: "/faqs", statusCode: 301 },
      { source: "/faq", destination: "/faqs", statusCode: 301 },
      { source: "/privacy-notice", destination: "/privacy", statusCode: 301 },
      { source: "/terms-of-service", destination: "/terms", statusCode: 301 },
      // RSC does not offer Commercial DSCR (Adrian, 2026-10-07). Next's built-in 308 strips a trailing
      // slash before this rule runs, so ".../commercial-dscr/" lands here too.
      { source: "/loan-products/commercial-dscr", destination: "/loan-products/dscr", statusCode: 301 },
      // Internal targets of the /funded-loans filter rewrites; redirects run before rewrites, so only direct hits land here.
      { source: "/funded-loans/filter/:path*", destination: "/funded-loans", statusCode: 301 },
      {
        source: "/portal",
        destination: "https://homebase.rscprivatelending.com/portal/auth/login",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    // Unknown program values match no rule, so they fall through to the unfiltered page. A legacy
    // `state` param is not matched at all: it neither filters nor blocks the program rewrite.
    return {
      beforeFiles: [{ source: "/funded-loans", has: [programQuery], destination: "/funded-loans/filter/:program" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    if (isProductionSite) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
