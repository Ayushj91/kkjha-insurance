import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { calculators } from "@/lib/calculatorRegistry";

export default function CalculatorsTeaser() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-brand-900/10 bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-10 text-white shadow-xl shadow-brand-900/15 sm:px-12 sm:py-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-gold-400/15 blur-2xl" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                <Calculator className="h-3.5 w-3.5" />
                Free tools
              </span>
              <h2 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Do the math before you decide
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-brand-100/90">
                SIP, lumpsum, goal-planning, home loan and inflation calculators — with clear charts and detailed,
                year-by-year breakdowns, so you can see exactly how the numbers add up.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {calculators.slice(0, 4).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/calculators/${c.slug}`}
                    className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    {c.shortTitle}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/calculators"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition-all hover:brightness-95 active:scale-95"
            >
              Explore all calculators
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
