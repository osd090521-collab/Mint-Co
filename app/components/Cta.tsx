const base =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl px-8 text-base transition duration-[var(--dur-micro)] ease-[var(--ease-house)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70 disabled:active:scale-100";

const variants = {
  primary:
    "bg-mint-cta font-semibold tracking-[0.01em] text-white shadow-soft hover:bg-mint-deep",
  secondary: "border border-line font-medium text-mint-deep hover:bg-tint",
} as const;

/**
 * Shared CTA button — one padding, one shape, two fill variants, one
 * disabled state. Renders a real <button> whenever `type="submit"` (form
 * controls need native submit semantics, not a navigable href) or when
 * `disabled` (an <a> has no real disabled state); otherwise an <a>, since
 * most CTAs on this site are links, not form actions.
 */
export function Cta({
  href,
  variant = "primary",
  className = "",
  children,
  disabled = false,
  type,
}: {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (type === "submit" || disabled) {
    return (
      <button type={type ?? "button"} disabled={disabled} className={cls}>
        {children}
      </button>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
