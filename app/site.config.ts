/**
 * Single source of truth for site-wide contact + business details.
 *
 * COMPLIANCE NOTE (do not publish a dead channel):
 * - `email` is the live, working inbox (omar@). Used as the interim primary
 *   contact until the `hello@` alias is set up AND SPF/DMARC pass.
 * - `phone`/`whatsappNumber` are the same real mobile number. Leave either
 *   empty (`""`) to hide its CTA if the number ever stops being live.
 */
export const site = {
  name: "Mint & Co",
  domain: "mintandco.co.uk",
  url: "https://mintandco.co.uk",
  tagline: "Your business, in mint condition.",
  description:
    "Mint & Co builds clean, premium, mobile-first websites for businesses — clear fixed-price packages, agreed before we start. By Omar, David & Rodrick, Harrow.",
  location: "Harrow, North West London",
  areaServed: ["Harrow", "North West London", "London", "United Kingdom"],
  founders: ["Omar", "David", "Rodrick"],

  // Live, working inbox (interim primary contact).
  email: "omar@mintandco.co.uk",
  // General-enquiries alias — switch `email` to this once it's live + SPF/DMARC pass.
  emailGeneral: "hello@mintandco.co.uk",
  // TODO: not yet provided. Leave empty — no public rendering until confirmed.
  davidEmail: "",
  // TODO: not yet provided. Leave empty — no public rendering until confirmed.
  rodrickEmail: "",
  phone: "07504 828622",
  whatsappNumber: "447504828622",
  // External "connected to the web" trust links — render only when set.
  gbpUrl: "", // Google Business Profile URL
  instagramUrl: "https://www.instagram.com/bymintco/",

  // TODO: no real testimonials yet — never fabricate. Render only when non-empty.
  testimonials: [] as { quote: string; name: string; business: string }[],

  audit: {
    subject: "Free website audit — Mint & Co",
    body:
      "Hi Omar, David & Rodrick,\n\nI'd love a free audit of how my business looks online.\n\nBusiness name:\nWhat I do:\nWhere you are:\nCurrent website (if any):\nBest way to reach me:\n\nThanks.",
  },
} as const;

/**
 * Pre-filled mailto for the primary "Get your free audit" CTA.
 *
 * Uses encodeURIComponent (RFC 6068 %20-style spaces), not URLSearchParams —
 * URLSearchParams form-encodes spaces as "+", which several mail clients
 * (Apple Mail, Outlook desktop, Thunderbird) render literally in the body.
 */
export function auditMailto(): string {
  const subject = encodeURIComponent(site.audit.subject);
  const body = encodeURIComponent(site.audit.body);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

/** Pre-filled WhatsApp link, or null when no number is configured. */
export function auditWhatsApp(): string | null {
  if (!site.whatsappNumber) return null;
  const text = encodeURIComponent(
    "Hi Omar, David & Rodrick — I'd love a free audit of how my business looks online.",
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
