import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/new-patients",
    "/reviews",
    "/contact",
    "/emergency-dentist-san-jose",
    "/sedation-dentistry-san-jose",
    "/dental-implants-san-jose",
    "/cosmetic-dentist-san-jose",
    "/family-dentist-san-jose",
    "/restorative-dentistry-san-jose",
    "/privacy",
    "/accessibility",
    "/website-disclaimer",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
