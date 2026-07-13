import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/config";

type Locale = "pt" | "en";

interface PageMetadataOptions {
  locale: Locale;
  titleKey?: string;
  descriptionKey?: string;
  namespace?: string;
  path?: string;
}

export async function generatePageMetadata({
  locale,
  titleKey = "metaTitle",
  descriptionKey = "metaDescription",
  namespace = "metadata",
  path = "",
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations(namespace);
  const title = t(titleKey);
  const description = t(descriptionKey);
  const url = `${siteConfig.url}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        pt: `${siteConfig.url}/pt${path}`,
        en: `${siteConfig.url}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
