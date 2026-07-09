"use client";

import { useEffect, useState } from "react";
import { Cta } from "./Cta";
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
      inert={!visible}
      aria-hidden={!visible}
      style={{
        boxShadow:
          "0 -1px 2px rgba(16,33,27,0.04), 0 -8px 24px rgba(16,33,27,0.05)",
      }}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-all duration-300 sm:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Cta href={auditMailto()} className="w-full">
        Get my free audit
      </Cta>
    </div>
  );
}
