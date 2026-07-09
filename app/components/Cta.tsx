const base =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl px-8 text-base transition duration-150 active:scale-[0.98]";

const variants = {
  primary:
    "bg-mint-cta font-semibold tracking-[0.01em] text-white shadow-soft hover:bg-mint-deep",
  secondary: "border border-line font-medium text-mint-deep hover:bg-tint",
} as const;

/** Shared CTA button — one padding, one shape, two fill variants. */
export function Cta({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
