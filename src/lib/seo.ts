import type { Metadata } from "next";
import { faqs, site } from "@/lib/site";

/**
 * Only a build with NEXT_PUBLIC_SITE_ENV=production may be indexed. Any other value,
 * or no value, ships noindex metadata, an X-Robots-Tag header, and a Disallow robots.txt.
 * The value is read at build time, so set it before `next build` on the production deploy.
 */
export const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production";

type PageSeo = {
  /** Full `<title>`, used as-is (bypasses the layout template). */
  title: string;
  description: string;
  /** Route path, e.g. "/faqs". Resolved against `metadataBase` for canonical and og:url. */
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      legalName: site.legalName,
      alternateName: `${site.legalName} d/b/a ${site.name}`,
      url: `${site.url}/`,
      email: site.email,
      telephone: site.phoneDisplay,
      memberOf: { "@type": "Organization", name: "American Association of Private Lenders" },
    },
    {
      "@type": "FinancialService",
      "@id": `${site.url}/#lender`,
      name: site.name,
      parentOrganization: { "@id": `${site.url}/#org` },
      url: `${site.url}/`,
      email: site.email,
      telephone: site.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: "US",
      },
      description:
        "Business-purpose private lending for real estate investors: DSCR, Bridge, Fix & Flip, Ground-Up, Mid-Construction, and Commercial DSCR.",
    },
  ],
};

export const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function jsonLdHtml(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
