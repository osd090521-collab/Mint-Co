import type { Metadata } from "next";
import { InlineLink } from "../components/InlineLink";
import { breadcrumbJsonLd, site } from "../site.config";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Mint & Co's commercial terms — subscription, cancellation, ownership, fair use and what we ask of clients. Separate from our privacy notice.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms · Mint & Co",
    description:
      "Mint & Co's commercial terms — subscription, cancellation, ownership, fair use and what we ask of clients.",
    url: `${site.url}/terms`,
  },
};

/*
 * New route (Brief §12 — "Clearly separate: privacy; commercial terms;
 * subscription terms; ownership; cancellation; client responsibilities").
 * Every figure here is sourced from ULTRAPLAN.md §3 Terms (:119-129) and
 * the live /packages page — nothing invented. This is the one canonical
 * statement of these terms; /packages, /about and the footer state the
 * same facts in shorter form and link here for the full version.
 */
export default function TermsPage() {
  return (
    <main id="main" className="flex-1">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="text-3xl font-medium sm:text-4xl">Terms</h1>
        <p className="mt-2 text-sm text-muted">Last updated: July 2026</p>
        <p className="mt-6 text-base leading-relaxed text-slate">
          This page covers the commercial terms of working with Mint &amp;
          Co. For how we handle your personal data, see{" "}
          <InlineLink href="/privacy">our privacy notice</InlineLink>{" "}
          instead — this page and that one don&apos;t overlap.
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-medium text-ink">The subscription</h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Every package is <strong>rolling monthly</strong>. No setup
              fee, no minimum term. Your first month is billed at
              go-live — not at signature — because we carry the cost of
              the build. See{" "}
              <InlineLink href="/packages">current packages and prices</InlineLink>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-ink">Cancelling</h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Cancel whenever you like — no minimum term, no penalty, no
              questions asked. Tell us and it&apos;s done.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-ink">What you own</h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Your domain and your Google Business Profile are yours from
              day one and stay in your name — always. Neither is ever held
              hostage, whether you stay or leave.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate">
              The website itself is ours while you&apos;re subscribed —
              that&apos;s how we can build it with no setup fee. If you
              cancel, you have two options: buy the site outright as a full
              export for <strong>£595</strong>, or let it come down after a{" "}
              <strong>30-day grace period</strong>. Either way, nothing
              about this is a surprise you find out on your way out — it&apos;s
              the same wherever it&apos;s mentioned on this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-ink">Fair use</h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Growth and Complete include roughly an hour a month of website
              edits — text and image changes, small tweaks. Bigger work
              (new pages, redesigned sections, a rebuild) is quoted
              separately. We&apos;ll always tell you before anything falls
              outside fair use, not bill you after the fact.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-ink">What&apos;s not included by default</h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              Full brand redesigns, complex e-commerce (multi-warehouse
              inventory, marketplaces, subscription products) and custom
              booking software aren&apos;t part of any package by default —
              we integrate proven booking tools rather than build bespoke
              ones. None of this is a hard no forever; it&apos;s scoped
              separately if you need it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-ink">What we ask of you</h2>
            <p className="mt-3 text-base leading-relaxed text-slate">
              The 7–10 working day build clock starts once we have your
              content — text, images, logo, anything specific to your
              business. The sooner that arrives, the sooner you&apos;re
              live. Beyond that: keep your contact details current, use
              fair-use edits reasonably, and don&apos;t ask us to publish
              anything illegal, fraudulent or knowingly misleading. That&apos;s
              the whole list.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm text-muted">
          Questions about any of this?{" "}
          <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/terms", "Terms")),
        }}
      />
    </main>
  );
}
