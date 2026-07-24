# Mint & Co — Coherence Upgrade, Stage 1 Audit

Diagnostic pass for **Website Coherence Upgrade — Implementation Brief** (Stage 1), with
**UI/UX & Motion System Audit** Phases 1–4 folded in so the site is diagnosed once, not twice.

**This is a report only. No code has been changed.**

Audited at working-tree state after commit `350d476`, against all 7 routes, shared chrome,
`globals.css`, `site.config.ts`, `BRAND.md` and `ULTRAPLAN.md`. Production build verified
clean (13/13 routes prerendered static).

**Decisions carried into this audit (confirmed by Omar, 24 Jul 2026):**

1. Commercial model is **subscription only**, at the **live site prices — £49 / £119 / £179**.
   All fixed-price / deposit / per-project language is wrong and is scheduled for removal.
   `ULTRAPLAN.md`'s £99 / £249 / £449 is treated as **stale**.
2. Coherence Brief **§9 (Showcase)** and **§10 (Why Us)** target routes that do not exist in
   this repo. Both are **out of scope**; see §9 below.
3. Work stops here for review before any Stage 2 edits.

---

## Contents

1. [Route inventory](#1-route-inventory)
2. [Commercial contradiction map](#2-commercial-contradiction-map)
3. [Repeated-content map](#3-repeated-content-map)
4. [Visual inconsistency map](#4-visual-inconsistency-map)
5. [Component & styling map](#5-component--styling-map)
6. [Interaction inventory](#6-interaction-inventory)
7. [Motion inventory](#7-motion-inventory)
8. [Keep / Improve / Merge / Remove](#8-keep--improve--merge--remove)
9. [Out of scope](#9-out-of-scope)
10. [Technical risk list](#10-technical-risk-list)
11. [Proposed implementation order](#11-proposed-implementation-order)
12. [Open decisions blocking Stage 2](#12-open-decisions-blocking-stage-2)

---

## 1. Route inventory

All routes are statically prerendered. **No page anywhere on the site depends on client-side
data loading** — the concern behind Brief §9 and §19 does not apply to this codebase.

| Route | File | H1 | Own metadata | OG | JSON-LD | Sitemap | In nav |
|---|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | "Look as good online as you do in person." | inherits root | root | 3 global | 1.0 | logo only |
| `/services` | `app/services/page.tsx` | "Clean, premium websites — built to be found." | ✅ | ✅ | — | 0.9 | ✅ |
| `/packages` | `app/packages/page.tsx` | "One monthly price. Everything included." | ✅ | ✅ | FAQPage | 0.8 | ✅ |
| `/process` | `app/process/page.tsx` | "Fixed price. Clear steps. No surprises." | ✅ | ✅ | — | 0.8 | ✅ |
| `/about` | `app/about/page.tsx` | "A three-person studio, building in the open." | ✅ | ✅ | — | 0.7 | ✅ |
| `/free-audit` | `app/free-audit/page.tsx` + `IntakeWizard.tsx` | per-step (client) | ✅ | ❌ **gap** | — | 0.8 | header CTA + footer |
| `/privacy` | `app/privacy/page.tsx` | "Your privacy" | ✅ | ✅ | — | 0.3 | footer |

Shared chrome: `Header` (client, sticky) · `Footer` (server) · `MobileCta` (client, fixed) ·
skip-link · 3 JSON-LD blocks, all in `app/layout.tsx`.

**Route-level observations**

- **R1** — `/free-audit` has no `openGraph` block. The root OG applies, so shares of the
  highest-intent page in the funnel carry the generic homepage title and the wrong `url`.
- **R2** — `/process` is titled **"Process & Pricing"** but contains no prices, and shouldn't;
  pricing is `/packages`' job. The title claims a job the page doesn't do (Brief §15).
- **R3** — Internal linking is one-directional. `/services` → `/packages` and `/process` →
  `/packages` exist, but `/packages`, `/about` and `/privacy` link onward to nothing except
  the shared closing band. Weak hub-and-spoke for both users and crawlers (Brief §13).
- **R4** — No active-route indication anywhere. No `aria-current`, no visual state. On any
  inner page the visitor cannot tell from the nav where they are.

---

## 2. Commercial contradiction map

The single largest coherence failure. The site sells **two incompatible commercial models
simultaneously** — and on the homepage, within four sections of each other.

### 2a. Fixed-price / deposit language scheduled for removal

10 locations. Ordered by leverage.

| # | Location | Text | Why it matters |
|---|---|---|---|
| **CC1** | `app/site.config.ts:16` | `…clear fixed-price packages, agreed before we start.` | **Highest leverage on the site.** This one string feeds the root metadata description, OG description, Twitter description, and the `description` field of *both* the `ProfessionalService` and `Organization` JSON-LD blocks. One edit corrects ~6 public surfaces. |
| **CC2** | `app/opengraph-image.tsx:50` | `Clear fixed-price packages, agreed before we start` | The social share card itself advertises the dead model. |
| **CC3** | `app/page.tsx:49-50` | `built properly, with clear fixed-price packages agreed before we start` | Hero subhead. |
| **CC4** | `app/page.tsx:72` | `clear fixed-price packages` | Hero trust line — contradicts CC5 four sections below it. |
| **CC5** | `app/page.tsx:113-115` | `Essentials £49/mo · Growth £119/mo · Complete £179/mo — one monthly price… No setup fee, no minimum term, cancel anytime.` | **This is the correct model.** Same page as CC3 and CC4. |
| **CC6** | `app/process/page.tsx:12,18` | `a clear fixed-price quote, half to begin, two rounds of revisions` | Page description + OG description. |
| **CC7** | `app/process/page.tsx:52` | `Fixed price. Clear steps. No surprises.` | The H1 is built on the dead model. |
| **CC8** | `app/process/page.tsx:57-58` | `clear fixed-price packages, agreed before we start` | Lead paragraph. |
| **CC9** | `app/process/page.tsx:26` | `plus a fixed-price quote` | Step 1. |
| **CC10** | `app/free-audit/IntakeWizard.tsx:658` | `plus a fixed-price quote` | **The last sentence a converted lead reads.** Worst placement of the ten. |

### 2b. Direct factual contradictions

Not just tone — these two statements cannot both be true.

| # | Claim A | Claim B |
|---|---|---|
| **CC11** | `process/page.tsx:30` — "Agree the price up front. **Half the fee to begin**" | `packages/page.tsx:80` — "**No, never.** No setup fees, no surprise extras — just the monthly price." |
| **CC12** | `process/page.tsx:38` — "**The rest paid once you're happy, before we go live.**" | `packages/page.tsx:76` — "Your first month is billed **at go-live**, not at signature — we carry the build." |

### 2c. The ownership overclaim — highest trust risk

| # | Location | Text |
|---|---|---|
| **CC13** | `app/about/page.tsx:110-111` | "Your domain and your Google Business Profile stay in your name, always. **If you ever leave, you leave with everything.**" |
| | `app/packages/page.tsx:72` | "You can buy the full site export outright for **£595**. Otherwise **it comes down** after a 30-day grace period." |

A customer who cancels leaves with their domain and GBP — **not** with everything. The website
itself is withheld pending £595. "You leave with everything" is an unsupported promise, and
Brief §3 explicitly forbids these. This should be corrected before any cosmetic work.

### 2d. Commercial facts that exist in exactly one place

Brief §6 requires ownership, cancellation and export terms to sit **in the main decision
journey**, not only in FAQs. Currently:

| Fact | Only stated at | Absent from |
|---|---|---|
| £595 site export buyout | `packages/page.tsx:72` (FAQ) | homepage, process, about, footer, privacy |
| 30-day grace, then the site comes down | `packages/page.tsx:72` (FAQ) | everywhere else |
| First month billed at go-live | `packages/page.tsx:76` (FAQ) | everywhere else |
| Website edits "~1 hr/mo fair use" | `packages/page.tsx:45` (a Growth bullet) | — and `services/page.tsx:31` says "fair use" with **no hour figure**, an inconsistent boundary |

### 2e. Document-level trap

**`ULTRAPLAN.md:3-5`** declares itself canonical and states it "supersedes all earlier
pricing", then sets £99 / £249 / £449 at line 15. Per decision (1) above, the **live** prices
are correct — which makes ULTRAPLAN the stale document. It is also untracked in git. Left
as-is, the next person or agent to read it will "correct" the site back to the wrong numbers.
See T2.

---

## 3. Repeated-content map

Brief §14: the voice is a real strength, but it leans on restatement where evidence is needed.

### Verbatim / near-verbatim phrases

| Phrase | Count | Locations |
|---|---|---|
| "premium" | **10** | `layout.tsx:25,40,48,53` · `opengraph-image.tsx:7` · `page.tsx:136` · `ServicesMarquee.tsx:4` · `process:57` · `services:75` · `site.config:16` |
| "three-person studio" | 5 | `page.tsx:158` · `about:40` · `Footer:31` · `about` meta · `services` copy |
| "no template shortcuts, no afterthoughts" | 3 | `page.tsx:137` · `services:26` · `services:82` — **twice on the same page** |
| "Harrow-based, working with businesses across London and the UK" | 3 | `page.tsx:71` · `about:45-46` · `about:117-118` — **twice on About alone** |
| "not a call centre" (+ "not a chatbot") | 3 | `page.tsx:165` · `about:54-55` · `services:61` |
| "We won't promise you top of Google / nobody honestly can" | 2 | `services:47` · `about:99-101` — near-verbatim |
| The audit promise ("how it looks on a phone… where you're losing customers… two or three things we'd fix first") | **5** | `ContactCta:26-29` · `process:26` · `free-audit` meta:7 · `IntakeWizard:654-659` · `site.config` audit body |

Brief §14 names *premium*, *everything*, *no shortcuts*, *no hard sell* as words to stop
overusing unless specifically supported. "premium" at 10 uses is the clearest offender.

### Structural duplication

- **D1 — `ContactCta` is mechanically identical on all 6 content pages.** Brief §21 states
  explicitly: *"Do not use the exact same closing block mechanically on every page."* Only the
  `refSource` prop varies, and it changes nothing the visitor sees except one link's query
  string. Every page currently ends the same way, saying the same thing.
- **D2 — The homepage's three teaser sections are structurally identical**
  (`page.tsx:106-176`): Eyebrow → paragraph → arrow link, three times, with no variation in
  rhythm or weight. Each answers only "there is another page about this." Brief §4 requires
  every homepage section to answer a **distinct question**.
- **D3 — `page.tsx:158` reuses the `/about` H1 verbatim** as an `<h2>`. The same sentence is
  the primary heading of one page and a teaser heading on another.

---

## 4. Visual inconsistency map

### What is already strong — protect this (Brief §2)

- **`app/globals.css:10-30`** is a genuinely good token system: semantic names, documented
  WCAG ratios, and a stated discipline ("mint is INK, not paint — keep it to ~8% of any
  surface"). This is the reference standard the rest of the site should be pulled toward.
- **Two deliberate section rhythms**, documented inline at `page.tsx:26` and `page.tsx:84`:
  feature `py-20 sm:py-28` (5 uses, all page heroes) and standard `py-16 sm:py-24` (11 uses).
  This is a real system. Keep it and codify it.
- **`Cta`** is already extracted — one padding, one shape, two variants (the `REVIEW.md`
  recommendation, implemented).
- **One focus system** — `:focus-visible` 2px mint ring, applied globally at `globals.css:63`.
- **12px is the universal motion distance** across every animation on the site. The one
  motion parameter that is already systematic.
- **`REVIEW.md` C1 and C2 are both genuinely fixed**: the hero renders as plain server HTML at
  full opacity (`page.tsx:37-45`), and `primaryCta()` keeps the CTA label in lockstep with the
  wired channel (`site.config.ts:75-80`), so no button promises a call it can't make.

### Inconsistencies

| # | Issue | Evidence |
|---|---|---|
| **V1** | **Body measure varies with no rule.** `max-w-xl` (12×) and `max-w-2xl` (8×) are both used for lead paragraphs in the same structural position — e.g. `packages:108` vs `page.tsx:93`. | 20 sites |
| **V2** | **Four different page shells.** `max-w-5xl` is the site container (17×), but `/privacy` uses `max-w-2xl` (`privacy:19`), the process timeline `max-w-3xl` (`process:76`), the footer `max-w-3xl` (`Footer:27`), the wizard `max-w-[560px]`. Some are justified as reading measures; none are declared. |
| **V3** | **Card treatment has three variants and no rule.** `border-t-2 border-mint` (`about:96,105,135`; `packages:132`) vs `border-2 border-mint` (`packages:131`) vs `border border-mint/20` (`packages:172`). `shadow-card` and `shadow-soft` are both used to signal the same "recommended" state. |
| **V4** | **Four different H1 scales.** Home `sm:text-6xl`/`tracking-[-0.03em]`; services + packages + process + about `sm:text-5xl`/`tracking-[-0.02em]`; wizard `text-[1.9rem] sm:text-4xl`; privacy `text-3xl sm:text-4xl`. |
| **V5** | **`/privacy` visibly belongs to a different site.** No `Eyebrow`, no `Reveal`, no `ContactCta`, a different H1 scale, a different container width, and a different link style. It is the single worst coherence offender by the brief's own final test. |
| **V6** | **The inline-link style is hand-copied ~15 times** rather than extracted: `font-medium text-mint-deep underline underline-offset-4` in `page.tsx` (×2 as local consts), `process:66`, `services:90`, `about`, `ContactCta:50,69`, `IntakeWizard` (×6), `Footer:40`, `Header:55`. |
| **V7** | **`/privacy` uses a different, less accessible link variant** — `underline-offset-4 hover:underline` (`privacy:36,49,60,72`). Underline **on hover only**, which is precisely the failure Priya flagged in `REVIEW.md`. Fixed everywhere else; still live on this page. |
| **V8** | **Headings used for visual weight, not structure.** `/packages` emits 7 sibling `<h2>`s with no `<h3>` nesting — 3 tier names (`packages:142`) plus 4 FAQ questions (`packages:211`). `/process` puts an `<h2>` inside each `<li>` (`process:98`). |
| **V9** | **The eyebrow device exists at three sizes.** `Eyebrow` component is `text-xs`; `packages:173` hand-writes `text-sm font-semibold uppercase tracking-[0.14em]`; `ServicesMarquee:17` uses `text-sm`/`sm:text-base` with the same tracking. |
| **V10** | **Two `<nav aria-label="Primary">` elements in the DOM at once** (`Header:36` and `Header:64`). Only CSS hides one. Assistive tech announces two identically-named Primary navigations on every page. |
| **V11** | **`BRAND.md` has drifted from the code.** It documents the wordmark ampersand as *italic*; `Wordmark.tsx:1-8` explicitly specifies **upright** and explains why. It documents motion as "fade-up 500ms **ease-out**"; `globals.css:80-82` implements `ease`. |

---

## 5. Component & styling map

### Existing shared components

| Component | Kind | Used by | Verdict |
|---|---|---|---|
| `Cta` | server | ContactCta, home, packages | **Keep** — the site's best primitive |
| `Eyebrow` | server | 11 call sites | **Keep** |
| `Reveal` | client | **47 instances**, 6 files | **Keep, re-scope** — see M-A |
| `ContactCta` | server | all 6 content pages | **Improve** — mechanical repetition (§21) |
| `Header` | client | layout | **Improve** — CTA hierarchy, dup landmark, no active state |
| `Footer` | server | layout | **Improve** — missing legal/credibility (§22) |
| `MobileCta` | client | layout | **Keep** — `inert`, safe-area, suppressed on `/free-audit`; well built |
| `AmpMarker` | server | services, packages ×2, process | **Keep** |
| `Wordmark` / `CompassMark` / `LogoLockup` | server | Header, Footer | **Keep** |
| `icons.tsx` (5 icons + `iconLinkClass`) | server | Footer, About | **Keep** |
| `ServicesMarquee` | server | homepage only | **Improve** — see M-D |
| `TextField` · `ChipGroup` · `MultiChipGroup` · `FieldError` | client, local to `IntakeWizard` | wizard only | **Keep local** — genuinely wizard-specific; abstracting them would be over-engineering (§26) |

### Primitives worth extracting — only where real reuse exists (§26, Motion Phase 7)

| Priority | Primitive | Replaces | Payoff |
|---|---|---|---|
| 1 | **`Section`** | 20+ hand-written `mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24` shells | Encodes the two rhythms + shell width + `bg-warm`/border options. Fixes V1, V2 by construction. |
| 2 | **`InlineLink`** | ~15 hand-copied link classes | Fixes V6 **and** V7 (the privacy hover-underline a11y bug) by construction. |
| 3 | **`PageHero`** | Near-identical Eyebrow + H1 + lead + cross-link on services/packages/process/about | Fixes V4 H1-scale drift by construction. |
| 4 | **`Card`** | 3 ad-hoc border treatments | One radius, one border rule, an `emphasis` variant instead of V3's three. |
| 5 | **Motion tokens** | 7 durations, 4 easing families | See §7. |

**Do not extract** (§26 — "do not over-abstract simple elements"): the AmpMarker list row, the
FAQ two-column grid (2 uses), the icon set.

---

## 6. Interaction inventory

*Motion Audit Phase 3.*

| Interaction | Hover | Focus | Active/Press | Disabled | Verdict |
|---|---|---|---|---|---|
| Header nav links | ✅ `hover:text-ink` | ✅ global | ❌ | n/a | **Improve** — no `aria-current`, no active-route state (R4) |
| Header audit CTA | ✅ | ✅ | ❌ | n/a | **Improve** — styled *identically* to nav links (`text-sm font-medium underline underline-offset-4`), differing only in colour. Brief §20 requires the audit CTA to be visually dominant; it currently reads as a fifth nav item. |
| `Cta` primary/secondary | ✅ | ✅ | ✅ scale .98 | ❌ none | **Improve** — no disabled variant, so `IntakeWizard:1040` reimplements the entire `Cta` base class string verbatim just to add `disabled:opacity-70` |
| Chips (single + multi) | ✅ | ✅ | ✅ | n/a | **Keep** — roving tabindex, arrow-key nav, correct `radiogroup`/`group` semantics, distinct dot-vs-check affordance. Best-in-class; use as the reference standard. |
| Text inputs | — | ✅ | — | — | **Keep** — `aria-invalid`, `aria-describedby`, icon + text errors, blur-revalidate only after a failed Next |
| Accordions | — | — | — | — | **None exist.** The `/packages` FAQ is a static grid, not an accordion — better for SEO and a11y. No action. |
| Mobile menu | — | ✅ | — | — | **Keep** — a visible 4-link row instead of a menu button: no JS, no ARIA menu pattern (deliberate, `REVIEW` C3) |
| Sticky / fixed elements | — | — | — | — | **Improve** — `MobileCta` and the wizard Next bar both claim `bottom-0` + `z-40`. Collision is avoided *only* by `MobileCta:26` early-returning on `/free-audit`. Correct today, fragile tomorrow. |
| Page transitions | — | — | — | — | **None.** Motion Phase 5 asks for a page-entry behaviour; a deliberate "none" is a valid answer, but it should be a decision. |
| Anchor links | — | — | — | — | **Keep** — `/privacy#audit-form` with `scroll-mt-24` clearing the sticky header |
| Loading / error / success | — | — | — | — | **Keep** — the wizard's `sending` / `failed` / `done` states, with a pre-filled mailto on failure so nothing typed is lost, are the strongest UX on the site |

---

## 7. Motion inventory

*Motion Audit Phase 4. Every animation on the site.*

| # | Animation | Trigger | Duration | Easing | Distance | Reduced-motion |
|---|---|---|---|---|---|---|
| 1 | `Reveal` fade-up | IntersectionObserver (0.12 / −40px), once | 500ms | `ease` | 12px Y | ✅ visible, no transition |
| 2 | `Reveal` stagger | `delay` prop, hand-set per call | — | — | — | ✅ |
| 3 | Timeline node stagger | inherits parent Reveal | 500ms | `ease` | 12px Y | ✅ |
| 4 | Timeline line grow | inherits parent Reveal | **1000ms** | `ease` | scaleY 0→1 | ✅ |
| 5 | Services marquee | autoplay, infinite | **28s** | `linear` | −50% X | ✅ freezes + wraps, duplicate track hidden |
| 6 | Header bg/border | scroll > 8px | 300ms | `ease` | — | colour only — acceptable |
| 7 | MobileCta slide-in | scroll > 560px | 300ms | `ease` | 16px Y + opacity | ✅ via global rule |
| 8 | `Cta` press | `:active` | 150ms | `ease` | scale .98 | ✅ |
| 9 | `Cta` hover fill | `:hover` | 150ms | `ease` | — | ✅ |
| 10 | Wizard step-in (fwd/back) | step change | **220ms** | **`cubic-bezier(.22,1,.36,1)`** | ±12px Y | ✅ |
| 11 | Chip pulse | `aria-checked`/`aria-pressed` → true | **100ms** | `ease-out` | scale 1.03 | ✅ |
| 12 | Progress bar width | step change | 300ms | `ease` | width % | ✅ explicit `motion-reduce:transition-none` |
| 13 | Indeterminate send bar | `sending` | **1.1s** | `ease-in-out` | 450% X, infinite | ⚠️ see M-E |
| 14 | Icon link hover | `:hover` | ~150ms | `ease` | — | ✅ |
| 15 | Chip hover / select | `:hover` | 150ms | `ease` | — | ✅ |
| 16 | Smooth scroll | anchor nav | — | — | — | ✅ set to `auto` |

### Motion findings

- **M-A — `Reveal` is over-applied: 47 instances.** `ContactCta` alone wraps **seven**
  elements in seven separate `Reveal`s (`ContactCta:19,24,32,42,46,57,64`) with delays
  0/80/140/160/170/200/240ms — seven IntersectionObservers and a 240ms cascade on a block that
  is a single thought. That block then appears on all 6 content pages, so a visitor browsing
  the site watches the identical 7-part cascade six times. This is the clearest violation of
  the Motion brief's own principle: *motion must communicate hierarchy, not decoration*.
- **M-B — No timing hierarchy.** Seven distinct durations are live (100, 150, 220, 300, 500,
  1000, 1100ms, plus 28s) with no rule mapping duration to element size or importance.
  `BRAND.md` declares exactly one value, and the implementation doesn't match it (V11).
- **M-C — No easing hierarchy.** Four families: `ease` (reveals + most transitions),
  `cubic-bezier(.22,1,.36,1)` (wizard only), `ease-out` (chip only), `linear` (marquee).
  The wizard's quint-out is the most premium-feeling curve on the site and is used nowhere
  else — it is the natural candidate to become the house curve.
- **M-D — The marquee is the least brand-aligned motion on the site.** A 28s infinite
  `linear` scroll is a device from a different design vocabulary than "calm, premium,
  deliberate", and its three strings are near-duplicates of homepage copy (see §3). Strong
  candidate for **Remove** — Motion Phase 6 states removal is a valid improvement.
- **M-E — Reduced-motion users lose the sending signal.** The global `*` rule flattens
  animations to 0.001ms, so animation #13 is effectively invisible. The button label still
  changes to "Sending…", so it is degraded rather than broken, but the progress affordance is
  gone. Minor.
- **M-F — Stagger values are literals at 9 different call sites** (60/80/120/140/160/170/180/
  200/240ms). Consistency across the three-card grids is currently coincidence, not system.
- **Genuine strength:** the `html[data-js]` pre-paint gating means content is fully visible
  with JS off, for crawlers, and under `prefers-reduced-motion` — with no flash. Well
  engineered; keep the mechanism exactly as is.

---

## 8. Keep / Improve / Merge / Remove

*Motion Audit Phase 6. Rationalised list with reasons.*

| Item | Verdict | Why |
|---|---|---|
| Colour + shadow tokens (`globals.css:10-30`) | **Keep** | Documented, WCAG-checked, disciplined. The reference standard. |
| Two section rhythms (feature / standard) | **Keep — and codify** | Already a real system; needs to become a `Section` prop instead of a comment. |
| `Cta`, `Eyebrow`, `AmpMarker`, brand marks, `icons` | **Keep** | Working primitives, consistently applied. |
| Chip components + wizard form semantics | **Keep** | Best accessibility work in the codebase. |
| `html[data-js]` reveal gating | **Keep** | Crawler-safe, no-JS-safe, no flash. |
| Wizard `failed` state + pre-filled mailto | **Keep** | Genuinely excellent failure design. |
| 12px motion distance | **Keep** | Already the universal base unit. |
| `Reveal` per-element wrapping | **Improve** | Wrap section groups, not every child. Target ≤ 1 observer per section. |
| `ContactCta` | **Improve** | Collapse 7 Reveals → 1–2; make the closing block context-sensitive per §21. |
| `Header` CTA hierarchy | **Improve** | Audit CTA must not look like a nav link (§20). |
| `Footer` | **Improve** | Add business identity, service area, terms/ownership links (§22). |
| `/privacy` page furniture | **Improve** | Bring onto the shared visual system (V5) and fix its link style (V7). |
| Card border treatments | **Merge** | Three variants → one `Card` with an `emphasis` prop (V3). |
| Inline link classes | **Merge** | ~15 copies → `InlineLink` (V6, V7). |
| Page hero blocks | **Merge** | 4 near-identical → `PageHero` (V4). |
| Duplicate `<nav aria-label="Primary">` | **Merge** | One landmark; switch layout with CSS (V10). |
| Wizard submit button classes | **Merge** | Add a `disabled` variant to `Cta`, drop the duplicated class string. |
| `ServicesMarquee` | **Remove** (recommended) | M-D: off-brand motion, duplicate copy, homepage-only. Removing increases coherence. |
| Homepage teaser sections ×3 | **Replace** | D2: three identical Eyebrow→para→link blocks that only say "see another page". §4 wants distinct questions answered. |
| Fixed-price / deposit language | **Remove** | §2 — all 10 locations. |
| "premium" ×10, "no template shortcuts" ×3, etc. | **Reduce** | §14 — replace repetition with specific evidence. |

---

## 9. Out of scope

Per decision (2), the following Coherence Brief sections target pages that **do not exist** in
this repository. Nothing matching `showcase` or `why` exists anywhere under `app/`.

| Brief section | Status |
|---|---|
| **§9 — Fix the Showcase page** | **Not applicable.** No `/showcase` route. Its stated concern (content hidden behind client-side loading) does not apply anywhere on this site — all 13 routes prerender static. |
| **§10 — Improve the Why Us page** | **Not applicable.** No `/why-us` route. |

The differentiation arguments §10 asks for (risk, ownership, personal service, speed, local
relevance) are partially present today, scattered across `/about` and `/services`. They are
covered as copy work inside §5/§8 rather than as a new route. No new pages will be created.

---

## 10. Technical risk list

| # | Risk | Severity | Evidence |
|---|---|---|---|
| **T1** | **The `&` in the repo path breaks `npm run build` on Windows.** npm's shell invocation splits at `Mint&Co HQ`, producing `'Co' is not recognized` and `Cannot find module 'C:\AI Ventures\next\dist\bin\next'`. Build succeeds via `node ./node_modules/next/dist/bin/next build`. Linux CI unaffected. | Medium (local dev only) | Reproduced this session |
| **T2** | **`ULTRAPLAN.md` now contradicts the confirmed prices** while declaring itself canonical and superseding "all earlier pricing". It is also untracked in git. Left as-is, it will cause the site to be "corrected" back to £99/£249/£449. | **High** (process) | `ULTRAPLAN.md:3-5,15` vs `packages/page.tsx:27,40,53` |
| **T3** | **`NEXT_PUBLIC_INTAKE_URL` is set in `.env.local` — production value not verifiable from the repo.** If unset in Vercel, `submit()` throws at `IntakeWizard:579` and *every* visitor is routed to the mailto fallback. Needs a one-minute dashboard check. | **High if unset** | `IntakeWizard:30,579` |
| **T4** | **Submissions are unverifiable by design.** `mode:'no-cors'` means "fetch resolved without throwing" is treated as success (`IntakeWizard:601-617`). An Apps Script 500 reports `done` to the user and the lead is silently lost. The trade-off is documented and deliberate; the gap is that there is **no delivery monitoring** to compensate. | Medium | `IntakeWizard:8-19` |
| **T5** | **No duplicate-submission guard.** `sessionStorage` clears on success, but a second tab or cleared storage produces a duplicate row. The honeypot and `elapsedMs` filter bots, not double-taps. Brief §11 explicitly requires testing this. | Low–Medium | `IntakeWizard:571-622` |
| **T6** | **`gbpUrl` is empty** → the Google Business Profile is absent from JSON-LD `sameAs` and from the footer. Flagged in `REVIEW.md` as the local-SEO panelist's hill to die on; still open. | Medium (local SEO) | `site.config.ts:32`, `layout.tsx:61` |
| **T7** | **`bookingUrl` is empty** → every primary CTA site-wide resolves to `mailto:`. The label degrades honestly to "Get my free audit" and `ctaConsequence()` warns "Opens your email app", so there is **no broken promise** — but the dominant conversion path is a mail-client handoff, which does nothing on a desktop with no mail handler. | Medium (conversion) | `site.config.ts:38,75-87` |
| **T8** | **No analytics of any kind**, deliberately — `/privacy:29` promises "no cookies, tracking or analytics". Consequence: the `?ref=` scheme (`IntakeWizard:33-42`) is the only attribution that exists, and it survives only on wizard submissions, never on mailto clicks. Most Brief §11/§20 improvements will be unmeasurable. | Medium (needs a decision) | `privacy:29` vs `IntakeWizard:33-42` |
| **T9** | **Working tree is dirty** — modified `compass.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`; deleted `app/icon.png` and `public/brand/mint-compass-mark.png`; untracked brand SVGs, `ULTRAPLAN.md`, and a business-model PDF. Stage 2 edits would land on top of unreviewed WIP. | Medium (process) | `git status` |
| **T10** | **The committed `www.mintandco.co.uk/` static snapshot is already stale** relative to `app/`, and every Stage 2 change makes it staler. Its deployment status is unclear from the repo. | Medium | tracked dir; `next.config.ts:22-23` |
| **T11** | **Privacy notice is incomplete** (§12): no named legal entity or data controller, no lawful basis, no retention basis beyond "12 months", no processor list — **Vercel is not mentioned at all**, only Google Workspace — and no commercial terms covering the £595 buyout, cancellation, grace period or fair use. | Medium (compliance) | `privacy/page.tsx` |
| **T12** | JSON-LD `founder` and metadata `authors` carry **first names only** (`layout.tsx:30,72`), so no entity resolution is possible. | Low (SEO) | `layout.tsx:30,72` |

### SEO gaps (Brief §13)

- ✅ Every route has title, description, canonical. ✅ `sitemap.ts` complete. ✅ `robots.ts` set.
  ✅ All content server-rendered.
- ❌ `/free-audit` has no `openGraph` block (R1).
- ❌ No `Service` schema on `/services`; no `Offer`/`Product` schema on `/packages` tiers; no
  `BreadcrumbList` anywhere.
- ❌ Thin internal linking (R3); flat heading structure (V8).
- **Unused asset worth noting for §25:** `IntakeWizard.tsx:51-61` already defines eight
  validated target niches — barber, salon/beauty/clinic, trade, café/restaurant, retail, dry
  cleaner/tailor, online shop, social seller. The public copy speaks generically to
  "businesses" while the funnel already knows exactly who the customer is. That list is the
  natural, honest foundation for §25's niche relevance work — no invention required.

---

## 11. Proposed implementation order

Sequenced by dependency, not by brief order. The governing rule: **fix what the site claims
before polishing how it looks**, because rewriting `/process` changes which sections exist,
and there is no value in extracting a `Section` primitive around content about to be replaced.

### Stage 2 — Foundation

| Step | Work | Depends on |
|---|---|---|
| **F1** | Purge the fixed-price model — all 10 locations in §2a, starting at `site.config.ts:16` (one string, ~6 surfaces) and `opengraph-image.tsx:50`. | Decision (1) ✅ |
| **F2** | **Rewrite `/process` around subscription delivery** (§7). Its H1, title, description and 2 of 4 steps are built on the dead model — a rewrite, not an edit. Retitle from "Process & Pricing" (R2). | F1, **Q1** |
| **F3** | Resolve the ownership overclaim (CC13), then apply one honest phrasing consistently to homepage, packages, about, footer and privacy. | **Q2** |
| **F4** | Lift the single-source commercial facts (§2d) into the main decision journey (§6). | F3 |
| **F5** | Extract `Section`, `InlineLink`, `PageHero`, `Card` (§16, §26). No intended visual change; every later page edit rides on these. Fixes V1–V4, V6, V7 by construction. | F2 |
| **F6** | Define the motion language — timing + easing hierarchy, stagger rule, motion tokens (§17, Motion Phase 8). **Propose, don't yet re-animate.** | — |
| **F7** | CTA hierarchy (§20): make the header audit CTA dominant; add `aria-current` route state (R4). | F5 |

### Stage 3 — Pages

Brief order, with one change: **`/process` moves to Stage 2**, because for this site it is a
commercial correction rather than a polish pass.

1. **Homepage** (§4) — replace the three identical teasers (D2) with sections that each answer
   a distinct question. *Depends on F1, F5.*
2. **Packages** (§6) — surface ownership/cancellation/export in the decision journey. *F1, F3, F4.*
3. ~~Process~~ — *completed in F2.*
4. **Services** (§5) — separate its job from Packages; resolve the fair-use inconsistency. *F5.*
5. **Free Audit** (§11) — CC10 fix, plus the T3/T4/T5 operational review and the §11 test matrix.
6. **About** (§8) — founder roles and credibility; carries the F3 ownership correction.
7. **Privacy + a new commercial terms page** (§12) — T11. *F3, F4.*
8. **Footer + Header** (§22, §15) — credibility, legal links, nav simplification.
9. **Page endings** (§21) — D1; must come last, once every page's purpose is settled.

### Stage 4 — Technical hardening

Accessibility (V10 duplicate landmark, V8 heading order, V7 privacy links) · `/free-audit` OG
(R1) · `Service`/`Offer`/`BreadcrumbList` schema · internal linking (R3) · mobile pass (§23) ·
full funnel test matrix (§11) · regression.

### Stage 5 — Final coherence pass

The brief's own test, applied end to end: *can a visitor move between any two pages without
feeling that the commercial model, brand, design system or quality level has changed?*

---

## 12. Open decisions blocking Stage 2

Three questions. Everything else in Stage 2 can proceed without them.

**Q1 — What is the real subscription delivery workflow?** (blocks F2)
`/process` currently describes a one-off project: audit → approve → half the fee → build →
balance on launch. The subscription equivalent needs the real stages. `ULTRAPLAN.md` implies
audit → qualification → onboarding/content collection → build → go-live (first bill) → ongoing
management. Confirm or correct — the brief forbids inventing operational detail.

**Q2 — What actually happens when a client cancels?** (blocks F3, and F4/§12 downstream)
`/about` says "you leave with everything"; `/packages` says the site comes down after 30 days
unless you pay £595. Both cannot stand. Which is the real policy, and is £595 current?

**Q3 — Is the no-analytics position permanent?** (shapes §11 and §20)
It is a genuine brand asset and it is promised in writing at `privacy:29`. But it means every
conversion improvement in this project ships unmeasured. Keep as-is, or adopt something
cookieless and first-party? Not blocking — but worth deciding before, not after, the CTA and
funnel work.

---

## Appendix — audit method

- Full read of all 27 source files under `app/` (~3,000 lines), plus `globals.css`,
  `next.config.ts`, `BRAND.md`, `REVIEW.md`, `ULTRAPLAN.md`, `package.json`.
- Production build executed and verified: Next.js 16.2.9, 13/13 routes prerendered static,
  TypeScript clean.
- Phrase-frequency and class-usage counts generated by search across `app/**`, not estimated.
- Prior work honoured rather than re-derived: `REVIEW.md`'s six-panel findings were checked
  against current code. **C1 (hero behind JS) and C2 (dead CTA label) are both confirmed
  fixed.** C3 (mobile nav) is fixed. The local-SEO `sameAs` item (T6) and the privacy-link
  underline item (V7, on `/privacy` only) remain open and are carried forward here.
