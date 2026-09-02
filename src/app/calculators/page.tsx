import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftRight, Home, Percent, PiggyBank, Target, TrendingUp, type LucideIcon } from "lucide-react";
import { calculators } from "@/lib/calculatorRegistry";
import { site, siteUrl } from "@/lib/site";
import CalcFaq from "@/components/calculators/CalcFaq";

const hubKeywords = [
  "financial calculators India",
  "SIP calculator",
  "EMI calculator",
  "home loan calculator",
  "lumpsum calculator",
  "goal planning calculator",
  "inflation calculator",
  "free investment calculator",
];

export const metadata: Metadata = {
  title: `Financial Calculators — SIP, EMI, Lumpsum & More | ${site.shortName}`,
  description:
    "Free, detailed financial calculators for Indian investors: SIP, lumpsum, goal planning, home loan EMI, buy-vs-invest and inflation — with charts, year-by-year breakdowns and inflation-adjusted values.",
  keywords: hubKeywords,
  alternates: { canonical: `${siteUrl}/calculators` },
  openGraph: {
    title: `Financial Calculators — ${site.shortName}`,
    description:
      "Six free calculators covering investing, home loans and inflation, with visual, detailed breakdowns.",
    url: `${siteUrl}/calculators`,
    type: "website",
  },
};

const iconMap: Record<string, LucideIcon> = {
  sip: PiggyBank,
  lumpsum: TrendingUp,
  "goal-planner": Target,
  "home-loan": Home,
  "buy-vs-invest": ArrowLeftRight,
  inflation: Percent,
};

const hubFaqs = [
  {
    q: "Are these financial calculators really free?",
    a: "Yes, every calculator on this page is free to use, with no sign-up or limit on how many times you use them. They're provided as a planning resource — using them doesn't commit you to anything.",
  },
  {
    q: "How accurate are the results?",
    a: "The underlying maths — compound interest, EMI amortization, inflation projection — is exact for whatever numbers you enter. What's inherently uncertain is the future: actual investment returns, interest rates and inflation all vary, so treat the outputs as planning estimates built on your assumptions, not guarantees.",
  },
  {
    q: "Which calculator should I use to plan for a specific goal, like retirement or a child's education?",
    a: "Start with the Goal Planner — it's built specifically to work backwards from a future goal (in today's cost) to the monthly SIP you'd need, accounting for inflation. The SIP and Lumpsum calculators are better suited when you already know an amount and want to see how it grows.",
  },
  {
    q: "Do these calculators account for inflation?",
    a: "Yes — every calculator here shows an inflation-adjusted 'today's money' figure alongside the raw future number, so you can see what a result would actually be worth in current purchasing power, not just its face value years from now.",
  },
  {
    q: "Can I use these calculators on my phone?",
    a: "Yes, every calculator is fully responsive and works on mobile, including the sliders and charts — designed so you can adjust numbers and see results update instantly, whichever device you're on.",
  },
];

export default function CalculatorsHub() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: calculators.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.title,
      url: `${siteUrl}/calculators/${c.slug}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hubFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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

        {/* WHY THESE CALCULATORS — SEO/education content */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Why plan with numbers first
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-[14.5px] leading-relaxed text-ink-700/75">
            <p>
              Insurance and investment decisions are easier to get right when you can see the actual numbers behind
              them — what a monthly SIP could realistically grow into, what a home loan EMI does to your budget over
              20 years, or how much inflation quietly adds to a goal you're saving for. These calculators are built
              to show that full picture: not just a single answer, but the year-by-year breakdown, the chart, and
              what the final number is actually worth once inflation is factored in.
            </p>
            <p>
              Every calculator here uses standard, well-established financial formulas — compound interest for
              investments, the reducing-balance method for loan EMIs, and compounding inflation for future costs —
              so the maths itself is exact for whatever assumptions you enter. Where they can't help is predicting
              the future: actual market returns, interest rates and inflation will always differ from any
              assumption, which is exactly why it helps to test a few different scenarios rather than trusting a
              single projection.
            </p>
            <p>
              If a calculator here raises a question specific to your situation — how much life cover you actually
              need alongside your investments, whether a home loan or a rented life with a bigger SIP fits you
              better, or how to sequence multiple goals — that's a conversation worth having with an advisor rather
              than a spreadsheet. {site.shortName} is happy to walk through any of these numbers with you, in Hindi
              or English, over WhatsApp.
            </p>
          </div>
        </div>

        {/* HUB FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Common questions about these calculators
          </h2>
          <div className="mt-6">
            <CalcFaq items={hubFaqs} />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
