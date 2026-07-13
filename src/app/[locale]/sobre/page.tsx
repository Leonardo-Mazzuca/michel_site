import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { generatePageMetadata } from "@/lib/metadata";
import { CheckCircle } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "about",
    path: "/sobre",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const differentials = ["item1", "item2", "item3", "item4", "item5"] as const;

  return (
    <>
      <JsonLd locale={locale as "pt" | "en"} type="person" />
      <Section background="gradient" className="pt-28">
        <SectionHeader title={t("title")} />
      </Section>

      <Section background="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">
              {t("history.title")}
            </h2>
            <p className="mt-4 text-neutral-600">{t("history.p1")}</p>
            <p className="mt-4 text-neutral-600">{t("history.p2")}</p>
            <p className="mt-4 text-neutral-600">{t("history.p3")}</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/michele-eduardo.jpg"
              alt={t("title")}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Section background="soft">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <h2 className="text-xl font-bold text-sage-700">{t("mission.title")}</h2>
            <p className="mt-4 text-neutral-600">{t("mission.description")}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-bold text-sage-700">{t("vision.title")}</h2>
            <p className="mt-4 text-neutral-600">{t("vision.description")}</p>
          </Card>
        </div>
      </Section>

      <Section background="white">
        <h2 className="mb-8 text-2xl font-bold text-neutral-800">
          {t("differentials.title")}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {differentials.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-sage-600"
                aria-hidden="true"
              />
              <span className="text-neutral-700">{t(`differentials.${item}`)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="soft">
        <Card hover={false}>
          <h2 className="text-xl font-bold text-neutral-800">
            {t("education.title")}
          </h2>
          <p className="mt-4 text-neutral-600 italic">
            {t("education.placeholder")}
          </p>
        </Card>
      </Section>

      <CtaSection locale={locale as "pt" | "en"} />
    </>
  );
}
