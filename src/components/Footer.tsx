import { Shield, MessageCircle, Phone } from "lucide-react";
import { hi, site, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink-950 pb-10 pt-2">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-500 text-white">
              <Shield className="h-4.5 w-4.5" strokeWidth={2.2} />
            </span>
            <span className="font-display text-sm font-bold text-white">
              {site.shortName}{" "}
              <span className="font-normal text-white/50">
                — {site.business}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              {site.phoneDisplay}
            </a>
            <a
              href={waLink("Hi! I'd like to know more about your insurance & investment plans.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>

        <p lang="hi" className="mt-6 text-center text-xs font-medium text-brand-300/80 sm:text-left">
          {hi.footerLine}
        </p>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/35 sm:text-left">
          © {new Date().getFullYear()} {site.name} — {site.business}. All
          product names, insurer names &amp; logos referenced belong to
          their respective owners. Insurance is the subject matter of
          solicitation. Mutual fund investments are subject to market
          risks — please read all scheme-related documents carefully.
        </p>
      </div>
    </footer>
  );
}
