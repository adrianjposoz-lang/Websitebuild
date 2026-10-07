import type { Metadata } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { isProductionSite, jsonLdHtml, organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const caslonDisplay = Libre_Caslon_Display({
  variable: "--font-caslon-display",
  subsets: ["latin"],
  weight: "400",
});

const caslonText = Libre_Caslon_Text({
  variable: "--font-caslon-text",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${caslonDisplay.variable} ${caslonText.variable} ${franklin.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
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
        <RevealObserver />
      </body>
    </html>
  );
}
