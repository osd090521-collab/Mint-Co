import type { Metadata } from "next";
import { AmpMarker } from "../components/AmpMarker";
import { Card } from "../components/Card";
import { Cta } from "../components/Cta";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { InlineLink } from "../components/InlineLink";
import { PageHero } from "../components/PageHero";
import { staggerDelay } from "../lib/motion";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { breadcrumbJsonLd, packageMailto, site } from "../site.config";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Three monthly packages from Mint & Co — Essentials, Growth and Complete — no setup fee, no minimum term, cancel anytime, and a free Google review stand in every package.",
  alternates: { canonical: "/packages" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Packages · Mint & Co",
    description:
      "Three monthly packages from Mint & Co — Essentials, Growth and Complete — no setup fee, no minimum term, cancel anytime, and a free Google review stand in every package.",
    url: `${site.url}/packages`,
  },
};

// Bullets kept in sync with ULTRAPLAN.md §3 — including AEO/GEO on Complete,
// the tier's stated headline differentiator, which was missing from this
// page (COHERENCE-AUDIT.md, technical risk list).
const tiers = [
  {
    name: "Essentials",
    tagline: "Get found & trusted",
    price: 49,
    recommended: false,
    bullets: [
      "Review stand + funnel (stand free)",
      "Review dashboard + monthly report",
      "Staff incentive system + leaderboard",
      "Google Business Profile set up, then managed",
      "WhatsApp & social links tidy-up",
    ],
  },
  {
    name: "Growth",
    tagline: "Found, trusted & chosen — the core offer",
    price: 119,
    recommended: true,
    bullets: [
      "Everything in Essentials",
      "Full website — designed, built, hosted, secured, backed up",
      "Local SEO foundations (Search Console, citations, map)",
      "Website edits included (~1 hr/mo fair use)",
      "Business email setup",
      "Booking system setup",
    ],
  },
  {
    name: "Complete",
    tagline: "The full digital presence",
    price: 179,
    recommended: false,
    bullets: [
      "Everything in Growth",
      "AI search optimisation (AEO/GEO) — exclusive to Complete",
      "Local SEO management (not just foundations)",
      "Social setup + monthly branded post templates",
      "Branding polish + full copywriting at build",
      "Priority support",
    ],
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes — every package is rolling monthly with no minimum term. Cancel whenever you like.",
  },
  {
    q: "What happens to my website if I cancel?",
    a: "Your domain and Google Business Profile are yours from day one and stay in your name — always. The website itself is ours while you subscribe: you can buy it outright for £595, or it comes down after a 30-day grace period.",
  },
  {
    q: "When do you bill me?",
    a: "Your first month is billed at go-live, not at signature — we carry the build.",
  },
  {
    q: "Is there a setup fee?",
    a: "No, never. No setup fees, no surprise extras — just the monthly price.",
  },
  {
    q: "How much website editing is actually included?",
    a: "About an hour a month of fair-use edits — text and image changes, small tweaks. Bigger rebuilds or new pages are quoted separately. We'll always tell you before anything falls outside fair use.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Mint & Co packages",
  itemListElement: tiers.map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    description: tier.bullets.join("; "),
    price: tier.price,
    priceCurrency: "GBP",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: tier.price,
      priceCurrency: "GBP",
      unitText: "MONTH",
    },
    seller: { "@type": "Organization", name: site.name },
  })),
};

export default function PackagesPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow="Packages"
        title="One monthly price. Everything included."
        lead="No setup fees, no minimum term, cancel anytime — plus a free Google review stand in every package."
        after={
          <p className="mt-6 max-w-xl text-sm text-muted">
            No setup fee · No minimum term, cancel anytime · Review stand
            included free in every package
          </p>
        }
      />

      <Section rhythm="standard">
        {/*
          A real H2 above the grid, not just an Eyebrow — tier names below
          are H3s under it. Previously this section had no heading at all
          and three tier names sat as bare H2 siblings of the FAQ's own
          (also bare) H2-level questions: eight same-level headings with no
          section grouping between them. See COHERENCE-AUDIT.md V8.
        */}
        <Reveal>
          <h2 className="sr-only">Compare the packages</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={staggerDelay(i)}>
              <Card variant={tier.recommended ? "emphasis" : "default"} className="h-full">
                {tier.recommended && (
                  <div className="mb-4">
                    <span className="inline-flex rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-deep">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-medium text-ink">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
                <p className="mt-4 font-display text-4xl font-medium text-ink">
                  £{tier.price}
                  <span className="text-sm font-normal text-muted"> /month</span>
                </p>
                <hr className="my-5 border-line" />
                <ul className="space-y-2">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate">
                      <AmpMarker className="shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Cta
                  href={packageMailto(tier.name, `£${tier.price}/month`)}
                  variant={tier.recommended ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  Ask about {tier.name}
                </Cta>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/*
        Ownership, ongoing until you leave. Brief §6: ownership and
        cancellation terms belong in the main decision journey, not only in
        an FAQ a visitor might not open. Same facts, same wording, as the
        FAQ answer below and /terms — one honest phrasing, stated once here
        prominently and repeated consistently everywhere else it appears.
      */}
      <Section rhythm="standard" border="y" tone="warm">
        <Reveal>
          <Card variant="tint">
            <Eyebrow>What you own</Eyebrow>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">
              Your domain and your Google Business Profile are yours from
              day one and stay in your name — always. The website itself is
              ours while you subscribe: cancel and you can buy it outright
              for £595, or it comes down after a 30-day grace period.
              Nothing here is a surprise you find out on your way out.
            </p>
          </Card>
        </Reveal>
      </Section>

      <Section rhythm="standard" border="bottom" tone="warm">
        <Reveal>
          <Card variant="tint">
            <Eyebrow>£30 one-time</Eyebrow>
            <h2 className="mt-3 text-2xl font-medium text-ink">
              The review stand that starts it all
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
              An NFC + QR stand configured to your Google review link, plus a
              printed instruction card. No subscription, no automation, no
              catch — and it&apos;s included free in every package above.
            </p>
            <p className="mt-4 max-w-2xl font-medium leading-relaxed text-ink">
              &ldquo;The stand gets you reviews. The packages make sure people
              actually find them — and you.&rdquo;
            </p>
            <Cta
              href={packageMailto("Review stand", "£30 one-time")}
              variant="secondary"
              className="mt-6"
            >
              Ask about a stand
            </Cta>
          </Card>
        </Reveal>
      </Section>

      <Section rhythm="standard">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="sr-only">Questions</h2>
        </Reveal>
        <div className="mt-8">
          {faqs.map((faq, i) => (
            <Reveal
              key={faq.q}
              delay={staggerDelay(i)}
              className="grid grid-cols-1 gap-2 border-b border-line py-8 first:pt-0 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-10"
            >
              <h3 className="flex items-baseline gap-3 text-lg font-medium text-ink">
                <AmpMarker className="w-6 shrink-0 text-right" />
                {faq.q}
              </h3>
              <p className="text-base leading-relaxed text-muted">{faq.a}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={staggerDelay(faqs.length)}>
          <p className="mt-8 text-base text-muted">
            Want the detail behind what&apos;s actually involved?{" "}
            <InlineLink href="/services">See all services →</InlineLink>
          </p>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/packages", "Packages")),
        }}
      />

      <ContactCta
        refSource="packages"
        heading="Still deciding between packages?"
        lead="Send us a line about your business and we'll tell you honestly which one fits — there's no commission for steering you toward the bigger one."
      />
    </main>
  );
}
