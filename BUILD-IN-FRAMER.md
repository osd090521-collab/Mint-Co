# Build Mint & Co in Framer — Build Kit

> ⚠️ **Stale — do not use.** The facts in this guide (team size, founder names, pricing, target audience) are out of date as of 2026-07-02. Mint & Co targets broad businesses, not a specific trade — do not reintroduce "barbers/tailors" framing anywhere in this document. See `app/site.config.ts` and `app/page.tsx` for the current facts before following any copy block in this document.

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

## 7. Sections (build to match the reference)
Do not paste copy from this section — the blocks that used to live here (hero, positioning, services, about, contact, footer) hardcoded outdated facts (a "barbers, tailors" audience, a two-person team, a fixed `£895` price). Mint & Co targets broad businesses and pricing is never quoted publicly as a number. Instead, copy the live text verbatim from the coded reference at build time:
1. **Header** (sticky) — Wordmark left; text link "Get my free audit" right. Gains a 1px `line` bottom border + `bg/85` blur on scroll. Copy from `app/components/Header.tsx`.
2. **Hero** (feature padding, `bg`) — copy Eyebrow/H1/subhead/CTA/trust strip/reassurance text from `app/page.tsx`. Behind it all: a giant Fraunces *italic* `&`, colour `mint` at **5% opacity**, top-left-of-right-edge, clipped by the section (`overflow hidden`), sent behind, non-interactive.
3. **The Problem** (standard, `warm` band) — copy H2/body from `app/page.tsx`.
4. **Positioning** (standard, `bg`) — a **48 × 2px `mint`** accent bar, then copy the statement/sub from `app/page.tsx` (pricing is described qualitatively — "clear fixed-price packages, agreed before we start" — never as a number).
5. **What we do** (3 Rows, hairline dividers) — copy the three row headings/descriptions from `app/services/page.tsx`.
6. **Who we are / Trust** (standard, `warm` band) — copy Eyebrow/H1/body/emphasis line and the two TrustCards from `app/about/page.tsx`. It's a three-person studio (Omar, David, Rodrick).
7. **Contact** (feature padding, centred) — copy H2/sub/reassurance/email fallback from `app/components/ContactCta.tsx`.
8. **Footer** (`warm`) — copy Wordmark + tagline line, nav, email, copyright from `app/components/Footer.tsx`. Reserve extra bottom space on phone so the sticky bar never covers it.

## 8. Motion, SEO & accessibility
- **Appear animation**: fade-up — opacity 0→1, **+12px** offset, **500ms ease-out**, **once** on scroll-in. Stagger the three "What we do" rows by **60ms** each. Keep it calm — no bounce/spring.
- ⚠️ **Reduced motion**: Framer's appear effects don't always respect the visitor's "reduce motion" setting. **Test it** (turn on Reduce Motion in your OS and reload). If elements stay hidden or still animate, disable the appear effect — content must always be visible. This is the one thing the rebuild can get *worse* than the code version, so verify it.
- **SEO** (Site Settings): per-page Title + Description — copy verbatim from the live `metadata` export in each `app/**/page.tsx` (do not reintroduce a trade-specific title or a quoted price); set a Social/OG image (wordmark + tagline on the warm bg); set the favicon to the compass mark. Framer auto-generates sitemap.xml + robots.txt.
- **JSON-LD**: Site Settings → **Custom Code → Start of `<head>`**, paste a `<script type="application/ld+json">` with `ProfessionalService` (name, url, description, email, areaServed, founders — Omar, David, Rodrick). **Only true facts — no address, phone, or ratings you don't have.** (Copy the object from `app/layout.tsx`.)
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
- **WhatsApp**: get a WhatsApp Business number → add a WhatsApp deep-link button as a **co-primary CTA** (Framer has a native WhatsApp button; pre-fill text should match `site.config.ts`'s `auditWhatsApp()` message). This is a strong conversion lever for mobile visitors generally.
- **External trust links**: once your Google Business Profile and/or Instagram exist, link them in the footer ("find us on Google / Instagram") — being "connected to the web" is a real trust signal for a new firm.
- **Email**: finish SPF + DMARC and make `hello@` live; then switch the site contact from `omar@` to `hello@`.
