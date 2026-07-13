export const siteConfig = {
  name: "Michel eduardo",
  tagline: {
    pt: "Saúde Funcional",
    en: "Functional Health",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://micheleeduardo.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@micheleeduardo.com",
  instagram: "https://www.instagram.com/personalmicheleduardo",
  address: {
    pt: "Toronto, Ontario, Canadá",
    en: "Toronto, Ontario, Canada",
  },
  hours: {
    pt: "Segunda a Sexta: 8h às 18h | Sábado: 9h às 13h",
    en: "Monday to Friday: 8am to 6pm | Saturday: 9am to 1pm",
  },
} as const;
