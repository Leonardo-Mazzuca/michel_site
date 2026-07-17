export const siteConfig = {
  name: "Michel Eduardo",
  tagline: {
    pt: "Saúde Funcional",
    en: "Functional Health",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://micheleeduardo.com",
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
} as const;
