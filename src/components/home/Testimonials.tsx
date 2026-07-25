import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { TestimonialCard } from "@/components/home/TestimonialCard";
import { TestimonialCardBody } from "@/components/home/TestimonialCardBody";
import { clientTestimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/config";

export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <Section background="soft" id="depoimentos">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {clientTestimonials.map(({ key, image, badge }) => (
          <TestimonialCard
            key={key}
            name={t(`items.${key}.name`)}
            meta={t(`items.${key}.meta`)}
            badge={badge ? t("items.marise.badge") : undefined}
            image={image}
            imageAlt={t(`items.${key}.imageAlt`)}
            excerpt={t(`items.${key}.excerpt`)}
            content={t(`items.${key}.content`)}
            readMore={t("readMore")}
            readLess={t("readLess")}
          />
        ))}
      </div>

      <Card hover={false} className="mx-auto mt-10 max-w-3xl overflow-hidden p-0 md:mt-12">
        <div className="flex flex-col items-center gap-6 border-b border-neutral-100 bg-white p-6 sm:flex-row sm:items-start md:p-8">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-md md:h-24 md:w-24">
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

        <TestimonialCardBody
          excerpt={t("featuredExcerpt")}
          content={t("featuredContent")}
          readMore={t("readMore")}
          readLess={t("readLess")}
        />
      </Card>
    </Section>
  );
}
