# mint-and-co-site

The Mint & Co marketing website — the agency's own **proof asset**, built to the exact standard we sell. Next.js (App Router) + Tailwind v4, deployed on Vercel.

This is a **standalone repo**, deliberately separate from the Mint & Co operating-system hub (which holds internal lead/strategy docs). Rule from the OS: *repo = OS hub, not website code* — so the website lives here on its own.

## Phase 1 (current)
A complete, premium one-page pitch: hero → problem → positioning → what we do → who we are/trust → contact. Static, no backend, no cookies/analytics. Primary CTA is "Get your free audit" via the working `omar@` inbox (see compliance note in `app/site.config.ts`). WhatsApp CTA turns on automatically once a real number is set in `site.config.ts`.

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind v4 (CSS-first tokens in `app/globals.css`)
- Fonts: Fraunces (display) + Geist (body) via `next/font`
- SEO: metadata, OpenGraph image, sitemap, robots, JSON-LD (`ProfessionalService`)

## Brand
See `BRAND.md` for the palette, typography, and the rule that the ampersand is the brand.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Deploy
Vercel. Add `mintandco.co.uk` (apex, canonical) + `www`. At Porkbun: `A @ → <IP from Vercel project>` and `CNAME www → cname.vercel-dns-0.com`. Do not publish a contact channel until the inbox receives and SPF/DMARC pass (see `app/site.config.ts`).
