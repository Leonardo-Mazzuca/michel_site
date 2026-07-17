import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { siteConfig } from "@/lib/config";

export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <Section background="white">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <Card hover={false} className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full shadow-md">
            <Image
              src="/images/michele-eduardo.jpg"
              alt={siteConfig.name}
              fill
              className="object-cover object-top"
              sizes="96px"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-sage-600">
              {t("featuredTitle")}
            </p>
            <p className="mt-1 font-semibold text-neutral-800">{siteConfig.name}</p>
          </div>
        </div>

        <blockquote className="mt-8 space-y-4 text-neutral-700 leading-relaxed">
          {t("featuredContent")
            .split("\n\n")
            .map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
        </blockquote>
      </Card>
    </Section>
  );
}
