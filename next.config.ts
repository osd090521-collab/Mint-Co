import type { NextConfig } from "next";

// Static-export mode is toggled with EXPORT=true (used to generate the
// www.mintandco.co.uk static snapshot). Security headers require a server,
// so they only apply to the normal (Vercel) build, not the static export.
const isExport = process.env.EXPORT === "true";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = isExport
  ? { output: "export", trailingSlash: true }
  : {
      async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
      },
    };

export default nextConfig;
