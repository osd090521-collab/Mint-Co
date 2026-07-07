# Mint & Co — Expert Panel Review

A six-person panel of domain experts independently reviewed the pre-launch site (all five routes rendered + full source), each judging from their own discipline and ideology, and each passing verdict on the pending **ULTRAPLAN** content/architecture change set. This report synthesises their findings.

**This is a report only. Nothing here has been implemented.** The backlog at the end is ordered for the owner to choose from.

Reviewed at commit state: 5 routes (`/`, `/services`, `/process`, `/about`, `/privacy`), shared chrome in `app/layout.tsx`, three JSON-LD blocks, mailto + dormant-WhatsApp contact.

---

## Scorecard

| Panelist | Discipline | Score | Hill they'd die on |
|---|---|---|---|
| Marguerite Voss | Brand-led UI Design | **7.6** | One button, one padding, one place — extract a single CTA primitive before adding anything |
| Priya Raghunathan | Accessibility (WCAG 2.2) | **7.0** | Underline inline links permanently, not on hover |
| Tomasz Lindqvist | Frontend Performance | **6.5** | The hero `<h1>` must not start at `opacity:0` |
| Gareth Bowen | Local SEO & Findability | **6.5** | Wire the GBP URL into JSON-LD `sameAs`, not just a footer link |
| Dan Okafor | UX & Conversion | **6.3** | Put navigation on the phone |
| Elena Marchetti | Backend & Architecture | **6.3** | No label may promise a mechanism that isn't wired |
| **Panel average** | | **6.7** | |

Category detail per panelist is in the appendix at the bottom.

---

## Consensus findings (raised independently by ≥2 panelists)

These are the highest-confidence items — multiple experts arrived at them from different angles.

### C1 — The hero is hidden behind JavaScript *(3 panelists: Performance, UX, Accessibility)*
The hero `<h1>` is wrapped in `<Reveal>`, and `app/globals.css` sets every `[data-reveal]` to `opacity:0` the instant the inline `data-js` script runs (pre-paint). The largest above-the-fold element therefore paints invisible until React downloads, hydrates, and an IntersectionObserver fires.
- **Tomasz (Perf):** it's the LCP element behind a "JavaScript paywall" — on mid-range Android/4G the hero is blank for the entire JS critical path. *His hill to die on.*
- **Dan (UX):** same failure — "that user stares at a blank page with a floating `&` watermark."
- **Priya (A11y):** endorses the no-JS/reduced-motion guarding as genuinely well done, but the fold-gating is still the weak point.
- **Fix:** un-wrap the hero (eyebrow / `<h1>` / subhead) from `Reveal`; render as plain server HTML at full opacity. Keep `Reveal` for below-the-fold sections only. **Cheap, high-impact, agreed by three.**

### C2 — "Book a free call" backed by mailto is a broken promise *(3 panelists: Backend, UX, Accessibility)*
The ULTRAPLAN's CTA resolves `bookingUrl → WhatsApp → mailto`, but both real endpoints are empty, so at launch the button opens an email compose window (or, on desktops with no mail handler, does nothing).
- **Elena (Backend):** "a dead channel wearing a live label" — violates the team's own `site.config.ts:4` compliance rule. *Her hill to die on.*
- **Dan (UX):** "a label is a contract… backed by an email compose window it's a broken promise at the exact moment of highest intent."
- **Priya (A11y):** expectation mismatch against the spirit of 2.4.4 Link Purpose; screen-reader users get no warning before the context switch.
- **Fix (unanimous):** the label must derive from the resolved channel — "Book a free call" only when a booking/WhatsApp endpoint is live; keep email-honest wording ("Get your free audit/preview") while it's mailto.

### C3 — No mobile navigation *(2 panelists: UX, Accessibility)*
`app/components/Header.tsx` nav is `hidden … sm:flex` — below 640px there is no menu, no hamburger, nothing. The only route to Process/About on a phone is scrolling to the footer, which the sticky MobileCta overlaps.
- **Dan (UX):** *his hill to die on* — "a studio selling 'mobile-first, built properly' cannot launch a site where mobile users can't navigate."
- **Priya (A11y):** self-refuting for a mobile-first pitch; a phone screen-reader user must traverse a whole page to discover other pages exist.
- **Fix:** three links fit at 375px — show a compact visible nav row on mobile (no JS needed), or a native `<details>` disclosure. Both panelists explicitly reject an ARIA menu-button as overkill for this site.

### C4 — The eyebrow (`text-mint`) fails AA contrast *(2 panelists: Brand, Accessibility)*
`app/components/Eyebrow.tsx` renders 12px `text-mint #1E8E68` — measured ~3.6–3.9:1, below the 4.5:1 required for small text. Every page opens with it.
- Both note this **breaks the brand's own law**: `BRAND.md` says mint is "never body/link text" and light mint "fails WCAG AA for text."
- **Fix (agreed):** recolour eyebrows to `mint-deep #0F4A37` (~8:1, and BRAND.md already sanctions it for small text). Reserve raw `mint` for rules/borders/the ampersand.

### C5 — The `Reveal` pattern is over-applied per element *(2 panelists: Performance, and implicitly Brand on clutter)*
Each animated element gets its own `Reveal` (its own IntersectionObserver). `/process` already renders 12; the ULTRAPLAN's added FAQ + provide-list + steps would push one route past ~30 observers.
- **Tomasz (Perf):** wrap each *section* in one `Reveal` and use a CSS stagger (nth-child delay) for children instead of N observers.

### C6 — The "ten days" fact is stated inconsistently *(2 panelists: Brand, UX)*
`app/page.tsx` says "10 working days" (numeral); `app/process/page.tsx` says "Ten working days" (word). The ULTRAPLAN changes this to "around 7–10 days" — both flag that the fact lives in multiple places and must change in lockstep or it reads as a slipping promise.

---

## Notable disagreements / tensions

- **Retiring the "free audit" offer.** Dan (UX) is wary: the audit is a concrete, zero-commitment async offer, and a *call* is a perceived cost for this buyer ("trade owners abandon Calendly at the time-picker"). He wants the **preview** led as the benefit and the call offered as an optional channel — not the audit simply replaced by a call. The others don't object to the rename but none defend dropping the low-commitment path. **Net: keep a zero-commitment async entry point; lead with the preview artifact.**
- **How hard to lean local.** Gareth (SEO) wants Harrow/Pinner kept sharp and would pull "United Kingdom" out of schema `areaServed` to protect local specificity. This lightly tensions with the earlier product decision to broaden reach to "London and the UK." **Net: keep the broad reach in body copy, keep schema `areaServed` tight.**
- **FAQ schema value.** Gareth is blunt that FAQPage JSON-LD earns **zero** SERP rich-results for a web studio post-2023 (Google restricted it to gov/health) — keep it for Bing/AI engines and honesty, but nobody should expect SERP real estate. The others endorse the *visible* FAQ strongly regardless.
- **FAQ pattern.** Priya (A11y) prefers a **static `h3` + answer** list (best for find-in-page, heading nav, print) and accepts native `<details>` as second choice; Marguerite (Brand) and Tomasz (Perf) prefer native `<details>` for restraint/weight. **Consensus tiebreak: native `<details>/<summary>`, no `name` attribute, plain-text questions — satisfies all three (no JS, keyboard-free, collapsible).**

---

## Bugs the panel caught (factual, not opinion)

- **B1 — mailto mis-encoding.** `app/site.config.ts` builds the mailto with `URLSearchParams`, which encodes spaces as `+` (form-encoding, not RFC 6068). Apple Mail, Outlook desktop, and Thunderbird show literal `Hi+Omar,+David+&+Rodrick`. *(Elena, Backend — Critical.)* Fix: use `encodeURIComponent` for subject/body instead of `URLSearchParams`.
- **B2 — MobileCta stays focusable while invisible.** `app/components/MobileCta.tsx` hides via `opacity-0 pointer-events-none`, but the `<a>` remains in the tab order and a11y tree — keyboard focus vanishes into an invisible control (WCAG 2.4.7). Also can obscure focused content at the bottom edge (2.4.11). *(Priya, A11y — Major.)* Fix: add `inert` + `aria-hidden` in the hidden state; add mobile `scroll-padding-bottom`.
- **B3 — `Organization.logo` is an SVG.** `app/layout.tsx` points `logo` at `/icon.svg`; Google's logo guidelines only accept raster (PNG/JPG/WebP), so it's silently ignored and never feeds branded search. *(Gareth, SEO — Major.)* Fix: point at a PNG (reuse the apple-icon route or add `icon.png`).
- **B4 — Open Graph is homepage-generic on every route.** `og:title`/`og:url` are the homepage's on `/services`, `/process`, `/about` — sharing any inner page presents it as the homepage. *(Gareth, SEO — Major.)* Fix: per-page `openGraph.title`/`url` in each page's metadata.

---

## ULTRAPLAN verdict (panel-merged)

| Plan item | Panel verdict |
|---|---|
| Three pillars (Website Design & Build / Google & SEO Foundations / Enquiry & Booking Setup) | **Endorse** — unanimous where relevant; Gareth calls it "the single biggest content-depth win," Dan says it fixes the adjectives-not-deliverables problem. |
| /services deeper + 9-item add-ons | **Endorse with amend** — Gareth wants each pillar to carry §27 depth (what's included / not / who for). Marguerite: render add-ons as a quiet muted block *below a rule*, not 9 cards, or they rival the 3 core pillars. Tomasz: one `Reveal` per section, not per item. |
| /process 4-step flow + "what you'll provide" list | **Endorse** — Dan: "answers the silent objection that kills more of these deals than price." Priya: use `<ol>` for steps, `<ul>` for the list. |
| 8-question FAQ + FAQPage JSON-LD from one data array | **Endorse the visible FAQ; amend expectations of the schema.** Single-source array approved by all. Gareth: schema earns zero Google rich-results (keep for Bing/AI only). Pattern = native `<details>`. Answers must be static text (not per-item `Reveal`). |
| CTA → "Book a free call" (mailto-backed until endpoints exist) | **Oppose as specified** — see C2. Label must match the wired mechanism. |
| `bookingUrl` field + resolution order booking → WhatsApp → mailto | **Endorse the precedence; amend the implementation** — Elena: centralise in one `primaryCta()` resolver consumed by Header/MobileCta/ContactCta, or the three will drift. Marguerite: extract the CTA primitive first (her hill). |
| Conditional GBP/Instagram footer/About links | **Endorse but incomplete** — Gareth: also inject into JSON-LD `sameAs` in both schema blocks (his hill), not just footer `<a>`s. |
| LAUNCH-CHECKLIST.md | **Endorse; expand** — see additions below. |
| Sitemap unchanged | **Endorse** — no new routes. |

### Launch checklist — panel additions (beyond the plan's draft)
- **SEO (Gareth):** swap schema logo to PNG + validate in Rich Results Test · add GBP + Instagram to `sameAs` · NAP consistency check across site/GBP/Instagram · verify + submit sitemap to **Bing** Webmaster Tools · decide LocalBusiness-vs-ProfessionalService explicitly · confirm www→non-www + http→https + live (non-localhost) OG image on the deployed URL.
- **Backend/ops (Elena):** document mailbox provider + MX · create `hello@` alias delivered to all three founders (bus factor 1 → 3) · DMARC with `rua=` reporting · external send/receive test incl. spam-folder check · **mailto smoke test on iOS / Android / desktop-with-no-mail-client** · named owner + cover for the "within one working day" promise · uptime monitor on the apex · pre-commit the Phase-2 form trigger conditions in writing.
- **Coupling rule (Elena):** if any analytics is ever adopted, the privacy-page edit ships in the *same* deploy (the site currently publishes "no cookies, tracking or analytics").

---

## Master backlog (P0 → P2)

Ordered by the panel's collective weight. Tags = endorsing panelist(s).

### P0 — do before launch
1. **Un-gate the hero from `Reveal`** so the `<h1>` paints immediately at full opacity. *(Perf, UX, A11y — C1)*
2. **Make the CTA label match the wired channel** — no "Book a free call" while it's a mailto. *(Backend, UX, A11y — C2)*
3. **Ship a mobile nav** (visible compact row or `<details>`, no ARIA menu). *(UX, A11y — C3)*
4. **Fix the mailto encoder** — `encodeURIComponent`, not `URLSearchParams`; smoke-test on 3 device classes. *(Backend — B1)*
5. **Recolour eyebrows to `mint-deep`** (fix AA contrast + brand-law breach). *(Brand, A11y — C4)*
6. **Underline inline links by default** (not hover) — mint-deep links are ~1.45:1 vs body text. *(A11y — Priya's hill)*
7. **Make MobileCta honestly hidden** — `inert` + `aria-hidden` in hidden state; `scroll-padding-bottom`. *(A11y — B2)*
8. **Swap schema `logo` to a PNG** or branded search loses the logo. *(SEO — B3)*

### P1 — high value, near-term
9. **Extract a single `Cta` primitive** (one padding, `px-8`) — de-risks every label/section change. *(Brand — Marguerite's hill)*
10. **Deepen /services** to real service content per pillar (included / not / who for). *(SEO, UX)*
11. **Per-page Open Graph** title + url. *(SEO — B4)*
12. **Ship a booking link** into `bookingUrl` — the highest-value zero-backend upgrade (first channel with delivery observability). *(Backend, UX)*
13. **Add per-placement attribution** to the mailto body (Ref: header/sticky/band) — the only attribution this no-analytics architecture will have. *(Backend)*
14. **Componentise the `&` marker** (`<AmpMarker>`) so the motif renders identically everywhere. *(Brand)*
15. **Add tap-consequence microcopy** under CTAs ("opens your email app…") + promote the email fallback. *(UX)*
16. **Preload the display font + trim Fraunces axes**; consider `display: optional`. *(Perf)*
17. **Wire GBP/Instagram into JSON-LD `sameAs`** the moment URLs exist. *(SEO — Gareth's hill)*

### P2 — worthwhile, not urgent
18. **Collapse 3 JSON-LD blocks into one `@graph`** (Organization + WebSite; drop the overlapping ProfessionalService or fold it in). *(Perf, SEO)*
19. **One shared scroll listener** for Header + MobileCta; gate `backdrop-blur` behind visible state. *(Perf)*
20. **Unify the H1 scale** across home vs subpages; encode as a `heading-1` class. *(Brand)*
21. **A heading for every homepage section** (the teaser sections currently have none — SR heading-nav skips them). *(A11y)*
22. **Add new-tab affordances** (visible glyph + `sr-only "(opens in new tab)"`) to external links, incl. the existing `ico.org.uk` link. *(A11y)*
23. **Spend `brass` once** as an intended hairline, or strike it from BRAND.md. *(Brand)*
24. **Tighten schema `areaServed`** to Harrow/Pinner/NW London; keep London/UK in body copy. *(SEO)*
25. **Pre-write the Phase-2 form spec** (trigger conditions + minimal shape) in the launch checklist. *(Backend)*

---

## Appendix — category scores per panelist

**Marguerite Voss (Brand UI) — 7.6:** Typography & hierarchy 8.0 · Spacing & rhythm 7.5 · Brand-law adherence 7.5 · Component consistency 6.5 · "Earns premium" 8.0

**Priya Raghunathan (Accessibility) — 7.0:** Semantics & structure 8.0 · Keyboard & focus 6.0 · Contrast & visual a11y 6.5 · Motion & preferences 9.5 · Link/control clarity 6.0

**Tomasz Lindqvist (Performance) — 6.5:** Payload & dependencies 9.0 · Font strategy 6.5 · Hydration & JS cost 5.0 · Rendering stability 5.5 · Caching & delivery 8.0

**Gareth Bowen (Local SEO) — 6.5:** Crawlability & indexability 9.0 · Metadata quality 8.5 · Structured data accuracy 6.5 · Content depth vs. intent 4.5 · Local relevance & trust 5.5

**Dan Okafor (UX/Conversion) — 6.3:** Clarity of offer 7.0 · CTA & friction 5.5 · Trust building 7.5 · Information scent & journey 5.5 · Mobile experience 6.0

**Elena Marchetti (Backend) — 6.3:** Enquiry-funnel reliability 4.5 · Attack surface & data exposure 8.5 · Config & deployment architecture 7.0 · Operational readiness 5.0 · Honesty of no-backend trade-off 8.5

---

*Panel convened as a one-off review. All findings are advisory; no code was changed in producing this report.*
