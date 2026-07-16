import type { Metadata } from "next";
import Link from "next/link";
import { AmpMarker } from "../components/AmpMarker";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { site } from "../site.config";

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
      "Website edits included after launch (fair use)",
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
      "You'll deal with Omar, David or Rodrick directly — not a call centre, not a chatbot.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl sm:leading-[1.05] sm:tracking-[-0.02em]">
              Clean, premium websites — built to be found.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
              Every Mint &amp; Co build is designed with care, built
              mobile-first, and set up to be found on Google from day one —
              no template shortcuts, no afterthoughts.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-base text-muted">
              Exact inclusions vary by package —{" "}
              <Link
                href="/packages"
                className="font-medium text-mint-deep underline underline-offset-4"
              >
                see all packages →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {pillars.map((row, i) => (
            <Reveal
              key={row.t}
              delay={i * 60}
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
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
