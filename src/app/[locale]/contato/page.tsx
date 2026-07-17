import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import { ExternalLink } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as "pt" | "en",
    namespace: "contact",
    path: "/contato",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section background="gradient" className="pt-28">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto grid max-w-2xl gap-6">
        <Card hover={false} className="text-center">
          <h2 className="text-xl font-bold text-neutral-800">
            {t("whatsappTitle")}
          </h2>
          <p className="mt-3 text-neutral-600">{t("whatsappDescription")}</p>
          <div className="mt-6">
            <WhatsAppButton locale={locale as "pt" | "en"} size="lg">
              {t("whatsappButton")}
            </WhatsAppButton>
          </div>
        </Card>

        <Card hover={false} className="text-center">
          <h2 className="text-xl font-bold text-neutral-800">
            {siteConfig.lifeUp.name}
          </h2>
          <p className="mt-3 text-neutral-600">{t("lifeUpDescription")}</p>
          <a
            href={siteConfig.lifeUp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-sage-600 px-8 py-4 text-lg font-semibold text-sage-700 transition-all duration-300 hover:bg-sage-50"
          >
            {siteConfig.lifeUp.display}
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </Card>
      </div>
    </Section>
  );
}
