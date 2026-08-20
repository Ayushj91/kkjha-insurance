import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
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
