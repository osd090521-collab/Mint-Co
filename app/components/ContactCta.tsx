import { Reveal } from "./Reveal";
import { auditMailto, auditWhatsApp, site } from "../site.config";

const ctaClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl bg-mint-cta px-8 text-base font-semibold tracking-[0.01em] text-white shadow-soft transition duration-150 hover:bg-mint-deep active:scale-[0.98]";

/** Shared closing CTA band — used at the bottom of every page. */
export function ContactCta() {
  const whatsApp = auditWhatsApp();

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
            <a href={auditMailto()} className={ctaClass}>
              Get my free audit
            </a>
            {whatsApp && (
              <a
                href={whatsApp}
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-line px-8 text-base font-medium text-mint-deep transition-colors hover:bg-tint"
              >
                Message us on WhatsApp
              </a>
            )}
          </div>
        </Reveal>
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
              className="font-medium text-mint-deep underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
