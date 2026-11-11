import { motion, useReducedMotion } from "framer-motion";

const ink = { stroke: "var(--ink)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function WinkingTooth({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden>
      <path d="M22 28c6-14 22-16 38-8 16-8 32-6 38 8 6 16 0 30-4 44-4 16-4 40-14 44-8 3-10-20-20-20s-12 23-20 20c-10-4-10-28-14-44-4-14-10-28-4-44z" fill="var(--card)" {...ink} />
      <path d="M30 34c3-6 9-8 14-6" fill="none" {...ink} strokeWidth={2.5} />
      <ellipse cx="44" cy="58" rx="4.5" ry="5.5" fill="var(--ink)" />
      <motion.path d="M70 58 q6 -6 12 0" fill="none" {...ink}
        animate={reduce ? undefined : { d: ["M70 58 q6 -6 12 0", "M70 58 q6 -6 12 0", "M70 58 q6 0 12 0", "M70 58 q6 -6 12 0"] }}
        transition={{ duration: 3, times: [0, 0.8, 0.88, 1], repeat: Infinity }} />
      <path d="M48 76q12 12 26 0" fill="var(--yellow)" {...ink} />
      <circle cx="36" cy="70" r="5" fill="var(--mint)" />
      <circle cx="86" cy="70" r="5" fill="var(--mint)" />
    </svg>
  );
}

export function Toothbrush({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 150" className={className} aria-hidden>
      <rect x="22" y="40" width="16" height="104" rx="8" fill="var(--mint)" {...ink} />
      <path d="M26 30v-22M30 30v-24M34 30v-22M26 30h8" fill="none" {...ink} strokeWidth={2.5} />
      <rect x="20" y="28" width="20" height="14" rx="4" fill="var(--yellow)" {...ink} />
      <path d="M30 70v40" {...ink} strokeWidth={2} />
    </svg>
  );
}

export function HandMirror({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 150" className={className} aria-hidden>
      <path d="M38 88h14l-2 52a5 5 0 0 1-10 0z" fill="var(--yellow)" {...ink} />
      <circle cx="45" cy="50" r="38" fill="var(--yellow)" {...ink} />
      <circle cx="45" cy="50" r="28" fill="var(--mint)" {...ink} />
      <path d="M30 40l10-10M32 52l18-18" {...ink} strokeWidth={2.5} stroke="var(--card)" />
    </svg>
  );
}
