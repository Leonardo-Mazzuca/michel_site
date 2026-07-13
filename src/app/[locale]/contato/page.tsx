import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generatePageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Clock, MapPin } from "lucide-react";

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

      <div className="grid gap-10 lg:grid-cols-2">
        <Card hover={false}>
          <h2 className="text-xl font-bold text-neutral-800">
            {locale === "pt" ? "Envie uma mensagem" : "Send a message"}
          </h2>
          <div className="mt-6">
            <ContactForm locale={locale as "pt" | "en"} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card hover={false}>
            <WhatsAppButton
              locale={locale as "pt" | "en"}
              size="lg"
              className="w-full"
            >
              {t("whatsappButton")}
            </WhatsAppButton>
          </Card>

          <Card hover={false}>
            <h3 className="flex items-center gap-2 font-semibold text-neutral-800">
              <Clock className="h-5 w-5 text-sage-600" aria-hidden="true" />
              {t("hours")}
            </h3>
            <p className="mt-2 text-neutral-600">{siteConfig.hours[locale as "pt" | "en"]}</p>
          </Card>

          <Card hover={false}>
            <h3 className="font-semibold text-neutral-800">{t("social")}</h3>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sage-700 hover:text-sage-800"
            >
              <InstagramIcon className="h-5 w-5" />
              @personalmicheleduardo
            </a>
          </Card>

          <Card hover={false}>
            <h3 className="flex items-center gap-2 font-semibold text-neutral-800">
              <MapPin className="h-5 w-5 text-sage-600" aria-hidden="true" />
              {t("mapTitle")}
            </h3>
            <p className="mt-2 text-neutral-600">
              {siteConfig.address[locale as "pt" | "en"]}
            </p>
            <div
              className="mt-4 flex h-48 items-center justify-center rounded-xl bg-neutral-100 text-neutral-400"
              role="img"
              aria-label={t("mapPlaceholder")}
            >
              {t("mapPlaceholder")}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
