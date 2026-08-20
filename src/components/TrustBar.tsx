import { credentials } from "@/lib/site";

export default function TrustBar() {
  return (
    <section className="border-b border-brand-900/5 bg-white py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-ink-700/50">
          Authorised partner &amp; certified advisor
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {credentials.map((c) => (
            <span
              key={c.org}
              className="text-sm font-semibold tracking-tight text-ink-800/70 sm:text-base"
            >
              {c.org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
