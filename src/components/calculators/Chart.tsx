"use client";

import { clamp } from "@/lib/finance";

// A single reusable trend chart (SVG, responsive via viewBox) that every
// calculator feeds with its own series — avoids six bespoke chart
// implementations while still covering: a filled primary line, an optional
// dashed comparison line, end-point dots, a "difference" shaded band, and
// a crossover marker. Colors are passed in as CSS color values so each
// calculator can pick its own accent from the site palette.

export interface ChartPoint {
  x: number;
  y: number;
}
export interface ChartSeries {
  points: ChartPoint[];
  color: string;
  dashed?: boolean;
  area?: boolean;
  dotAtEnd?: boolean;
}
export interface ChartMarker {
  x: number;
  y: number;
  color: string;
  label?: string;
  dropLine?: boolean;
}
export interface ChartBand {
  x1: number;
  x2: number;
  color: string;
  label?: string;
}

export function TrendChart({
  series,
  xMax,
  yMax,
  xTick,
  yTickLabel,
  markers = [],
  band = null,
  height = 300,
}: {
  series: ChartSeries[];
  xMax: number;
  yMax: number;
  xTick: (x: number) => string;
  yTickLabel?: string;
  markers?: ChartMarker[];
  band?: ChartBand | null;
  height?: number;
}) {
  const W = 880;
  const H = height;
  const padL = 12;
  const padR = 12;
  const padT = 22;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const yBottom = padT + plotH;

  const safeXMax = xMax || 1;
  const safeYMax = yMax || 1;

  const px = (x: number) => padL + (x / safeXMax) * plotW;
  const py = (y: number) => padT + (1 - clamp(y / safeYMax, 0, 1)) * plotH;

  const linePath = (pts: ChartPoint[]) =>
    pts.map((p, i) => `${i ? "L" : "M"}${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(" ");

  const areaPath = (pts: ChartPoint[]) =>
    `M${px(0).toFixed(1)},${yBottom.toFixed(1)} ` +
    pts.map((p) => `L${px(p.x).toFixed(1)},${py(p.y).toFixed(1)}`).join(" ") +
    ` L${px(pts[pts.length - 1].x).toFixed(1)},${yBottom.toFixed(1)} Z`;

  // x-axis ticks — spread ~5-6 across the width
  const steps = 5;
  const ticks: number[] = [];
  for (let i = 0; i <= steps; i++) ticks.push((safeXMax / steps) * i);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Chart"
    >
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <line
          key={i}
          x1={padL}
          x2={W - padR}
          y1={padT + f * plotH}
          y2={padT + f * plotH}
          stroke="var(--color-ink-900)"
          strokeOpacity={0.06}
          strokeWidth={1}
        />
      ))}

      {band && band.x2 > band.x1 && (
        <>
          <rect
            x={px(band.x1)}
            y={padT}
            width={px(band.x2) - px(band.x1)}
            height={plotH}
            fill={band.color}
            fillOpacity={0.08}
          />
          {band.label && (
            <text
              x={(px(band.x1) + px(band.x2)) / 2}
              y={padT + 16}
              textAnchor="middle"
              fill={band.color}
              fontSize={13}
              fontWeight={700}
            >
              {band.label}
            </text>
          )}
        </>
      )}

      {series.map((s, i) => (
        <g key={i}>
          {s.area && <path d={areaPath(s.points)} fill={s.color} fillOpacity={0.12} />}
          <path
            d={linePath(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth={s.dashed ? 2 : 3}
            strokeDasharray={s.dashed ? "5 5" : undefined}
            strokeOpacity={s.dashed ? 0.8 : 1}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {s.dotAtEnd && s.points.length > 0 && (
            <circle
              cx={px(s.points[s.points.length - 1].x)}
              cy={py(s.points[s.points.length - 1].y)}
              r={s.dashed ? 4 : 5.5}
              fill={s.color}
              stroke="white"
              strokeWidth={2}
            />
          )}
        </g>
      ))}

      {markers.map((mk, i) => (
        <g key={i}>
          {mk.dropLine && (
            <line
              x1={px(mk.x)}
              x2={px(mk.x)}
              y1={py(mk.y)}
              y2={yBottom}
              stroke={mk.color}
              strokeWidth={1}
              strokeDasharray="3 4"
              strokeOpacity={0.5}
            />
          )}
          <circle cx={px(mk.x)} cy={py(mk.y)} r={5} fill={mk.color} stroke="white" strokeWidth={2} />
          {mk.label && (
            <text
              x={clamp(px(mk.x), padL + 50, W - padR - 50)}
              y={padT - 8}
              textAnchor="middle"
              fill={mk.color}
              fontSize={13}
              fontWeight={700}
            >
              {mk.label}
            </text>
          )}
        </g>
      ))}

      {/* x ticks */}
      {ticks.map((t, i) => (
        <text
          key={i}
          x={clamp(px(t), padL + 14, W - padR - 14)}
          y={H - 8}
          textAnchor="middle"
          fill="var(--color-ink-700)"
          fillOpacity={0.55}
          fontSize={13}
          fontFamily="var(--font-mono)"
        >
          {xTick(t)}
        </text>
      ))}

      {/* y anchor */}
      {yTickLabel && (
        <text
          x={padL}
          y={padT - 8}
          fill="var(--color-ink-700)"
          fillOpacity={0.55}
          fontSize={13}
          fontFamily="var(--font-mono)"
        >
          {yTickLabel}
        </text>
      )}
    </svg>
  );
}

export function ChartLegend({
  items,
}: {
  items: { label: string; color: string; dashed?: boolean }[];
}) {
  return (
    <div className="flex flex-wrap gap-3.5 text-[11.5px] text-ink-700/60">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5">
          <i
            className="inline-block h-[3px] w-[14px] rounded-full"
            style={{
              background: it.dashed ? "transparent" : it.color,
              borderTop: it.dashed ? `2px dashed ${it.color}` : undefined,
            }}
          />
          {it.label}
        </span>
      ))}
    </div>
  );
}
