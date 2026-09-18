import type { NextConfig } from "next";

/**
 * One config, two targets.
 *
 * Vercel (default): a normal Next build at the domain root, image optimizer on.
 * GitHub Pages (STATIC_EXPORT=true): a fully static export served from a
 * repository subpath, so basePath/assetPrefix are set and the optimizer — which
 * needs a server — is turned off.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

// Lets a second dev server run beside another one in this folder: Next locks
// its build directory, so each server needs its own.
const distDir = process.env.NEXT_DIST_DIR;

const nextConfig: NextConfig = {
  ...(distDir ? { distDir } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] as const },
      }),
};

export default nextConfig;
