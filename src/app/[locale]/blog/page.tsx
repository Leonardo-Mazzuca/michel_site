import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { BlogList } from "@/components/blog/BlogList";
import { generatePageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "blog",
    path: "/blog",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <Section background="gradient" className="pt-28">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <BlogList locale={locale as "pt" | "en"} />
    </Section>
  );
}
