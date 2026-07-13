import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaSection } from "@/components/home/CtaSection";
import { generatePageMetadata } from "@/lib/metadata";
import {
  Activity,
  Moon,
  Apple,
  Brain,
  Wind,
  Sparkles,
  TreePine,
  Target,
  Users,
} from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "functionalHealth",
    path: "/saude-funcional",
  });
}

const pillars = [
  { key: "movement", icon: Activity, color: "bg-amber-50 text-amber-600" },
  { key: "sleep", icon: Moon, color: "bg-indigo-50 text-indigo-600" },
  { key: "nutrition", icon: Apple, color: "bg-green-50 text-green-600" },
  { key: "mentalHealth", icon: Brain, color: "bg-purple-50 text-purple-600" },
  { key: "breathing", icon: Wind, color: "bg-sky-50 text-sky-600" },
  { key: "spirituality", icon: Sparkles, color: "bg-rose-50 text-rose-600" },
  { key: "nature", icon: TreePine, color: "bg-emerald-50 text-emerald-600" },
  { key: "purpose", icon: Target, color: "bg-orange-50 text-orange-600" },
  { key: "social", icon: Users, color: "bg-blue-50 text-blue-600" },
] as const;

export default async function FunctionalHealthPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("functionalHealth");

  return (
    <>
      <Section background="gradient" className="pt-28">
        <SectionHeader title={t("title")} />
        <p className="mx-auto max-w-3xl text-center text-lg text-neutral-600">
          {t("intro")}
        </p>
      </Section>

      <Section background="white">
        <SectionHeader
          title={t("pillarsTitle")}
          subtitle={t("pillarsSubtitle")}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ key, icon: Icon, color }) => (
            <Card key={key}>
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${color}`}
                aria-hidden="true"
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2 text-neutral-600">{t(`${key}.description`)}</p>
              <p className="mt-3 text-sm">
                <span className="font-semibold text-sage-700">
                  {t("benefitLabel")}:
                </span>{" "}
                <span className="text-neutral-600">{t(`${key}.benefit`)}</span>
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection locale={locale as "pt" | "en"} />
    </>
  );
}
