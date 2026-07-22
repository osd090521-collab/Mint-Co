/**
 * CSS-drawn browser chrome used to stand in for real work screenshots (site
 * has no photography yet). Purely illustrative; never labelled as a real
 * client.
 */
export function BrowserFrame({
  label,
  className = "",
  tone = "mint",
}: {
  label: string;
  className?: string;
  tone?: "mint" | "warm" | "ink";
}) {
  const bodyTone =
    tone === "mint"
      ? "from-tint via-surface to-mint/15"
      : tone === "warm"
        ? "from-warm via-surface to-brass/15"
        : "from-ink via-slate to-ink";
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-card ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-warm px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="ml-3 truncate rounded-full bg-surface px-2.5 py-0.5 text-[0.65rem] text-muted">
          {label}
        </span>
      </div>
      <div
        className={`grid aspect-[16/10] place-items-center bg-gradient-to-br ${bodyTone} p-6`}
      >
        <div className="w-full space-y-2">
          <div className="h-2 w-2/3 rounded-full bg-ink/10" />
          <div className="h-2 w-1/2 rounded-full bg-ink/10" />
          <div className="mt-4 h-16 w-full rounded-lg bg-ink/5" />
        </div>
      </div>
    </div>
  );
}
