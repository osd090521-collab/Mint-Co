/**
 * Single source of truth for site-wide contact + business details.
 *
 * COMPLIANCE NOTE (do not publish a dead channel):
 * - `email` is the live, working inbox (omar@). Used as the interim primary
 *   contact until the `hello@` alias is set up AND SPF/DMARC pass.
 * - `whatsappNumber` is intentionally empty. The WhatsApp CTA only renders
 *   once a real WhatsApp Business number is set here (international format,
 *   digits only, e.g. "447XXXXXXXXX"). Until then, email is the primary CTA.
 */
export const site = {
  name: "Mint & Co",
  domain: "mintandco.co.uk",
  url: "https://mintandco.co.uk",
  tagline: "Your business, in mint condition.",
  description:
    "Mint & Co builds clean, premium, mobile-first websites for barbers and local businesses — built to be found on Google. Fixed price from £895. By Omar & David, Harrow & Pinner.",
  location: "Harrow & Pinner, North West London",
  areaServed: ["Harrow", "Pinner", "North West London"],
  founders: ["Omar", "David"],
  priceFrom: "£895",

  // Live, working inbox (interim primary contact).
  email: "omar@mintandco.co.uk",
  // General-enquiries alias — switch `email` to this once it's live + SPF/DMARC pass.
  emailGeneral: "hello@mintandco.co.uk",
  // Leave empty until a real WhatsApp Business number exists. "" => CTA hidden.
  whatsappNumber: "",
  // External "connected to the web" trust links — render only when set.
  gbpUrl: "", // Google Business Profile URL
  instagramUrl: "", // e.g. https://instagram.com/mintandco

  audit: {
    subject: "Free website audit — Mint & Co",
    body:
      "Hi Omar & David,\n\nI'd love a free audit of how my business looks online.\n\nBusiness name:\nWhat I do:\nWhere you are:\nCurrent website (if any):\nBest way to reach me:\n\nThanks.",
  },
} as const;

/** Pre-filled mailto for the primary "Get your free audit" CTA. */
export function auditMailto(): string {
  const params = new URLSearchParams({
    subject: site.audit.subject,
    body: site.audit.body,
  });
  return `mailto:${site.email}?${params.toString()}`;
}

/** Pre-filled WhatsApp link, or null when no number is configured. */
export function auditWhatsApp(): string | null {
  if (!site.whatsappNumber) return null;
  const text = encodeURIComponent(
    "Hi Omar & David — I'd love a free audit of how my business looks online.",
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
