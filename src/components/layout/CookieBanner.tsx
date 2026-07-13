"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-neutral-200 bg-white p-4 shadow-2xl md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-2xl md:border"
    >
      <p className="text-sm text-neutral-600">
        {t("message")}{" "}
        <Link
          href="/politica-de-privacidade"
          className="font-medium text-sage-700 underline hover:text-sage-800"
        >
          {locale === "pt" ? "Política de Privacidade" : "Privacy Policy"}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 rounded-xl bg-sage-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage-700"
        >
          {t("accept")}
        </button>
        <button
          type="button"
          onClick={handleDecline}
          className="flex-1 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          {t("decline")}
        </button>
      </div>
    </div>
  );
}
