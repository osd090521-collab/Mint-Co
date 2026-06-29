import { Header } from "./components/Header";
import { MobileCta } from "./components/MobileCta";
import { Reveal } from "./components/Reveal";
import { Wordmark } from "./components/Wordmark";
import { auditMailto, auditWhatsApp, site } from "./site.config";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">
      {children}
    </p>
  );
}

const ctaClass =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl bg-mint-cta px-7 text-base font-semibold tracking-[0.01em] text-white shadow-soft transition duration-150 hover:bg-mint-deep active:scale-[0.98]";

export default function Home() {
  const whatsApp = auditWhatsApp();

  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        {/* HERO — feature padding 80/112 */}
        <section className="relative overflow-hidden">
          {/* Oversized faint ampersand — typographic art direction, not decoration */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[4%] -top-[6%] select-none font-display italic leading-none text-mint/[0.05] text-[22rem] sm:text-[30rem]"
          >
            &amp;
          </span>

          <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <Eyebrow>Web Studio · Harrow &amp; Pinner</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-6 max-w-3xl text-[2.25rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-6xl sm:leading-[1.05] sm:tracking-[-0.03em]">
                A website that makes your shop look as good as it actually is.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-xl">
                Clean, fast, mobile-first websites for barbers, tailors and the
                local businesses people love. Built properly. Fixed price. Live
                in ten working days. — By Omar &amp; David.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a href={auditMailto()} className={ctaClass}>
                  Get my free audit
                </a>
                {whatsApp ? (
                  <a
                    href={whatsApp}
                    className="text-base font-medium text-mint-deep underline-offset-4 hover:underline"
                  >
                    or message us on WhatsApp →
                  </a>
                ) : (
                  <a
                    href={`mailto:${site.email}`}
                    className="text-base font-medium text-mint-deep underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                )}
              </div>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-xl text-sm text-muted">
                Harrow &amp; Pinner-based · fixed £895 · live in 10 working days
                · your domain &amp; Google profile stay yours.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-4 text-sm text-muted">
                No obligation, no hard sell — we&apos;ll show you what we&apos;d
                change, you decide.
              </p>
            </Reveal>
          </div>
        </section>

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

        {/* POSITIONING — middle lane, stated positively */}
        <section>
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <div className="h-0.5 w-12 bg-mint" />
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-8 max-w-3xl font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                Premium work, fairly priced, properly delivered. Complete
                websites from{" "}
                <span className="whitespace-nowrap text-mint-deep">
                  £895, fixed.
                </span>
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
                Fixed price · 50% to begin, the rest only when you&apos;re happy
                and before we go live · two rounds of revisions · ten working
                days from your content. No &ldquo;it&apos;ll be ready
                soon.&rdquo;
              </p>
            </Reveal>
          </div>
        </section>

        {/* WHAT WE DO — 2-col text rows, aligned & markers, no icon cards */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            {[
              {
                t: "Clean, premium websites",
                d: "Designed with care, built to a genuinely high standard — not stamped out of a template.",
              },
              {
                t: "Built mobile-first",
                d: "Designed for the phone first, because that's where nearly all your customers actually are.",
              },
              {
                t: "Built to be found on Google",
                d: "Google Business Profile, local SEO foundations, map and Search Console set up — in every build, no exceptions.",
              },
            ].map((row, i) => (
              <Reveal
                key={row.t}
                delay={i * 60}
                className="grid grid-cols-1 gap-2 border-b border-line py-8 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-10"
              >
                <h3 className="flex items-baseline gap-3 text-xl font-medium text-ink">
                  <span
                    aria-hidden="true"
                    className="w-6 shrink-0 text-right text-mint"
                  >
                    &amp;
                  </span>
                  {row.t}
                </h3>
                <p className="text-base leading-relaxed text-muted">{row.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHO WE ARE / TRUST — honest signals only */}
        <section className="bg-warm">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-6 max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
                A two-person studio. {site.location}.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
                We&apos;re Omar and David. This very site is our first piece of
                work — so you&apos;re not looking at a sales pitch, you&apos;re
                looking at the exact standard we&apos;d build yours to. Judge us
                on it.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-ink">
                You&apos;ll deal with Omar and David directly — not a call
                centre, not a chatbot.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal
                delay={200}
                className="rounded-xl border-t-2 border-mint bg-surface p-7 shadow-card"
              >
                <p className="text-base leading-relaxed text-slate">
                  <span className="font-medium text-ink">
                    We won&apos;t promise you top of Google.
                  </span>{" "}
                  Nobody honestly can. We promise proper foundations and work
                  we&apos;d put our name on — then we let the quality speak.
                </p>
              </Reveal>
              <Reveal
                delay={260}
                className="rounded-xl border-t-2 border-mint bg-surface p-7 shadow-card"
              >
                <p className="text-base leading-relaxed text-slate">
                  <span className="font-medium text-ink">
                    You own what&apos;s yours.
                  </span>{" "}
                  Your domain and your Google Business Profile stay in your name,
                  always. If you ever leave, you leave with everything.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT BAND — feature padding */}
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
                <a href={auditMailto()} className={`${ctaClass} px-8`}>
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
      </main>

      {/* FOOTER — extra bottom clearance on mobile for the sticky CTA */}
      <footer className="border-t border-line bg-warm">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 pb-28 pt-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-12">
          <div>
            <Wordmark size="lg" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Mint &amp; Co — a two-person studio by Omar &amp; David. {site.location}.
            </p>
          </div>
          <div className="text-sm text-muted">
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-mint-deep underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-3">
              © {new Date().getFullYear()} Mint &amp; Co ·{" "}
              <a href="/privacy" className="underline-offset-4 hover:underline">
                Privacy
              </a>
            </p>
            <p className="mt-1 text-muted">Designed &amp; built by us.</p>
          </div>
        </div>
      </footer>

      <MobileCta />
    </>
  );
}
