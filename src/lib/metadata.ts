import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata, type Locale } from "@/lib/seo";

interface PageMetadataOptions {
  locale: Locale;
  titleKey?: string;
  descriptionKey?: string;
  keywordsKey?: string;
  namespace?: string;
  path?: string;
}

export async function generatePageMetadata({
  locale,
  titleKey = "metaTitle",
  descriptionKey = "metaDescription",
  keywordsKey = "metaKeywords",
  namespace = "metadata",
  path = "",
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations(namespace);
  const title = t(titleKey);
  const description = t(descriptionKey);
  const keywordsRaw = t(keywordsKey);
  const keywords = keywordsRaw.split(",").map((keyword) => keyword.trim());

  return buildPageMetadata({
    locale,
    title,
    description,
    keywords,
    path,
  });
}

export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.seo.siteName,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.seo.organizationName,
  icons: {
    icon: [
      { url: "/images/brand/lifeup-icon.png", type: "image/png", sizes: "512x512" },
      { url: "/images/brand/lifeup-icon.png", type: "image/png", sizes: "192x192" },
      { url: "/images/brand/lifeup-icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/images/brand/lifeup-icon.png", type: "image/png", sizes: "180x180" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.seo.siteName,
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};
