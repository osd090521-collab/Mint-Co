import type { Metadata } from "next";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Process & Pricing",
  description:
    "How a Mint & Co build works: a free audit, a clear fixed-price quote, half to begin, two rounds of revisions, and a working website in ten days.",
  alternates: { canonical: "/process" },
  robots: { index: true, follow: true },
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
    d: "Ten working days from receiving your content, with two rounds of revisions along the way so you can shape the result.",
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
            {steps.map((step, i) => (
              <Reveal key={step.t} delay={i * 60}>
                <h2 className="flex items-baseline gap-3 text-xl font-medium text-ink">
                  <span aria-hidden="true" className="text-mint">
                    &amp;
                  </span>
                  {step.t}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {step.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/*
        FAQ section intentionally deferred — needs real answers from the
        site owner on: what a client needs to provide to start, whether
        post-launch support/website care is offered, and whether an
        existing site can be updated vs. only new builds. Add a visible
        Q&A block here + matching FAQPage JSON-LD once those are confirmed.
      */}

      <ContactCta />
    </main>
  );
}
