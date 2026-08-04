"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A scale+fade entrance — a second scroll-triggered vocabulary alongside
 * Reveal's fade-up, for the moments that should feel like they're settling
 * into place rather than rising in (pricing cards, principle cards). Same
 * fire-once IntersectionObserver pattern and the same "visible by default,
 * only animate once JS + `html[data-js]` are present" contract as
 * Reveal.tsx — no blank content for crawlers, no-JS visitors, or
 * reduced-motion users.
 */
export function ScaleReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-scale-reveal=""
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
