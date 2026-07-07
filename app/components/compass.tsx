/**
 * The Mint Compass — Mint & Co's symbol (single source of truth).
 *
 * Four crisp, tapered mint-leaf blades arranged N/E/S/W as a compass rose,
 * a small sharp centre spark, and a broken seal-like ring. Rooted in the mint
 * leaf; reads as clarity, trust and direction.
 *
 * Chosen by a five-persona design-panel review (candidate "C — Balanced",
 * folding in the flat two-tone small-size behaviour of candidate "A — Crest"
 * as the `simplified` mode). Judged navbar-first at real website size.
 *
 * Hand-authored vector, viewBox 0 0 128 128. Everything consumes this module:
 * the lockup (header/footer), the app icon, the OG card, the favicon artwork
 * and the /public reference assets.
 *
 * Colours: deep #12503B–#0F3D2D family, mint #1E8E68–#2A9A72, gradient tips
 * to #35A17C (logo-only; never a text/UI token). Wordmark deep: #0F2D23.
 */

import { Wordmark } from "./Wordmark";

export type CompassVariant = "colour" | "mono" | "light" | "dark";

const C = 64;

/** Four ring arcs with gaps centred on the cardinals (sweep clockwise). */
function ringArcs(r: number, gapDeg: number): string {
  const pt = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${(C + r * Math.cos(rad)).toFixed(2)} ${(C - r * Math.sin(rad)).toFixed(2)}`;
  };
  const seg = (from: number, to: number) =>
    `M${pt(from)} A${r} ${r} 0 0 1 ${pt(to)}`;
  const g = gapDeg;
  return [
    seg(90 - g, 0 + g),
    seg(0 - g, -90 + g),
    seg(-90 - g, -180 + g),
    seg(180 - g, 90 + g),
  ].join(" ");
}

/** Concave four-point spark (quadratic star), radius r, centred at 64. */
function sparkStar(r: number): string {
  const c = +(r * 0.24).toFixed(2);
  const t = (n: number) => +n.toFixed(2);
  return (
    `M${C} ${t(C - r)} Q${t(C + c)} ${t(C - c)} ${t(C + r)} ${C} ` +
    `Q${t(C + c)} ${t(C + c)} ${C} ${t(C + r)} ` +
    `Q${t(C - c)} ${t(C + c)} ${t(C - r)} ${C} ` +
    `Q${t(C - c)} ${t(C - c)} ${C} ${t(C - r)} Z`
  );
}

// Winning geometry (panel candidate C).
const BLADE_N =
  "M64 10 C58.4 19.5 55.3 30 55.8 40.5 C56.2 49 59 56.2 64 61 C69 56.2 71.8 49 72.2 40.5 C72.7 30 69.6 19.5 64 10 Z";
const BLADE_E =
  "M115.5 64 C106 58.8 96 55.9 86.5 56.4 C78 56.8 71 59.6 66 64 C71 68.4 78 71.2 86.5 71.6 C96 72.1 106 69.2 115.5 64 Z";
const SPARK = sparkStar(6.8);

type Spec = {
  fillV: string;
  fillH: string;
  ring: string;
  ringWidth: number;
  spark: string;
  defs: string;
};

function spec(variant: CompassVariant, simplified: boolean): Spec {
  // Simplified (favicon/app-icon/tiny): flat fills + heavier ring, per panel.
  const ringWidth = simplified ? 4.4 : 3.6;
  if (variant === "light") {
    return {
      fillV: "#BCEBD6",
      fillH: "#8AD4B3",
      ring: "#79C7A4",
      ringWidth,
      spark: "#F2FBF7",
      defs: "",
    };
  }
  if (variant === "mono") {
    return {
      fillV: "#176B4F",
      fillH: "#176B4F",
      ring: "#176B4F",
      ringWidth,
      spark: "#176B4F",
      defs: "",
    };
  }
  if (variant === "dark" || simplified) {
    // Flat two-tone (candidate A's robustness).
    return {
      fillV: "#14523D",
      fillH: "#2A9A72",
      ring: "#12503B",
      ringWidth,
      spark: "#12503B",
      defs: "",
    };
  }
  // colour, detailed — subtle gradients, scoped stable ids (shared defs are
  // identical across instances, so header + footer can both render).
  return {
    fillV: "url(#mcV)",
    fillH: "url(#mcH)",
    ring: "#12503B",
    ringWidth,
    spark: "#12503B",
    defs:
      `<defs><linearGradient id="mcV" x1="64" y1="61" x2="64" y2="10" gradientUnits="userSpaceOnUse">` +
      `<stop offset="0" stop-color="#12503B"/><stop offset="1" stop-color="#2A9A72"/></linearGradient>` +
      `<linearGradient id="mcH" x1="66" y1="64" x2="115.5" y2="64" gradientUnits="userSpaceOnUse">` +
      `<stop offset="0" stop-color="#17604A"/><stop offset="1" stop-color="#35A17C"/></linearGradient></defs>`,
  };
}

/** Build the compass SVG markup. */
export function compassSvg(
  variant: CompassVariant = "colour",
  { simplified = false }: { simplified?: boolean } = {},
): string {
  const s = spec(variant, simplified);
  const ring = `<path d="${ringArcs(46.5, 15)}" stroke="${s.ring}" stroke-width="${s.ringWidth}" stroke-linecap="round" fill="none"/>`;
  const blades =
    `<path d="${BLADE_N}" fill="${s.fillV}"/>` +
    `<g transform="matrix(1 0 0 -1 0 128)"><path d="${BLADE_N}" fill="${s.fillV}"/></g>` +
    `<path d="${BLADE_E}" fill="${s.fillH}"/>` +
    `<g transform="matrix(-1 0 0 1 128 0)"><path d="${BLADE_E}" fill="${s.fillH}"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">${s.defs}${ring}${blades}<path d="${SPARK}" fill="${s.spark}"/></svg>`;
}

/** Colour mark as a data URI, for next/og ImageResponse (<img src>). */
export const compassDataUri = `data:image/svg+xml,${encodeURIComponent(
  compassSvg("colour"),
)}`;

/**
 * The Mint Compass symbol, inline. Decorative (aria-hidden) — it always ships
 * beside the "Mint & Co" wordmark, which carries the accessible name.
 */
export function CompassMark({
  size = 32,
  className = "",
  variant = "colour",
  simplified = false,
}: {
  size?: number;
  className?: string;
  variant?: CompassVariant;
  simplified?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      style={{ width: size, height: size, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: compassSvg(variant, { simplified }) }}
    />
  );
}

/**
 * The primary lockup: Mint Compass beside the "Mint & Co" wordmark, optically
 * centred as one brand unit. Used in the header and footer.
 */
export function LogoLockup({
  className = "",
  markSize = 34,
}: {
  className?: string;
  markSize?: number;
}) {
  const wordSize = markSize >= 40 ? "lg" : markSize >= 30 ? "md" : "sm";
  return (
    <span className={`inline-flex items-center gap-[11px] ${className}`}>
      <CompassMark size={markSize} />
      <Wordmark size={wordSize} />
    </span>
  );
}
