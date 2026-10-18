import type { NextConfig } from "next";

// Every page is prerendered, so the site ships as a static export (out/) that
// Netlify serves directly. Legacy redirects live in netlify.toml.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Tooth X-Ray frames are pre-compressed WebP in public/images.
    unoptimized: true,
  },
};

export default nextConfig;
