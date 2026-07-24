import { Card } from "./components/Card";
import { ContactCta } from "./components/ContactCta";
import { Cta } from "./components/Cta";
import { Eyebrow } from "./components/Eyebrow";
import { InlineLink } from "./components/InlineLink";
import { staggerDelay } from "./lib/motion";
import { Reveal } from "./components/Reveal";
import { Section } from "./components/Section";
import {
  auditWhatsApp,
  ctaConsequence,
  primaryCta,
  site,
} from "./site.config";

const tiers = [
  { name: "Essentials", price: 49 },
  { name: "Growth", price: 119 },
  { name: "Complete", price: 179 },
];

const businessTypes = [
  "Barbers & salons",
  "Trades — plumbers, electricians, builders",
  "Cafés & restaurants",
  "Clinics & beauty",
  "Shops & retail",
  "Online sellers",
];

export default function Home() {
  const whatsApp = auditWhatsApp();
  const cta = primaryCta("hero");

  return (
    <main id="main" className="flex-1">
      {/* HERO — answers "why should I look twice?" */}
      <section className="relative overflow-hidden">
        {/* Oversized faint ampersand — typographic art direction, not decoration */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[4%] -top-[6%] select-none font-display leading-none text-mint/[0.05] text-[22rem] sm:text-[30rem]"
        >
          &amp;
        </span>

        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          {/*
            Hero renders as plain server HTML at full opacity (no Reveal) —
            it's the LCP element and must not paint blank behind JS/IO gating.
            Reveal is reserved for below-the-fold sections.
          */}
          <Eyebrow>Web Studio · Harrow</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-6xl sm:leading-[1.05] sm:tracking-[-0.03em]">
            Look as good online as you do in person.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
            Your website, Google profile and reviews — built properly and
            looked after every month, for one clear price. No setup fee, no
            minimum term, cancel anytime.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Cta href={cta.href}>{cta.label}</Cta>
            {whatsApp ? (
              <a href={whatsApp} className="text-base font-medium text-mint-deep underline underline-offset-4">
                or message us on WhatsApp →
              </a>
            ) : (
              <a href={`mailto:${site.email}`} className="text-base font-medium text-mint-deep underline underline-offset-4">
                {site.email}
              </a>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">{ctaConsequence(cta.href)}</p>
          <p className="mt-4">
            <InlineLink href="/free-audit?ref=hero" className="text-base">
              or tell us about your business →
            </InlineLink>
          </p>
          <p className="mt-6 max-w-xl text-sm text-muted">
            Harrow-based · working across London and the UK · live in
            7–10 working days · your domain &amp; Google profile are yours
            from day one.
          </p>
          <p className="mt-4 text-sm text-muted">
            No obligation, no hard sell — we&apos;ll show you what we&apos;d
            change, you decide.
          </p>
        </div>
      </section>

      {/* THE PROBLEM — answers "is this actually me?" */}
      <Section rhythm="standard" border="y" tone="warm">
        <Reveal>
          <h2 className="max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
            Brilliant in person. Often invisible online.
          </h2>
        </Reveal>
        <Reveal delay={staggerDelay(1)}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Most good local businesses either have no website, or one
            that&apos;s slow and broken on a phone — which usually
            isn&apos;t the owner&apos;s fault; they&apos;re too busy running
            a great business to ever look at their own site on a phone. In
            ten seconds on a screen, a stranger decides whether to trust
            you. We make those ten seconds count.
          </p>
        </Reveal>
      </Section>

      {/* THE PROOF — answers "why should I believe any of this?" */}
      <Section rhythm="standard">
        <Reveal>
          <Eyebrow>Judge us on this, not our word</Eyebrow>
        </Reveal>
        <Reveal delay={staggerDelay(1)}>
          <h2 className="mt-6 max-w-2xl text-2xl font-medium leading-snug sm:text-4xl">
            We don&apos;t have client results to show you yet. So look at
            this site instead.
          </h2>
        </Reveal>
        <Reveal delay={staggerDelay(2)}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            This is our first piece of work, and it&apos;s the exact
            standard we&apos;d build yours to — not a mockup. Every page
            here loads its real content without JavaScript, works with a
            keyboard only, and is honest about what we don&apos;t have yet
            rather than faking it. We&apos;d rather you check than take our
            word for it.
          </p>
        </Reveal>
        <Reveal delay={staggerDelay(3)}>
          <p className="mt-6">
            <InlineLink href="/free-audit#sample" className="text-base">
              See the write-up we sent ourselves →
            </InlineLink>
          </p>
        </Reveal>
      </Section>

      {/* WHAT IT COSTS — answers "what do I get, and what does it cost?" */}
      <Section rhythm="standard" border="y" tone="warm">
        <Reveal>
          <Eyebrow>What it costs</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-2xl font-medium leading-snug sm:text-4xl">
            One monthly price, everything in it stated up front.
          </h2>
        </Reveal>
        <Reveal delay={staggerDelay(1)}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            No setup fee, no minimum term, cancel anytime.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={staggerDelay(i + 2)}>
              <Card variant={tier.name === "Growth" ? "emphasis" : "default"} className="min-w-[160px] p-5">
                <p className="text-sm font-medium text-ink">{tier.name}</p>
                <p className="mt-1 font-display text-2xl font-medium text-ink">
                  £{tier.price}
                  <span className="text-sm font-normal text-muted"> /mo</span>
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={staggerDelay(5)}>
          <p className="mt-8">
            <InlineLink href="/packages" className="text-base">
              See what&apos;s included in each →
            </InlineLink>
          </p>
        </Reveal>
      </Section>

      {/* WHO IT'S FOR — answers "is this relevant to a business like mine?" */}
      <Section rhythm="standard">
        <Reveal>
          <Eyebrow>Who it&apos;s for</Eyebrow>
        </Reveal>
        <Reveal delay={staggerDelay(1)}>
          <h2 className="mt-6 max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
            Built for appointment- and footfall-based local businesses.
          </h2>
        </Reveal>
        <ul className="mt-8 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {businessTypes.map((type, i) => (
            <Reveal key={type} delay={staggerDelay(i)}>
              <li className="flex gap-2 text-base text-slate">
                <span aria-hidden="true" className="text-mint">&amp;</span>
                {type}
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={staggerDelay(4)}>
          <p className="mt-8">
            <InlineLink href="/services" className="text-base">
              Explore what we do →
            </InlineLink>
          </p>
        </Reveal>
      </Section>

      <ContactCta refSource="home" />
    </main>
  );
}
