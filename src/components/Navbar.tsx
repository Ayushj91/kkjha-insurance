"use client";

import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, Shield } from "lucide-react";
import { site, waLink } from "@/lib/site";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/calculators", label: "Calculators" },
  { href: "/#faq", label: "FAQs" },
];

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  // `solid` forces the light/glass treatment on pages with no dark hero at
  // the top (e.g. the calculators) — without it the logo/links would render
  // white-on-white until the visitor scrolls.
  const scrolled = solid || scrolledPast;

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolledPast(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-brand-900/5 shadow-sm shadow-brand-900/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="/#top" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-md shadow-brand-600/25 transition-transform group-hover:scale-105">
            <Shield className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display leading-tight">
            <span
              className={`block text-[15px] font-bold transition-colors ${
                scrolled ? "text-ink-900" : "text-white"
              }`}
            >
              {site.shortName}
            </span>
            <span
              className={`block text-[11px] font-medium tracking-wide transition-colors ${
                scrolled ? "text-brand-700" : "text-brand-300"
              }`}
            >
              {site.business}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                scrolled ? "text-ink-700" : "text-white/80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={waLink("Hi! I'd like to know more about your insurance & investment plans.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:brightness-110 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
            scrolled || open ? "text-ink-900" : "text-white"
          }`}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-brand-900/5 px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-800 hover:bg-brand-50"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink("Hi! I'd like to know more about your insurance & investment plans.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
