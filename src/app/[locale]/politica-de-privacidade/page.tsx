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
    namespace: "privacy",
    path: "/politica-de-privacidade",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <Section background="white" className="pt-28">
      <Card hover={false} className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-800">{t("title")}</h1>
        <p className="mt-2 text-sm text-neutral-500">{t("lastUpdated")}</p>
        <div className="mt-8 space-y-4 text-neutral-700">
          <p>{t("content")}</p>
          <p>
            {locale === "pt"
              ? "Dados coletados: nome, e-mail, WhatsApp e mensagens enviadas via formulário. Utilizamos esses dados exclusivamente para responder seu contato e prestar nossos serviços."
              : "Data collected: name, email, WhatsApp, and messages sent via form. We use this data exclusively to respond to your contact and provide our services."}
          </p>
          <p>
            {locale === "pt"
              ? "Você pode revogar seu consentimento a qualquer momento entrando em contato pelo e-mail informado no site."
              : "You may revoke your consent at any time by contacting us via the email provided on the website."}
          </p>
        </div>
      </Card>
    </Section>
  );
}
