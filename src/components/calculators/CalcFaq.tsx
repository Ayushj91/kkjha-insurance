"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// A compact FAQ accordion for embedding inside a calculator page's own
// container (unlike the homepage's <FAQ />, this doesn't bring its own
// section background/padding — it sits inside the existing max-w-4xl
// column, right below the calculator).
export default function CalcFaq({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand-300 bg-brand-50/50" : "border-ink-900/8 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4.5 py-3.5 text-left sm:px-5"
            >
              <span className="text-[13.5px] font-semibold text-ink-900 sm:text-[14.5px]">{f.q}</span>
              <ChevronDown
                className={`h-4.5 w-4.5 shrink-0 text-brand-600 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-4.5 pb-4 text-[13px] leading-relaxed text-ink-700/75 sm:px-5">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
