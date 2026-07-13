"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getWhatsAppUrl, getWhatsAppMessages } from "@/lib/whatsapp";
import { Card } from "@/components/ui/Card";

interface ContactFormProps {
  locale: "pt" | "en";
}

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const messages = getWhatsAppMessages(locale);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;

    const text = `${messages.contact}\n\n${locale === "pt" ? "Nome" : "Name"}: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.phone}\n\n${form.message}`;
    window.open(getWhatsAppUrl(text), "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="text-center">
        <p className="text-lg text-sage-700">{t("success")}</p>
        <div className="mt-6">
          <WhatsAppButton locale={locale} message={messages.contact}>
            {t("whatsappButton")}
          </WhatsAppButton>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
          {t("name")} *
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
          {t("email")} *
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
          {t("phone")} *
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
          {t("message")} *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
        />
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded text-sage-600 focus:ring-sage-500"
          required
        />
        <span className="text-sm text-neutral-600">{t("consent")}</span>
      </label>

      <button
        type="submit"
        disabled={!form.consent}
        className="w-full rounded-2xl bg-sage-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t("send")}
      </button>
    </form>
  );
}
