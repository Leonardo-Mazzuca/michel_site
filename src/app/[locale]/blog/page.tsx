import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { BlogList } from "@/components/blog/BlogList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/metadata";
import { type Locale } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: "blog",
    path: "/blog",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  return (
    <Section background="gradient" className="pt-28">
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { name: tNav("home"), path: "" },
          { name: tNav("blog"), path: "/blog" },
        ]}
        className="mb-8"
      />
      <SectionHeader title={t("title")} subtitle={t("subtitle")} as="h1" />
      <BlogList locale={typedLocale} />
    </Section>
  );
}
