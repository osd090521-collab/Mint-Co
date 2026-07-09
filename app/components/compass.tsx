/**
 * The Mint Compass — Mint & Co's symbol (single source of truth).
 *
 * Four gradient-shaded mint-leaf blades arranged N/E/S/W as a compass rose,
 * a small four-point centre spark, and a broken seal-like ring. Sourced as
 * artwork at `public/brand/mint-compass-mark.png` (transparent PNG) — the
 * header/footer lockup, the app icon, and the OG card all render this same
 * file, so the mark is identical everywhere it appears.
 */

import Image from "next/image";
import { Wordmark } from "./Wordmark";

/** Path to the mark artwork — also read directly (as a data URI) by
 * apple-icon.tsx and opengraph-image.tsx, which run in a next/og
 * ImageResponse context and can't use next/image. */
export const compassMarkSrc = "/brand/mint-compass-mark.png";

/**
 * The Mint Compass symbol, inline. Decorative (aria-hidden) — it always ships
 * beside the "Mint & Co" wordmark, which carries the accessible name.
 */
export function CompassMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={compassMarkSrc}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
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
