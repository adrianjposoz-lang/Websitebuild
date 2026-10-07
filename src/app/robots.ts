import type { MetadataRoute } from "next";
import { isProductionSite } from "@/lib/seo";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProductionSite ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
