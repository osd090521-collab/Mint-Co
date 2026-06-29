import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "../components/Wordmark";
import { site } from "../site.config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Mint & Co handles your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="flex-1">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <Link href="/" aria-label="Mint & Co home" className="rounded">
          <Wordmark size="md" />
        </Link>

        <h1 className="mt-10 text-3xl font-medium sm:text-4xl">Your privacy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: June 2026</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-slate">
          <p>
            Mint &amp; Co is a UK partnership run by Omar and David, based in{" "}
            {site.location}.
          </p>
          <p>
            This website uses <strong>no cookies, tracking or analytics</strong>
            . We don&apos;t collect anything about you while you browse.
          </p>
          <p>
            If you email us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-mint-deep underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            , we&apos;ll use the details you send us only to reply to your
            enquiry and discuss working together. We won&apos;t add you to any
            mailing list, and we won&apos;t share your details with anyone else.
          </p>
          <p>
            To ask what we hold about you, or to have it deleted, just email us
            at the address above. You also have the right to complain to the UK
            Information Commissioner&apos;s Office (ICO) at{" "}
            <a
              href="https://ico.org.uk"
              className="font-medium text-mint-deep underline-offset-4 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              ico.org.uk
            </a>
            .
          </p>
        </div>

        <p className="mt-12">
          <Link
            href="/"
            className="text-sm font-medium text-mint-deep underline-offset-4 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
