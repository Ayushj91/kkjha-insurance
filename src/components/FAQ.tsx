"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { faqs } from "@/lib/site";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
            <HelpCircle className="h-6 w-6" strokeWidth={2} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Questions, answered
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-brand-300 bg-brand-50/50"
                    : "border-ink-900/8 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-brand-600 text-white"
                          : "bg-brand-50 text-brand-600"
                      }`}
                    >
                      <MessageCircleQuestion className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-sm font-bold text-ink-900 sm:text-base">
                      {f.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-700/75">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
