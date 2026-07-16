import type { Metadata } from "next";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { auditWhatsApp, site } from "../site.config";
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
    "Mint & Co is a three-person studio — Omar, David and Rodrick — building in the open from Harrow, working with businesses across London and the UK.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About · Mint & Co",
    description:
      "Mint & Co is a three-person studio — Omar, David and Rodrick — building in the open from Harrow, working with businesses across London and the UK.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  const whatsApp = auditWhatsApp();

  return (
    <main id="main" className="flex-1">
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl sm:leading-[1.05] sm:tracking-[-0.02em]">
              A three-person studio, building in the open.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
              We&apos;re Omar, David and Rodrick. Harrow-based, working with
              businesses across London and the UK. This very site is our
              first piece of work — so you&apos;re not looking at a sales
              pitch, you&apos;re looking at the exact standard we&apos;d
              build yours to. Judge us on it.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-ink">
              You&apos;ll deal directly with Omar, David and Rodrick — not a
              call centre, not a chatbot.
            </p>
          </Reveal>
          <Reveal delay={200}>
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
          </Reveal>
        </div>
      </section>

      <section className="bg-warm">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="rounded-xl border-t-2 border-mint bg-surface p-7 shadow-card">
              <p className="text-base leading-relaxed text-slate">
                <span className="font-medium text-ink">
                  We won&apos;t promise you top of Google.
                </span>{" "}
                Nobody honestly can. We promise proper foundations and work
                we&apos;d put our name on — then we let the quality speak.
              </p>
            </Reveal>
            <Reveal delay={60} className="rounded-xl border-t-2 border-mint bg-surface p-7 shadow-card">
              <p className="text-base leading-relaxed text-slate">
                <span className="font-medium text-ink">
                  You own what&apos;s yours.
                </span>{" "}
                Your domain and your Google Business Profile stay in your
                name, always. If you ever leave, you leave with everything.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="mt-10 max-w-xl text-base text-muted">
              {site.location} · working with businesses across London and
              the UK.
            </p>
          </Reveal>
        </div>
      </section>

      {site.testimonials.length > 0 && (
        <section>
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <Eyebrow>What businesses say</Eyebrow>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {site.testimonials.map((t, i) => (
                <Reveal
                  key={t.name}
                  delay={i * 60}
                  className="rounded-xl border-t-2 border-mint bg-surface p-7 shadow-card"
                >
                  <p className="text-base leading-relaxed text-slate">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-medium text-ink">
                    {t.name} · {t.business}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </main>
  );
}
