import Link from "next/link";
import { LogoLockup } from "./compass";
import { site } from "../site.config";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

/** Shared footer — extra bottom clearance on mobile for the sticky CTA. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-warm">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-5 pb-28 pt-12 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:py-12">
        <div>
          <LogoLockup markSize={42} />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Mint &amp; Co — a three-person studio by Omar, David and
            Rodrick. {site.location}.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-x-6 gap-y-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-slate underline-offset-4 hover:text-ink hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-muted">
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-mint-deep underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          <p className="mt-3">
            © {new Date().getFullYear()} Mint &amp; Co ·{" "}
            <Link href="/privacy" className="underline-offset-4 hover:underline">
              Privacy
            </Link>
          </p>
          <p className="mt-1 text-muted">Designed &amp; built by us.</p>
        </div>
      </div>
    </footer>
  );
}
