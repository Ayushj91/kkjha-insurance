import {
  Activity,
  Award,
  Car,
  HeartHandshake,
  MessageCircle,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users2,
} from "lucide-react";
import { hi, site, waLink } from "@/lib/site";
import { CircleScribble, Squiggle } from "./Doodles";

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
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <div className="animate-fade-up mb-6 inline-flex -rotate-1 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-200">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              {site.years} years guiding Indian families &amp; {site.clients} clients strong
            </div>

            <h1
              className="animate-fade-up font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
              style={{ animationDelay: "0.06s" }}
            >
              Protect what matters.
              <br />
              <span className="relative inline-block">
                <span className="gradient-text">Plan what&rsquo;s next.</span>
                <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-gold-400/80" />
              </span>
            </h1>

            <p
              className="font-hand animate-fade-up mt-5 max-w-xl text-xl leading-relaxed text-brand-200/90 sm:text-2xl"
              style={{ animationDelay: "0.09s" }}
              lang="hi"
            >
              {site.taglineHi}
            </p>

            <p
              className="animate-fade-up mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
              style={{ animationDelay: "0.12s" }}
            >
              {site.subTagline} Real advice from {site.name}, an independent
              insurance &amp; investment advisor — no jargon, no pressure,
              just a plan that fits your life.
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

            <p
              className="animate-fade-up mt-4 flex items-center gap-1.5 text-xs font-medium text-white/50"
              style={{ animationDelay: "0.21s" }}
            >
              <span className="font-hand text-sm text-brand-400" lang="hi">
                {hi.hindiNote}
              </span>
              <span aria-hidden="true">·</span>
              <span>Hindi &amp; English, whatever&rsquo;s easier for you</span>
            </p>

            <div
              className="animate-fade-up mt-14 grid w-full grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-lg"
              style={{ animationDelay: "0.24s" }}
            >
              <Stat icon={<TrendingUp className="h-4 w-4" />} value={site.years} label="Years experience" />
              <Stat icon={<ShieldCheck className="h-4 w-4" />} value={site.clients} label="Clients served" />
              <Stat icon={<Sparkles className="h-4 w-4" />} value="9+" label="Plans & covers" />
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
      {/* hand-drawn orbit rings */}
      <CircleScribble className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rotate-3 text-white/10" />
      <CircleScribble className="absolute inset-16 h-[calc(100%-8rem)] w-[calc(100%-8rem)] -rotate-6 text-white/[0.07]" />

      {/* center medallion */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-ink-800 shadow-2xl shadow-brand-900/40">
          <div className="absolute inset-2 rounded-full border border-white/15" />
          <ShieldCheck className="h-20 w-20 text-white" strokeWidth={1.6} />
        </div>

        {/* hand-written sticky label, taped over the medallion's edge */}
        <div className="font-hand absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-[-4deg] rounded-md bg-gold-400 px-3 py-1 text-xs font-bold text-ink-950 shadow-md">
          {site.years} yrs strong ✓
        </div>
      </div>

      {/* floating service pins */}
      <FloatBadge
        className="left-1 top-6 -rotate-6"
        icon={<HeartHandshake className="h-5 w-5" />}
        gradient="from-rose-400 to-rose-500"
        delay="0s"
      />
      <FloatBadge
        className="right-0 top-16 rotate-6"
        icon={<Activity className="h-5 w-5" />}
        gradient="from-brand-400 to-brand-500"
        delay="1.1s"
      />
      <FloatBadge
        className="left-0 bottom-20 rotate-3"
        icon={<Car className="h-5 w-5" />}
        gradient="from-sky-400 to-sky-500"
        delay="2s"
      />
      <FloatBadge
        className="right-2 bottom-8 -rotate-3"
        icon={<Plane className="h-5 w-5" />}
        gradient="from-gold-400 to-gold-500"
        delay="0.6s"
      />

      {/* floating stat cards */}
      <div className="animate-float absolute -left-4 top-1/2 hidden -translate-y-1/2 rotate-1 xl:block">
        <div className="glass-dark flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 shadow-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-400/20 text-brand-300">
            <Users2 className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{site.clients}</div>
            <div className="text-[10px] font-medium text-white/70">
              Families protected
            </div>
          </div>
        </div>
      </div>

      <div
        className="animate-float-slow absolute -right-6 bottom-2 hidden -rotate-2 xl:block"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="glass-dark flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 shadow-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400/20 text-gold-400">
            <Award className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">{site.years}</div>
            <div className="text-[10px] font-medium text-white/70">
              Years trusted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatBadge({
  className,
  icon,
  gradient,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  gradient: string;
  delay: string;
}) {
  return (
    <div
      className={`animate-float absolute flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white shadow-lg ring-[3px] ring-white/80 ${className}`}
      style={{ animationDelay: delay }}
    >
      {icon}
    </div>
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
    <div className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
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
