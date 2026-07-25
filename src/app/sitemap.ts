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

function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency:
        page === "" || page === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.8,
      alternates: buildAlternates(page),
    }))
  );

  const blogEntries = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.modifiedDate ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: buildAlternates(`/blog/${post.slug}`),
    }))
  );

  return [...staticEntries, ...blogEntries];
}
