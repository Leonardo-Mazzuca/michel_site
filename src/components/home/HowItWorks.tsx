import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { MessageCircle, ClipboardList, TrendingUp } from "lucide-react";

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  const steps = [
    { key: "step1", icon: MessageCircle, number: "01" },
    { key: "step2", icon: ClipboardList, number: "02" },
    { key: "step3", icon: TrendingUp, number: "03" },
  ] as const;

  return (
    <Section background="soft">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map(({ key, icon: Icon, number }) => (
          <div key={key} className="relative text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </div>
            <span className="text-sm font-bold text-sage-400">{number}</span>
            <h3 className="mt-2 text-xl font-semibold text-neutral-800">
              {t(`${key}.title`)}
            </h3>
            <p className="mt-3 text-neutral-600">{t(`${key}.description`)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
