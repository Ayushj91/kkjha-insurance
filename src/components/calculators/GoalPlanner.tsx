"use client";

import { useMemo, useState } from "react";
import { compact, inr, planGoal } from "@/lib/finance";
import { Chip, Panel, Row, Stat } from "./CalcUI";
import { ChartLegend, TrendChart } from "./Chart";

const presets = [
  { label: "Retirement", years: 25, goal: 5000000 },
  { label: "Child's education", years: 15, goal: 2500000 },
  { label: "Buying a home", years: 7, goal: 3000000 },
  { label: "Dream wedding", years: 5, goal: 1500000 },
];

export default function GoalPlanner() {
  const [goalToday, setGoalToday] = useState(5000000);
  const [years, setYears] = useState(25);
  const [inflation, setInflation] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [existingCorpus, setExistingCorpus] = useState(0);

  const res = useMemo(
    () => planGoal({ goalToday, years, inflation, expectedReturn, existingCorpus }),
    [goalToday, years, inflation, expectedReturn, existingCorpus]
  );

  return (
    <div className="flex flex-col gap-5">
      {/* PRESETS + INPUTS — shown first so the natural flow on mobile is
          choose your numbers, then scroll down to see what they produce. */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <Chip
            key={p.label}
            onClick={() => {
              setGoalToday(p.goal);
              setYears(p.years);
            }}
          >
            {p.label}
          </Chip>
        ))}
      </div>

      <Panel title="Your goal">
        <Row label="Goal cost, in today's money" money value={goalToday} onChange={setGoalToday} min={50000} max={100000000} step={50000} />
        <Row label="Years until you need it" value={years} onChange={setYears} min={1} max={40} step={1} suffix="yrs" />
        <Row
          label="Expected inflation"
          value={inflation}
          onChange={setInflation}
          min={0}
          max={12}
          step={0.5}
          suffix="% p.a."
          hint="India's long-term consumer inflation has averaged roughly 5–7%."
        />
      </Panel>

      <Panel title="Your investing plan">
        <Row
          label="Expected annual return"
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={1}
          max={20}
          step={0.5}
          suffix="% p.a."
          hint="Equity mutual funds are often assumed at ~11–13% over the long term."
        />
        <Row
          label="Already invested toward this"
          money
          value={existingCorpus}
          onChange={setExistingCorpus}
          min={0}
          max={goalToday}
          step={10000}
        />
      </Panel>

      {/* RESULTS — hero, chart, stats and the inflation note, all below
          the inputs that produce them. */}
      <div className="rounded-3xl border border-brand-900/10 bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg shadow-brand-900/15 sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-200">
          To reach your goal, invest
        </div>
        <div className="font-mono mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          ₹{inr(res.requiredSip)}<span className="text-lg font-semibold text-brand-200">/mo</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-100/90">
          <span>
            for {years} years to build ₹{compact(res.futureGoal)}
          </span>
        </div>
      </div>

      <Panel>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-700/60">Goal cost vs. your corpus</span>
          <ChartLegend
            items={[
              { label: "Your corpus", color: "var(--color-brand-600)" },
              { label: "Goal (inflating)", color: "var(--color-clay-500)", dashed: true },
            ]}
          />
        </div>
        <TrendChart
          xMax={res.points[res.points.length - 1]?.m ?? 1}
          yMax={Math.max(res.futureGoal, res.points[res.points.length - 1]?.corpus ?? 0)}
          xTick={(m) => (m === 0 ? "now" : `+${Math.round(m / 12)}y`)}
          yTickLabel={"₹" + compact(res.futureGoal)}
          series={[
            {
              points: res.points.map((p) => ({ x: p.m, y: p.corpus })),
              color: "var(--color-brand-600)",
              area: true,
              dotAtEnd: true,
            },
            {
              points: res.points.map((p) => ({ x: p.m, y: p.goal })),
              color: "var(--color-clay-500)",
              dashed: true,
              dotAtEnd: true,
            },
          ]}
        />
      </Panel>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Goal cost today" value={"₹" + compact(goalToday)} />
        <Stat label={`Goal cost in ${years}y`} value={"₹" + compact(res.futureGoal)} accent="clay" />
        <Stat label="Required monthly SIP" value={"₹" + inr(res.requiredSip)} accent="brand" />
        <Stat label="Total you'll invest" value={"₹" + compact(res.totalInvested)} />
      </div>

      <div className="rounded-2xl border border-ink-900/8 bg-brand-50/50 px-4 py-3.5 text-[13px] leading-relaxed text-ink-700/75">
        Inflation at {inflation}% turns today&rsquo;s ₹{compact(goalToday)} goal into{" "}
        <b className="font-mono font-semibold text-ink-900">₹{compact(res.futureGoal)}</b> by the time you need it.
        {existingCorpus > 0 && (
          <>
            {" "}
            Your existing ₹{compact(existingCorpus)} grows to{" "}
            <b className="font-mono font-semibold text-ink-900">₹{compact(res.existingFV)}</b> on its own, leaving{" "}
            <b className="font-mono font-semibold text-ink-900">₹{compact(res.remaining)}</b> to build via SIP.
          </>
        )}
      </div>

      <p className="px-1 text-[11.5px] leading-relaxed text-ink-700/50">
        Assumes a flat monthly SIP (no step-up) invested on the 1st of each month, growing at a constant rate, and a
        goal cost that inflates smoothly every year. Real costs and returns fluctuate — revisit this every year or two.
      </p>
    </div>
  );
}
