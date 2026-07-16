import type { Metadata } from "next";
import { AmpMarker } from "../components/AmpMarker";
import { Cta } from "../components/Cta";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { packageMailto, site } from "../site.config";

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
      "Social setup + monthly branded post templates",
      "Local SEO management",
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
    a: "You can buy the full site export outright for £595. Otherwise it comes down after a 30-day grace period. Your domain and Google Business Profile were always yours — never hostages.",
  },
  {
    q: "When do you bill me?",
    a: "Your first month is billed at go-live, not at signature — we carry the build.",
  },
  {
    q: "Is there a setup fee?",
    a: "No, never. No setup fees, no surprise extras — just the monthly price.",
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

export default function PackagesPage() {
  return (
    <main id="main" className="flex-1">
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Eyebrow>Packages</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl sm:leading-[1.05] sm:tracking-[-0.02em]">
              One monthly price. Everything included.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
              No setup fees, no minimum term, cancel anytime — plus a free
              Google review stand in every package.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-sm text-muted">
              No setup fee · No minimum term, cancel anytime · Review stand
              included free in every package
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 60}
                className={`rounded-xl bg-surface p-7 shadow-card ${
                  tier.recommended
                    ? "border-2 border-mint shadow-soft"
                    : "border-t-2 border-mint"
                }`}
              >
                {tier.recommended && (
                  <div className="mb-4">
                    <span className="inline-flex rounded-full bg-tint px-3 py-1 text-xs font-semibold uppercase tracking-wide text-mint-deep">
                      Recommended
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-medium text-ink">{tier.name}</h2>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-warm">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal className="rounded-xl border border-mint/20 bg-tint p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-deep">
              £30 one-time
            </p>
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
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
          </Reveal>
          <div className="mt-8">
            {faqs.map((faq, i) => (
              <Reveal
                key={faq.q}
                delay={i * 60}
                className="grid grid-cols-1 gap-2 border-b border-line py-8 first:pt-0 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-10"
              >
                <h2 className="flex items-baseline gap-3 text-lg font-medium text-ink">
                  <AmpMarker className="w-6 shrink-0 text-right" />
                  {faq.q}
                </h2>
                <p className="text-base leading-relaxed text-muted">{faq.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ContactCta />
    </main>
  );
}
