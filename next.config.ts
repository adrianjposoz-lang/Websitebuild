import type { NextConfig } from "next";

const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production";

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
      {
        source: "/portal",
        destination: "https://homebase.rscprivatelending.com/portal/auth/login",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    if (isProductionSite) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
