import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CtaSection } from "@/components/home/CtaSection";
import { generatePageMetadata } from "@/lib/metadata";
import { getWhatsAppMessages } from "@/lib/whatsapp";
import { Users } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "programs",
    path: "/programas",
  });
}

const programs = ["vitalidade", "longevidade", "familia", "prevencao"] as const;

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");
  const messages = getWhatsAppMessages(locale as "pt" | "en");

  return (
    <>
      <Section background="gradient" className="pt-28">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      </Section>

      <Section background="white">
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <Card key={program} className="flex flex-col">
              <h3 className="text-xl font-bold text-neutral-800">
                {t(`${program}.title`)}
              </h3>
              <p className="mt-3 flex-1 text-neutral-600">
                {t(`${program}.description`)}
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <span className="font-semibold text-sage-700">
                    {locale === "pt" ? "Benefícios:" : "Benefits:"}
                  </span>{" "}
                  {t(`${program}.benefits`)}
                </p>
                <p className="flex items-start gap-2">
                  <Users
                    className="mt-0.5 h-4 w-4 shrink-0 text-sage-600"
                    aria-hidden="true"
                  />
                  {t(`${program}.audience`)}
                </p>
              </div>
              <div className="mt-6">
                <WhatsAppButton
                  locale={locale as "pt" | "en"}
                  message={`${messages.program} (${t(`${program}.title`)})`}
                >
                  {t("learnMore")}
                </WhatsAppButton>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection locale={locale as "pt" | "en"} />
    </>
  );
}
