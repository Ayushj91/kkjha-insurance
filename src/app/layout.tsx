import type { Metadata } from "next";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/600-italic.css";
import "@fontsource/kalam/400.css";
import "@fontsource/kalam/700.css";
import "./globals.css";
import { site } from "@/lib/site";

// Set NEXT_PUBLIC_SITE_URL once you have a custom domain, so shared links
// (WhatsApp, social) resolve the preview image correctly. Falls back to the
// Vercel-provided URL, then localhost during development.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
      </body>
    </html>
  );
}
