import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-sage-600">404</h1>
      <p className="mt-4 text-xl text-neutral-600">{t("message")}</p>
      <Link
        href="/"
        className="mt-8 rounded-2xl bg-sage-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sage-700"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
