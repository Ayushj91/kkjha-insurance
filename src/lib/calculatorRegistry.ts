// Metadata for every calculator — kept separate from the calculator
// components themselves so this file stays lightweight and importable from
// server components (the hub page, route metadata) without pulling in any
// client-side chart/state code.

export type CalculatorCategory = "Investing" | "Loans" | "Inflation";

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle: string;
  category: CalculatorCategory;
  description: string;
  image: string;
}

export const calculators: CalculatorMeta[] = [
  {
    slug: "sip",
    title: "SIP Calculator",
    shortTitle: "SIP",
    category: "Investing",
    description:
      "See how a monthly SIP grows over time, with optional yearly step-ups.",
    image: "/images/calculators/sip.svg",
  },
  {
    slug: "lumpsum",
    title: "Lumpsum Calculator",
    shortTitle: "Lumpsum",
    category: "Investing",
    description: "Project how a one-time investment compounds over the years.",
    image: "/images/calculators/lumpsum.svg",
  },
  {
    slug: "goal-planner",
    title: "Goal Planner",
    shortTitle: "Goal Planner",
    category: "Investing",
    description:
      "Work out the monthly SIP needed to hit an inflation-adjusted goal — retirement, education, a big purchase.",
    image: "/images/calculators/goal.svg",
  },
  {
    slug: "home-loan",
    title: "Home Loan / EMI Calculator",
    shortTitle: "Home Loan",
    category: "Loans",
    description:
      "Work out your EMI, see the full payoff schedule, and test prepayments or a step-up EMI.",
    image: "/images/services/home.svg",
  },
  {
    slug: "buy-vs-invest",
    title: "Buy a Home vs Invest",
    shortTitle: "Buy vs Invest",
    category: "Loans",
    description:
      "Compare building home equity against renting and investing the difference via SIP.",
    image: "/images/calculators/buy-vs-invest.svg",
  },
  {
    slug: "inflation",
    title: "Inflation Calculator",
    shortTitle: "Inflation",
    category: "Inflation",
    description:
      "See what today's expenses will cost in the future, and how much purchasing power inflation quietly erodes.",
    image: "/images/calculators/inflation.svg",
  },
];

export const calculatorBySlug = (slug: string) =>
  calculators.find((c) => c.slug === slug);
