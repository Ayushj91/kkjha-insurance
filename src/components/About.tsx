import {
  Award,
  BadgeCheck,
  Heart,
  MessagesSquare,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { hi, site } from "@/lib/site";

const points = [
  {
    icon: MessagesSquare,
    title: "Plain-language advice",
    desc: "Every plan explained clearly — no confusing insurance jargon, ever.",
    rotate: "sm:-rotate-1",
  },
  {
    icon: ShieldCheck,
    title: "Independent & unbiased",
    desc: "Authorised across multiple insurers, so recommendations fit you, not a quota.",
    rotate: "sm:rotate-1",
  },
  {
    icon: Users2,
    title: "Personal 1:1 support",
    desc: "One advisor, one relationship — from your first question to every renewal.",
    rotate: "sm:rotate-1",
  },
  {
    icon: Heart,
    title: "Here for the long run",
    desc: "Documentation, renewals & claims — support that continues after you sign.",
    rotate: "sm:-rotate-1",
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
        <div className="grid items-start gap-14 lg:grid-cols-[290px_1fr] lg:gap-14">
          {/* Avatar / identity card — styled like a pinned polaroid */}
          <div className="mx-auto w-full max-w-[280px] pt-3 lg:mx-0">
            <div className="relative -rotate-2 rounded-sm border border-ink-900/5 bg-paper-card p-5 pb-7 text-center shadow-xl shadow-ink-900/10">
              <span className="tape absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2" />

              <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-ink-800 shadow-lg shadow-brand-600/20">
                <div className="absolute inset-1.5 rounded-full border border-white/25" />
                <span className="font-display text-3xl font-bold text-white">
                  {initials}
                </span>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold text-ink-900">
                {site.name}
              </h3>
              <p className="text-xs font-medium text-brand-700">
                {site.business} Advisor
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-semibold text-brand-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Certified &amp; Authorised
              </div>

              <p className="font-hand mt-4 rotate-1 text-sm text-ink-700/70">
                — still answering every call myself
              </p>
            </div>

            {/* floating badge — `relative` keeps it paint-ordered (and thus
                visually on top of) the polaroid card above, which is also
                `relative` for its tape strip; two positioned siblings paint
                in DOM order, so this still ends up on top. */}
            <div className="relative mx-auto -mt-5 flex w-fit rotate-2 items-center gap-2 rounded-full border border-brand-900/10 bg-white px-4 py-2 shadow-md">
              <Award className="h-4 w-4 text-gold-500" />
              <span className="text-xs font-bold text-ink-900">
                {site.years} yrs experience
              </span>
            </div>

            {/* Hindi motto */}
            <div className="mt-8 rotate-1 rounded-sm border-l-4 border-brand-500 bg-paper-card p-4 shadow-sm">
              <p
                lang="hi"
                className="font-display text-[15px] italic leading-relaxed text-ink-800"
              >
                {hi.aboutQuote}
              </p>
              <p className="font-hand mt-1.5 text-sm text-brand-600">
                {hi.aboutQuoteBy}
              </p>
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
              <div className="-rotate-1 rounded-2xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm">
                <div className="font-display text-2xl font-bold text-brand-700">
                  {site.years}
                </div>
                <div className="text-xs font-medium text-ink-700/60">
                  Years of experience
                </div>
              </div>
              <div className="rounded-2xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm">
                <div className="font-display text-2xl font-bold text-brand-700">
                  {site.clients}
                </div>
                <div className="text-xs font-medium text-ink-700/60">
                  Clients served
                </div>
              </div>
              <div className="rotate-1 rounded-2xl border border-brand-900/10 bg-white px-5 py-3 shadow-sm">
                <div className="font-display text-2xl font-bold text-brand-700">4</div>
                <div className="text-xs font-medium text-ink-700/60">
                  Partner institutions
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {points.map((p) => (
                <div
                  key={p.title}
                  className={`${p.rotate} rounded-2xl border border-brand-900/8 bg-white p-5 shadow-sm shadow-brand-900/5 transition-transform hover:-translate-y-1 hover:rotate-0 hover:shadow-md`}
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
