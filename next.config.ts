import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      {
        source: "/about_our_dental_office/:path*",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/dentist_reviews/:path*",
        destination: "/reviews",
        permanent: true,
      },
      {
        source: "/sedation_dentistry_services/:path*",
        destination: "/sedation-dentistry-san-jose",
        permanent: true,
      },
      {
        source: "/dental_emergency_services/:path*",
        destination: "/emergency-dentist-san-jose",
        permanent: true,
      },
      {
        source: "/replace_missing_teeth_services/:path*",
        destination: "/dental-implants-san-jose",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
