import Link from "next/link";
import { LogoLockup } from "./compass";
import { site } from "../site.config";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

const connectLinks = [
  { href: site.gbpUrl, label: "Find us on Google" },
  { href: site.instagramUrl, label: "Instagram" },
].filter((link) => link.href);

/** Shared footer — extra bottom clearance on mobile for the sticky CTA. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-warm">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-5 pb-28 pt-12 text-center sm:gap-8 sm:py-12">
        <div className="flex flex-col items-center">
          <LogoLockup markSize={42} />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Mint &amp; Co — a three-person studio by Omar, David and
            Rodrick. {site.location}.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
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
        {connectLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {connectLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-mint-deep underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        <div className="text-sm text-muted">
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-mint-deep underline underline-offset-4"
          >
            {site.email}
          </a>
          <p className="mt-3">
            © {new Date().getFullYear()} Mint &amp; Co ·{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy
            </Link>
          </p>
          <p className="mt-1 text-muted">Designed &amp; built by us.</p>
        </div>
      </div>
    </footer>
  );
}
