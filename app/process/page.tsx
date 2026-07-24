import type { Metadata } from "next";
import { AmpMarker } from "../components/AmpMarker";
import { ContactCta } from "../components/ContactCta";
import { InlineLink } from "../components/InlineLink";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { breadcrumbJsonLd, site } from "../site.config";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How working with Mint & Co actually works: a free audit, pick your package, a 7–10 working day build, go live, then ongoing management. Rolling monthly, cancel anytime.",
  alternates: { canonical: "/process" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Process · Mint & Co",
    description:
      "How working with Mint & Co actually works: a free audit, pick your package, a 7–10 working day build, go live, then ongoing management. Rolling monthly, cancel anytime.",
    url: `${site.url}/process`,
  },
};

// Delivery stages, in order. Source: ULTRAPLAN.md §6 (sales motion), §8
// (delivery standards) and the Terms clause (rolling monthly, no setup fee,
// first month billed at go-live) — nothing here is invented.
const steps = [
  {
    t: "Free audit",
    d: "Tell us about your business and we'll reply with a short, honest write-up — how your site looks now, the two or three things we'd fix first, and which package fits.",
  },
  {
    t: "Pick your package",
    d: "Rolling monthly, no setup fee, no minimum term. Nothing to pay yet — your first bill lands at go-live, not today.",
  },
  {
    t: "We build",
    d: "7–10 working days from receiving your content, with two rounds of revisions along the way so you can shape the result.",
  },
  {
    t: "Go live",
    d: "Your first month is billed once the site is live, not before — we carry the build. Your domain and Google Business Profile are yours from day one.",
  },
  {
    t: "Ongoing",
    d: "A monthly report, website edits, Google Business Profile management and real support — for as long as you stay. Cancel anytime, no questions asked.",
  },
];

export default function ProcessPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow="How it works"
        title="Free audit. Clear steps. No surprises."
        lead="One monthly price, agreed before you commit to anything — then a build process built to keep you informed, not waiting."
        after={
          <p className="mt-6 max-w-xl text-base text-muted">
            See exactly what&apos;s included and what it costs{" "}
            <InlineLink href="/packages">→ Packages</InlineLink>
          </p>
        }
      />

      <Section width="3xl">
        {/*
          One Reveal trigger for the whole timeline (not one per step —
          keeps a single IntersectionObserver here instead of five). Nodes
          and the connecting line stagger in via CSS under
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
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-mint bg-bg text-sm font-semibold text-mint-deep">
                {i + 1}
              </span>
              <div className="pt-1">
                <h2 className="flex items-baseline gap-2 text-xl font-medium text-ink">
                  <AmpMarker />
                  {step.t}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-muted">{step.d}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/process", "Process")),
        }}
      />

      <ContactCta
        refSource="process"
        heading="The first step is always the same."
        lead="Tell us about your business and we'll send your free write-up within a working day — from there, you decide if step two is worth it."
      />
    </main>
  );
}
