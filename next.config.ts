import type { NextConfig } from "next";

// GITHUB_PAGES=true → static export served from https://<user>.github.io/Strat-case-AE/
// Otherwise (local dev, Vercel) → normal Next.js build at the domain root.
const pages = process.env.GITHUB_PAGES === "true";
const base = pages ? "/Strat-case-AE" : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: pages ? "export" : undefined,
  basePath: base,
  trailingSlash: pages,
  images: { unoptimized: pages, formats: ["image/avif", "image/webp"] },
  env: { NEXT_PUBLIC_BASE_PATH: base },
  ...(pages
    ? {}
    : {
        async redirects() {
          return [{ source: "/", destination: "/p/PW-21-048172", permanent: false }];
        },
      }),
};

export default nextConfig;
