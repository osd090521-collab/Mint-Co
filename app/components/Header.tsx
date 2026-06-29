"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { auditMailto } from "../site.config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Mint & Co home" className="rounded">
          <Wordmark size="md" />
        </Link>
        <a
          href={auditMailto()}
          className="text-sm font-medium text-mint-deep underline-offset-4 hover:underline"
        >
          Get my free audit
        </a>
      </div>
    </header>
  );
}
