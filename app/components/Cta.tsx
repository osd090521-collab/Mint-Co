const base =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl px-8 text-base transition duration-150 active:scale-[0.98]";

const variants = {
  // Solid fill stays for conversion legibility — the "glass" is the inset
  // top highlight, the same light-catching-glass detail used site-wide.
  primary:
    "bg-mint-cta font-semibold tracking-[0.01em] text-white shadow-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-mint-deep",
  secondary:
    "border border-white/70 bg-white/50 font-medium text-mint-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md backdrop-saturate-150 hover:bg-white/80",
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
