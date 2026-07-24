const rhythms = {
  // Page-hero padding — used once per page, at the top.
  feature: "py-20 sm:py-28",
  // Body-section padding — the default for everything below the fold.
  standard: "py-16 sm:py-24",
  // No vertical padding at the section level — for content whose rows
  // already carry their own spacing (e.g. a list of border-b rows), where
  // adding section padding on top would double it up.
  flush: "",
} as const;

const widths = {
  // The site container. Everything lives here unless it has a real reason
  // not to (a narrower reading measure, the wizard's form column).
  "5xl": "max-w-5xl",
  "3xl": "max-w-3xl",
  "2xl": "max-w-2xl",
} as const;

const borders = {
  none: "",
  top: "border-t border-line",
  bottom: "border-b border-line",
  y: "border-y border-line",
} as const;

/**
 * The site's one section shell. Encodes the two documented rhythms (feature
 * for page heroes, standard for body sections — see BRAND.md) plus the
 * shared 5xl container, instead of each page hand-typing
 * `mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24` (or a slightly different
 * version of it) at every call site.
 */
export function Section({
  children,
  className = "",
  innerClassName = "",
  rhythm = "standard",
  width = "5xl",
  border = "none",
  tone = "base",
  as: Tag = "section",
  id,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  rhythm?: keyof typeof rhythms;
  width?: keyof typeof widths;
  border?: keyof typeof borders;
  tone?: "base" | "warm";
  as?: "section" | "div";
  id?: string;
  ariaLabel?: string;
}) {
  const toneClass = tone === "warm" ? "bg-warm" : "";
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={`${borders[border]} ${toneClass} ${className}`}
    >
      <div
        className={`mx-auto ${widths[width]} px-5 sm:px-8 ${rhythms[rhythm]} ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
