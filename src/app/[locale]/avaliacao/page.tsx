import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { AssessmentForm } from "@/components/forms/AssessmentForm";
import { generatePageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "assessment",
    path: "/avaliacao",
  });
}

export default async function AssessmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("assessment");

  return (
    <Section background="gradient" className="pt-28">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <AssessmentForm locale={locale as "pt" | "en"} />
    </Section>
  );
}
