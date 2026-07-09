/**
 * The "Mint & Co" wordmark: Fraunces Regular (400) in deep green, with the
 * ampersand — the one coloured, characterful device in the text — in mint.
 * Upright, not italic: Fraunces' italic "&" is an ornate swash glyph that
 * reads as a different typeface next to the upright "Mint"/"Co". Colour
 * alone carries the distinction. Pairs with the Mint Compass symbol in the
 * primary lockup (see LogoLockup in compass.tsx).
 */
export function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-[21px]",
    lg: "text-2xl",
  } as const;

  return (
    <span
      className={`font-display font-normal tracking-[-0.01em] text-[#0F2D23] ${sizes[size]} ${className}`}
    >
      Mint
      <span className="ml-[0.14em] mr-[0.22em] text-mint">&amp;</span>
      Co
    </span>
  );
}
