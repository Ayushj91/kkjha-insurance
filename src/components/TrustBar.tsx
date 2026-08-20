import { Award, BadgeCheck, Building2, ShieldCheck } from "lucide-react";
import { credentials, hi } from "@/lib/site";

const badgeIcons = [ShieldCheck, BadgeCheck, Award, Building2];

export default function TrustBar() {
  return (
    <section className="border-b border-brand-900/5 bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-ink-700/50">
          Authorised partner &amp; certified advisor
          <span className="mx-2 text-ink-900/15">•</span>
          <span lang="hi" className="normal-case tracking-normal text-ink-700/45">
            {hi.trustEyebrow}
          </span>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {credentials.map((c, i) => {
            const Icon = badgeIcons[i % badgeIcons.length];
            return (
              <div
                key={c.org}
                className="flex items-center gap-2.5 rounded-xl border border-ink-900/8 bg-brand-50/40 px-3.5 py-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    c.accent === "gold"
                      ? "bg-gold-400/15 text-gold-500"
                      : "bg-brand-500/15 text-brand-600"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-semibold leading-tight tracking-tight text-ink-800/80">
                  {c.org}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
