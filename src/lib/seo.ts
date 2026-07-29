import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export type Locale = "pt" | "en";

export const OG_IMAGE = {
  url: "/images/og-lifeup.jpg",
  width: 1200,
  height: 630,
  alt: "Life UP! Fitness & Wellness — Coach Michel",
} as const;

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}${normalized}`;
}

export function buildAlternateLanguages(path = "") {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";

  return {
    pt: absoluteUrl(`/pt${normalized}`),
    en: absoluteUrl(`/en${normalized}`),
    "x-default": absoluteUrl(`/pt${normalized}`),
  };
}

export function buildOpenGraph({
  locale,
  title,
  description,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
  images,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  images?: Metadata["openGraph"] extends { images?: infer I } ? I : never;
}): NonNullable<Metadata["openGraph"]> {
  const url = absoluteUrl(localePath(locale, path));

  return {
    title,
    description,
    url,
    siteName: siteConfig.seo.siteName,
    locale: locale === "pt" ? "pt_BR" : "en_CA",
    alternateLocale: locale === "pt" ? ["en_CA"] : ["pt_BR"],
    type,
    ...(publishedTime ? { publishedTime } : {}),
    ...(modifiedTime ? { modifiedTime } : {}),
    images: images ?? [
      {
        url: absoluteUrl(OG_IMAGE.url),
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  };
}

export function buildTwitter({
  title,
  description,
}: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl(OG_IMAGE.url)],
  };
}

export function buildPageMetadata({
  locale,
  title,
  description,
  keywords,
  path = "",
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  locale: Locale;
  title: string;
  description: string;
  keywords: string[];
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const url = absoluteUrl(localePath(locale, path));

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(path),
    },
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      path,
      type,
      publishedTime,
      modifiedTime,
    }),
    twitter: buildTwitter({ title, description }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function getOrganizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.seo.organizationName,
    alternateName: siteConfig.seo.alternateNames,
    url: siteConfig.url,
    logo: absoluteUrl("/images/michele-eduardo.jpg"),
    image: absoluteUrl(OG_IMAGE.url),
    description:
      locale === "pt"
        ? siteConfig.seo.description.pt
        : siteConfig.seo.description.en,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    sameAs: [siteConfig.lifeUp.url],
    areaServed: {
      "@type": "Country",
      name: locale === "pt" ? "Canadá" : "Canada",
    },
  };
}

export function getPersonSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.seo.alternateNames,
    jobTitle: locale === "pt" ? siteConfig.seo.jobTitle.pt : siteConfig.seo.jobTitle.en,
    url: siteConfig.url,
    image: absoluteUrl("/images/michele-eduardo.jpg"),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.seo.organizationName,
      url: siteConfig.url,
    },
    sameAs: [siteConfig.lifeUp.url],
    knowsAbout:
      locale === "pt"
        ? [
            "Saúde Funcional",
            "Nutrição Funcional",
            "Longevidade",
            "Bem-estar",
            "Performance",
          ]
        : [
            "Functional Health",
            "Functional Nutrition",
            "Longevity",
            "Well-being",
            "Performance",
          ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  };
}

export function getWebsiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.seo.siteName,
    alternateName: siteConfig.seo.alternateNames,
    url: absoluteUrl(localePath(locale)),
    description:
      locale === "pt"
        ? siteConfig.seo.description.pt
        : siteConfig.seo.description.en,
    inLanguage: locale === "pt" ? "pt-BR" : "en-CA",
    publisher: {
      "@type": "Organization",
      name: siteConfig.seo.organizationName,
      url: siteConfig.url,
    },
  };
}

export function getArticleSchema({
  locale,
  title,
  description,
  slug,
  datePublished,
  dateModified,
  keywords,
}: {
  locale: Locale;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: getPersonSchema(locale),
    publisher: {
      "@type": "Organization",
      name: siteConfig.seo.organizationName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/michele-eduardo.jpg"),
      },
    },
    mainEntityOfPage: absoluteUrl(localePath(locale, `/blog/${slug}`)),
    image: absoluteUrl(OG_IMAGE.url),
    keywords: keywords.join(", "),
    inLanguage: locale === "pt" ? "pt-BR" : "en-CA",
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbSchema(locale: Locale, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}
