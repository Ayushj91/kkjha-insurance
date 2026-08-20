import {
  Award,
  BadgeCheck,
  Heart,
  MessagesSquare,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { site } from "@/lib/site";

const points = [
  {
    icon: MessagesSquare,
    title: "Plain-language advice",
    desc: "Every plan explained clearly — no confusing insurance jargon, ever.",
  },
  {
    icon: ShieldCheck,
    title: "Independent & unbiased",
    desc: "Authorised across multiple insurers, so recommendations fit you, not a quota.",
  },
  {
    icon: Users2,
    title: "Personal 1:1 support",
    desc: "One advisor, one relationship — from your first question to every renewal.",
  },
  {
    icon: Heart,
    title: "Here for the long run",
    desc: "Documentation, renewals & claims — support that continues after you sign.",
  },
];

const initials = site.shortName
  .replace(/[^A-Za-z ]/g, "")
  .split(" ")
  .map((w) => w[0])
  .join("");

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-50/40 py-20 sm:py-28">
      <div className="bg-grid absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_50%_60%_at_15%_20%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* Avatar / identity card */}
          <div className="mx-auto w-full max-w-[280px] lg:mx-0">
            <div className="rounded-[28px] border border-brand-900/10 bg-white p-6 text-center shadow-lg shadow-brand-900/5">
              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-ink-800 shadow-lg shadow-brand-600/20">
                <div className="absolute inset-1.5 rounded-full border border-white/25" />
                <span className="font-display text-3xl font-bold text-white">
                  {initials}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold text-ink-900">
                {site.name}
              </h3>
              <p className="text-xs font-medium text-brand-700">
                {site.business} Advisor
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Certified &amp; Authorised
              </div>
            </div>

            {/* floating badge */}
            <div className="mx-auto -mt-5 flex w-fit items-center gap-2 rounded-full border border-brand-900/10 bg-white px-4 py-2 shadow-md">
              <Award className="h-4 w-4 text-gold-500" />
              <span className="text-xs font-bold text-ink-900">
                {site.years} yrs experience
              </span>
            </div>
          </div>

          {/* Copy + points */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              About your advisor
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Meet {site.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-700/80 sm:text-lg">
              For over {site.years.replace("+", "")} years, {site.name} has
              helped families across India make sense of insurance and
              investing — translating fine print into decisions people
              actually feel confident about.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-700/80 sm:text-lg">
              The approach is simple: understand your life first, then match
              you to the right cover or fund — never the other way around.
              It&rsquo;s why {site.clients} clients keep coming back for
              renewals, referrals, and every big financial decision in
              between.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm">
                <div className="text-2xl font-bold text-brand-700">
                  {site.years}
                </div>
                <div className="text-xs font-medium text-ink-700/60">
                  Years of experience
                </div>
              </div>
              <div className="rounded-2xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm">
                <div className="text-2xl font-bold text-brand-700">
                  {site.clients}
                </div>
                <div className="text-xs font-medium text-ink-700/60">
                  Clients served
                </div>
              </div>
              <div className="rounded-2xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm">
                <div className="text-2xl font-bold text-brand-700">4</div>
                <div className="text-xs font-medium text-ink-700/60">
                  Partner institutions
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {points.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-brand-900/8 bg-white p-5 shadow-sm shadow-brand-900/5 transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <p.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-sm font-bold text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-700/70">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
