import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/home/CtaSection";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blog";
import {
  buildPageMetadata,
  getArticleSchema,
  getPersonSchema,
  type Locale,
} from "@/lib/seo";
import { Clock } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    ["pt", "en"].map((locale) => ({ locale, slug: post.slug }))
  );
}

function getBlogKeywords(locale: Locale, category: string): string[] {
  const shared =
    locale === "pt"
      ? ["Coach Michel", "Saúde Funcional", "Nutrição Funcional", "Canadá", "bem-estar"]
      : ["Coach Michel", "Functional Health", "Functional Nutrition", "Canada", "well-being"];

  const categoryKeywords: Record<string, string[]> =
    locale === "pt"
      ? {
          functionalHealth: ["longevidade", "inflamação"],
          sleep: ["sono", "recuperação"],
          nutrition: ["nutrição funcional", "saúde intestinal", "anti-inflamatório"],
          exercise: ["performance", "movimento"],
          aging: ["longevidade", "envelhecimento saudável"],
          womensHealth: ["mulheres 40+", "bem-estar"],
          breathing: ["respiração", "saúde mental"],
        }
      : {
          functionalHealth: ["longevity", "inflammation"],
          sleep: ["sleep", "recovery"],
          nutrition: ["gut health", "anti-inflammatory"],
          exercise: ["performance", "movement"],
          aging: ["healthy aging", "longevity"],
          womensHealth: ["women 40+", "well-being"],
          breathing: ["breathing", "mental health"],
        };

  return [...shared, ...(categoryKeywords[category] ?? [])];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const typedLocale = locale as Locale;
  const content = post[typedLocale];
  const modifiedTime = post.modifiedDate ?? post.date;

  return buildPageMetadata({
    locale: typedLocale,
    title: `${content.title} | Coach Michel`,
    description: content.metaDescription,
    keywords: getBlogKeywords(typedLocale, post.category),
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = post[typedLocale];
  const related = getRelatedPosts(slug, post.category);
  const modifiedTime = post.modifiedDate ?? post.date;
  const keywords = getBlogKeywords(typedLocale, post.category);

  return (
    <>
      <JsonLdGraph
        schemas={[
          getArticleSchema({
            locale: typedLocale,
            title: content.title,
            description: content.metaDescription,
            slug,
            datePublished: post.date,
            dateModified: modifiedTime,
            keywords,
          }),
          getPersonSchema(typedLocale),
        ]}
      />

      <Section background="gradient" className="pt-28">
        <Breadcrumbs
          locale={typedLocale}
          items={[
            { name: tNav("home"), path: "" },
            { name: tNav("blog"), path: "/blog" },
            { name: content.title, path: `/blog/${slug}` },
          ]}
          className="mb-8"
        />

        <span className="inline-block rounded-full bg-sage-50 px-3 py-1 text-sm font-medium text-sage-700">
          {t(`categories.${post.category}`)}
        </span>

        <h1 className="mt-4 text-3xl font-bold text-neutral-800 md:text-4xl">
          {content.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(
              typedLocale === "pt" ? "pt-BR" : "en-CA",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime} min
          </span>
        </div>

        <article className="prose prose-neutral mx-auto mt-10 max-w-3xl">
          {content.content.split("\n\n").map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mb-4 text-lg leading-relaxed text-neutral-700"
            >
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
              const relContent = rel[typedLocale];
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

      <CtaSection locale={typedLocale} />
    </>
  );
}
