"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cta } from "./Cta";
import { LogoLockup } from "./compass";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

const navLinkClass =
  "text-sm font-medium text-slate underline underline-offset-4 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:decoration-2";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-[var(--dur-control)] ${
        scrolled
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/*
        One grid, one <nav> landmark. Two rows on mobile (logo+CTA, then a
        centred link row beneath) collapse into a single row on sm+ via
        explicit grid placement — not two separate <nav> elements switched
        with responsive display classes, which put two identically-labelled
        "Primary" landmarks in the DOM at once.
      */}
      <div className="mx-auto grid max-w-5xl grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 px-5 py-4 sm:grid-cols-[auto_1fr_auto] sm:px-8">
        <Link
          href="/"
          aria-label="Mint & Co home"
          className="col-start-1 row-start-1 rounded"
        >
          <LogoLockup markSize={34} />
        </Link>

        <nav
          aria-label="Primary"
          className="col-span-2 row-start-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-line pt-3 text-sm sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-self-center sm:border-0 sm:pt-0 sm:gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={navLinkClass}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/*
          The one visually dominant action in the header (Brief §20) — a
          filled button, not a fifth underlined link indistinguishable from
          the nav row above it. Points at the intake wizard, not mailto
          (decision 11, Intake Plan v2.1): a second "Free audit" nav item
          beside a mailto link would be two near-identical audit links.
          Mailto stays primary in the hero, CTA bands and sticky mobile CTA.
        */}
        <Cta
          href="/free-audit?ref=nav"
          className="col-start-2 row-start-1 min-h-[40px] justify-self-end px-5 text-sm sm:col-start-3"
        >
          Get my free audit
        </Cta>
      </div>
    </header>
  );
}
