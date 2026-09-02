import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { calculatorBySlug, calculators } from "@/lib/calculatorRegistry";
import { site } from "@/lib/site";
import SipCalculator from "@/components/calculators/SipCalculator";
import LumpsumCalculator from "@/components/calculators/LumpsumCalculator";
import GoalPlanner from "@/components/calculators/GoalPlanner";
import HomeLoanCalculator from "@/components/calculators/HomeLoanCalculator";
import BuyVsInvestCalculator from "@/components/calculators/BuyVsInvestCalculator";
import InflationCalculator from "@/components/calculators/InflationCalculator";

const componentMap: Record<string, React.ComponentType> = {
  sip: SipCalculator,
  lumpsum: LumpsumCalculator,
  "goal-planner": GoalPlanner,
  "home-loan": HomeLoanCalculator,
  "buy-vs-invest": BuyVsInvestCalculator,
  inflation: InflationCalculator,
};

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = calculatorBySlug(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — ${site.shortName}`,
    description: meta.description,
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = calculatorBySlug(slug);
  const Calculator = componentMap[slug];
  if (!meta || !Calculator) notFound();

  const others = calculators.filter((c) => c.slug !== slug);

  return (
    <div className="pb-16 pt-6 sm:pb-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All calculators
        </Link>

        <h1 className="font-display mt-4 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          {meta.title}
        </h1>
        <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-700/70">{meta.description}</p>

        <div className="mt-8">
          <Calculator />
        </div>

        {/* cross-links */}
        <div className="mt-14 border-t border-ink-900/8 pt-8">
          <div className="mb-4 text-[13px] font-semibold text-ink-900">More calculators</div>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-brand-500/40 hover:text-brand-700"
              >
                {c.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
