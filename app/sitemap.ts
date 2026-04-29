import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/content/products";

const BASE = "https://crystal-forest.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/collection`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...getProductSlugs().map((slug) => ({
      url: `${BASE}/products/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
