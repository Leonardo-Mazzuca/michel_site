"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getWhatsAppMessages } from "@/lib/whatsapp";
import { Card } from "@/components/ui/Card";

interface AssessmentFormProps {
  locale: "pt" | "en";
}

type ScoreValue = 4 | 3 | 2 | 1;

const ratingOptions: { value: ScoreValue; key: string }[] = [
  { value: 4, key: "excellent" },
  { value: 3, key: "good" },
  { value: 2, key: "fair" },
  { value: 1, key: "poor" },
];

const exerciseOptions: { value: ScoreValue; key: string }[] = [
  { value: 4, key: "yes" },
  { value: 2, key: "sometimes" },
  { value: 1, key: "no" },
];

export function AssessmentForm({ locale }: AssessmentFormProps) {
  const t = useTranslations("assessment");
  const [answers, setAnswers] = useState<Record<string, ScoreValue | null>>({
    sleep: null,
    nutrition: null,
    exercise: null,
    energy: null,
    stress: null,
  });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<"excellent" | "good" | "fair" | "poor" | null>(null);

  const questions = [
    { key: "sleep", options: ratingOptions },
    { key: "nutrition", options: ratingOptions },
    { key: "exercise", options: exerciseOptions },
    { key: "energy", options: ratingOptions },
    { key: "stress", options: ratingOptions },
  ] as const;

  const allAnswered = Object.values(answers).every((v) => v !== null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered || !consent) return;

    const total = Object.values(answers).reduce(
      (sum, v) => sum + (v || 0),
      0
    );
    const max = 20;
    const percentage = (total / max) * 100;

    if (percentage >= 80) setResult("excellent");
    else if (percentage >= 60) setResult("good");
    else if (percentage >= 40) setResult("fair");
    else setResult("poor");

    setSubmitted(true);
  };

  const messages = getWhatsAppMessages(locale);

  if (submitted && result) {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-neutral-800">{t("resultTitle")}</h2>
        <p className="mt-4 text-lg text-neutral-600">{t(`result${result.charAt(0).toUpperCase() + result.slice(1)}`)}</p>
        <div className="mt-8">
          <WhatsAppButton locale={locale} message={messages.assessment} size="lg">
            {t("cta")}
          </WhatsAppButton>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {questions.map(({ key, options }) => (
        <fieldset key={key} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
          <legend className="text-lg font-semibold text-neutral-800">
            {t(key)}
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {options.map(({ value, key: optKey }) => (
              <label
                key={optKey}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
                  answers[key] === value
                    ? "border-sage-500 bg-sage-50"
                    : "border-neutral-200 hover:border-sage-300"
                }`}
              >
                <input
                  type="radio"
                  name={key}
                  value={value}
                  checked={answers[key] === value}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [key]: value }))
                  }
                  className="h-4 w-4 text-sage-600 focus:ring-sage-500"
                  required
                />
                <span className="text-neutral-700">{t(`options.${optKey}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded text-sage-600 focus:ring-sage-500"
          required
        />
        <span className="text-sm text-neutral-600">{t("consent")}</span>
      </label>

      <button
        type="submit"
        disabled={!allAnswered || !consent}
        className="w-full rounded-2xl bg-sage-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-sage-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t("submit")}
      </button>
    </form>
  );
}
