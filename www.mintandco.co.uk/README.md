# www.mintandco.co.uk — static snapshot

A full static export of the Mint & Co site (all pages: home, services, process, about, privacy, plus 404, sitemap.xml, robots.txt, and the generated OG/icon images). Generated from the Next.js source in this repo.

## How to preview it

The pages use absolute asset paths (`/_next/...`), so **opening `index.html` by double-clicking will not load styles** — it must be served over HTTP. Any static server works:

```bash
npx serve www.mintandco.co.uk
# or
python -m http.server 8000 --directory www.mintandco.co.uk
```

Then open the printed URL. This folder can also be dropped onto any static host (Netlify, GitHub Pages, S3, Nginx) as-is.

## How it was generated

From the repo root:

```bash
EXPORT=true npm run build
```

(The `EXPORT=true` flag is what switches the build into static-export mode; the normal `npm run build` still produces the standard server build for Vercel, with security headers intact.)

## Note

This is a point-in-time copy. Re-run the export command above to refresh it after any site change. Security headers (HSTS, X-Frame-Options, etc.) are applied by the host in the live deployment and are **not** part of this static snapshot.
