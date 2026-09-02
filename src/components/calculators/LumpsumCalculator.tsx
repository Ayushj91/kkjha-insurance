"use client";

import { useMemo, useState } from "react";
import { compact, inflateBackward, simulateLumpsum } from "@/lib/finance";
import { Panel, Row, Stat } from "./CalcUI";
import { ChartLegend, TrendChart } from "./Chart";

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(500000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(6);

  const res = useMemo(() => simulateLumpsum({ amount, annualReturn, years }), [amount, annualReturn, years]);
  const multiple = amount > 0 ? res.corpus / amount : 0;
  const doublingYears = annualReturn > 0 ? 72 / annualReturn : Infinity;
  const realCorpus = inflateBackward(res.corpus, years, inflation);

  return (
    <div className="flex flex-col gap-5">
      {/* HERO */}
      <div className="rounded-3xl border border-brand-900/10 bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg shadow-brand-900/15 sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-200">
          A one-time investment of ₹{compact(amount)} could grow to
        </div>
        <div className="font-mono mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          ₹{compact(res.corpus)}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-100/90">
          <span>in {years} years</span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
            {multiple.toFixed(1)}x your money
          </span>
        </div>
        <div className="mt-1 text-[13px] text-brand-100/70">
          worth about <b className="font-mono font-semibold text-white">₹{compact(realCorpus)}</b> in today&rsquo;s money, after {inflation}% inflation
        </div>
      </div>

      {/* CHART */}
      <Panel>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-700/60">Growth over time</span>
          <ChartLegend items={[{ label: "Investment value", color: "var(--color-brand-600)" }]} />
        </div>
        <TrendChart
          xMax={res.points[res.points.length - 1]?.m ?? 1}
          yMax={res.corpus}
          xTick={(m) => (m === 0 ? "now" : `+${Math.round(m / 12)}y`)}
          yTickLabel={"₹" + compact(res.corpus)}
          series={[
            {
              points: res.points.map((p) => ({ x: p.m, y: p.value })),
              color: "var(--color-brand-600)",
              area: true,
              dotAtEnd: true,
            },
          ]}
        />
      </Panel>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Amount invested" value={"₹" + compact(res.invested)} />
        <Stat label="Wealth gained" value={"₹" + compact(res.gain)} accent="brand" />
        <Stat label="Final value" value={"₹" + compact(res.corpus)} accent="brand" />
        <Stat
          label="Doubling time"
          value={isFinite(doublingYears) ? `~${doublingYears.toFixed(1)} yrs` : "—"}
          accent="gold"
        />
      </div>

      {/* DETAILED ANALYSIS */}
      <Panel title="Value at each milestone">
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-ink-700/50">
                <th className="px-3 py-2 font-medium">Year</th>
                <th className="px-3 py-2 font-medium">Value</th>
                <th className="px-3 py-2 font-medium">Gain so far</th>
                <th className="px-3 py-2 font-medium">Multiple</th>
                <th className="px-3 py-2 font-medium">Value (today&rsquo;s money)</th>
              </tr>
            </thead>
            <tbody>
              {res.yearly
                .filter((_, i) => i % Math.max(1, Math.ceil(res.yearly.length / 10)) === 0 || i === res.yearly.length - 1)
                .map((row) => (
                  <tr key={row.year} className="border-t border-ink-900/6">
                    <td className="px-3 py-2 font-semibold text-ink-900">Yr {row.year}</td>
                    <td className="font-mono px-3 py-2 font-semibold text-ink-900">₹{compact(row.value)}</td>
                    <td className="font-mono px-3 py-2 text-brand-700">₹{compact(row.value - amount)}</td>
                    <td className="font-mono px-3 py-2 text-ink-700/70">{(row.value / amount).toFixed(2)}x</td>
                    <td className="font-mono px-3 py-2 text-ink-700/60">
                      ₹{compact(inflateBackward(row.value, row.year, inflation))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* INPUTS */}
      <Panel title="Your investment">
        <Row label="Investment amount" money value={amount} onChange={setAmount} min={1000} max={100000000} step={5000} />
        <Row
          label="Expected annual return"
          value={annualReturn}
          onChange={setAnnualReturn}
          min={1}
          max={20}
          step={0.5}
          suffix="% p.a."
          hint="Index funds have historically returned ~10–13% p.a. over long periods."
        />
        <Row label="Investment period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
        <Row
          label="Expected inflation"
          value={inflation}
          onChange={setInflation}
          min={0}
          max={12}
          step={0.5}
          suffix="% p.a."
          hint="Used to show your final value in today's purchasing power, alongside the nominal number"
        />
      </Panel>

      <p className="px-1 text-[11.5px] leading-relaxed text-ink-700/50">
        Assumes annual compounding at a constant rate, with no withdrawals along the way. Actual market returns vary
        year to year — treat this as a planning guide, not a guarantee.
      </p>
    </div>
  );
}
