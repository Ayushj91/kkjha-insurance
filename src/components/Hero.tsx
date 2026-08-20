import { MessageCircle, Phone, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { site, waLink } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink-950 pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.35),transparent)]" />
      <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 animate-float-slow rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -right-16 top-10 h-64 w-64 animate-float rounded-full bg-gold-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            {site.years} years guiding Indian families &amp; {site.clients} clients strong
          </div>

          <h1
            className="animate-fade-up font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
            style={{ animationDelay: "0.06s" }}
          >
            Protect what matters.
            <br />
            <span className="gradient-text">Plan what&rsquo;s next.</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ animationDelay: "0.12s" }}
          >
            {site.subTagline} Real advice from {site.name}, an independent
            insurance &amp; investment advisor — no jargon, no pressure, just
            a plan that fits your life.
          </p>

          <div
            className="animate-fade-up mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "0.18s" }}
          >
            <a
              href={waLink("Hi! I'd like to talk about an insurance / investment plan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:brightness-110 active:scale-95"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <Phone className="h-4 w-4" />
              {site.phoneDisplay}
            </a>
          </div>

          <div
            className="animate-fade-up mt-14 grid w-full grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-lg"
            style={{ animationDelay: "0.24s" }}
          >
            <Stat icon={<TrendingUp className="h-4 w-4" />} value={site.years} label="Years experience" />
            <Stat icon={<ShieldCheck className="h-4 w-4" />} value={site.clients} label="Clients served" />
            <Stat icon={<Sparkles className="h-4 w-4" />} value="9+" label="Plans & covers" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-center gap-1.5 text-xl font-bold text-white sm:text-2xl">
        <span className="text-brand-400">{icon}</span>
        {value}
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-white/50 sm:text-xs">
        {label}
      </div>
    </div>
  );
}
