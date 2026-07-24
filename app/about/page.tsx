import type { Metadata } from "next";
import { Card } from "../components/Card";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { InlineLink } from "../components/InlineLink";
import { PageHero } from "../components/PageHero";
import { staggerDelay } from "../lib/motion";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { auditWhatsApp, breadcrumbJsonLd, site } from "../site.config";
import {
  EmailIcon,
  InstagramIcon,
  PhoneIcon,
  WhatsAppIcon,
  iconLinkClass,
} from "../components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mint & Co is a three-person studio building in the open from Harrow, working with businesses across London and the UK.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About · Mint & Co",
    description:
      "Mint & Co is a three-person studio building in the open from Harrow, working with businesses across London and the UK.",
    url: `${site.url}/about`,
  },
};

const principles = [
  {
    t: "Small, by design",
    d: "Three people, not a rotating account team. The same studio that designs your site builds it, and looks after it afterwards — you're never handed off to someone new.",
  },
  {
    t: "We won't promise you top of Google",
    d: "Nobody honestly can. We promise proper foundations and work we'd put our name on — then we let the quality speak.",
  },
  {
    t: "You own what's yours",
    d: "Your domain and your Google Business Profile are yours from day one and stay in your name — always. The website itself is ours while you subscribe; cancel and you can buy it outright, or it comes down after a 30-day grace period.",
  },
];

export default function AboutPage() {
  const whatsApp = auditWhatsApp();

  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow="Who we are"
        title="A three-person studio, building in the open."
        lead="We're a small studio — Harrow-based, working with businesses across London and the UK. Design, build and ongoing care all sit with the same small team, so you're not handed between departments or account managers you've never met."
        after={
          <>
            <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-ink">
              You&apos;ll deal directly with our team — not a call centre,
              not a chatbot.
            </p>
            <div className="mt-10">
              <Eyebrow>How to reach us</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} aria-label="Email us" title="Email us" className={iconLinkClass}>
                  <EmailIcon />
                </a>
                {site.phone && (
                  <a href={`tel:${site.phone}`} aria-label="Call us" title="Call us" className={iconLinkClass}>
                    <PhoneIcon />
                  </a>
                )}
                {whatsApp && (
                  <a href={whatsApp} aria-label="Message us on WhatsApp" title="WhatsApp" className={iconLinkClass}>
                    <WhatsAppIcon />
                  </a>
                )}
                {site.instagramUrl && (
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Find us on Instagram"
                    title="Instagram"
                    className={iconLinkClass}
                  >
                    <InstagramIcon />
                  </a>
                )}
              </div>
            </div>
          </>
        }
      />

      <Section rhythm="standard" tone="warm">
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={staggerDelay(i)}>
              <Card className="h-full">
                <p className="text-base leading-relaxed text-slate">
                  <span className="font-medium text-ink">{p.t}.</span>{" "}
                  {p.d}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={staggerDelay(principles.length)}>
          <p className="mt-8 text-base text-muted">
            Curious how a project actually runs?{" "}
            <InlineLink href="/process">See the process →</InlineLink>
          </p>
        </Reveal>
      </Section>

      {site.testimonials.length > 0 && (
        <Section rhythm="standard">
          <Reveal>
            <Eyebrow>What businesses say</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {site.testimonials.map((t, i) => (
              <Reveal key={t.name} delay={staggerDelay(i)}>
                <Card>
                  <p className="text-base leading-relaxed text-slate">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-medium text-ink">
                    {t.name} · {t.business}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/about", "About")),
        }}
      />

      <ContactCta
        refSource="about"
        heading="Like how we work? Let's talk about your business."
        lead="Send us a line and you'll hear back from the same small team you've just been reading about — real replies, usually within one working day."
      />
    </main>
  );
}
