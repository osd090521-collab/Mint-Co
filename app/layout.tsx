import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import { site } from "./site.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mint & Co — Websites for Barbers & Local Businesses | Harrow",
    template: "%s · Mint & Co",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Omar & David" }],
  keywords: [
    "website for barbers",
    "local business website",
    "barber website Harrow",
    "small business website Pinner",
    "mobile-first website",
    "local SEO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: "Mint & Co — Websites for Barbers & Local Businesses",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mint & Co — Websites for Barbers & Local Businesses",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

// JSON-LD — only true facts (no fake address/phone/aggregateRating).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  areaServed: site.areaServed.map((name) => ({ "@type": "Place", name })),
  founder: site.founders.map((name) => ({ "@type": "Person", name })),
  knowsAbout: ["Web design", "Web development", "Local SEO", "Google Business Profile"],
  slogan: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-slate">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-js','');",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-mint-cta focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
