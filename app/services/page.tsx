import type { Metadata } from "next";
import { AmpMarker } from "../components/AmpMarker";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { InlineLink } from "../components/InlineLink";
import { PageHero } from "../components/PageHero";
import { staggerDelay } from "../lib/motion";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { breadcrumbJsonLd, site } from "../site.config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Clean, mobile-first websites for businesses — designed with care, built to a genuinely high standard, and set up to be found on Google from day one.",
  alternates: { canonical: "/services" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Services · Mint & Co",
    description:
      "Clean, mobile-first websites for businesses — designed with care, built to a genuinely high standard, and set up to be found on Google from day one.",
    url: `${site.url}/services`,
  },
};

const pillars = [
  {
    t: "Website Design & Build",
    d: "A full website — designed with care, built mobile-first, hosted, secured and backed up. No template shortcuts, no afterthoughts.",
    included: [
      "Custom, mobile-first design — built for your business, not a template",
      "Hosting, security and backups included",
      "Content and copy pulled together with you",
      "Website edits included after launch (~1 hr/mo fair use)",
    ],
    whoFor:
      "Businesses with no website yet, or one that's slow, dated, or broken on a phone.",
  },
  {
    t: "Google & SEO Foundations",
    d: "Set up to be found — Google Business Profile, local SEO foundations, and the review stand that turns happy customers into public proof.",
    included: [
      "Google Business Profile set up and connected",
      "Local SEO foundations, Search Console and map listing configured",
      "NFC + QR review stand, configured to your Google review link",
      "Review dashboard so you can see what's coming in",
    ],
    whoFor: "Businesses that are invisible on Google search and maps today.",
    caveat:
      "We won't promise you'll rank top of Google — nobody honestly can. We promise the real foundations that make ranking possible.",
  },
  {
    t: "Enquiry & Booking Setup",
    d: "Turning a visitor into an enquiry — tidy contact channels, a booking system, and a real person on the other end.",
    included: [
      "WhatsApp, phone and social links tidied up and working",
      "Business email set up",
      "Booking system set up",
      "Staff incentive system to keep reviews coming in",
    ],
    whoFor:
      "Businesses that get looked at online but don't convert lookers into enquiries.",
    caveat:
      "You'll deal with our team directly — not a call centre, not a chatbot.",
  },
];

// Honest operating boundaries (ULTRAPLAN.md §8, "out of scope by default").
// Brief §2: vague inclusivity ("everything included") builds less trust than
// a stated, specific boundary.
const outOfScope = [
  "Full brand redesigns — logo, naming, brand strategy from scratch",
  "Complex e-commerce — multi-warehouse inventory, marketplaces, subscriptions-as-product",
  "Custom booking software — we integrate proven booking tools, not build bespoke ones",
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: pillars.map((row, i) => ({
    "@type": "Service",
    position: i + 1,
    name: row.t,
    description: row.d,
    provider: { "@type": "Organization", name: site.name },
    areaServed: site.areaServed,
  })),
};

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow="What we do"
        title="Clean, premium websites — built to be found."
        lead="Every Mint & Co build is designed with care and set up to be found on Google from day one — the full scope varies by package."
        after={
          <p className="mt-6 max-w-xl text-base text-muted">
            Exact inclusions vary by package —{" "}
            <InlineLink href="/packages">see all packages →</InlineLink>
          </p>
        }
      />

      <Section rhythm="flush">
        {pillars.map((row, i) => (
          <Reveal
            key={row.t}
            delay={staggerDelay(i)}
            className="grid grid-cols-1 gap-2 border-b border-line py-8 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-10"
          >
            <h2 className="flex items-baseline gap-3 text-xl font-medium text-ink">
              <AmpMarker className="w-6 shrink-0 text-right" />
              {row.t}
            </h2>
            <div>
              <p className="text-base leading-relaxed text-muted">{row.d}</p>
              <ul className="mt-4 space-y-2">
                {row.included.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-slate"
                  >
                    <AmpMarker className="shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-medium text-ink">
                Who it&apos;s for: {row.whoFor}
              </p>
              {row.caveat && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {row.caveat}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </Section>

      {/* Honest boundaries — Brief §2: a specific "no" builds more trust
          than an unqualified "everything included". */}
      <Section rhythm="standard" tone="warm" border="top">
        <Reveal>
          <Eyebrow>Where we draw the line</Eyebrow>
          <h2 className="mt-6 max-w-2xl text-2xl font-medium leading-snug sm:text-4xl">
            What&apos;s outside scope, stated up front.
          </h2>
        </Reveal>
        <Reveal delay={staggerDelay(1)}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            We&apos;d rather tell you now than let you find out later. None
            of this is a hard no forever — it&apos;s what a package
            doesn&apos;t cover by default:
          </p>
        </Reveal>
        <ul className="mt-6 max-w-2xl space-y-2">
          {outOfScope.map((item, i) => (
            <Reveal key={item} delay={staggerDelay(i + 2)}>
              <li className="flex gap-2 text-base leading-relaxed text-slate">
                <AmpMarker className="shrink-0" />
                {item}
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/services", "Services")),
        }}
      />

      <ContactCta
        refSource="services"
        heading="Not sure which of this you actually need?"
        lead="Tell us about your business and we'll say honestly which package fits — and just as honestly what we wouldn't bother charging you for."
      />
    </main>
  );
}
