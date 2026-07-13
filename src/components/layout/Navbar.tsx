"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", key: "home" },
  { href: "/sobre", key: "about" },
  { href: "/saude-funcional", key: "functionalHealth" },
  { href: "/programas", key: "programs" },
  { href: "/blog", key: "blog" },
  { href: "/avaliacao", key: "assessment" },
  { href: "/contato", key: "contact" },
] as const;

interface NavbarProps {
  locale: "pt" | "en";
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = locale === "pt" ? "en" : "pt";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label={locale === "pt" ? "Navegação principal" : "Main navigation"}
      >
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-sage-700">
            {siteConfig.name}
          </span>
          <span className="text-xs text-neutral-500">
            {siteConfig.tagline[locale]}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-sage-50 hover:text-sage-700 ${
                  pathname === item.href
                    ? "text-sage-700"
                    : "text-neutral-600"
                }`}
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={pathname}
            locale={switchLocale}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-sage-300 hover:text-sage-700"
            aria-label={t("language")}
          >
            {switchLocale.toUpperCase()}
          </Link>
          <WhatsAppButton locale={locale} size="sm">
            {t("whatsapp")}
          </WhatsAppButton>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? t("menuClose") : t("menuOpen")}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    pathname === item.href
                      ? "bg-sage-50 text-sage-700"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href={pathname}
              locale={switchLocale}
              onClick={() => setOpen(false)}
              className="rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium text-neutral-600"
            >
              {t("language")}: {switchLocale.toUpperCase()}
            </Link>
            <WhatsAppButton locale={locale} className="w-full">
              {t("whatsapp")}
            </WhatsAppButton>
          </div>
        </div>
      )}
    </header>
  );
}
