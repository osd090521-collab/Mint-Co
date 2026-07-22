"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoLockup } from "./compass";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/showcase", label: "Showcase" },
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
              className="text-sm font-medium text-slate underline underline-offset-4 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/*
          Points at the intake wizard, not mailto/primaryCta (decision 11,
          Intake Plan v2.1) — a second "Free audit" nav item beside a mailto
          link would be two near-identical audit links. Mailto stays primary
          in the hero, CTA bands and sticky mobile CTA.
        */}
        <Link
          href="/free-audit?ref=nav"
          className="text-sm font-medium text-mint-deep underline underline-offset-4"
        >
          Get my free audit
        </Link>
      </div>
      {/*
        Compact mobile nav row — four short links fit at 375px, so a
        visible row needs no JS and no ARIA menu-button (REVIEW C3).
      */}
      <nav
        aria-label="Primary"
        className="flex items-center justify-center gap-4 border-t border-line px-5 py-2 text-sm sm:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium text-slate underline underline-offset-4 hover:text-ink"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
