import Link from "next/link";
import { Cta } from "./Cta";
import { staggerDelay } from "../lib/motion";
import { Reveal } from "./Reveal";
import { auditWhatsApp, ctaConsequence, primaryCta, site } from "../site.config";

/**
 * Shared closing CTA band — used at the bottom of every page. `refSource`
 * renders the secondary "or tell us about your business →" link into the
 * intake wizard, tagged `?ref=band-{refSource}` so placement conversion is
 * measurable (Intake Plan v2.1). Mailto stays primary.
 *
 * `heading`/`lead` default to the flagship copy but are overridable per
 * page (Brief §21 — "do not use the exact same closing block mechanically
 * on every page"). The mechanics underneath — buttons, consequence
 * microcopy, email fallback — deliberately stay identical everywhere: the
 * brief's complaint was a copy-pasted ENDING, not a varying action.
 *
 * Two Reveal beats (headline+lead, then the whole action block), not seven —
 * this was the clearest over-animated spot on the site: seven
 * IntersectionObservers and a 240ms cascade for what reads as two thoughts,
 * repeated on every page. See COHERENCE-AUDIT.md M-A.
 */
export function ContactCta({
  refSource,
  heading = "Let's get your business in mint condition.",
  lead = "Send us a line and we'll reply with a short, honest write-up: how your business looks on a phone right now, where you're losing customers, and the two or three things we'd fix first. No charge, no pressure.",
}: {
  refSource?: string;
  heading?: string;
  lead?: string;
}) {
  const whatsApp = auditWhatsApp();
  const cta = primaryCta("band");

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{lead}</p>
        </Reveal>

        <Reveal delay={staggerDelay(1)}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Cta href={cta.href}>{cta.label}</Cta>
            {whatsApp && (
              <Cta href={whatsApp} variant="secondary">
                Message us on WhatsApp
              </Cta>
            )}
          </div>
          <p className="mt-3 text-xs text-muted">{ctaConsequence(cta.href)}</p>
          {refSource && (
            <p className="mt-5 text-base">
              <Link
                href={`/free-audit?ref=band-${refSource}`}
                className="font-medium text-mint-deep underline underline-offset-4"
              >
                or tell us about your business →
              </Link>
            </p>
          )}
          <p className="mx-auto mt-6 max-w-md text-sm text-muted">
            Free, no obligation — and we&apos;ll only use your details to
            reply. Real people. Real replies — usually within one working
            day.
          </p>
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
