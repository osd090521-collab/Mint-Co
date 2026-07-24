const base = "rounded-xl p-7 sm:p-9";

const variants = {
  // The default card — pricing tiers, about-page trust cards, founder cards.
  default: "border-t-2 border-mint bg-surface shadow-card",
  // The one-per-group featured state (e.g. "Recommended" package tier).
  emphasis: "border-2 border-mint bg-surface shadow-soft",
  // A quieter callout panel (e.g. the review-stand panel) — tinted, not
  // white-on-white, without competing with a real card grid nearby.
  tint: "border border-mint/20 bg-tint",
} as const;

/**
 * Shared card treatment — one radius, one padding scale, three variants
 * instead of three unrelated border/shadow combinations that had drifted
 * into meaning the same thing (border-t-2, border-2, border-mint/20) with
 * no rule choosing between them. Presentational only — wrap in <Reveal> at
 * the call site when the card should animate in, same as any other content.
 */
export function Card({
  variant = "default",
  className = "",
  as: Tag = "div",
  children,
}: {
  variant?: keyof typeof variants;
  className?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}) {
  return <Tag className={`${base} ${variants[variant]} ${className}`}>{children}</Tag>;
}
