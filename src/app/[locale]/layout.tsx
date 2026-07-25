import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { rootSiteMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  ...rootSiteMetadata,
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: siteConfig.seo.themeColor,
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === "pt" ? "pt-BR" : "en-CA"} className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale as "pt" | "en"} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale as "pt" | "en"} />
          <WhatsAppFloat locale={locale as "pt" | "en"} />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
