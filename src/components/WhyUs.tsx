import { whyUs } from "@/lib/site";

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-brand-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Why families choose us
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Advice that actually has your back
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {whyUs.map((w, i) => (
            <div
              key={w.title}
              className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm shadow-brand-900/5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-sm font-bold text-white shadow-md shadow-brand-600/20">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-base font-bold text-ink-900">
                  {w.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-700/70">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
