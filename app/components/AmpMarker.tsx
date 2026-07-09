/**
 * The small mint "&" used as a repeating list/step marker (services rows,
 * process steps). Kept in `mint` (not `mint-deep`) per BRAND.md — the
 * ampersand is the one device exempt from the "mint is never text" rule.
 */
export function AmpMarker({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`text-mint ${className}`}>
      &amp;
    </span>
  );
}
