export const siteConfig = {
  name: "Michel Eduardo",
  tagline: {
    pt: "Saúde Funcional",
    en: "Functional Health",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.coachmichelcanada.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567",
  lifeUp: {
    name: "Life Up",
    url: "https://lifeupfit.ca",
    display: "lifeupfit.ca",
  },
  address: {
    pt: "London, Ontario, Canadá",
    en: "London, Ontario, Canada",
  },
  seo: {
    siteName: "Coach Michel Canadá",
    organizationName: "Coach Michel — Saúde Funcional",
    alternateNames: ["Coach Michel", "Coach Michel Canadá", "Michel Eduardo"],
    themeColor: "#558a63",
    jobTitle: {
      pt: "Coach de Saúde Funcional",
      en: "Functional Health Coach",
    },
    description: {
      pt: "Coach Michel no Canadá — Saúde Funcional, Nutrição Funcional, longevidade e bem-estar para mulheres 40+, idosos e famílias.",
      en: "Coach Michel in Canada — Functional Health, Functional Nutrition, longevity, and well-being for women 40+, seniors, and families.",
    },
  },
} as const;
