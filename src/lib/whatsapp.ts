import { siteConfig } from "./config";

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;
}

export function getWhatsAppMessages(locale: "pt" | "en") {
  return {
    default:
      locale === "pt"
        ? "Olá! Gostaria de saber mais sobre os programas de Saúde Funcional."
        : "Hello! I'd like to learn more about the Functional Health programs.",
    assessment:
      locale === "pt"
        ? "Olá! Fiz a autoavaliação no site e gostaria de agendar uma consulta."
        : "Hello! I completed the self-assessment on the website and would like to schedule a consultation.",
    program:
      locale === "pt"
        ? "Olá! Tenho interesse em saber mais sobre este programa."
        : "Hello! I'm interested in learning more about this program.",
    contact:
      locale === "pt"
        ? "Olá! Entrei em contato pelo formulário do site."
        : "Hello! I'm reaching out through the website contact form.",
  };
}
