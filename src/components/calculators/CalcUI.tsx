"use client";

import { useEffect, useRef, useState } from "react";
import { clamp, inr } from "@/lib/finance";

// Shared building blocks for every calculator — a labelled number+slider
// row, a panel/card, stat tiles and a toggle switch — all skinned to match
// the rest of the site (paper cards, brand green, serif headings) rather
// than a bespoke calculator theme.

export function Panel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink-900/8 bg-white p-5 shadow-sm shadow-ink-900/5 sm:p-6 ${className}`}
    >
      {title && (
        <div className="font-display mb-4 text-[15px] font-bold text-ink-900">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function Row({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  money,
  suffix,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  money?: boolean;
  suffix?: string;
}) {
  const format = (v: number) => (money ? inr(v) : String(v));
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(format(value));

  // Keep the text box in sync when the number changes from elsewhere (the
  // slider, a preset chip) — but never while the person is actively typing
  // in it, or we'd stomp on a value they haven't finished entering yet
  // (e.g. clearing the field to type a new number below the old minimum).
  useEffect(() => {
    if (document.activeElement !== inputRef.current) setText(format(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, money]);

  const commit = () => {
    const raw = text.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    const next = raw === "" || isNaN(num) ? value : clamp(num, min, max);
    onChange(next);
    setText(format(next));
  };

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[13.5px] font-medium text-ink-800">{label}</label>
        <div className="flex items-center gap-1 rounded-lg border border-ink-900/10 bg-brand-50/50 px-2.5 py-1.5 focus-within:border-brand-500/50 focus-within:bg-white">
          {money && <span className="font-mono text-[13px] text-ink-700/60">₹</span>}
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={text}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9.]/g, "");
              setText(e.target.value.replace(/[^0-9.]/g, ""));
              // Live-update the calculation as they type, without forcing
              // the value back into [min, max] mid-entry — that clamping
              // is what made typing feel broken (e.g. typing "15000" into
              // a field with min 500 would snap to 500 after the first "1").
              if (raw !== "" && raw !== ".") {
                const num = parseFloat(raw);
                if (!isNaN(num)) onChange(num);
              }
            }}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") inputRef.current?.blur();
            }}
            className="w-[104px] bg-transparent text-right font-mono text-[13px] font-semibold text-ink-900 outline-none sm:w-[124px] sm:text-[14px]"
          />
          {suffix && (
            <span className="whitespace-nowrap font-mono text-[12px] text-ink-700/60">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={clamp(value, min, max)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="calc-range"
      />
      {hint && <div className="mt-1.5 text-[11.5px] leading-relaxed text-ink-700/55">{hint}</div>}
    </div>
  );
}

export function Toggle({
  on,
  set,
  children,
}: {
  on: boolean;
  set: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => set(!on)}
      aria-pressed={on}
      className="flex w-full items-center gap-3 border-t border-ink-900/8 py-3 text-left text-[13.5px] font-semibold text-ink-900 first:border-t-0"
    >
      <span
        className={`relative h-[22px] w-[38px] shrink-0 rounded-full border transition-colors ${
          on ? "border-brand-600 bg-brand-500" : "border-ink-900/15 bg-ink-900/10"
        }`}
      >
        <span
          className={`absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-[18px]" : "translate-x-[2px]"
          }`}
        />
      </span>
      {children}
    </button>
  );
}

export function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "brand" | "gold" | "clay" | "muted";
}) {
  const color =
    accent === "brand"
      ? "text-brand-700"
      : accent === "gold"
        ? "text-gold-600"
        : accent === "clay"
          ? "text-clay-600"
          : "text-ink-900";
  return (
    <div className="rounded-2xl border border-ink-900/8 bg-white px-4 py-3.5 shadow-sm shadow-ink-900/5">
      <div className="min-h-[30px] text-[11.5px] leading-tight text-ink-700/60">{label}</div>
      <div className={`font-mono mt-1.5 text-[18px] font-bold tracking-tight sm:text-[19px] ${color}`}>
        {value}
      </div>
    </div>
  );
}

export function Chip({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-ink-900/10 bg-brand-50/60 px-3.5 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:border-brand-500/40 hover:bg-brand-50"
    >
      {children}
    </button>
  );
}

export function ModeSwitch<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-ink-900/10 bg-white p-1 shadow-sm">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-[13px] ${
            value === opt.value
              ? "bg-brand-600 text-white shadow-sm"
              : "text-ink-700/70 hover:text-ink-900"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
