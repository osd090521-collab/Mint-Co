/**
 * The "Mint & Co" wordmark: Fraunces Regular (400) in deep green, with the
 * ampersand — the one coloured, characterful device in the text — in mint
 * italic. Pairs with the Mint Compass symbol in the primary lockup
 * (see LogoLockup in compass.tsx). Panel-refined: lighter editorial weight,
 * tight tracking (T1), calmer beside the symbol.
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
      <span className="mx-[0.14em] text-mint italic">&amp;</span>
      Co
    </span>
  );
}
