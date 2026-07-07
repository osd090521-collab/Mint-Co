import type { Metadata } from "next";
import { ContactCta } from "../components/ContactCta";
import { Eyebrow } from "../components/Eyebrow";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Clean, mobile-first websites for businesses — designed with care, built to a genuinely high standard, and set up to be found on Google from day one.",
  alternates: { canonical: "/services" },
  robots: { index: true, follow: true },
};

const rows = [
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
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {rows.map((row, i) => (
            <Reveal
              key={row.t}
              delay={i * 60}
              className="grid grid-cols-1 gap-2 border-b border-line py-8 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-10"
            >
              <h2 className="flex items-baseline gap-3 text-xl font-medium text-ink">
                <span
                  aria-hidden="true"
                  className="w-6 shrink-0 text-right text-mint"
                >
                  &amp;
                </span>
                {row.t}
              </h2>
              <p className="text-base leading-relaxed text-muted">{row.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
