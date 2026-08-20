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
import { hi, services, waLink } from "@/lib/site";

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

const accents = [
  { ring: "border-brand-500", fill: "bg-brand-50", icon: "text-brand-600", glow: "bg-brand-50" },
  { ring: "border-gold-500", fill: "bg-gold-400/10", icon: "text-gold-600", glow: "bg-gold-400/10" },
  { ring: "border-sky-500", fill: "bg-sky-50", icon: "text-sky-600", glow: "bg-sky-50" },
];

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
          <p lang="hi" className="mt-2 text-sm font-medium text-brand-600">
            {hi.servicesEyebrow}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-700/70 sm:text-lg">
            From your first health cover to your family&rsquo;s retirement
            fund — get it all sorted through a single trusted relationship.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Activity;
            const accent = accents[i % accents.length];
            return (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-900/8"
              >
                {/* illustration panel */}
                <div className={`relative flex h-36 items-center justify-center overflow-hidden ${accent.fill}`}>
                  <div
                    className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${accent.glow} opacity-70`}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden="true"
                    className="relative z-10 h-28 w-auto drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`font-hand absolute right-3 top-2.5 z-10 text-base ${accent.icon} opacity-40`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative p-6">
                  <div
                    className={`relative z-10 -mt-11 mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed bg-white shadow-sm ${accent.ring} ${accent.icon}`}
                  >
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
