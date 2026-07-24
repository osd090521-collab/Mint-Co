import { Eyebrow } from "./Eyebrow";
import { staggerDelay } from "../lib/motion";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * The shared page-hero block — eyebrow, H1, lead paragraph, optional
 * closing note — used by every inner page (services, packages, process,
 * about, privacy). Replaces four near-identical hand-written copies and
 * fixes the H1 scale drift between them by construction: there is now one
 * place that sets sm:text-5xl, not four.
 *
 * The homepage hero is deliberately NOT built from this: it's the LCP
 * element, renders with no Reveal wrapping, and is a full size step larger
 * (sm:text-6xl) as the one intentional exception — the entry point earns a
 * bigger opening line than an inner page.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  after,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  after?: React.ReactNode;
}) {
  return (
    <Section as="div" rhythm="feature" border="bottom">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={staggerDelay(1)}>
        <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl sm:leading-[1.05] sm:tracking-[-0.02em]">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={staggerDelay(2)}>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
          {lead}
        </p>
      </Reveal>
      {after && <Reveal delay={staggerDelay(3)}>{after}</Reveal>}
    </Section>
  );
}
