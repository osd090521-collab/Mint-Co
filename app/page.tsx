import { Header } from "./components/Header";
import { MobileCta } from "./components/MobileCta";
import { Reveal } from "./components/Reveal";
import { Wordmark } from "./components/Wordmark";
import { auditMailto, auditWhatsApp, site } from "./site.config";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">
      {children}
    </p>
  );
}

export default function Home() {
  const whatsApp = auditWhatsApp();

  return (
    <>
      <Header />

      <main id="main" className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* Oversized faint ampersand — typographic art direction, not decoration */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 select-none font-display italic leading-none text-mint/[0.06] text-[22rem] sm:-right-16 sm:text-[30rem]"
          >
            &amp;
          </span>

          <div className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
            <Reveal>
              <Eyebrow>Mint &amp; Co · Web Studio</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 max-w-3xl text-[2.25rem] font-medium leading-[1.05] tracking-[-0.02em] sm:text-6xl">
                A website that makes your shop look as good as it actually is.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Clean, fast, mobile-first sites for barbers and local
                businesses — built properly, fixed price, ready in ten working
                days. By Omar &amp; David.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={auditMailto()}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-mint-cta px-7 text-base font-semibold text-white shadow-soft transition-colors duration-150 hover:bg-mint-deep"
                >
                  Get your free audit
                </a>
                {whatsApp ? (
                  <a
                    href={whatsApp}
                    className="text-base font-medium text-mint-deep underline-offset-4 hover:underline"
                  >
                    Or message us on WhatsApp
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
            <Reveal delay={240}>
              <p className="mt-6 text-sm text-muted">
                No obligation, no hard sell — we&apos;ll show you what we&apos;d
                change, you decide.
              </p>
            </Reveal>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="border-y border-line bg-warm">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <h2 className="max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
                Brilliant in person. Often invisible online.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
                Most good local businesses either have no website, or one
                that&apos;s slow and broken on a phone — which is exactly where
                their customers are looking. In ten seconds on a screen, a
                stranger decides whether to trust you. We make those ten seconds
                count.
              </p>
            </Reveal>
          </div>
        </section>

        {/* POSITIONING — middle lane, stated positively */}
        <section>
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="border-t border-mint/30 pt-8">
              <Reveal>
                <p className="max-w-3xl font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                  Premium work, fairly priced, properly delivered — complete
                  websites from{" "}
                  <span className="whitespace-nowrap text-mint-deep">
                    {site.priceFrom}, fixed.
                  </span>
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
                  Fixed price · 50% deposit to begin · two rounds of revisions ·
                  ten working days from your content to launch. You know exactly
                  what you&apos;re getting, what it costs, and when it&apos;s
                  done.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* WHAT WE DO — text rows, no icon cards */}
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
                d: "Google Business Profile alignment, local SEO foundations, titles, metadata, map and Search Console — in every build.",
              },
            ].map((row, i) => (
              <Reveal
                key={row.t}
                delay={i * 60}
                className="flex flex-col gap-2 border-b border-line py-8 sm:flex-row sm:items-baseline sm:gap-10 sm:py-10"
              >
                <h3 className="flex items-baseline gap-3 text-xl font-medium text-ink sm:w-72 sm:shrink-0">
                  <span aria-hidden="true" className="text-mint">
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
              <h2 className="mt-5 max-w-3xl text-2xl font-medium leading-snug sm:text-4xl">
                A two-person studio. {site.location}.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate">
                We&apos;re Omar and David. This very site is our first piece of
                work — built to the exact standard we&apos;d build yours.
                We&apos;re a new firm building in the open, and we&apos;d rather
                earn your trust honestly than pretend to be something we&apos;re
                not.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal
                delay={160}
                className="rounded-xl border border-line bg-surface p-6 shadow-soft"
              >
                <p className="text-base leading-relaxed text-slate">
                  <span className="font-medium text-ink">
                    We don&apos;t promise to put you top of Google.
                  </span>{" "}
                  Nobody honestly can. We promise proper foundations and work
                  we&apos;d put our name on — and we let the quality speak.
                </p>
              </Reveal>
              <Reveal
                delay={220}
                className="rounded-xl border border-line bg-surface p-6 shadow-soft"
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

        {/* CONTACT BAND */}
        <section id="contact" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-28">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight sm:text-5xl">
                Let&apos;s get your business in mint condition.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                Send us a line and we&apos;ll reply with a free, honest audit of
                where you stand online — and what we&apos;d change. Real people,
                real replies.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={auditMailto()}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-mint-cta px-8 text-base font-semibold text-white shadow-soft transition-colors duration-150 hover:bg-mint-deep"
                >
                  Get your free audit
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
              <p className="mt-6 text-sm text-muted">
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

      {/* FOOTER */}
      <footer className="border-t border-line bg-warm">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <Wordmark size="md" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Mint &amp; Co — a partnership of Omar &amp; David. Based in{" "}
              {site.location}, United Kingdom.
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
            <p className="mt-1 text-muted/80">Designed &amp; built in-house.</p>
          </div>
        </div>
      </footer>

      <MobileCta />
    </>
  );
}
