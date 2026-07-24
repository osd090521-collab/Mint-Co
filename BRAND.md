# Mint & Co — Brand Identity ("Fresh Mint, warmed")

The visual identity for Mint & Co. Board-reviewed and WCAG-checked. This file is the source of truth for the look; the tokens live in `app/globals.css`.

## Idea
"Mint" = fresh, clean, sharp, *in mint condition*. "& Co" = a proper firm — premium but warm, polished but human. The visual job: read as a considered studio, **not** a generic "fresh/clean SaaS-mint" template. Warmth is what does that.

## The mark: the Mint Compass + the wordmark
- **Symbol — the Mint Compass:** four full, tapered mint-leaf blades arranged N/E/S/W as a compass rose, each split along its own spine into two lateral halves — one a near-flat deep green, the other a gradient rising from deep green through mid-green to a pale mint tip (base → tip, along the blade's length, not diagonal) — for a faceted, dimensional look. A small sharp centre spark sits in the negative space where the blade bases meet, framed by a broken deep-green ring (4 arcs, gaps at the cardinals, medium weight — a crest, not a UI stroke). N/S blades run longer; E/W shorter. **Vector, not raster** — hand-traced to closely match the studio's approved AI-generated reference art (`public/brand/mint-compass-mark-source.png`), because raster art can't stay crisp across the size range this mark needs (16px favicon through a browser-zoomed navbar) — only vector math can. Artwork lives in one place — `app/components/compass.tsx` (`viewBox 0 0 128 128`), exporting `CompassMark({ size, className, variant, simplified })` (variants **colour / dark / light / mono**) and `LogoLockup({ markSize })`, plus the SVG string + data URI the app icon and OG card consume. Reference copies: `public/brand/mint-compass.svg`, `public/brand/mint-compass-lockup.svg`.
- **Simplified mode (small sizes):** below ~24px (favicon, app-icon tiles) the mark switches to **flat two-tone fills + a heavier ring (4.8)** — the gradient and fine detail die at tiny sizes anyway. Never use the detailed gradient mark at favicon size.
- **Logo colours (official, sampled from the approved reference, logo-only):** deep `#164B39` (shade `#123F30`) · mid `#3A785A` · pale mint tip `#89CDA4`. These are **not** text/UI tokens and do not enter the WCAG-checked palette below; never use them for type or fills that carry text. (Supersedes earlier gradient notes from prior drafts of the mark.)
- **Wordmark spec:** Fraunces **Regular (400)**, deep green **`#0F2D23`**, tracking −0.01em, mint `&` (upright, not italic — Fraunces' italic `&` is an ornate swash that reads as a different typeface next to upright "Mint"/"Co"; colour alone carries the distinction). Lockup gap is tight (`gap-2`, 8px) — the vector mark's viewBox has no wasted padding, so a small CSS gap now reads correctly instead of stacking with baked-in image margin the way the old raster crop did. Symbol ~34px in the navbar, 42px in the footer, optically centred against the wordmark — one brand unit.
- **Primary lockup:** the compass to the left of the wordmark (`LogoLockup` in `app/components/compass.tsx`), used in the header and footer.
- **Favicon** is the simplified compass on a deep-green rounded tile (`app/icon.svg`); the app icon (`app/apple-icon.tsx`) and OG card are the detailed colour compass on the bone background.
- **The leaf is deliberate here.** (Supersedes the original "no leaf, ever" rule.) The compass geometry and the faceted, gradient blades answer the old caution that a leaf reads generic/herbal — the leaves *build* a compass, not a garnish. Keep leaf usage to the compass mark only; do not scatter loose leaves elsewhere.
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
Honest, direct, warm, no jargon. Sell hard on what's **true** (one clear monthly price, ten-day build, "built to the standard we sell"). Studio voice in public copy — speak as Mint & Co, not as named individuals (exception: `/privacy` and `/terms`, where UK law requires naming the data controller). **Never** guarantee rankings or bookings. No public competitor-knocking. Never fake reality (no fabricated premises, staff, results, testimonials, or schema).

**Pricing promise (subscription only — no fixed-price/deposit model exists):** one monthly price per package, stated up front — no setup fee, no minimum term, cancel anytime. First month billed at go-live, not at signature. Public copy states our three confirmed monthly packages and prices (see `/packages`) — no hidden numbers. Ownership on cancellation: domain and Google Business Profile are the client's from day one, always; the website itself can be bought outright (see `/terms` for the current figure) or comes down after a 30-day grace period. State this consistently everywhere it's mentioned — see COHERENCE-AUDIT.md §2 for the failure mode when it drifts.

## Motion & detail
One timing hierarchy, one easing curve — tokens in `app/globals.css` (`--dur-micro` 120ms, `--dur-control` 180ms, `--dur-element` 320ms, `--dur-section` 480ms; `--ease-house: cubic-bezier(0.22, 1, 0.36, 1)` everywhere motion is chosen, not imposed). Fade-up on scroll-in (`Reveal`) runs at the section tier, once, disabled under `prefers-reduced-motion`. Stagger is one rule — 60ms per item, capped at 4 items' worth (`staggerDelay` in `Reveal.tsx`) — not hand-typed delays per call site. `linear` is reserved for indeterminate/looping motion only (the wizard's sending bar); it is the one named exception to `--ease-house`. Custom `:focus-visible` (2px mint ring). One CTA style only (`mint-cta` fill). Mint `::selection`. Oversized faint `&` as hero texture.

## Assets
- Compass symbol + lockup (source of truth): `app/components/compass.tsx` (`CompassMark`, `LogoLockup`, `compassSvg`, `compassDataUri`); reference SVGs `public/brand/mint-compass.svg` + `public/brand/mint-compass-lockup.svg`.
- Wordmark: `app/components/Wordmark.tsx` (Fraunces 400, `#0F2D23`, mint italic `&`).
- Favicon: `app/icon.svg`. Apple touch icon: `app/apple-icon.tsx`. OG card: `app/opengraph-image.tsx`. Search-engine logo: `Organization.logo` in `app/layout.tsx` points at the raster `/apple-icon`.
- Tagline (locked): **"Your business, in mint condition."**
