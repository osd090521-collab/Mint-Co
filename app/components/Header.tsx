"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoLockup } from "./compass";
import { auditMailto } from "../site.config";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Mint & Co home" className="rounded">
          <LogoLockup markSize={34} />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate underline-offset-4 hover:text-ink hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
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
