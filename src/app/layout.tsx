import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isProductionSite, jsonLdHtml, organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Hard money and private lending`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
  ...(isProductionSite ? {} : { robots: { index: false, follow: false } }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="absolute left-4 top-4 z-50 -translate-y-24 bg-paper px-4 py-2 font-semibold text-navy focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
