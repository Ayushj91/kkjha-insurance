"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  amortizeLoan,
  compact,
  durationLabel,
  emiForTenure,
  inflateBackward,
  inr,
  monthYear,
} from "@/lib/finance";
import { Chip, ModeSwitch, Panel, Row, Stat, Toggle } from "./CalcUI";
import { ChartLegend, TrendChart } from "./Chart";

type Mode = "tenure" | "emi";

export default function HomeLoanCalculator() {
  const [mode, setMode] = useState<Mode>("tenure");
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [emiInput, setEmiInput] = useState(45000);

  const [extraOn, setExtraOn] = useState(false);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [extraEmis, setExtraEmis] = useState(1);

  const [stepOn, setStepOn] = useState(false);
  const [stepPct, setStepPct] = useState(5);
  const [inflation, setInflation] = useState(6);

  const startDate = useMemo(() => new Date(), []);

  const baseEmi = useMemo(() => {
    if (mode === "tenure") return emiForTenure(principal, rate, tenureYears);
    return emiInput;
  }, [mode, principal, rate, tenureYears, emiInput]);

  const args = {
    principal,
    annualRate: rate,
    emi: baseEmi,
    extraMonthly: extraOn ? extraMonthly : 0,
    extraEmisPerYear: extraOn ? extraEmis : 0,
    stepUpPct: stepOn ? stepPct : 0,
  };

  const plan = useMemo(() => amortizeLoan(args), [
    principal, rate, baseEmi, extraOn, extraMonthly, extraEmis, stepOn, stepPct,
  ]);
  const base = useMemo(() => amortizeLoan({ principal, annualRate: rate, emi: baseEmi }), [
    principal, rate, baseEmi,
  ]);

  const anyBoost = (extraOn && (extraMonthly > 0 || extraEmis > 0)) || (stepOn && stepPct > 0);

  const inputsProps = {
    mode, setMode,
    principal, setPrincipal,
    rate, setRate,
    tenureYears, setTenureYears,
    emiInput, setEmiInput,
    extraOn, setExtraOn,
    extraMonthly, setExtraMonthly,
    extraEmis, setExtraEmis,
    stepOn, setStepOn,
    stepPct, setStepPct,
    inflation, setInflation,
    plan,
  };

  if (!plan.feasible) {
    const need = Math.ceil((plan.minEmi + 500) / 500) * 500;
    return (
      <div className="flex flex-col gap-5">
        {/* INPUTS — shown first so the natural flow on mobile is choose your
            numbers, then scroll down to see what they produce. */}
        <LoanInputs {...inputsProps} />

        <div className="rounded-2xl border border-clay-600/25 bg-clay-500/5 p-5">
          <div className="mb-2 text-[15px] font-bold text-clay-700">This EMI won&rsquo;t clear the loan</div>
          <p className="text-[13.5px] leading-relaxed text-ink-700/75">
            At ₹{inr(baseEmi)}/month your payment barely covers the interest of ₹{inr(plan.minEmi)}/month — the
            balance never really falls. You need at least <b className="text-ink-900">₹{inr(need)}/month</b> to
            start making progress.
          </p>
          <button
            className="mt-4 rounded-full bg-clay-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-clay-500"
            onClick={() => {
              setMode("emi");
              setEmiInput(need);
            }}
          >
            Set EMI to ₹{inr(need)}
          </button>
        </div>

        <p className="px-1 text-[11.5px] leading-relaxed text-ink-700/50">
          Estimates assume a fixed rate and that extra EMIs land once a year. Real schedules vary with floating rates
          — treat this as a planning guide.
        </p>
      </div>
    );
  }

  const payoff = addMonths(startDate, plan.months);
  const basePayoff = base.feasible ? addMonths(startDate, base.months) : null;
  const saveMonths = base.feasible && anyBoost ? base.months - plan.months : 0;
  const saveInterest = base.feasible && anyBoost ? base.totalInterest - plan.totalInterest : 0;

  // Discount each year's interest (and total) individually rather than
  // applying one lump discount to the grand total — a loan's payments are
  // spread over many years, so a rupee of interest paid in year 2 is worth
  // more in today's money than a rupee paid in year 18.
  const realTotalInterest = plan.yearly.reduce(
    (sum: number, row: { year: number; interestPaid: number; principalPaid: number }) =>
      sum + row.interestPaid / Math.pow(1 + inflation / 100, row.year),
    0
  );
  const realTotalPaid = plan.yearly.reduce(
    (sum: number, row: { year: number; interestPaid: number; principalPaid: number }) =>
      sum + (row.interestPaid + row.principalPaid) / Math.pow(1 + inflation / 100, row.year),
    0
  );

  return (
    <div className="flex flex-col gap-5">
      {/* INPUTS — shown first so the natural flow on mobile is choose your
          numbers, then scroll down to see what they produce. */}
      <LoanInputs {...inputsProps} />

      {/* RESULTS — hero, chart, stats and the detailed breakdown, all below
          the inputs that produce them. */}
      <div className="rounded-3xl border border-brand-900/10 bg-gradient-to-br from-brand-600 to-brand-700 p-6 text-white shadow-lg shadow-brand-900/15 sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-200">You&rsquo;ll be loan-free by</div>
        <div className="font-mono mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{monthYear(payoff)}</div>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-brand-100/90">
          <span>{durationLabel(plan.months)} of payments · EMI ₹{inr(baseEmi)}</span>
          {anyBoost && saveMonths > 0 && (
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
              ↓ {durationLabel(saveMonths)} sooner
            </span>
          )}
        </div>
      </div>

      <Panel>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-700/60">Outstanding balance</span>
          <ChartLegend
            items={[
              { label: "Your plan", color: "var(--color-brand-600)" },
              ...(base.feasible && anyBoost && saveMonths > 0
                ? [{ label: "EMI only", color: "var(--color-gold-500)", dashed: true }]
                : []),
            ]}
          />
        </div>
        <TrendChart
          xMax={Math.max(plan.months, base.feasible ? base.months : plan.months)}
          yMax={principal}
          xTick={(m) => (m === 0 ? "now" : monthYear(addMonths(startDate, m)).split(" ")[1])}
          yTickLabel={"₹" + compact(principal)}
          band={
            anyBoost && saveMonths > 0 && base.feasible
              ? { x1: plan.months, x2: base.months, color: "var(--color-brand-600)", label: `${durationLabel(saveMonths)} sooner` }
              : null
          }
          series={[
            {
              points: plan.points.map((p) => ({ x: p.m, y: p.balance })),
              color: "var(--color-brand-600)",
              area: true,
              dotAtEnd: true,
            },
            ...(base.feasible && anyBoost && saveMonths > 0
              ? [
                  {
                    points: base.points.map((p) => ({ x: p.m, y: p.balance })),
                    color: "var(--color-gold-500)",
                    dashed: true,
                  },
                ]
              : []),
          ]}
        />
      </Panel>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Monthly EMI" value={"₹" + inr(baseEmi)} />
        <Stat label="Interest you'll pay" value={"₹" + compact(plan.totalInterest)} />
        <Stat
          label="Interest saved"
          value={anyBoost && saveInterest > 0 ? "₹" + compact(saveInterest) : "—"}
          accent={anyBoost && saveInterest > 0 ? "brand" : "muted"}
        />
        <Stat label="Total you'll repay" value={"₹" + compact(plan.totalPaid)} />
      </div>

      <div className="rounded-2xl border border-ink-900/8 bg-brand-50/50 px-4 py-3.5 text-[13px] leading-relaxed text-ink-700/75">
        In today&rsquo;s money (after {inflation}% inflation, discounted year by year), that&rsquo;s really about{" "}
        <b className="font-mono font-semibold text-ink-900">₹{compact(realTotalInterest)}</b> in interest and{" "}
        <b className="font-mono font-semibold text-ink-900">₹{compact(realTotalPaid)}</b> repaid in total — future
        rupees are worth less than what they buy now.
      </div>

      {anyBoost && base.feasible && (
        <div className="rounded-2xl border border-ink-900/8 bg-brand-50/50 px-4 py-3.5 text-[13px] leading-relaxed text-ink-700/75">
          On EMI alone you&rsquo;d finish <b className="font-mono font-semibold text-ink-900">{basePayoff && monthYear(basePayoff)}</b>{" "}
          ({durationLabel(base.months)}) and pay{" "}
          <b className="font-mono font-semibold text-ink-900">₹{compact(base.totalInterest)}</b> in interest.
        </div>
      )}

      <Panel title="Year-by-year breakdown">
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13px]">
            <thead>
              <tr className="text-left text-ink-700/50">
                <th className="px-3 py-2 font-medium">Year</th>
                <th className="px-3 py-2 font-medium">Principal paid</th>
                <th className="px-3 py-2 font-medium">Interest paid</th>
                <th className="px-3 py-2 font-medium">Balance left</th>
                <th className="px-3 py-2 font-medium">Balance (today&rsquo;s money)</th>
              </tr>
            </thead>
            <tbody>
              {plan.yearly.map((row) => (
                <tr key={row.year} className="border-t border-ink-900/6">
                  <td className="px-3 py-2 font-semibold text-ink-900">Yr {row.year}</td>
                  <td className="font-mono px-3 py-2 text-brand-700">₹{compact(row.principalPaid)}</td>
                  <td className="font-mono px-3 py-2 text-clay-600">₹{compact(row.interestPaid)}</td>
                  <td className="font-mono px-3 py-2 text-ink-700/70">₹{compact(row.balance)}</td>
                  <td className="font-mono px-3 py-2 text-ink-700/60">
                    ₹{compact(inflateBackward(row.balance, row.year, inflation))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="px-1 text-[11.5px] leading-relaxed text-ink-700/50">
        Estimates assume a fixed rate and that extra EMIs land once a year. Real schedules vary with floating rates —
        treat this as a planning guide.
      </p>
    </div>
  );
}

function LoanInputs(p: {
  mode: Mode; setMode: (m: Mode) => void;
  principal: number; setPrincipal: (v: number) => void;
  rate: number; setRate: (v: number) => void;
  tenureYears: number; setTenureYears: (v: number) => void;
  emiInput: number; setEmiInput: (v: number) => void;
  extraOn: boolean; setExtraOn: (v: boolean) => void;
  extraMonthly: number; setExtraMonthly: (v: number) => void;
  extraEmis: number; setExtraEmis: (v: number) => void;
  stepOn: boolean; setStepOn: (v: boolean) => void;
  stepPct: number; setStepPct: (v: number) => void;
  inflation: number; setInflation: (v: number) => void;
  plan: ReturnType<typeof amortizeLoan>;
}) {
  return (
    <>
      <Panel title="Your loan">
        <div className="mb-5">
          <ModeSwitch
            value={p.mode}
            onChange={p.setMode}
            options={[
              { value: "tenure", label: "I know my tenure" },
              { value: "emi", label: "I know my EMI" },
            ]}
          />
        </div>
        <Row label="Loan amount" money value={p.principal} onChange={p.setPrincipal} min={100000} max={50000000} step={50000} />
        <Row label="Interest rate" value={p.rate} onChange={p.setRate} min={5} max={15} step={0.05} suffix="% p.a." />
        {p.mode === "tenure" ? (
          <Row label="Loan tenure" value={p.tenureYears} onChange={p.setTenureYears} min={1} max={30} step={1} suffix="yrs" />
        ) : (
          <Row label="Monthly EMI" money value={p.emiInput} onChange={p.setEmiInput} min={2000} max={1000000} step={500} />
        )}
        <Row
          label="Expected inflation"
          value={p.inflation}
          onChange={p.setInflation}
          min={0}
          max={12}
          step={0.5}
          suffix="% p.a."
          hint="Used to show interest and repayments in today's purchasing power, alongside the nominal numbers"
        />
      </Panel>

      <Panel title="Speed it up">
        <div className="mb-4 flex flex-wrap gap-2">
          <Chip onClick={() => { p.setExtraOn(true); p.setExtraEmis(1); }}>1 extra EMI/yr</Chip>
          <Chip onClick={() => { p.setExtraOn(true); p.setExtraEmis(2); }}>2 extra EMIs/yr</Chip>
          <Chip onClick={() => { p.setStepOn(true); p.setStepPct(10); }}>Step up 10%/yr</Chip>
          <Chip
            onClick={() => {
              p.setExtraOn(false); p.setExtraMonthly(0); p.setExtraEmis(0);
              p.setStepOn(false); p.setStepPct(0);
            }}
          >
            Clear boosts
          </Chip>
        </div>

        <Toggle on={p.extraOn} set={p.setExtraOn}>Pay a little extra</Toggle>
        {p.extraOn && (
          <div className="py-3">
            <Row label="Extra every month" money value={p.extraMonthly} onChange={p.setExtraMonthly} min={0} max={100000} step={500} />
            <Row
              label="Extra EMIs per year"
              value={p.extraEmis}
              onChange={p.setExtraEmis}
              min={0}
              max={6}
              step={1}
              suffix={p.extraEmis === 1 ? "EMI" : "EMIs"}
              hint="A lump sum from a bonus, paid once a year"
            />
          </div>
        )}

        <Toggle on={p.stepOn} set={p.setStepOn}>Step up my EMI yearly</Toggle>
        {p.stepOn && (
          <div className="py-3">
            <Row
              label="Increase EMI by"
              value={p.stepPct}
              onChange={p.setStepPct}
              min={0}
              max={25}
              step={1}
              suffix="% / yr"
              hint={
                p.plan.feasible
                  ? `Your EMI grows to about ₹${inr(p.plan.finalEmi)} by the end`
                  : "Raise your EMI a bit each year as income grows"
              }
            />
          </div>
        )}
      </Panel>
    </>
  );
}
