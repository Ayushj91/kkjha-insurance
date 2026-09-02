import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Sigma } from "lucide-react";
import { calculatorBySlug, calculators } from "@/lib/calculatorRegistry";
import { calculatorContentBySlug } from "@/lib/calculatorContent";
import { site, siteUrl, waLink } from "@/lib/site";
import SipCalculator from "@/components/calculators/SipCalculator";
import LumpsumCalculator from "@/components/calculators/LumpsumCalculator";
import GoalPlanner from "@/components/calculators/GoalPlanner";
import HomeLoanCalculator from "@/components/calculators/HomeLoanCalculator";
import BuyVsInvestCalculator from "@/components/calculators/BuyVsInvestCalculator";
import InflationCalculator from "@/components/calculators/InflationCalculator";
import CalcFaq from "@/components/calculators/CalcFaq";

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
  const content = calculatorContentBySlug(slug);
  const title = content ? `${content.metaTitle} — ${site.shortName}` : `${meta.title} — ${site.shortName}`;
  const description = content?.metaDescription ?? meta.description;
  const url = `${siteUrl}/calculators/${slug}`;

  return {
    title,
    description,
    keywords: content?.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.title} — ${site.shortName}`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} — ${site.shortName}`,
      description,
    },
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

  const content = calculatorContentBySlug(slug);
  const others = calculators.filter((c) => c.slug !== slug);
  const pageUrl = `${siteUrl}/calculators/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/calculators` },
      { "@type": "ListItem", position: 3, name: meta.title, item: pageUrl },
    ],
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.title,
    url: pageUrl,
    description: content?.metaDescription ?? meta.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: site.name },
  };

  const faqJsonLd = content
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

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

        {content && (
          <div className="mt-14 flex flex-col gap-10">
            {/* OVERVIEW */}
            <section aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="font-display text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                {meta.category === "Loans" ? "Understanding this calculator" : `About the ${meta.shortTitle} calculator`}
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {content.overview.map((para, i) => (
                  <p key={i} className="text-[14.5px] leading-relaxed text-ink-700/75">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section aria-labelledby="how-it-works-heading">
              <h2 id="how-it-works-heading" className="font-display text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                How to use it
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {content.howItWorks.map((step, i) => (
                  <div key={step.title} className="rounded-2xl border border-ink-900/8 bg-white p-4.5 sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-bold text-brand-700">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-[13.5px] font-bold text-ink-900">{step.title}</div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-700/70">{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FORMULA */}
            <section aria-labelledby="formula-heading">
              <h2 id="formula-heading" className="font-display flex items-center gap-2 text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                <Sigma className="h-5 w-5 text-brand-600" strokeWidth={2.5} />
                The formula behind it
              </h2>
              <div className="mt-5 flex flex-col gap-3">
                {content.formula.map((f) => (
                  <div key={f.name} className="rounded-2xl border border-ink-900/8 bg-ink-950 p-5">
                    <div className="text-[11.5px] font-semibold uppercase tracking-wide text-brand-300/80">{f.name}</div>
                    <div className="font-mono mt-2 overflow-x-auto whitespace-pre text-[15px] font-semibold text-white sm:text-base">
                      {f.expression}
                    </div>
                    <p className="mt-3 text-[12.5px] leading-relaxed text-white/60">{f.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TIPS */}
            <section aria-labelledby="tips-heading">
              <h2 id="tips-heading" className="font-display text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                Things worth knowing
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {content.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 rounded-2xl border border-ink-900/8 bg-brand-50/40 p-4">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="text-[13.5px] leading-relaxed text-ink-700/80">{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-display text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
                Frequently asked questions
              </h2>
              <div className="mt-5">
                <CalcFaq items={content.faqs} />
              </div>
            </section>

            {/* CTA */}
            <div className="rounded-2xl border border-brand-900/10 bg-gradient-to-br from-brand-600 to-brand-700 p-5 text-white sm:p-6">
              <div className="text-[13.5px] font-bold sm:text-[14.5px]">
                Want help turning these numbers into an actual plan?
              </div>
              <p className="mt-1.5 max-w-lg text-[13px] leading-relaxed text-brand-100/85">
                Calculators are a great starting point, but the right numbers for your situation depend on your
                goals, timeline and risk appetite — {site.shortName} can walk through it with you, in Hindi or
                English.
              </p>
              <a
                href={waLink(`Hi! I used the ${meta.title} on your website and wanted to talk through my numbers.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-bold text-brand-700 transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* cross-links */}
        <div className="mt-14 border-t border-ink-900/8 pt-8">
          <div className="mb-4 text-[13px] font-semibold text-ink-900">More calculators</div>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                title={c.description}
                className="rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:border-brand-500/40 hover:text-brand-700"
              >
                {c.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </div>
  );
}
