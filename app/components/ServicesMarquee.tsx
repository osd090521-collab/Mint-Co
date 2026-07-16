import { AmpMarker } from "./AmpMarker";

const services = [
  "Clean, premium websites",
  "Built to work beautifully on mobile",
  "Built to be found on Google",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden ? "true" : undefined}
      className="flex shrink-0 items-center"
    >
      {services.map((service) => (
        <span key={service} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-sm font-semibold uppercase tracking-[0.14em] text-bg sm:text-base">
            {service}
          </span>
          <AmpMarker className="text-lg sm:text-xl" />
        </span>
      ))}
    </div>
  );
}

/**
 * Full-bleed scrolling services band. Duplicated track for a seamless CSS
 * loop (no JS); the duplicate copy is aria-hidden so screen readers hear
 * the list once, not twice. Under prefers-reduced-motion the track freezes
 * and wraps instead of sliding, and the duplicate copy is hidden outright
 * (see the `.marquee-track` rules in globals.css).
 */
export function ServicesMarquee() {
  return (
    <section aria-label="Services" className="overflow-hidden bg-ink py-5">
      <div className="marquee-track flex w-max items-center">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}
