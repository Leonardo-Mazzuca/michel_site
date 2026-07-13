"use client";

import { useTranslations } from "next-intl";
import { getWhatsAppUrl, getWhatsAppMessages } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface WhatsAppFloatProps {
  locale: "pt" | "en";
}

export function WhatsAppFloat({ locale }: WhatsAppFloatProps) {
  const t = useTranslations("nav");
  const messages = getWhatsAppMessages(locale);
  const url = getWhatsAppUrl(messages.default);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#1fb855] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] md:bottom-8 md:right-8"
      aria-label={t("whatsapp")}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
