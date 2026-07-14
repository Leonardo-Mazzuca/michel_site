import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/config";
import { InstagramLinks } from "@/components/ui/InstagramLinks";
import { Mail, MapPin } from "lucide-react";

interface FooterProps {
  locale: "pt" | "en";
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const navLinks = [
    { href: "/", label: tNav("home") },
    { href: "/sobre", label: tNav("about") },
    { href: "/saude-funcional", label: tNav("functionalHealth") },
    { href: "/programas", label: tNav("programs") },
    { href: "/blog", label: tNav("blog") },
    { href: "/avaliacao", label: tNav("assessment") },
    { href: "/contato", label: tNav("contact") },
  ];

  return (
    <footer className="border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-sage-700">
              {siteConfig.name}
            </h3>
            <p className="mt-3 max-w-md text-neutral-600">{t("description")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="h-4 w-4 text-sage-600" aria-hidden="true" />
              {siteConfig.address[locale]}
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 flex items-center gap-2 text-sm text-neutral-600 hover:text-sage-700"
            >
              <Mail className="h-4 w-4 text-sage-600" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <InstagramLinks locale={locale} className="mt-2" />
          </div>

          <div>
            <h4 className="font-semibold text-neutral-800">{t("navigation")}</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-sage-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-800">{t("legal")}</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-sm text-neutral-600 transition-colors hover:text-sage-700"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-de-uso"
                  className="text-sm text-neutral-600 transition-colors hover:text-sage-700"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
