import Link from "next/link";
import { Cta } from "./Cta";
import { Reveal } from "./Reveal";
import { auditWhatsApp, ctaConsequence, primaryCta, site } from "../site.config";

/**
 * Shared closing CTA band — used at the bottom of every page.
 * `refSource` renders the secondary "or tell us about your business →"
 * link into the intake wizard, tagged `?ref=band-{refSource}` so placement
 * conversion is measurable (Intake Plan v2.1). Mailto stays primary.
 */
export function ContactCta({ refSource }: { refSource?: string }) {
  const whatsApp = auditWhatsApp();
  const cta = primaryCta("band");

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">
            Let&apos;s get your business in mint condition.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Send us a line and we&apos;ll reply with a short, honest
            write-up: how your business looks on a phone right now, where
            you&apos;re losing customers, and the two or three things
            we&apos;d fix first. No charge, no pressure.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Cta href={cta.href}>{cta.label}</Cta>
            {whatsApp && (
              <Cta href={whatsApp} variant="secondary">
                Message us on WhatsApp
              </Cta>
            )}
          </div>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-3 text-xs text-muted">{ctaConsequence(cta.href)}</p>
        </Reveal>
        {refSource && (
          <Reveal delay={170}>
            <p className="mt-5 text-base">
              <Link
                href={`/free-audit?ref=band-${refSource}`}
                className="font-medium text-mint-deep underline underline-offset-4"
              >
                or tell us about your business →
              </Link>
            </p>
          </Reveal>
        )}
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted">
            Free, no obligation — and we&apos;ll only use your details to
            reply. Real people. Real replies — usually within one working
            day.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-4 text-sm text-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-mint-deep underline underline-offset-4"
            >
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
