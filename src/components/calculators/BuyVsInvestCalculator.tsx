"use client";

import { useMemo, useState } from "react";
import { compact, inflateBackward, inr, simulateBuyVsInvest } from "@/lib/finance";
import { Panel, Row, Stat, Toggle } from "./CalcUI";
import { ChartLegend, TrendChart } from "./Chart";

export default function BuyVsInvestCalculator() {
  const [homePrice, setHomePrice] = useState(10000000);
  const [downPayment, setDownPayment] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [appreciation, setAppreciation] = useState(7);

  const [sipReturn, setSipReturn] = useState(12);
  const [rent0, setRent0] = useState(30000);
  const [rentGrowth, setRentGrowth] = useState(7);
  const [accountRent, setAccountRent] = useState(true);
  const [inflation, setInflation] = useState(6);

  const res = useMemo(
    () =>
      simulateBuyVsInvest({
        homePrice, downPayment, rate, years, appreciation, sipReturn, rent0, rentGrowth, accountRent,
      }),
    [homePrice, downPayment, rate, years, appreciation, sipReturn, rent0, rentGrowth, accountRent]
  );

  const sipWins = res.sipFinal >= res.homeFinal;
  const gap = Math.abs(res.sipFinal - res.homeFinal);
  const dpPct = Math.round((downPayment / homePrice) * 100);
  const realHomeFinal = inflateBackward(res.homeFinal, years, inflation);
  const realSipFinal = inflateBackward(res.sipFinal, years, inflation);

  return (
    <div className="flex flex-col gap-5">
      {/* INPUTS — shown first so the natural flow on mobile is choose your
          numbers, then scroll down to see what they produce. */}
      <Panel title="The home">
        <Row label="Home price" money value={homePrice} onChange={setHomePrice} min={1000000} max={100000000} step={100000} />
        <Row
          label="Down payment"
          money
          value={downPayment}
          onChange={setDownPayment}
          min={0}
          max={homePrice}
          step={100000}
          hint={`${dpPct}% of the price`}
        />
        <Row label="Loan interest rate" value={rate} onChange={setRate} min={5} max={15} step={0.05} suffix="% p.a." />
        <Row label="Loan tenure" value={years} onChange={setYears} min={5} max={30} step={1} suffix="yrs" />
        <Row
          label="Home appreciation"
          value={appreciation}
          onChange={setAppreciation}
          min={0}
          max={15}
          step={0.5}
          suffix="% / yr"
          hint="Long-term Indian real estate is often ~5–8% p.a."
        />
      </Panel>

      <Panel title="Investing instead">
        <Row
          label="Expected SIP return"
          value={sipReturn}
          onChange={setSipReturn}
          min={5}
          max={18}
          step={0.5}
          suffix="% / yr"
          hint="Equity mutual funds are often assumed at ~11–13%."
        />
        <Row
          label="Expected inflation"
          value={inflation}
          onChange={setInflation}
          min={0}
          max={12}
          step={0.5}
          suffix="% p.a."
          hint="Used to show both final values in today's purchasing power, alongside the nominal numbers"
        />

        <Toggle on={accountRent} set={setAccountRent}>Account for rent (fair comparison)</Toggle>
        <div className="mb-1 mt-1 text-[11.5px] leading-relaxed text-ink-700/55">
          {accountRent
            ? "You rent a home and invest only what's left after rent — the honest way to compare."
            : "You invest the full EMI amount and ignore rent — the loan-free person still needs somewhere to live, so this flatters the SIP."}
        </div>

        {accountRent && (
          <div className="pt-3">
            <Row label="Current rent" money value={rent0} onChange={setRent0} min={0} max={300000} step={1000} />
            <Row label="Rent increase" value={rentGrowth} onChange={setRentGrowth} min={0} max={15} step={0.5} suffix="% / yr" />
          </div>
        )}
      </Panel>

      {/* RESULTS — the verdict, chart, stats and inflation note, all below
          the inputs that produce them. */}
      <div className="rounded-3xl border border-ink-900/8 bg-white p-6 shadow-sm shadow-ink-900/5 sm:p-8">
        <div className="mb-4 text-[13px] font-medium text-ink-700/60">After {years} years, you&rsquo;d have</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            className={`rounded-2xl border p-4 transition-shadow ${
              !sipWins ? "border-gold-500 shadow-md shadow-gold-500/15" : "border-ink-900/8"
            } bg-gold-400/5`}
          >
            <div className="text-xs font-medium text-ink-700/55">Home equity</div>
            <div className="font-mono mt-2 text-2xl font-bold tracking-tight text-gold-600 sm:text-3xl">
              ₹{compact(res.homeFinal)}
            </div>
            <div className="font-mono mt-1 text-[11.5px] text-ink-700/50">
              ≈ ₹{compact(realHomeFinal)} today&rsquo;s money
            </div>
          </div>
          <div
            className={`rounded-2xl border p-4 transition-shadow ${
              sipWins ? "border-brand-500 shadow-md shadow-brand-500/15" : "border-ink-900/8"
            } bg-brand-50/50`}
          >
            <div className="text-xs font-medium text-ink-700/55">SIP corpus</div>
            <div className="font-mono mt-2 text-2xl font-bold tracking-tight text-brand-700 sm:text-3xl">
              ₹{compact(res.sipFinal)}
            </div>
            <div className="font-mono mt-1 text-[11.5px] text-ink-700/50">
              ≈ ₹{compact(realSipFinal)} today&rsquo;s money
            </div>
          </div>
        </div>
        <div className="mt-4 text-[13.5px] text-ink-700/70">
          {sipWins ? "Investing" : "Buying"} comes out ahead by{" "}
          <b className={"font-mono font-semibold " + (sipWins ? "text-brand-700" : "text-gold-600")}>
            ₹{compact(gap)}
          </b>
        </div>
      </div>

      <Panel>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-ink-700/60">Net worth over time</span>
          <ChartLegend
            items={[
              { label: "Home", color: "var(--color-gold-500)" },
              { label: "SIP", color: "var(--color-brand-600)" },
            ]}
          />
        </div>
        <TrendChart
          xMax={res.months}
          yMax={Math.max(res.homeFinal, res.sipFinal) * 1.05}
          xTick={(m) => (m === 0 ? "now" : `+${Math.round(m / 12)}y`)}
          yTickLabel={"₹" + compact(Math.max(res.homeFinal, res.sipFinal))}
          markers={
            res.crossover
              ? [
                  {
                    x: res.crossover,
                    y: res.home[res.crossover]?.value ?? 0,
                    color: "var(--color-ink-700)",
                    label: `cross at yr ${Math.round(res.crossover / 12)}`,
                    dropLine: true,
                  },
                ]
              : []
          }
          series={[
            {
              points: res.home.map((p) => ({ x: p.m, y: p.value })),
              color: "var(--color-gold-500)",
              dotAtEnd: true,
            },
            {
              points: res.sip.map((p) => ({ x: p.m, y: p.value })),
              color: "var(--color-brand-600)",
              area: true,
              dotAtEnd: true,
            },
          ]}
        />
      </Panel>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Your EMI" value={"₹" + inr(res.emi)} />
        <Stat label={accountRent ? "Invested/mo (start)" : "SIP amount/mo"} value={"₹" + inr(res.monthlySip)} />
        <Stat
          label={res.crossover ? "Lines cross at" : sipWins ? "SIP leads" : "Home leads"}
          value={res.crossover ? `Yr ${Math.round(res.crossover / 12)}` : "throughout"}
        />
        <Stat label="Home's market value" value={"₹" + compact(res.homeValueFinal)} accent="gold" />
      </div>

      <div className="rounded-2xl border border-ink-900/8 bg-brand-50/50 px-4 py-3.5 text-[13px] leading-relaxed text-ink-700/75">
        The home is worth <b className="font-mono font-semibold text-ink-900">₹{compact(res.homeValueFinal)}</b> by
        then, loan cleared.
        {accountRent && (
          <>
            {" "}
            Over {years} years you&rsquo;d pay <b className="font-mono font-semibold text-ink-900">₹{compact(res.totalRent)}</b> in
            rent while investing the rest.
          </>
        )}
      </div>

      <p className="px-1 text-[11.5px] leading-relaxed text-ink-700/50">
        Both paths start from the same money (your down payment) and the same monthly outflow, so it&rsquo;s a
        like-for-like comparison. It leaves out a few real factors — home-loan tax breaks, capital-gains tax on
        mutual funds, maintenance and property tax, and that once the loan ends you could invest the freed-up EMI.
        Use it to see how the assumptions swing the answer, not as a final verdict.
      </p>
    </div>
  );
}
