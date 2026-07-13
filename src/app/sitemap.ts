import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/lib/config";

const locales = ["pt", "en"] as const;

const staticPages = [
  "",
  "/sobre",
  "/saude-funcional",
  "/programas",
  "/avaliacao",
  "/blog",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-uso",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" || page === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
