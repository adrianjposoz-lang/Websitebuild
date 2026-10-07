import type { MetadataRoute } from "next";
import { shippedPaths, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return shippedPaths.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: "2026-10-07",
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
