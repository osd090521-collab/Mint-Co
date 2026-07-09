import Link from "next/link";
import { LogoLockup } from "./compass";
import { auditWhatsApp, site } from "../site.config";
import {
  EmailIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
  iconLinkClass,
} from "./icons";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

/** Shared footer — extra bottom clearance on mobile for the sticky CTA. */
export function Footer() {
  const whatsApp = auditWhatsApp();

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
        <div className="flex flex-wrap justify-center gap-3">
          <a href={`mailto:${site.email}`} aria-label="Email us" title="Email us" className={iconLinkClass}>
            <EmailIcon />
          </a>
          {site.phone && (
            <a href={`tel:${site.phone}`} aria-label="Call us" title="Call us" className={iconLinkClass}>
              <PhoneIcon />
            </a>
          )}
          {whatsApp && (
            <a href={whatsApp} aria-label="Message us on WhatsApp" title="WhatsApp" className={iconLinkClass}>
              <WhatsAppIcon />
            </a>
          )}
          {site.instagramUrl && (
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find us on Instagram"
              title="Instagram"
              className={iconLinkClass}
            >
              <InstagramIcon />
            </a>
          )}
          {site.gbpUrl && (
            <a
              href={site.gbpUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find us on Google"
              title="Find us on Google"
              className={iconLinkClass}
            >
              <PinIcon />
            </a>
          )}
        </div>
        <div className="text-sm text-muted">
          <p>
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
