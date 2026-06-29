# Build Mint & Co in Framer — Build Kit

This is the step-by-step guide to rebuild the Mint & Co site in **Framer** so you (Omar) can edit and publish it yourself, with no developer. It mirrors the refined, live **reference site** exactly.

> **Your visual target (build to match this):** https://mint-and-co-site.vercel.app
> Keep that Vercel site live as the reference + fallback until the Framer build is approved and the domain is switched (see §9).

All values below come from the coded reference (`app/globals.css`, `BRAND.md`, `app/page.tsx`). The golden rule of the brand: **mint is ink, not paint** — keep it to ~8% of any screen. The **ampersand is the brand** (no leaf, ever).

---

## 1. New project & breakpoints
- New Framer project → blank.
- Breakpoints: **Desktop 1440**, **Tablet 810**, **Phone 375**.
- Page max content width: **1024px**, centred, with **20px** side padding on phone, **32px** on desktop.

## 2. Fonts (both are native Google Fonts in Framer)
- **Fraunces** — display / headings / the wordmark. Weight ~500 (Medium). Turn the *italic* on only for the ampersand and the giant background `&`.
- **Geist** — body / UI / eyebrow / buttons.
- Set font loading to `swap` (Framer default is fine).

## 3. Color Styles (create these 12, names → hex)
| Name | Hex | Use |
|---|---|---|
| bg | `#FAFAF7` | page background (warm bone) |
| surface | `#FFFFFF` | cards |
| warm | `#F4F0E9` | alternating section band |
| ink | `#10211B` | headings |
| slate | `#1E2A25` | body text |
| muted | `#566761` | secondary/meta text |
| mint | `#1E8E68` | the &, accents, borders, card top-edge |
| mint-cta | `#176B4F` | **button fill** (white label) |
| mint-deep | `#0F4A37` | button hover; small text links |
| tint | `#EAF3EF` | rare mint panel / selection |
| brass | `#B98B5E` | hairline accents only (<5%) |
| line | `#E4EAE6` | borders / dividers |

> ⚠️ Never put white text on `mint` (`#1E8E68`) or lighter — it fails accessibility. White text only on **`mint-cta` `#176B4F`**. `mint` is for accents/borders/the `&` only.

## 4. Text Styles (create these; mobile → desktop)
| Style | Size (phone → desktop) | Tracking | Line-height | Font |
|---|---|---|---|---|
| Display/H1 | 36 → 60px | -0.01em → -0.03em | 1.1 → 1.05 | Fraunces Medium |
| Display/H2 | 24 → 36px | -0.01em | 1.15 | Fraunces Medium |
| Display/H3 (rows) | 20px | 0 | 1.2 | Fraunces Medium |
| Body/Large | 18 → 20px | 0 | 1.6 | Geist Regular |
| Body/Base | 16px | 0 | 1.6 | Geist Regular |
| Eyebrow | 12px | 0.14em, UPPERCASE | 1.2 | Geist Semibold |
| Meta | 14px | 0 | 1.5 | Geist Regular |

## 5. Spacing — one scale, two presets
Use **Stack gaps**, not margins (so it stays tidy when you edit).
- Scale: **4 / 8 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 112 / 128**.
- **Section padding presets** (top & bottom):
  - *Standard* section: **64 phone / 96 desktop**.
  - *Feature* section (Hero + Contact only): **80 phone / 112 desktop**.

## 6. Components to make
- **Button** — fill `mint-cta`, white label (Geist Semibold 16, tracking +0.01em), radius 12, min height 52, horizontal padding 28–32. Variants: *Hover* = fill `mint-deep`; *Pressed* = scale 0.98.
- **TrustCard** — `surface` fill, radius 12, padding 28–32, soft shadow (`0 1px 2px rgba(16,33,27,.03), 0 4px 16px rgba(16,33,27,.05)`), and a **2px `mint` top edge**.
- **Wordmark** — horizontal stack: "Mint" + the `&` (Fraunces *italic*, colour `mint`) + "Co", with a small **3px gap** each side of the `&` (not a full space). Colour `ink`.
- **MobileCTA** — a bar pinned to the bottom, **Phone breakpoint only**: full-width Button, `bg/95` fill + background blur, **1px `line` top border**, soft upward shadow, respects the phone safe-area.
- **Row** (for "What we do") — 2-column stack `256px | 1fr`; the `&` marker in a fixed **24px** box, right-aligned, colour `mint`.

## 7. Sections (build to match the reference, paste this exact copy)
1. **Header** (sticky) — Wordmark left; text link "Get my free audit" right. Gains a 1px `line` bottom border + `bg/85` blur on scroll.
2. **Hero** (feature padding, `bg`):
   - Eyebrow: `Web Studio · Harrow & Pinner`
   - H1: `A website that makes your shop look as good as it actually is.`
   - Subhead (colour **slate**): `Clean, fast, mobile-first websites for barbers, tailors and the local businesses people love. Built properly. Fixed price. Live in ten working days. — By Omar & David.`
   - Button: **Get my free audit** + secondary text link (email now; WhatsApp once live).
   - Trust strip (Meta, muted): `Harrow & Pinner-based · fixed £895 · live in 10 working days · your domain & Google profile stay yours.`
   - Reassurance (Meta, muted): `No obligation, no hard sell — we'll show you what we'd change, you decide.`
   - Behind it all: a giant Fraunces *italic* `&`, colour `mint` at **5% opacity**, top-left-of-right-edge, clipped by the section (`overflow hidden`), sent behind, non-interactive.
3. **The Problem** (standard, `warm` band):
   - H2: `Brilliant in person. Often invisible online.`
   - Body (slate): `Most good local businesses either have no website, or one that's slow and broken on a phone — which usually isn't the owner's fault; they're too busy running a great business to ever look at their own site on a phone. In ten seconds on a screen, a stranger decides whether to trust you. We make those ten seconds count.`
4. **Positioning** (standard, `bg`):
   - A **48 × 2px `mint`** accent bar.
   - Statement (Fraunces, ink, `£895, fixed` in `mint-deep`): `Premium work, fairly priced, properly delivered. Complete websites from £895, fixed.`
   - Sub (muted): `Fixed price · 50% to begin, the rest only when you're happy and before we go live · two rounds of revisions · ten working days from your content. No "it'll be ready soon."`
5. **What we do** (3 Rows, hairline dividers): `Clean, premium websites` / `Built mobile-first` / `Built to be found on Google` — with the descriptions from the reference (row 3: `Google Business Profile, local SEO foundations, map and Search Console set up — in every build, no exceptions.`).
6. **Who we are / Trust** (standard, `warm` band):
   - Eyebrow `Who we are`; H2: `A two-person studio. Harrow & Pinner, North West London.`
   - Body: `We're Omar and David. This very site is our first piece of work — so you're not looking at a sales pitch, you're looking at the exact standard we'd build yours to. Judge us on it.`
   - Emphasis line (ink, medium): `You'll deal with Omar and David directly — not a call centre, not a chatbot.`
   - Two **TrustCards**: (1) `We won't promise you top of Google. Nobody honestly can…` (2) `You own what's yours…`
7. **Contact** (feature padding, centred):
   - H2: `Let's get your business in mint condition.`
   - Sub: `Send us a line and we'll reply with a short, honest write-up: how your business looks on a phone right now, where you're losing customers, and the two or three things we'd fix first. No charge, no pressure.`
   - Button **Get my free audit** (+ WhatsApp button once live).
   - Reassurance: `Free, no obligation — and we'll only use your details to reply. Real people. Real replies — usually within one working day.`
   - `Prefer email? omar@mintandco.co.uk`
8. **Footer** (`warm`): Wordmark (large) + `Mint & Co — a two-person studio by Omar & David. Harrow & Pinner, North West London.` · email · `© 2026 Mint & Co · Privacy` · `Designed & built by us.` Reserve extra bottom space on phone so the sticky bar never covers it.

## 8. Motion, SEO & accessibility
- **Appear animation**: fade-up — opacity 0→1, **+12px** offset, **500ms ease-out**, **once** on scroll-in. Stagger the three "What we do" rows by **60ms** each. Keep it calm — no bounce/spring.
- ⚠️ **Reduced motion**: Framer's appear effects don't always respect the visitor's "reduce motion" setting. **Test it** (turn on Reduce Motion in your OS and reload). If elements stay hidden or still animate, disable the appear effect — content must always be visible. This is the one thing the rebuild can get *worse* than the code version, so verify it.
- **SEO** (Site Settings): per-page Title + Description (use the reference's: title "Mint & Co — Websites for Barbers & Local Businesses | Harrow"; description mentions "from £895"); set a Social/OG image (wordmark + tagline on the warm bg); set the favicon to the **`&` mark**. Framer auto-generates sitemap.xml + robots.txt.
- **JSON-LD**: Site Settings → **Custom Code → Start of `<head>`**, paste a `<script type="application/ld+json">` with `ProfessionalService` (name, url, description, email, areaServed Harrow/Pinner/NW London, founders Omar & David). **Only true facts — no address, phone, or ratings you don't have.** (Copy the object from `app/layout.tsx`.)
- **Booking** (future / per client): use Framer's Embed for Calendly / Fresha — no code needed.

## 9. Go live on mintandco.co.uk (do this LAST, after the build is approved)
Framer's DNS differs from Vercel. In Framer: Site Settings → Domains → "Connect a domain you own" → enter `mintandco.co.uk`. Then at **Porkbun → DNS**:
- **Remove** the current Vercel record: `A @ 76.76.21.21`.
- **Add** two A records on the apex: `A @ → 31.43.160.6` **and** `A @ → 31.43.161.6`.
- **Add** `CNAME www → sites.framer.app`.
- **No AAAA / IPv6 records** (Framer doesn't support them).
- Leave email records (MX, SPF, DKIM, DMARC, TXT) untouched.
- SSL is automatic once DNS resolves (minutes–hours). Keep the Vercel site up until Framer shows "connected", then it's safe.

## 10. Owner to-dos that make it convert harder (independent of Framer)
- **WhatsApp**: get a WhatsApp Business number → add a WhatsApp deep-link button as a **co-primary CTA** (Framer has a native WhatsApp button; pre-fill: "Hi Omar & David — I'd love a free audit of how my business looks online."). This is the single biggest conversion lever for barbers.
- **External trust links**: once your Google Business Profile and/or Instagram exist, link them in the footer ("find us on Google / Instagram") — being "connected to the web" is a real trust signal for a new firm.
- **Email**: finish SPF + DMARC and make `hello@` live; then switch the site contact from `omar@` to `hello@`.
