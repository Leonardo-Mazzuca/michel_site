import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const url = `${siteConfig.url}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: url,
      languages: {
        pt: `${siteConfig.url}/pt`,
        en: `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      siteName: siteConfig.name,
      locale: locale === "pt" ? "pt_BR" : "en_CA",
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/images/michele-eduardo.jpg`,
          width: 800,
          height: 1000,
          alt: siteConfig.name,
        },
      ],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale as "pt" | "en"} type="website" />
      <JsonLd locale={locale as "pt" | "en"} type="person" />
      <Hero locale={locale as "pt" | "en"} />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <CtaSection locale={locale as "pt" | "en"} />
    </>
  );
}
