/**
 * The one stagger rule on the site: 60ms per item, capped at 4 items' worth
 * (180ms) so a long list doesn't make the last card wait a visible beat
 * behind the first. Replaces hand-typed literal delays (60/80/120/140/
 * 160/170/180/200/240ms) that had drifted across call sites with no shared
 * rule behind them.
 *
 * Deliberately NOT in Reveal.tsx: that file is "use client", which makes
 * every one of its exports a client-only reference as far as React Server
 * Components are concerned — even a plain, synchronous, non-hook function
 * like this one. Page files (server components) call staggerDelay() directly
 * to compute a number, not to render a component, so it has to live in a
 * plain module with no "use client" directive to be callable from both.
 */
export function staggerDelay(index: number, stepMs = 60, capItems = 4): number {
  return Math.min(index, capItems - 1) * stepMs;
}
