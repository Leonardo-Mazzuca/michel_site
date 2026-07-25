import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { generatePageMetadata } from "@/lib/metadata";
import {
  getOrganizationSchema,
  getPersonSchema,
  getWebsiteSchema,
  type Locale,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: "metadata",
    path: "",
    titleKey: "title",
    descriptionKey: "description",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;

  return (
    <>
      <JsonLdGraph
        schemas={[
          getWebsiteSchema(typedLocale),
          getOrganizationSchema(typedLocale),
          getPersonSchema(typedLocale),
        ]}
      />
      <Hero locale={typedLocale} />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <CtaSection locale={typedLocale} />
    </>
  );
}
