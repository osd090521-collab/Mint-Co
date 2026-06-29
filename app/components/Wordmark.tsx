/**
 * The wordmark IS the brand. "Mint & Co" set in Fraunces with the ampersand —
 * the one coloured, characterful device — in mint. No leaf, ever.
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
    md: "text-xl",
    lg: "text-2xl",
  } as const;

  return (
    <span
      className={`font-display font-medium tracking-tight text-ink ${sizes[size]} ${className}`}
    >
      Mint
      <span aria-hidden="true" className="mx-[0.12em] text-mint italic">
        &amp;
      </span>
      Co
    </span>
  );
}
