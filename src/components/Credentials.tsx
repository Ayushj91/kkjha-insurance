import { Award, BadgeCheck } from "lucide-react";
import { credentials } from "@/lib/site";
import { StampRing } from "./Doodles";

const rotations = ["sm:-rotate-1", "sm:rotate-1", "sm:rotate-1", "sm:-rotate-1"];

export default function Credentials() {
  return (
    <section id="credentials" className="relative bg-ink-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(16,185,129,0.18),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            Verified &amp; regulated
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Credentials you can check
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            Every recommendation comes through officially registered
            partnerships — transparent codes, no shortcuts.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {credentials.map((c, i) => (
            <div
              key={c.org}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:rotate-0 hover:border-brand-400/40 hover:bg-white/[0.07] ${rotations[i % rotations.length]}`}
            >
              {/* hand-stamped seal, tucked in the corner like an ink stamp */}
              <StampRing
                label={c.accent === "gold" ? "AUTHORISED" : "VERIFIED"}
                className={`pointer-events-none absolute -right-3 -top-3 h-24 w-24 rotate-[14deg] ${
                  c.accent === "gold" ? "text-gold-400/25" : "text-brand-400/25"
                }`}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    c.accent === "gold"
                      ? "bg-gold-400/15 text-gold-400"
                      : "bg-brand-400/15 text-brand-400"
                  }`}
                >
                  {c.accent === "gold" ? (
                    <Award className="h-5.5 w-5.5" />
                  ) : (
                    <BadgeCheck className="h-5.5 w-5.5" />
                  )}
                </div>
                <div className="min-w-0 pr-14">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-brand-300/80">
                    {c.role}
                  </p>
                  <h3 className="font-display mt-1 text-lg font-bold leading-snug text-white">
                    {c.org}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-black/30 px-3 py-1.5 font-mono text-xs text-white/70">
                    <span className="text-white/40">{c.codeLabel}:</span>
                    <span className="font-semibold text-white">{c.code}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
