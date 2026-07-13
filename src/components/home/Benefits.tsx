import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Zap, Heart, Sparkles, Leaf } from "lucide-react";

export async function Benefits() {
  const t = await getTranslations("benefits");

  const items = [
    { key: "energy", icon: Zap, color: "text-amber-500 bg-amber-50" },
    { key: "autonomy", icon: Heart, color: "text-rose-500 bg-rose-50" },
    { key: "quality", icon: Sparkles, color: "text-sky-500 bg-sky-50" },
    { key: "habits", icon: Leaf, color: "text-sage-600 bg-sage-50" },
  ] as const;

  return (
    <Section background="white">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, icon: Icon, color }) => (
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
          </Card>
        ))}
      </div>
    </Section>
  );
}
