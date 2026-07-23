import type { Metadata } from "next";
import Link from "next/link";
import { AmpMarker } from "../components/AmpMarker";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { site } from "../site.config";

export const metadata: Metadata = {
  title: "Process & Pricing",
  description:
    "How a Mint & Co build works: a free audit, a clear fixed-price quote, half to begin, two rounds of revisions, and a working website in 7–10 working days.",
  alternates: { canonical: "/process" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Process & Pricing · Mint & Co",
    description:
      "How a Mint & Co build works: a free audit, a clear fixed-price quote, half to begin, two rounds of revisions, and a working website in 7–10 working days.",
    url: `${site.url}/process`,
  },
};

const steps = [
  {
    t: "Free audit",
    d: "Tell us about your business and we'll reply with a short, honest write-up — how your site looks now, and the two or three things we'd fix first, plus a fixed-price quote.",
  },
  {
    t: "You approve",
    d: "Agree the price up front. Half the fee to begin — no vague quotes, no surprise extras added later.",
  },
  {
    t: "We build",
    d: "7–10 working days from receiving your content, with two rounds of revisions along the way so you can shape the result.",
  },
  {
    t: "You launch",
    d: "The rest paid once you're happy, before we go live. Your domain and your Google Business Profile stay in your name, always.",
  },
];

export default function ProcessPage() {
  return (
    <main id="main" className="flex-1">
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl sm:leading-[1.05] sm:tracking-[-0.02em]">
              Fixed price. Clear steps. No surprises.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
              Premium work, fairly priced, properly delivered — clear
              fixed-price packages, agreed before we start.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-base text-muted">
              See exactly what&apos;s included and what it costs{" "}
              <Link
                href="/packages"
                className="font-medium text-mint-deep underline underline-offset-4"
              >
                → Packages
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
          {/*
            One Reveal trigger for the whole timeline (not one per step —
            keeps a single IntersectionObserver here instead of four).
            Nodes and the connecting line stagger in via CSS under
            [data-shown="true"] .timeline-* selectors in globals.css.
          */}
          <Reveal as="ol" className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-4 top-2 w-px -translate-x-1/2 bg-line"
            />
            <div
              aria-hidden="true"
              className="timeline-line absolute bottom-2 left-4 top-2 w-px -translate-x-1/2 bg-mint"
            />
            {steps.map((step, i) => (
              <li key={step.t} className="timeline-node relative flex gap-6 pb-12 last:pb-0">
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-mint/70 bg-white/60 text-sm font-semibold text-mint-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md backdrop-saturate-150">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h2 className="flex items-baseline gap-2 text-xl font-medium text-ink">
                    <AmpMarker />
                    {step.t}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted">
                    {step.d}
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/*
        FAQ section intentionally deferred — needs real answers from the
        site owner on: what a client needs to provide to start, whether
        post-launch support/website care is offered, and whether an
        existing site can be updated vs. only new builds. Add a visible
        Q&A block here + matching FAQPage JSON-LD once those are confirmed.
      */}

      <ContactCta refSource="process" />
    </main>
  );
}
