import { Briefcase, Sparkles } from "lucide-react";
import { becomeAdvisor, hi, waLink } from "@/lib/site";
import { StarScribble } from "./Doodles";

export default function BecomeAdvisor() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <div className="bg-grid absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="relative -rotate-1 rounded-3xl border-2 border-dashed border-gold-500/40 bg-paper-card px-6 py-10 text-center shadow-lg shadow-ink-900/5 sm:px-14 sm:py-12">
          <StarScribble className="absolute -left-3 -top-4 h-9 w-9 text-gold-500/60 sm:-left-6 sm:-top-6 sm:h-12 sm:w-12" />
          <StarScribble className="absolute -bottom-3 -right-2 h-7 w-7 text-brand-500/50 sm:-bottom-4 sm:-right-4 sm:h-9 sm:w-9" />

          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-600">
            <Sparkles className="h-3.5 w-3.5" />
            {becomeAdvisor.eyebrow}
          </span>

          <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {becomeAdvisor.heading}
          </h2>
          <p lang="hi" className="font-hand mt-3 text-lg text-brand-700 sm:text-xl">
            {hi.becomeAdvisorLine}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-700/70 sm:text-base">
            {becomeAdvisor.body}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {becomeAdvisor.lines.map((l) => (
              <span
                key={l}
                className="rounded-full border border-ink-900/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-800 shadow-sm"
              >
                {l}
              </span>
            ))}
          </div>

          <a
            href={waLink(becomeAdvisor.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-lg shadow-gold-500/25 transition-all hover:brightness-105 active:scale-95"
          >
            <Briefcase className="h-4.5 w-4.5" />
            {becomeAdvisor.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
