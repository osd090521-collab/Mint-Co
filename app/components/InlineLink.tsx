import Link from "next/link";

/**
 * Shared inline-link treatment — one class string instead of the ~15
 * hand-copied instances of `font-medium text-mint-deep underline
 * underline-offset-4` that had drifted across the site. The underline is
 * always on (never hover-only): a hover-only underline was the one
 * accessibility regression on /privacy — this makes that mistake impossible
 * to reintroduce, because it isn't a class you can partially copy.
 *
 * Renders next/link for internal paths (starting with "/"), a plain <a>
 * otherwise (mailto:, tel:, https://wa.me/, external URLs). Pass `external`
 * for links that should open in a new tab.
 */
export function InlineLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `font-medium text-mint-deep underline underline-offset-4 ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
