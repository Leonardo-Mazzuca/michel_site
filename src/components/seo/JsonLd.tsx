import { siteConfig } from "@/lib/config";

interface JsonLdProps {
  locale: "pt" | "en";
  type?: "website" | "article" | "person";
  article?: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };
}

export function JsonLd({ locale, type = "website", article }: JsonLdProps) {
  const baseUrl = siteConfig.url;

  let schema: Record<string, unknown>;

  if (type === "article" && article) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      author: {
        "@type": "Person",
        name: siteConfig.name,
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/michele-eduardo.jpg`,
        },
      },
      mainEntityOfPage: `${baseUrl}/${locale}/blog/${article.slug}`,
    };
  } else if (type === "person") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      jobTitle:
        locale === "pt" ? "Profissional de Saúde Funcional" : "Functional Health Professional",
      url: baseUrl,
      image: `${baseUrl}/images/michele-eduardo.jpg`,
      sameAs: [siteConfig.lifeUp.url],
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${siteConfig.name} - ${siteConfig.tagline[locale]}`,
      url: `${baseUrl}/${locale}`,
      description:
        locale === "pt"
          ? "Saúde Funcional personalizada no Canadá"
          : "Personalized Functional Health in Canada",
      inLanguage: locale === "pt" ? "pt-BR" : "en-CA",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
