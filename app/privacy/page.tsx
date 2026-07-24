import type { Metadata } from "next";
import { InlineLink } from "../components/InlineLink";
import { breadcrumbJsonLd, site } from "../site.config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Mint & Co handles your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy · Mint & Co",
    description: "How Mint & Co handles your information.",
    url: `${site.url}/privacy`,
  },
};

/*
 * This page is the one deliberate exception to studio voice (see
 * BRAND.md — Voice): UK GDPR requires a privacy notice to identify the
 * data controller by name, so the partners stay named here even though
 * public marketing copy elsewhere on the site does not.
 *
 * Known gap, not invented: the registered partnership name, full legal
 * names and a registered/contact address are not yet confirmed and are
 * deliberately left out rather than guessed — add them here once
 * confirmed (see COHERENCE-AUDIT.md, "Owner inputs needed").
 */
export default function PrivacyPage() {
  return (
    <main id="main" className="flex-1">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="text-3xl font-medium sm:text-4xl">Your privacy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: July 2026</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-slate">
          <p>
            Mint &amp; Co is a UK partnership run by Omar, David and Rodrick,
            based in {site.location}. We are the controller of the personal
            data described below — meaning we decide what&apos;s collected
            and why, and we&apos;re the ones to contact about it.
          </p>
          <p>
            This website uses <strong>no cookies, tracking or analytics</strong>
            . We don&apos;t collect anything about you while you browse. Our
            hosting provider, Vercel, processes the standard technical
            request data any website host does (like your IP address and
            browser type, briefly, for serving pages and security) — it
            never sees anything you type into a form.
          </p>
          <p>
            If you email us at{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>
            , we&apos;ll use the details you send us only to reply to your
            enquiry and discuss working together. We won&apos;t add you to any
            mailing list, and we won&apos;t share your details with anyone else.
          </p>
          {/* Anchor target for the audit form's consent link — scroll-mt clears the sticky header. */}
          <p id="audit-form" className="scroll-mt-24">
            If you fill in our{" "}
            <InlineLink href="/free-audit">audit form</InlineLink>, your
            answers are sent straight to Google (Apps Script and Sheets —
            part of our Google Workspace) and we get an email notification.
            We use them only to prepare your write-up and get back to you.
            Your answers are stored in a private, access-restricted
            spreadsheet — never sold or passed on. We keep enquiry details
            for up to 12 months, then delete them. You can ask us to remove
            your details at any time by emailing{" "}
            <InlineLink href={`mailto:${site.email}`}>{site.email}</InlineLink>.
          </p>
          <p>
            <strong>Why we&apos;re allowed to do this:</strong> you contacted
            us first, so we handle your details on the basis of legitimate
            interest — replying to a business enquiry you started. If that
            enquiry becomes a client relationship, later data handling moves
            onto a contractual basis instead, covered in{" "}
            <InlineLink href="/terms">our terms</InlineLink>.
          </p>
          <p>
            To ask what we hold about you, or to have it deleted, just email us
            at the address above. You also have the right to complain to the UK
            Information Commissioner&apos;s Office (ICO) at{" "}
            <InlineLink href="https://ico.org.uk" external>
              ico.org.uk
            </InlineLink>
            .
          </p>
          <p className="text-sm text-muted">
            This page covers privacy only. For subscription terms,
            cancellation, ownership on leaving and fair use, see{" "}
            <InlineLink href="/terms">our terms</InlineLink>.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("/privacy", "Privacy")),
        }}
      />
    </main>
  );
}
