import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { generatePageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "terms",
    path: "/termos-de-uso",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <Section background="white" className="pt-28">
      <Card hover={false} className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-800">{t("title")}</h1>
        <p className="mt-2 text-sm text-neutral-500">{t("lastUpdated")}</p>
        <div className="mt-8 space-y-4 text-neutral-700">
          <p>{t("content")}</p>
          <p>
            {locale === "pt"
              ? "O conteúdo deste site tem caráter informativo e educativo. Não substitui avaliação, diagnóstico ou tratamento por profissionais de saúde qualificados."
              : "The content on this website is informational and educational. It does not replace evaluation, diagnosis, or treatment by qualified health professionals."}
          </p>
        </div>
      </Card>
    </Section>
  );
}
