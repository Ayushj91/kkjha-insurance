import {
  Activity,
  Car,
  HardHat,
  HeartHandshake,
  Home,
  Plane,
  Truck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { services, waLink } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  "shield-heart": HeartHandshake,
  pulse: Activity,
  "trending-up": TrendingUp,
  car: Car,
  home: Home,
  plane: Plane,
  users: Users,
  "hard-hat": HardHat,
  truck: Truck,
};

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            What we cover
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            One advisor, every plan you need
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-700/70 sm:text-lg">
            From your first health cover to your family&rsquo;s retirement
            fund — get it all sorted through a single trusted relationship.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Activity;
            return (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-900/8"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md shadow-brand-600/20">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="relative z-10 text-base font-bold text-ink-900">
                  {s.title}
                </h3>
                <p className="relative z-10 mt-1.5 text-[13px] leading-relaxed text-ink-700/70">
                  {s.desc}
                </p>
                <a
                  href={waLink(`Hi! I'd like to know more about ${s.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-4 inline-flex items-center text-xs font-bold text-brand-700 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Ask about this →
                </a>
                <span className="absolute right-5 top-5 text-[11px] font-bold text-ink-900/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
