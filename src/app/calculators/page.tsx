import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight, Home, Percent, PiggyBank, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { calculators } from "@/lib/calculatorRegistry";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Financial Calculators — ${site.shortName}`,
  description:
    "Free SIP, lumpsum, goal-planning, home loan and inflation calculators — plan your money with real numbers and clear charts.",
};

const iconMap: Record<string, LucideIcon> = {
  sip: PiggyBank,
  lumpsum: TrendingUp,
  "goal-planner": Target,
  "home-loan": Home,
  "buy-vs-invest": ArrowLeftRight,
  inflation: Percent,
};

export default function CalculatorsHub() {
  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Free tools
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Plan your money with real numbers
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-700/70 sm:text-lg">
            Six calculators covering investing, loans and inflation — with detailed, visual breakdowns so you can see
            exactly how the numbers add up before you decide anything.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => {
            const Icon = iconMap[c.slug] ?? TrendingUp;
            return (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-900/8"
              >
                <div className="relative flex h-32 items-center justify-center overflow-hidden bg-brand-50">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-100/70 opacity-70" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt=""
                    aria-hidden="true"
                    className="relative z-10 h-24 w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-2.5 z-10 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                    {c.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="relative z-10 -mt-11 mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-brand-500 bg-white text-brand-600 shadow-sm">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-ink-900">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-700/70">{c.description}</p>
                  <span className="mt-4 inline-flex items-center text-xs font-bold text-brand-700">
                    Try it →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
