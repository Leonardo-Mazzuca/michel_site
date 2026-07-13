import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CheckCircle } from "lucide-react";

interface HeroProps {
  locale: "pt" | "en";
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations("hero");

  const benefits = [t("benefit1"), t("benefit2"), t("benefit3")];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50/80 via-white to-sage-50/50 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-800 md:text-5xl lg:text-[3.25rem]">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600 md:text-xl">
            {t("subtitle")}
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-sage-600"
                  aria-hidden="true"
                />
                <span className="text-neutral-700">{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <WhatsAppButton locale={locale} size="lg">
              {t("cta")}
            </WhatsAppButton>
            <Link
              href="/avaliacao"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-sage-600 px-8 py-4 text-lg font-semibold text-sage-700 transition-all duration-300 hover:bg-sage-50"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl shadow-xl lg:max-w-none">
            <Image
              src="/images/michele-eduardo.jpg"
              alt={
                locale === "pt"
                  ? "Michel eduardo - Profissional de Saúde Funcional"
                  : "Michel eduardo - Functional Health Professional"
              }
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
