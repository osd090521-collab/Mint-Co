import Link from "next/link";
import { ContactCta } from "./components/ContactCta";
import { Cta } from "./components/Cta";
import { Eyebrow } from "./components/Eyebrow";
import { Reveal } from "./components/Reveal";
import { ServicesMarquee } from "./components/ServicesMarquee";
import {
  auditWhatsApp,
  ctaConsequence,
  primaryCta,
  site,
} from "./site.config";

const teaserLinkClass =
  "font-medium text-mint-deep underline underline-offset-4";

const inlineLinkClass =
  "text-base font-medium text-mint-deep underline underline-offset-4";

export default function Home() {
  const whatsApp = auditWhatsApp();
  const cta = primaryCta("hero");

  return (
    <main id="main" className="flex-1">
      {/* HERO — feature padding 80/112 */}
      <section className="relative overflow-hidden">
        {/* Oversized faint ampersand — typographic art direction, not decoration */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[4%] -top-[6%] select-none font-display leading-none text-mint/[0.05] text-[22rem] sm:text-[30rem]"
        >
          &amp;
        </span>

        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          {/*
            Hero renders as plain server HTML at full opacity (no Reveal) —
            it's the LCP element and must not paint blank behind JS/IO gating.
            Reveal is reserved for below-the-fold sections.
          */}
          <Eyebrow>Web Studio · Harrow</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-6xl sm:leading-[1.05] sm:tracking-[-0.03em]">
            Look as good online as you do in person.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
            Clean, fast, mobile-first websites for businesses that want to
            look trusted, professional and easy to contact — built
            properly, with clear fixed-price packages agreed before we
            start.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Cta href={cta.href}>{cta.label}</Cta>
            {whatsApp ? (
              <a href={whatsApp} className={inlineLinkClass}>
                or message us on WhatsApp →
              </a>
            ) : (
              <a href={`mailto:${site.email}`} className={inlineLinkClass}>
                {site.email}
              </a>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">{ctaConsequence(cta.href)}</p>
          <p className="mt-4">
            <Link href="/free-audit?ref=hero" className={inlineLinkClass}>
              or tell us about your business →
            </Link>
          </p>
          <p className="mt-6 max-w-xl text-sm text-muted">
            Harrow-based, working with businesses across London and the
            UK · clear fixed-price packages · live in 7–10 working days ·
            your domain &amp; Google profile stay yours.
          </p>
          <p className="mt-4 text-sm text-muted">
            No obligation, no hard sell — we&apos;ll show you what we&apos;d
            change, you decide.
          </p>
        </div>
      </section>

      <ServicesMarquee />

      {/* THE PROBLEM — standard padding 64/96 */}
      <section className="border-y border-line bg-warm">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
              Brilliant in person. Often invisible online.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Most good local businesses either have no website, or one
              that&apos;s slow and broken on a phone — which usually
              isn&apos;t the owner&apos;s fault; they&apos;re too busy running
              a great business to ever look at their own site on a phone. In
              ten seconds on a screen, a stranger decides whether to trust
              you. We make those ten seconds count.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PACKAGES teaser — full detail lives on /packages */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Packages</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Essentials £49/mo · Growth £119/mo · Complete £179/mo — one
              monthly price, everything included. No setup fee, no minimum
              term, cancel anytime.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6">
              <Link href="/packages" className={teaserLinkClass}>
                See all packages →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO teaser — full detail lives on /services */}
      <section className="border-t border-line bg-warm">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Clean, premium websites, designed mobile-first and built to be
              found on Google — no template shortcuts, no afterthoughts.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6">
              <Link href="/services" className={teaserLinkClass}>
                Explore our services →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE teaser — full detail lives on /about */}
      <section>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-6 max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
              A three-person studio, building in the open.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              We&apos;re Omar, David and Rodrick — Harrow-based, working
              with businesses across London and the UK. You&apos;ll deal
              with us directly, not a call centre.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6">
              <Link href="/about" className={teaserLinkClass}>
                Meet the studio →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCta refSource="home" />
    </main>
  );
}
