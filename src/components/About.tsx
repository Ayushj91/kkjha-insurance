import { Heart, MessagesSquare, ShieldCheck, Users2 } from "lucide-react";
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

export default function About() {
  return (
    <section id="about" className="relative bg-brand-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-brand-900/8 bg-white p-5 shadow-sm shadow-brand-900/5 transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <p.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-700/70">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
