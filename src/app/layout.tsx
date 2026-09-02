import type { Metadata } from "next";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/600-italic.css";
import "@fontsource/kalam/400.css";
import "@fontsource/kalam/700.css";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

// Organization / local-business structured data, shared site-wide so every
// page (including the calculators) benefits from the same entity graph —
// this is what lets Google associate "K.K. Jha" and his credentials with
// every page on the domain, calculators included.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  alternateName: site.shortName,
  description: site.subTagline,
  url: siteUrl,
  telephone: site.phone,
  areaServed: "IN",
  knowsLanguage: ["en", "hi"],
  sameAs: [site.whatsappBase],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — ${site.business}`,
  description: `${site.subTagline} ${site.years} years of experience, ${site.clients} clients served. Talk to ${site.shortName} on WhatsApp (Hindi & English) for life, health, motor & travel insurance and mutual funds.`,
  keywords: [
    "insurance agent",
    "LIC advisor",
    "mutual funds",
    "health insurance",
    "life insurance",
    "Policybazaar",
    "Bajaj Capital",
    site.name,
    "बीमा सलाहकार",
    "बीमा एजेंट",
    "जीवन बीमा",
    "स्वास्थ्य बीमा",
    "म्यूचुअल फंड सलाहकार",
    "एलआईसी एजेंट",
  ],
  openGraph: {
    title: `${site.name} — ${site.business}`,
    description: site.subTagline,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <div className="grain" />
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
