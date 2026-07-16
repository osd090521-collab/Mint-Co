# Mint & Co — Brand Identity ("Fresh Mint, warmed")

The visual identity for Mint & Co. Board-reviewed and WCAG-checked. This file is the source of truth for the look; the tokens live in `app/globals.css`.

## Idea
"Mint" = fresh, clean, sharp, *in mint condition*. "& Co" = a proper firm — premium but warm, polished but human. The visual job: read as a considered studio, **not** a generic "fresh/clean SaaS-mint" template. Warmth is what does that.

## The mark: the Mint Compass + the wordmark
- **Symbol — the Mint Compass:** four **crisp, tapered mint-leaf blades** arranged as a compass rose, a small sharp four-point centre spark, and a broken **seal-like ring** (four arcs, gaps at the cardinals, medium weight — a crest, not a UI stroke). Vertical blades (N/S) run longer and deeper; horizontal blades (E/W) shorter and lighter. Rooted in the mint leaf; reads as *clarity, trust, direction*. Chosen via a five-persona design-panel review, judged **navbar-first at real website size**. Artwork lives in one place — `app/components/compass.tsx` (`viewBox 0 0 128 128`), exporting `CompassMark({ size, className, variant, simplified })` (variants **colour / dark / light / mono**) and `LogoLockup({ markSize })`, plus the SVG string + data URI the app icon and OG card consume. Reference copies: `public/brand/mint-compass.svg`, `public/brand/mint-compass-lockup.svg`.
- **Simplified mode (small sizes):** below ~24px (favicon, app-icon tiles) the mark switches to **flat two-tone fills + a heavier ring (4.4)** — gradients and fine detail die at 16px. Never use the detailed gradient mark at favicon size.
- **Logo gradient (official, logo-only):** vertical blades `#12503B → #2A9A72`; horizontal blades `#17604A → #35A17C`. These gradient stops are **not** text/UI tokens and do not enter the WCAG-checked palette below; never use them for type or fills that carry text. (Supersedes the earlier `#2EC997` note.)
- **Wordmark spec:** Fraunces **Regular (400)**, deep green **`#0F2D23`**, tracking −0.01em, mint italic `&`. Lockup: symbol ~34px in the navbar (42px footer), 11px gap, optically centred — one brand unit.
- **Wordmark:** **"Mint & Co"** set in Fraunces, with the **ampersand** as the one coloured, characterful device *within the text* — mint, italic. The ampersand stays the wordmark's signature; it is no longer the standalone symbol.
- **Primary lockup:** the compass to the left of the wordmark (`LogoLockup` in `app/components/compass.tsx`), used in the header and footer.
- **Favicon** is a simplified, bolder compass on a deep-green tile so it survives at 16px (`app/icon.svg`); the app icon (`app/apple-icon.tsx`) is the colour compass on the bone background.
- **The leaf is deliberate here.** (This supersedes the earlier "no leaf, ever" rule.) The old caution — that a leaf reads generic/herbal and dies small — is answered by the compass geometry and the sculpted, veined blades: the leaves *build* a compass, not a garnish, and the favicon uses the bold simplified light-on-deep cut. Keep leaf usage to the compass mark only; do not scatter loose leaves elsewhere.
- The `&` still recurs as a motif: section markers in "What we do", an oversized faint texture glyph in the hero.

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

**Pricing promise:** clear fixed-price packages, agreed before work begins — no vague quotes, no surprise extras. Public copy states our three confirmed monthly packages and prices (see `/packages`) — no hidden numbers.

## Motion & detail
One restrained system: fade-up 500ms ease-out, once, on scroll-in (`Reveal`), disabled under `prefers-reduced-motion`. Custom `:focus-visible` (2px mint ring). One CTA style only (`mint-cta` fill). Mint `::selection`. Oversized faint `&` as hero texture.

## Assets
- Compass symbol + lockup (source of truth): `app/components/compass.tsx` (`CompassMark`, `LogoLockup`, `compassSvg`, `compassDataUri`); reference SVGs `public/brand/mint-compass.svg` + `public/brand/mint-compass-lockup.svg`.
- Wordmark: `app/components/Wordmark.tsx` (Fraunces 400, `#0F2D23`, mint italic `&`).
- Favicon: `app/icon.svg`. Apple touch icon: `app/apple-icon.tsx`. OG card: `app/opengraph-image.tsx`. Search-engine logo: `Organization.logo` in `app/layout.tsx` points at the raster `/apple-icon`.
- Tagline (locked): **"Your business, in mint condition."**
