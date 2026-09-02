// Shared, dependency-free financial math + formatting used by every
// calculator on the site. Kept framework-agnostic (pure functions) so it's
// easy to unit-reason about and reuse across calculator components.

export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(n || 0)
  );

// Compact Indian units — "12.5 L", "1.2 Cr" — used wherever space is tight
// (chart labels, stat tiles).
export const compact = (n: number) => {
  n = Math.round(n || 0);
  const neg = n < 0 ? "-" : "";
  n = Math.abs(n);
  if (n >= 1e7) return neg + (n / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Cr";
  if (n >= 1e5) return neg + (n / 1e5).toFixed(2).replace(/\.?0+$/, "") + " L";
  if (n >= 1e3) return neg + (n / 1e3).toFixed(1).replace(/\.0$/, "") + " K";
  return neg + inr(n);
};

export const durationLabel = (months: number) => {
  months = Math.max(0, Math.round(months));
  const y = Math.floor(months / 12);
  const m = months % 12;
  const yp = y ? `${y} yr${y > 1 ? "s" : ""}` : "";
  const mp = m ? `${m} mo${m > 1 ? "s" : ""}` : "";
  if (!yp && !mp) return "0 mos";
  return [yp, mp].filter(Boolean).join(" ");
};

export const addMonths = (d: Date, m: number) =>
  new Date(d.getFullYear(), d.getMonth() + m, 1);

export const monthYear = (d: Date) =>
  d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });

// ---------------------------------------------------------------------
// SIP — monthly investment, compounded monthly, invested at the start of
// each month (the standard "annuity due" convention Indian SIP calculators
// use). Simulated month-by-month (rather than the closed-form formula) so
// step-up SIPs and yearly breakdowns fall out for free and stay accurate.
// ---------------------------------------------------------------------
export interface SipInput {
  monthlyAmount: number;
  annualReturn: number;
  years: number;
  stepUpPct?: number;
  existingCorpus?: number;
}
export interface SipPoint {
  m: number;
  invested: number;
  value: number;
}
export interface SipResult {
  months: number;
  invested: number;
  corpus: number;
  gain: number;
  points: SipPoint[];
  finalMonthlyAmount: number;
  yearly: { year: number; invested: number; value: number; gain: number }[];
}
export function simulateSip({
  monthlyAmount,
  annualReturn,
  years,
  stepUpPct = 0,
  existingCorpus = 0,
}: SipInput): SipResult {
  const r = annualReturn / 100 / 12;
  const months = Math.round(years * 12);
  let corpus = existingCorpus;
  let invested = existingCorpus;
  let curAmt = monthlyAmount;
  const points: SipPoint[] = [{ m: 0, invested, value: corpus }];
  const yearly: SipResult["yearly"] = [];

  for (let m = 1; m <= months; m++) {
    if (stepUpPct > 0 && m > 1 && (m - 1) % 12 === 0) {
      curAmt = curAmt * (1 + stepUpPct / 100);
    }
    corpus = (corpus + curAmt) * (1 + r);
    invested += curAmt;
    points.push({ m, invested, value: corpus });
    if (m % 12 === 0) {
      yearly.push({ year: m / 12, invested, value: corpus, gain: corpus - invested });
    }
  }
  if (months % 12 !== 0) {
    yearly.push({ year: years, invested, value: corpus, gain: corpus - invested });
  }

  return {
    months,
    invested,
    corpus,
    gain: corpus - invested,
    points,
    finalMonthlyAmount: curAmt,
    yearly,
  };
}

// ---------------------------------------------------------------------
// Lumpsum — a single investment compounding annually (CAGR-style), with a
// monthly-resolution point series so it can share the chart component.
// ---------------------------------------------------------------------
export interface LumpsumResult {
  invested: number;
  corpus: number;
  gain: number;
  points: SipPoint[];
  yearly: { year: number; value: number }[];
}
export function simulateLumpsum({
  amount,
  annualReturn,
  years,
}: {
  amount: number;
  annualReturn: number;
  years: number;
}): LumpsumResult {
  const months = Math.round(years * 12);
  const points: SipPoint[] = [];
  const yearly: LumpsumResult["yearly"] = [];
  for (let m = 0; m <= months; m++) {
    const value = amount * Math.pow(1 + annualReturn / 100, m / 12);
    points.push({ m, invested: amount, value });
    if (m % 12 === 0) yearly.push({ year: m / 12, value });
  }
  const corpus = points[points.length - 1].value;
  return { invested: amount, corpus, gain: corpus - amount, points, yearly };
}

// ---------------------------------------------------------------------
// Goal planner — an inflation-adjusted future goal, and the flat monthly
// SIP required to reach it (accounting for any lump sum already saved).
// ---------------------------------------------------------------------
export interface GoalResult {
  futureGoal: number;
  existingFV: number;
  remaining: number;
  requiredSip: number;
  points: { m: number; goal: number; corpus: number }[];
  totalInvested: number;
  totalGain: number;
}
export function planGoal({
  goalToday,
  years,
  inflation,
  expectedReturn,
  existingCorpus = 0,
}: {
  goalToday: number;
  years: number;
  inflation: number;
  expectedReturn: number;
  existingCorpus?: number;
}): GoalResult {
  const months = Math.round(years * 12);
  const futureGoal = goalToday * Math.pow(1 + inflation / 100, years);
  const r = expectedReturn / 100 / 12;
  const existingFV = existingCorpus * Math.pow(1 + expectedReturn / 100, years);
  const remaining = Math.max(futureGoal - existingFV, 0);

  const factor =
    r === 0 ? months : (((Math.pow(1 + r, months) - 1) / r) * (1 + r));
  const requiredSip = months > 0 ? remaining / factor : 0;

  // Build a matching point series so the chart can show the goal line
  // (inflating smoothly) against the corpus actually being built.
  let corpus = existingCorpus;
  const points: GoalResult["points"] = [
    { m: 0, goal: goalToday, corpus },
  ];
  let invested = existingCorpus;
  for (let m = 1; m <= months; m++) {
    corpus = (corpus + requiredSip) * (1 + r);
    invested += requiredSip;
    const goalAtM = goalToday * Math.pow(1 + inflation / 100, m / 12);
    points.push({ m, goal: goalAtM, corpus });
  }

  return {
    futureGoal,
    existingFV,
    remaining,
    requiredSip,
    points,
    totalInvested: invested,
    totalGain: corpus - invested,
  };
}

// ---------------------------------------------------------------------
// Inflation — future cost of a present-day expense, and the flip side:
// what a future rupee amount is really worth in today's purchasing power.
// ---------------------------------------------------------------------
export function inflateForward(amount: number, years: number, inflation: number) {
  return amount * Math.pow(1 + inflation / 100, years);
}
export function inflateBackward(amount: number, years: number, inflation: number) {
  return amount / Math.pow(1 + inflation / 100, years);
}
export interface InflationResult {
  futureAmount: number;
  purchasingPowerLoss: number; // as a %, of today's value
  points: { year: number; nominal: number; real: number }[];
}
export function simulateInflation({
  amount,
  years,
  inflation,
}: {
  amount: number;
  years: number;
  inflation: number;
}): InflationResult {
  const points: InflationResult["points"] = [];
  for (let y = 0; y <= years; y++) {
    points.push({
      year: y,
      nominal: amount, // sticker price stays the same
      real: inflateBackward(amount, y, inflation), // what it can still buy
    });
  }
  const futureAmount = inflateForward(amount, years, inflation);
  const purchasingPowerLoss =
    (1 - inflateBackward(amount, years, inflation) / amount) * 100;
  return { futureAmount, purchasingPowerLoss, points };
}

// ---------------------------------------------------------------------
// Home loan — standard EMI formula, plus a month-by-month amortization
// that supports prepayments (extra monthly / extra EMIs per year) and a
// yearly EMI step-up. Two entry modes share this same engine:
//   - "tenure" mode derives the EMI from principal/rate/years
//   - "emi" mode takes a known EMI and derives the payoff tenure
// ---------------------------------------------------------------------
export function emiForTenure(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = Math.round(years * 12);
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

export interface AmortizeInput {
  principal: number;
  annualRate: number;
  emi: number;
  extraMonthly?: number;
  extraEmisPerYear?: number;
  stepUpPct?: number;
}
export interface AmortizePoint {
  m: number;
  balance: number;
}
export type AmortizeResult =
  | { feasible: false; minEmi: number }
  | {
      feasible: true;
      months: number;
      totalInterest: number;
      totalPaid: number;
      points: AmortizePoint[];
      finalEmi: number;
      yearly: { year: number; interestPaid: number; principalPaid: number; balance: number }[];
    };

export function amortizeLoan({
  principal,
  annualRate,
  emi,
  extraMonthly = 0,
  extraEmisPerYear = 0,
  stepUpPct = 0,
}: AmortizeInput): AmortizeResult {
  const r = annualRate / 12 / 100;
  const MAX = 720; // 60-year safety cap
  let balance = principal;
  let month = 0;
  let totalInterest = 0;
  let curEmi = emi;
  let maxEmi = emi;
  const points: AmortizePoint[] = [{ m: 0, balance }];
  const yearly: NonNullable<Extract<AmortizeResult, { feasible: true }>>["yearly"] = [];
  let yearInterest = 0;
  let yearPrincipal = 0;

  if (emi + extraMonthly <= balance * r) {
    return { feasible: false, minEmi: balance * r };
  }

  while (balance > 0.5 && month < MAX) {
    month++;
    if (stepUpPct > 0 && month > 1 && (month - 1) % 12 === 0) {
      curEmi = curEmi * (1 + stepUpPct / 100);
      maxEmi = Math.max(maxEmi, curEmi);
    }
    const interest = balance * r;
    totalInterest += interest;
    yearInterest += interest;
    const payment = curEmi + extraMonthly;
    const principalPaid = payment - interest;
    balance = balance - principalPaid;
    yearPrincipal += principalPaid;
    if (extraEmisPerYear > 0 && month % 12 === 0 && balance > 0) {
      const lump = extraEmisPerYear * curEmi;
      balance -= lump;
      yearPrincipal += lump;
    }
    if (balance < 0) balance = 0;
    points.push({ m: month, balance: Math.max(balance, 0) });

    if (month % 12 === 0 || balance <= 0.5) {
      yearly.push({
        year: Math.ceil(month / 12),
        interestPaid: yearInterest,
        principalPaid: yearPrincipal,
        balance,
      });
      yearInterest = 0;
      yearPrincipal = 0;
    }
  }

  return {
    feasible: true,
    months: month,
    totalInterest,
    totalPaid: principal + totalInterest,
    points,
    finalEmi: maxEmi,
    yearly,
  };
}

// ---------------------------------------------------------------------
// Buy-a-home vs invest-the-difference — the same money (a down payment) and
// the same monthly outflow (the EMI) are pitted against a "rent + invest
// the rest" path, so the comparison is apples-to-apples.
// ---------------------------------------------------------------------
export interface BuyVsInvestInput {
  homePrice: number;
  downPayment: number;
  rate: number;
  years: number;
  appreciation: number;
  sipReturn: number;
  rent0: number;
  rentGrowth: number;
  accountRent: boolean;
}
export interface BuyVsInvestResult {
  emi: number;
  loan: number;
  months: number;
  home: SipPoint[]; // reuse {m, value} shape via `invested` unused
  sip: SipPoint[];
  homeFinal: number;
  sipFinal: number;
  homeValueFinal: number;
  totalRent: number;
  totalContrib: number;
  totalEmi: number;
  crossover: number | null;
  monthlySip: number;
}
export function simulateBuyVsInvest({
  homePrice,
  downPayment,
  rate,
  years,
  appreciation,
  sipReturn,
  rent0,
  rentGrowth,
  accountRent,
}: BuyVsInvestInput): BuyVsInvestResult {
  const loan = Math.max(homePrice - downPayment, 0);
  const r = rate / 12 / 100;
  const n = Math.round(years * 12);
  const emi =
    r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const rm = sipReturn / 12 / 100;
  let corpus = downPayment;
  let balance = loan;
  let rent = rent0;
  let totalRent = 0;
  let totalContrib = 0;
  let totalEmi = 0;

  const home: SipPoint[] = [{ m: 0, invested: 0, value: homePrice - loan }];
  const sip: SipPoint[] = [{ m: 0, invested: downPayment, value: downPayment }];

  let crossover: number | null = null;
  let prevSign = 0;

  for (let m = 1; m <= n; m++) {
    if (m > 1 && (m - 1) % 12 === 0) rent *= 1 + rentGrowth / 100;

    const interest = balance * r;
    balance = Math.max(balance - (emi - interest), 0);
    totalEmi += emi;
    const homeVal = homePrice * Math.pow(1 + appreciation / 100, m / 12);
    const homeEquity = homeVal - balance;

    corpus = corpus * (1 + rm);
    const contribution = accountRent ? Math.max(emi - rent, 0) : emi;
    corpus += contribution;
    totalContrib += contribution;
    if (accountRent) totalRent += rent;

    home.push({ m, invested: 0, value: homeEquity });
    sip.push({ m, invested: 0, value: corpus });

    const s = Math.sign(corpus - homeEquity);
    if (s !== 0) {
      if (prevSign !== 0 && s !== prevSign && crossover === null) crossover = m;
      prevSign = s;
    }
  }

  return {
    emi,
    loan,
    months: n,
    home,
    sip,
    homeFinal: home[home.length - 1].value,
    sipFinal: sip[sip.length - 1].value,
    homeValueFinal: homePrice * Math.pow(1 + appreciation / 100, years),
    totalRent,
    totalContrib,
    totalEmi,
    crossover,
    monthlySip: accountRent ? Math.max(emi - rent0, 0) : emi,
  };
}
