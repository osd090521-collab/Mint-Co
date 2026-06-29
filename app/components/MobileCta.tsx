"use client";

import { useEffect, useState } from "react";
import { auditMailto } from "../site.config";

/**
 * Mobile-only sticky bottom CTA. Appears after the hero scrolls out of view.
 * Respects the iPhone home-indicator safe area.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 sm:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={auditMailto()}
        className="flex min-h-[52px] items-center justify-center rounded-xl bg-mint-cta text-base font-semibold text-white shadow-soft"
      >
        Get your free audit
      </a>
    </div>
  );
}
