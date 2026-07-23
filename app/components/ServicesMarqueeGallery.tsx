import { MarqueeSpotlight } from "./MarqueeSpotlight";

const services = [
  "Clean, premium websites",
  "Built to work beautifully on mobile",
  "Built to be found on Google",
];

type Theme = {
  id: number;
  name: string;
  wrapClassName: string;
  bgClassName?: string;
  blobs?: string[];
};

// Ordered most artistic/interesting first, per design review.
const themes: Theme[] = [
  { id: 13, name: "Pinterest Bloom", wrapClassName: "mq-theme-13", bgClassName: "mq-theme-13-bg", blobs: ["a", "b", "c", "d"] },
  { id: 12, name: "Apple Frost", wrapClassName: "mq-theme-12", bgClassName: "mq-theme-12-bg", blobs: ["a", "b", "c"] },
  { id: 11, name: "Spotlight Drift", wrapClassName: "mq-theme-11" },
  { id: 10, name: "Aurora Shift", wrapClassName: "mq-theme-10" },
  { id: 9, name: "Glass", wrapClassName: "mq-theme-9", bgClassName: "mq-theme-9-bg" },
  { id: 8, name: "Carbon Steel", wrapClassName: "mq-theme-8" },
  { id: 7, name: "Rose Quartz", wrapClassName: "mq-theme-7" },
  { id: 6, name: "Mono Terminal", wrapClassName: "mq-theme-6" },
  { id: 5, name: "Terracotta Editorial", wrapClassName: "mq-theme-5" },
  { id: 4, name: "Deep Navy Tech", wrapClassName: "mq-theme-4" },
  { id: 3, name: "Arctic Minimal", wrapClassName: "mq-theme-3" },
  { id: 2, name: "Obsidian Gold", wrapClassName: "mq-theme-2" },
  { id: 1, name: "Midnight Emerald", wrapClassName: "mq-theme-1" },
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden ? "true" : undefined} className="flex shrink-0 items-center">
      {services.map((service) => (
        <span key={service} className="flex items-center">
          <span className="mq-text">{service}</span>
          <span aria-hidden="true" className="mq-amp">
            &amp;
          </span>
        </span>
      ))}
    </div>
  );
}

function MarqueeStrip({ theme }: { theme: Theme }) {
  const strip = (
    <div className={`mq-strip ${theme.wrapClassName}`} aria-label={theme.name}>
      <div className="marquee-track flex w-max items-center">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );

  if (theme.id === 11) {
    return <MarqueeSpotlight>{strip}</MarqueeSpotlight>;
  }

  if (!theme.bgClassName) return strip;

  return (
    <div className={theme.bgClassName}>
      {theme.blobs?.map((letter) => (
        <div key={letter} className={`mq-blob-${theme.id} ${letter}`} />
      ))}
      {strip}
    </div>
  );
}

export function ServicesMarqueeGallery() {
  return (
    <section aria-label="Ticker style gallery" className="bg-warm py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          The wow factor
        </p>
        <h2 className="mt-2 max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
          One banner, thirteen ways to make it feel premium.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Every build starts from your brand — this is the range we design from.
        </p>
        <div className="marquee-gallery mt-8">
          {themes.map((theme) => (
            <MarqueeStrip key={theme.id} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
