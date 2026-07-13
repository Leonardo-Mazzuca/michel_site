"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { blogPosts, type BlogCategory } from "@/data/blog";
import { Card } from "@/components/ui/Card";
import { Search } from "lucide-react";

interface BlogListProps {
  locale: "pt" | "en";
}

export function BlogList({ locale }: BlogListProps) {
  const t = useTranslations("blog");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BlogCategory | "all">("all");

  const categories = useMemo(() => {
    const cats = [...new Set(blogPosts.map((p) => p.category))];
    return cats;
  }, []);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const content = post[locale];
      const matchesSearch =
        search === "" ||
        content.title.toLowerCase().includes(search.toLowerCase()) ||
        content.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || post.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category, locale]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-neutral-200 py-3 pl-12 pr-4 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
            aria-label={t("search")}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === "all"
                ? "bg-sage-600 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {t("allCategories")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-sage-600 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-neutral-500">{t("noResults")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const content = post[locale];
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full">
                  <span className="inline-block rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-700">
                    {t(`categories.${post.category}`)}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-neutral-800">
                    {content.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-neutral-600">
                    {content.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-sage-700">
                    {t("readMore")} →
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
