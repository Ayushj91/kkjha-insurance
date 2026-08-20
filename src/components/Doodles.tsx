// Small hand-drawn accent marks — imperfect on purpose. Used sparingly as
// annotations (an underline, a circle, an arrow) rather than icons.

export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 12.5C33 3 55 16 84 9.5C113 3 138 15 168 8C180 5.3 188 7 197 5"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CircleScribble({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 64"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M66 4C93 1 118 14 121 27C124 41 103 56 72 60C42 64 12 57 5 42C-2 28 12 11 38 5C50 2.5 62 3 68 6.5"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowScribble({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 110"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 6C10 40 16 78 46 100"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M22 88C30 95 38 99 46 100C44 92 43 83 45 74"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarScribble({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 3L23 16.5L36 14L25.5 22L31 34L20 26L9 34L14.5 22L4 14L17 16.5L20 3Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* A rough, hand-stamped "seal" ring — used on credential cards. Text runs
   around the circle via textPath so it reads like an ink stamp. */
export function StampRing({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  const id = `stamp-${label.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)}`;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <path id={id} d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
      </defs>
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="2.5 3.5"
        opacity="0.85"
      />
      <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text fontSize="7.6" fill="currentColor" letterSpacing="2.5" opacity="0.9">
        <textPath href={`#${id}`} startOffset="0%">
          {label} • {label} •
        </textPath>
      </text>
    </svg>
  );
}
