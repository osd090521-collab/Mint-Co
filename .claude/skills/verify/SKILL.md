---
name: verify
description: Build, run and browser-drive this site to verify changes end-to-end.
---

# Verifying mint-and-co-site changes

## Gotcha: `&` in the repo path breaks npm scripts

`npm run <script>` fails ("'Co' is not recognized…") because cmd.exe splits
the "Mint&Co HQ" path at `&`. Invoke binaries directly with node from
Git Bash instead:

```bash
cd "/c/AI Ventures/Mint&Co HQ/mint-and-co-site"
node node_modules/eslint/bin/eslint.js .
node node_modules/next/dist/bin/next build
node node_modules/next/dist/bin/next start   # serve prod build on :3000
```

## Drive the app in a real browser

- **Test against `next start` (prod build), not `next dev`** — under a
  headless browser the dev HMR websocket dies and forces a reload loop,
  and dev logs a pre-existing (harmless) hydration warning for the
  layout's `data-js` attribute. Prod has neither.
- Playwright with the system Edge needs no browser download:
  `npm i playwright` in a scratch dir, then
  `chromium.launch({ channel: "msedge", headless: true })`.
- The site is fully SSR'd, so wait for hydration before clicking —
  pre-hydration clicks silently no-op (or native-submit forms). Reliable
  signal: `__reactFiber$` keys appear on DOM nodes:

  ```js
  await page.waitForFunction(() => {
    const b = document.querySelector("a,button");
    return !!b && Object.keys(b).some((k) => k.startsWith("__reactFiber"));
  });
  ```

- Playwright `getByRole(name:)` matches substrings — use `exact: true`
  ("Next" otherwise also matches the dev-tools button in dev).

## Flows worth driving

- `/free-audit` intake wizard: all 4 steps, per-step validation on Next,
  keyboard chips (arrows + Space), sessionStorage restore after reload,
  adaptive contact field (email↔tel switch clears value + notice).
- Submit paths: with `NEXT_PUBLIC_INTAKE_URL` unset or endpoint down →
  error state with pre-filled mailto (answers intact). With an endpoint
  (tiny local HTTP mock on e.g. :4999, then rebuild with
  `NEXT_PUBLIC_INTAKE_URL=http://localhost:4999/exec`) → personalised
  confirmation, sessionStorage cleared, exactly one POST (double-submit
  guard). The env var is baked at build time — rebuild after changing it.
- Ready-made harness from the intake build (drive1/drive2 + mock) lived in
  the session scratchpad; recreate from this recipe if needed.

## Gotcha: Turbopack JSX eats a space after line-leading expressions

`{expr} text…` at the start of a source line renders with NO space between
the expression value and the text ("Compass Cutscomes"). Use an explicit
`{" "}` after the expression. Same-line `text {expr} text` is fine.
