/**
 * The homepage's signature element: what those ten seconds actually look
 * like, told in the subject's own vernacular instead of asserted in prose.
 *
 * One 12-second loop, three acts — the site being navigated, a customer
 * writing the review, the reviews landing — which is the hero's sentence
 * ("the site, the Google listing and the review trail") shown rather than
 * claimed. Deliberately a server component with no state and no effects:
 * it sits in the hero, so it must paint as plain server HTML and can never
 * gate the LCP behind hydration. All timing lives in globals.css, where
 * every looping class is also neutralised for reduced-motion users.
 *
 * Nothing here is a claim. Interface chrome is legible; review content is
 * abstracted to bars — we have no testimonials yet and never invent them.
 */

const HAIRLINE = "rounded-full bg-ink/15";

/** Five brass stars. Brass, not mint — mint stays under its ink budget. */
function Star({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-[9px] w-[9px] shrink-0 fill-brass ${className}`}
      style={style}
    >
      <path d="M12 2.6l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.6l-5.88 3.11 1.12-6.55L2.48 9.52l6.58-.96z" />
    </svg>
  );
}

function StarRow({
  animated = false,
  className = "",
}: {
  animated?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex gap-[3px] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={animated ? "phone-star" : ""}
          style={animated ? { animationDelay: `${i * 0.16}s` } : undefined}
        />
      ))}
    </div>
  );
}

/** One landed review — avatar, name, rating, two lines of abstracted text. */
function ReviewCard({ delay, widths }: { delay: number; widths: [string, string] }) {
  return (
    <div
      className="phone-card rounded-lg border border-line bg-surface p-2 shadow-[0_1px_2px_rgba(16,33,27,0.04)]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-1.5">
        <span className="h-[15px] w-[15px] shrink-0 rounded-full bg-tint" />
        <span className={`h-[4px] w-11 ${HAIRLINE}`} />
        <StarRow className="ml-auto" />
      </div>
      <div className="mt-1.5 space-y-[3px]">
        <span className={`block h-[3px] ${HAIRLINE}`} style={{ width: widths[0] }} />
        <span className={`block h-[3px] ${HAIRLINE}`} style={{ width: widths[1] }} />
      </div>
    </div>
  );
}

export function TenSecondVerdict() {
  return (
    <figure className="m-0">
      <div className="phone-float relative mx-auto w-full max-w-[278px]">
        <div className="relative aspect-[9/19] rounded-[2.6rem] border-[10px] border-ink bg-ink shadow-[0_34px_60px_-26px_rgba(16,33,27,0.5)]">
          {/* Side hardware — the detail that separates a device from a box */}
          <span
            aria-hidden="true"
            className="absolute -left-[13px] top-[86px] h-8 w-[3px] rounded-l-sm bg-ink/70"
          />
          <span
            aria-hidden="true"
            className="absolute -left-[13px] top-[128px] h-8 w-[3px] rounded-l-sm bg-ink/70"
          />
          <span
            aria-hidden="true"
            className="absolute -right-[13px] top-[104px] h-12 w-[3px] rounded-r-sm bg-ink/70"
          />

          <div
            aria-hidden="true"
            className="relative h-full overflow-hidden rounded-[1.85rem] bg-bg"
          >
            {/* Status bar */}
            <div className="relative z-20 flex items-center justify-between px-4 pt-2 text-[0.5rem] font-semibold text-ink/70">
              <span className="[font-variant-numeric:tabular-nums]">9:41</span>
              <span className="flex items-center gap-[3px]">
                <span className="flex items-end gap-[1.5px]">
                  {[3, 5, 7, 9].map((h) => (
                    <span
                      key={h}
                      className="w-[2px] rounded-[1px] bg-ink/55"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </span>
                <svg viewBox="0 0 16 12" className="h-[8px] w-[10px] fill-ink/55">
                  <path d="M8 11.2 5.6 8.6a3.4 3.4 0 0 1 4.8 0zM8 6.1c-1.5 0-2.9.6-3.9 1.6L2.7 6.2A7.6 7.6 0 0 1 8 4c2 0 3.9.8 5.3 2.2l-1.4 1.5A5.4 5.4 0 0 0 8 6.1M8 1.6c-2.7 0-5.2 1.1-7 2.9L-.4 3.1A12 12 0 0 1 8 -.4c3.3 0 6.3 1.3 8.4 3.5l-1.4 1.4A9.9 9.9 0 0 0 8 1.6" />
                </svg>
                <span className="relative ml-[1px] h-[7px] w-[13px] rounded-[2px] border border-ink/45">
                  <span className="absolute inset-[1.5px] right-[4.5px] rounded-[1px] bg-ink/65" />
                </span>
                <span className="h-[3px] w-[1.5px] rounded-r-[1px] bg-ink/35" />
              </span>
            </div>

            {/* The stage: three acts, cross-faded on one shared cycle */}
            <div className="absolute inset-x-0 bottom-0 top-[24px]">
              {/* ── ACT A · the site, navigated ───────────────────────── */}
              <div className="phone-act phone-act-a overflow-hidden">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-line bg-bg/95 px-3.5 py-[7px] backdrop-blur-sm">
                  <span className="font-display text-[0.62rem] leading-none text-ink">
                    Mint <span className="text-mint">&amp;</span> Co
                  </span>
                  <span className="flex flex-col gap-[3px]">
                    <span className="h-[1.5px] w-3.5 rounded-full bg-ink/40" />
                    <span className="h-[1.5px] w-3.5 rounded-full bg-ink/40" />
                  </span>
                </div>

                <div className="phone-page absolute inset-x-0 top-[30px] px-3.5">
                  <div className="space-y-[5px] pt-3">
                    <span className="block h-[9px] w-[88%] rounded-full bg-ink/85" />
                    <span className="block h-[9px] w-[54%] rounded-full bg-ink/85" />
                  </div>
                  <div className="mt-2.5 space-y-[3px]">
                    <span className={`block h-[3px] w-[78%] ${HAIRLINE}`} />
                    <span className={`block h-[3px] w-[62%] ${HAIRLINE}`} />
                  </div>
                  <div className="mt-3 h-[68px] rounded-lg bg-tint" />
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="h-[42px] rounded-lg border border-line bg-surface" />
                    <div className="h-[42px] rounded-lg border border-line bg-surface" />
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-surface p-2">
                    <StarRow />
                    <span className={`h-[3px] w-10 ${HAIRLINE}`} />
                  </div>
                  <div className="relative mt-3">
                    <span className="flex h-8 items-center justify-center rounded-lg bg-mint-cta text-[0.55rem] font-semibold tracking-wide text-white">
                      Book now
                    </span>
                    <span className="phone-ripple absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint-cta" />
                    <span className="phone-tap absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/20 ring-1 ring-ink/25" />
                  </div>
                  <div className="mt-3 space-y-[3px] pb-4">
                    <span className={`block h-[3px] w-[70%] ${HAIRLINE}`} />
                    <span className={`block h-[3px] w-[58%] ${HAIRLINE}`} />
                    <span className={`block h-[3px] w-[66%] ${HAIRLINE}`} />
                  </div>
                </div>
              </div>

              {/* ── ACT B · the customer writes it ────────────────────── */}
              <div className="phone-act phone-act-b bg-warm px-3 pt-3">
                <div className="rounded-xl border border-line bg-surface p-2.5 shadow-[0_2px_10px_rgba(16,33,27,0.05)]">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-tint" />
                    <span className="flex-1 space-y-1">
                      <span className={`block h-[5px] w-[62%] ${HAIRLINE}`} />
                      <span className={`block h-[4px] w-[38%] ${HAIRLINE}`} />
                    </span>
                  </div>

                  <StarRow animated className="mt-3 origin-left scale-[1.35]" />

                  <div className="mt-4 space-y-[7px]">
                    <span className="block h-[4px] w-[92%] origin-left rounded-full bg-ink/25 phone-type" />
                    <span className="block h-[4px] w-[84%] origin-left rounded-full bg-ink/25 phone-type" />
                    <span className="flex items-center gap-[3px]">
                      <span className="block h-[4px] w-[46%] origin-left rounded-full bg-ink/25 phone-type" />
                      <span className="phone-caret block h-[9px] w-[1.5px] bg-mint-deep" />
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className={`h-[3px] w-10 ${HAIRLINE}`} />
                    <span className="phone-post rounded-full bg-mint-cta px-3 py-[5px] text-[0.5rem] font-semibold tracking-wide text-white">
                      Post
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5">
                  <span className={`h-[3px] w-16 ${HAIRLINE}`} />
                </div>
              </div>

              {/* ── ACT C · the proof lands ───────────────────────────── */}
              <div className="phone-act phone-act-c px-3 pt-3">
                <div className="flex items-end justify-between">
                  <div>
                    <StarRow className="scale-[1.15] origin-left" />
                    <span className={`mt-2 block h-[4px] w-20 ${HAIRLINE}`} />
                  </div>
                  <span className={`h-[3px] w-8 ${HAIRLINE}`} />
                </div>

                <div className="mt-3 space-y-2">
                  <ReviewCard delay={0} widths={["86%", "58%"]} />
                  <ReviewCard delay={0.45} widths={["74%", "66%"]} />
                  <ReviewCard delay={0.9} widths={["82%", "48%"]} />
                </div>

                <div className="phone-toast absolute inset-x-3 top-2 flex items-center gap-2 rounded-xl border border-line bg-surface/95 px-2.5 py-2 shadow-[0_8px_20px_-8px_rgba(16,33,27,0.35)] backdrop-blur-sm">
                  <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-mint" />
                  <span className="text-[0.5rem] font-semibold tracking-wide text-ink">
                    New enquiry
                  </span>
                  <span className={`ml-auto h-[3px] w-6 ${HAIRLINE}`} />
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <span className="absolute bottom-[7px] left-1/2 z-20 h-[3px] w-[86px] -translate-x-1/2 rounded-full bg-ink/25" />

            {/* Light moving across the glass */}
            <span className="phone-glare pointer-events-none absolute -inset-y-16 left-0 z-30 w-14 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          {/* Dynamic island, over the screen */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[7px] z-40 h-[17px] w-[62px] -translate-x-1/2 rounded-full bg-ink"
          />
        </div>
      </div>

      <figcaption className="mt-6 text-center text-sm text-muted">
        The site, the review, the proof that follows. Illustrative — not a real
        client, not real reviews.
      </figcaption>
    </figure>
  );
}
