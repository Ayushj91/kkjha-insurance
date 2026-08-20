import { MessageCircle, Phone, MapPin, Clock, Languages } from "lucide-react";
import { hi, site, waLink } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(16,185,129,0.25),transparent)]" />
      <div className="bg-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_60%,black,transparent)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
          Let&rsquo;s talk
        </span>
        <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Your family&rsquo;s financial safety net,
          <br className="hidden sm:block" /> one message away.
        </h2>
        <p lang="hi" className="mt-3 text-lg font-medium text-brand-300 sm:text-xl">
          {hi.contactHeading}
        </p>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          Send a WhatsApp message with what you&rsquo;re looking for — a
          quote, a renewal, or just a question — and get a real reply, fast.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={waLink("Hi! I'd like to talk about an insurance / investment plan.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand-600/30 transition-all hover:brightness-110 active:scale-95 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Message on WhatsApp
          </a>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            <Phone className="h-4 w-4" />
            Call {site.phoneDisplay}
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
          <InfoItem icon={<Phone className="h-4 w-4" />} label="Phone / WhatsApp" value={site.phoneDisplay} />
          <InfoItem icon={<MapPin className="h-4 w-4" />} label="Serving" value="Clients across India" />
          <InfoItem icon={<Clock className="h-4 w-4" />} label="Response time" value="Usually within a day" />
          <InfoItem icon={<Languages className="h-4 w-4" />} label="Languages" value={site.languages} />
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-400/15 text-brand-400">
        {icon}
      </div>
      <div className="text-xs font-medium uppercase tracking-wide text-white/40">
        {label}
      </div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
