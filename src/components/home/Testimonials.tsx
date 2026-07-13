import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";

export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <Section background="white">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <Card hover={false} className="mx-auto max-w-2xl text-center">
        <Quote
          className="mx-auto mb-4 h-10 w-10 text-sage-300"
          aria-hidden="true"
        />
        <p className="text-lg italic text-neutral-600">{t("placeholder")}</p>
        <div className="mt-6 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-16 rounded-full bg-neutral-100"
              aria-hidden="true"
            />
          ))}
        </div>
      </Card>
    </Section>
  );
}
