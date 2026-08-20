import type { Metadata } from "next";
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
  description: `${site.subTagline} ${site.years} years of experience, ${site.clients} clients served. Talk to ${site.shortName} on WhatsApp for life, health, motor & travel insurance and mutual funds.`,
  keywords: [
    "insurance agent",
    "LIC advisor",
    "mutual funds",
    "health insurance",
    "life insurance",
    "Policybazaar",
    "Bajaj Capital",
    site.name,
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
        {children}
      </body>
    </html>
  );
}
