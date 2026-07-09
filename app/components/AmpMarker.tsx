/**
 * The small mint "&" used as a repeating list/step marker (services rows,
 * process steps). Upright, matching the logo wordmark's ampersand treatment
 * (see Wordmark.tsx) — same glyph, same device, everywhere on the site.
 * Kept in `mint` (not `mint-deep`) per BRAND.md — the ampersand is the one
 * device exempt from the "mint is never text" rule.
 */
export function AmpMarker({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`text-mint ${className}`}>
      &amp;
    </span>
  );
}
