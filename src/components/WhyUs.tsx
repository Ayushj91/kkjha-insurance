import { History, LifeBuoy, MessageCircle, Users2, type LucideIcon } from "lucide-react";
import { whyUs } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  history: History,
  users: Users2,
  message: MessageCircle,
  lifebuoy: LifeBuoy,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-brand-50/40 py-20 sm:py-28">
      <div className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Why families choose us
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Advice that actually has your back
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {whyUs.map((w, i) => {
            const Icon = iconMap[w.icon] ?? Users2;
            return (
              <div
                key={w.title}
                className="group flex gap-5 rounded-2xl bg-white p-6 shadow-sm shadow-brand-900/5 transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md shadow-brand-600/20">
                  <Icon className="h-5.5 w-5.5" strokeWidth={2} />
                  <span className="absolute -bottom-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink-900 text-[9px] font-bold text-white ring-2 ring-brand-50/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
