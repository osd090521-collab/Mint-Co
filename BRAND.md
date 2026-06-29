# Mint & Co — Brand Identity ("Fresh Mint, warmed")

The visual identity for Mint & Co. Board-reviewed and WCAG-checked. This file is the source of truth for the look; the tokens live in `app/globals.css`.

## Idea
"Mint" = fresh, clean, sharp, *in mint condition*. "& Co" = a proper firm — premium but warm, polished but human. The visual job: read as a considered studio, **not** a generic "fresh/clean SaaS-mint" template. Warmth is what does that.

## The ampersand is the brand
- The wordmark is **"Mint & Co"** set in Fraunces, with the **ampersand** as the one coloured, characterful device — mint, italic.
- The standalone mark / favicon is **the `&` alone** (see `app/icon.svg`, `app/apple-icon.tsx`).
- **No mint leaf, ever** — it's a cliché, reads herbal/eco, and dies at favicon size.
- The `&` recurs as a motif: section markers in "What we do", an oversized faint texture glyph in the hero.

## Palette (WCAG-checked — mint is ink, not paint; keep it ≤ ~8% of any surface)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#FAFAF7` | warm bone-white page background |
| `surface` | `#FFFFFF` | true-white cards (depth above bg) |
| `warm` | `#F4F0E9` | warm sand alternating section band |
| `ink` | `#10211B` | display headlines |
| `slate` | `#1E2A25` | body text (~15:1 on bg) |
| `muted` | `#566761` | secondary text (~5.2:1 on bg) |
| `mint` | `#1E8E68` | brand signature, accents, borders, the `&` — **never body/link text** |
| `mint-cta` | `#176B4F` | **button fill** with white label (~5.2:1 — passes AA) |
| `mint-deep` | `#0F4A37` | hover / pressed; small text links on bg |
| `tint` | `#EAF3EF` | rare hairline-bordered mint panel; `::selection` |
| `brass` | `#B98B5E` | hairline accents only (< 5%) — premium warmth, never a fill |
| `line` | `#E4EAE6` | borders / dividers |

> **Contrast rule (do not break):** light mint (`#2FA37F` and lighter) and white-on-light-mint **fail WCAG AA** for text/buttons. The only fill that carries white text is `mint-cta #176B4F`. Use `mint` for accents/borders/the `&` only.

## Typography
- **Display / wordmark / H1–H3:** **Fraunces** (variable, optical-size + soft axis) via `next/font` — editorial, boutique, warm. Negative tracking on display sizes.
- **Body / UI:** **Geist** via `next/font` — sharp, neutral, modern.
- Headings use `text-wrap: balance`; body uses `text-wrap: pretty`. Hero capped to ≤ 3 lines at 375px.
- *(Phase 2 upgrade path: a licensed grotesk — Söhne / Aeonik / PP Neue Montreal — if budget allows.)*

## Voice
Honest, direct, warm, no jargon. Sell hard on what's **true** (premium, fixed price, ten days, "built to the standard we sell"). **Never** guarantee rankings or bookings. No public competitor-knocking. Never fake reality (no fabricated premises, staff, results, testimonials, or schema).

## Motion & detail
One restrained system: fade-up 500ms ease-out, once, on scroll-in (`Reveal`), disabled under `prefers-reduced-motion`. Custom `:focus-visible` (2px mint ring). One CTA style only (`mint-cta` fill). Mint `::selection`. Oversized faint `&` as hero texture.

## Assets
- Wordmark: `app/components/Wordmark.tsx` (text in Fraunces, `&` in mint).
- Favicon: `app/icon.svg`. Apple touch icon: `app/apple-icon.tsx`. OG card: `app/opengraph-image.tsx`.
- Tagline (locked): **"Your business, in mint condition."**
