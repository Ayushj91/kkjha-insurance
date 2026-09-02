"use client";

import { useMemo, useState } from "react";
import { compact, simulateInflation } from "@/lib/finance";
import { Chip, Panel, Row, Stat } from "./CalcUI";
import { ChartLegend, TrendChart } from "./Chart";

const presets = [
  { label: "Groceries", amount: 10000 },
  { label: "School fees", amount: 150000 },
  { label: "A car", amount: 1000000 },
  { label: "Monthly rent", amount: 25000 },
];

export default function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  const res = useMemo(() => simulateInflation({ amount, years, inflation }), [amount, years, inflation]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <Chip key={p.label} onClick={() => setAmount(p.amount)}>
            {p.label} · ₹{compact(p.amount)}
          </Chip>
        ))}
      </div>

      {/* HERO — two-sided */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-clay-600/15 bg-gradient-to-br from-clay-500 to-clay-600 p-6 text-white shadow-lg shadow-clay-600/15">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
            In {years} years, this will cost
          </div>
          <div className="font-mono mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            ₹{compact(res.futureAmount)}
          </div>
          <div className="mt-2 text-sm text-white/75">up from ₹{compact(amount)} today</div>
        </div>
        <div className="rounded-3xl border border-brand-900/10 bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg shadow-brand-900/15">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-200">
            ₹{compact(amount)} today will feel like
          </div>
          <div className="font-mono mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            ₹{compact(amount - (amount * res.purchasingPowerLoss) / 100)}
          </div>
          <div className="mt-2 text-sm text-brand-100/90">
            {res.purchasingPowerLoss.toFixed(0)}% less purchasing power in {years} years
          </div>
        </div>
      </div>

      {/* CHART */}
      <Panel>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-700/60">What ₹{compact(amount)} can still buy</span>
          <ChartLegend items={[{ label: "Purchasing power", color: "var(--color-brand-600)" }]} />
        </div>
        <TrendChart
          xMax={years}
          yMax={amount}
          xTick={(y) => (y === 0 ? "now" : `+${Math.round(y)}y`)}
          yTickLabel={"₹" + compact(amount)}
          series={[
            {
              points: res.points.map((p) => ({ x: p.year, y: p.real })),
              color: "var(--color-brand-600)",
              area: true,
              dotAtEnd: true,
            },
          ]}
        />
      </Panel>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Today's cost" value={"₹" + compact(amount)} />
        <Stat label={`Cost in ${years}y`} value={"₹" + compact(res.futureAmount)} accent="clay" />
        <Stat label="Purchasing power lost" value={res.purchasingPowerLoss.toFixed(0) + "%"} accent="clay" />
        <Stat label="Extra needed to keep up" value={"₹" + compact(res.futureAmount - amount)} accent="brand" />
      </div>

      {/* DETAILED ANALYSIS */}
      <Panel title="Year-by-year erosion">
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[380px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-ink-700/50">
                <th className="px-3 py-2 font-medium">Year</th>
                <th className="px-3 py-2 font-medium">Still buys</th>
                <th className="px-3 py-2 font-medium">Power lost</th>
              </tr>
            </thead>
            <tbody>
              {res.points
                .filter((_, i) => i % Math.max(1, Math.ceil(res.points.length / 10)) === 0 || i === res.points.length - 1)
                .map((row) => (
                  <tr key={row.year} className="border-t border-ink-900/6">
                    <td className="px-3 py-2 font-semibold text-ink-900">Yr {row.year}</td>
                    <td className="font-mono px-3 py-2 text-ink-900">₹{compact(row.real)}</td>
                    <td className="font-mono px-3 py-2 text-clay-600">
                      {(100 - (row.real / amount) * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* INPUTS */}
      <Panel title="Your numbers">
        <Row label="Amount / cost today" money value={amount} onChange={setAmount} min={1000} max={100000000} step={1000} />
        <Row label="Time horizon" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
        <Row
          label="Expected inflation"
          value={inflation}
          onChange={setInflation}
          min={0}
          max={15}
          step={0.5}
          suffix="% p.a."
          hint="India's long-term consumer inflation has averaged roughly 5–7%."
        />
      </Panel>

      <p className="px-1 text-[11.5px] leading-relaxed text-ink-700/50">
        Assumes a constant inflation rate applied annually. Real-world inflation varies by category (education and
        healthcare often run hotter than the headline number) — use this to build intuition, not as an exact forecast.
      </p>
    </div>
  );
}
