import { ContactCta } from "../components/ContactCta";
import { Cta } from "../components/Cta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";
import { BrowserFrame } from "../components/BrowserFrame";

export const metadata = {
  title: "Showcase — Mint & Co",
  description:
    "A look at how we build: buttons, type, colour and layout patterns.",
};

const swatches = [
  { name: "Mint", hex: "#1e8e68", cls: "bg-mint" },
  { name: "Mint CTA", hex: "#176b4f", cls: "bg-mint-cta" },
  { name: "Mint deep", hex: "#0f4a37", cls: "bg-mint-deep" },
  { name: "Ink", hex: "#10211b", cls: "bg-ink" },
  { name: "Slate", hex: "#1e2a25", cls: "bg-slate" },
  { name: "Brass", hex: "#b98b5e", cls: "bg-brass" },
];

const layouts = [
  {
    label: "Local service — example layout",
    tone: "mint" as const,
    title: "Booking-first",
    desc: "The call/WhatsApp CTA never leaves the fold.",
  },
  {
    label: "Trades — example layout",
    tone: "warm" as const,
    title: "Trust up front",
    desc: "Reviews, coverage area and photos above the scroll.",
  },
  {
    label: "Studio — example layout",
    tone: "ink" as const,
    title: "Editorial and quiet",
    desc: "Type-led, generous space, one accent colour.",
  },
];

export default function ShowcasePage() {
  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <Eyebrow>Showcase</Eyebrow>
        <h1 className="mt-6 max-w-2xl text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl sm:leading-[1.05]">
          How we build: buttons, type, colour, layout.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
          A quick look at the building blocks behind every Mint &amp; Co
          site — the same components and rules, applied consistently from
          project to project.
        </p>
      </section>

      <section className="border-t border-line bg-warm">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Buttons</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
              One shape, two fills, always ⌘/44px-friendly to tap.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta href="#" variant="primary">
                Get my free audit
              </Cta>
              <Cta href="#" variant="secondary">
                See all packages
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Typography</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
              Fraunces for headlines, Geist for everything you read.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6">
            <Reveal delay={100}>
              <p className="font-display text-4xl text-ink sm:text-5xl">
                Look as good online as you do in person.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-2xl text-lg leading-relaxed text-slate">
                Body copy stays in Geist — clean, quiet, built for reading on
                a phone in ten seconds, not for showing off.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-warm">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Colour</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
              Mint is ink, not paint — used sparingly, never as a body colour.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {swatches.map((s, i) => (
              <Reveal key={s.name} delay={100 + i * 50}>
                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
                  <div className={`h-20 ${s.cls}`} />
                  <div className="px-4 py-3">
                    <p className="font-display text-sm text-ink">{s.name}</p>
                    <p className="text-xs text-muted">{s.hex}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <Eyebrow>Layout patterns</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 max-w-2xl text-2xl font-medium leading-snug sm:text-3xl">
              Three layouts we reach for — shaped by what the business
              actually needs, not a template.
            </h2>
          </Reveal>
          <p className="mt-3 text-xs text-muted">
            Illustrative layout patterns, not real client sites.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {layouts.map((w, i) => (
              <Reveal key={w.title} delay={100 + i * 80}>
                <div className="work-card rounded-2xl">
                  <BrowserFrame label={w.label} tone={w.tone} />
                  <h3 className="mt-4 font-display text-lg text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
