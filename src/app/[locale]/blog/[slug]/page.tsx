import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import { siteConfig } from "@/lib/config";
import { ArrowLeft, Clock } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    ["pt", "en"].map((locale) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const content = post[locale as "pt" | "en"];
  const url = `${siteConfig.url}/${locale}/blog/${slug}`;

  return {
    title: content.title,
    description: content.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        pt: `${siteConfig.url}/pt/blog/${slug}`,
        en: `${siteConfig.url}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = post[locale as "pt" | "en"];
  const related = getRelatedPosts(slug, post.category);

  return (
    <>
      <JsonLd
        locale={locale as "pt" | "en"}
        type="article"
        article={{
          title: content.title,
          description: content.metaDescription,
          date: post.date,
          slug,
        }}
      />

      <Section background="gradient" className="pt-28">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-800"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("title")}
        </Link>

        <span className="inline-block rounded-full bg-sage-50 px-3 py-1 text-sm font-medium text-sage-700">
          {t(`categories.${post.category}`)}
        </span>

        <h1 className="mt-4 text-3xl font-bold text-neutral-800 md:text-4xl">
          {content.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(
              locale === "pt" ? "pt-BR" : "en-CA",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime} min
          </span>
        </div>

        <article className="prose prose-neutral mx-auto mt-10 max-w-3xl">
          {content.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4 text-lg leading-relaxed text-neutral-700">
              {paragraph}
            </p>
          ))}
        </article>
      </Section>

      {related.length > 0 && (
        <Section background="soft">
          <h2 className="mb-8 text-2xl font-bold text-neutral-800">
            {t("related")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => {
              const relContent = rel[locale as "pt" | "en"];
              return (
                <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                  <Card className="h-full">
                    <h3 className="text-lg font-semibold text-neutral-800">
                      {relContent.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-neutral-600">
                      {relContent.excerpt}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      <CtaSection locale={locale as "pt" | "en"} />
    </>
  );
}
