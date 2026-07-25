import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import { type Locale } from "@/lib/seo";
import { ExternalLink } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: "contact",
    path: "/contato",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <Section background="gradient" className="pt-28">
      <Breadcrumbs
        locale={typedLocale}
        items={[
          { name: tNav("home"), path: "" },
          { name: tNav("contact"), path: "/contato" },
        ]}
        className="mb-8"
      />
      <SectionHeader title={t("title")} subtitle={t("subtitle")} as="h1" />

      <div className="mx-auto grid max-w-2xl gap-6">
        <Card hover={false} className="text-center">
          <h2 className="text-xl font-bold text-neutral-800">
            {t("whatsappTitle")}
          </h2>
          <p className="mt-3 text-neutral-600">{t("whatsappDescription")}</p>
          <div className="mt-6">
            <WhatsAppButton locale={typedLocale} size="lg">
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
            aria-label={`${siteConfig.lifeUp.name} — ${siteConfig.lifeUp.display}`}
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
