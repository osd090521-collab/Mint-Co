import type { Metadata } from "next";
import { AmpMarker } from "../components/AmpMarker";
import { Eyebrow } from "../components/Eyebrow";
import { InlineLink } from "../components/InlineLink";
import { staggerDelay } from "../lib/motion";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { breadcrumbJsonLd, site } from "../site.config";
import { IntakeWizard } from "./IntakeWizard";

const description =
  "Tell us about your business and we'll reply with a short, honest write-up — how you look online right now, where you're losing customers, and the two or three things we'd fix first. Free, no obligation.";

export const metadata: Metadata = {
  title: "Free audit",
  description,
  alternates: { canonical: "/free-audit" },
  robots: { index: true, follow: true },
  // Previously missing entirely (COHERENCE-AUDIT.md R1) — the
  // highest-intent page on the site inherited the root layout's generic
  // homepage OG title/url instead of its own when shared.
  openGraph: {
    title: "Free audit · Mint & Co",
    description,
    url: `${site.url}/free-audit`,
  },
};

// The proof source approved for this project (COHERENCE-AUDIT.md §3):
// a real worked example, not an invented one. Every claim below is
// independently checkable by inspecting the actual site — none of it is a
// generic template.
const workingWell = [
  "Loads with real content, not a spinner — view source with JavaScript off and the page is still there.",
  "Every price, every cancellation term and what you own if you leave is stated the same way wherever it appears.",
  "Works end to end with a keyboard only, and respects reduced-motion settings.",
];

const stillFixing = [
  "No Google Business Profile linked into our own listing yet — same gap we'd flag on a client's site.",
  "No client case studies to show yet, because we haven't delivered any — so we're not showing any.",
];

export default function FreeAuditPage() {
  return (
    <main id="main" className="flex-1">
      <IntakeWizard />

      {/*
        Static section, outside the wizard's client-side phase state, so
        it's visible regardless of form/sending/done/failed. Anchor target
        for the homepage's "See the write-up we sent ourselves" link.
      */}
      <Section id="sample" rhythm="standard" border="top" tone="warm">
        <Reveal>
          <Eyebrow>A real example</Eyebrow>
        </Reveal>
        <Reveal delay={staggerDelay(1)}>
          <h2 className="mt-6 max-w-2xl text-2xl font-medium leading-snug sm:text-4xl">
            We don&apos;t have a client write-up to show you yet — so
            here&apos;s the one we sent ourselves.
          </h2>
        </Reveal>
        <Reveal delay={staggerDelay(2)}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Same format you&apos;ll get: what&apos;s working, what isn&apos;t,
            and the two or three things we&apos;d fix first. We ran it on
            this site, because judging our own work honestly in public is
            the whole point.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <Reveal delay={staggerDelay(3)}>
            <h3 className="text-base font-medium text-ink">What&apos;s working</h3>
            <ul className="mt-4 space-y-3">
              {workingWell.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate">
                  <AmpMarker className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={staggerDelay(4)}>
            <h3 className="text-base font-medium text-ink">What we&apos;d fix first</h3>
            <ul className="mt-4 space-y-3">
              {stillFixing.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate">
                  <AmpMarker className="shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={staggerDelay(5)}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted">
            Yours will be specific to your business, not a template —{" "}
            <InlineLink href="#main">fill in the form above ↑</InlineLink> and
            we&apos;ll write it.
          </p>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/free-audit", "Free audit")),
        }}
      />
    </main>
  );
}
