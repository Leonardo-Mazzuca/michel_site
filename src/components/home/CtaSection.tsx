import { getTranslations } from "next-intl/server";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Shield, Heart, Leaf, Sun } from "lucide-react";

interface CtaSectionProps {
  locale: "pt" | "en";
}

export async function CtaSection({ locale }: CtaSectionProps) {
  const t = await getTranslations("cta");
  const tTrust = await getTranslations("trust");

  const trustItems = [
    { key: "humanized", icon: Heart },
    { key: "prevention", icon: Shield },
    { key: "sustainable", icon: Leaf },
    { key: "quality", icon: Sun },
  ] as const;

  return (
    <section className="bg-gradient-to-br from-sage-600 to-sage-700 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-sage-100">{t("subtitle")}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {trustItems.map(({ key, icon: Icon }) => (
            <span
              key={key}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tTrust(key)}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <WhatsAppButton locale={locale} size="lg" className="!bg-white !text-sage-700 hover:!bg-sage-50">
            {t("button")}
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
