import { Link } from "@/i18n/navigation";
import { getWhatsAppUrl, getWhatsAppMessages } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  locale: "pt" | "en";
  message?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-[#25D366] text-white hover:bg-[#1fb855] shadow-md hover:shadow-lg",
  secondary:
    "bg-sage-600 text-white hover:bg-sage-700 shadow-md hover:shadow-lg",
  outline:
    "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function WhatsAppButton({
  locale,
  message,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: WhatsAppButtonProps) {
  const messages = getWhatsAppMessages(locale);
  const url = getWhatsAppUrl(message || messages.default);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={locale === "pt" ? "Abrir WhatsApp" : "Open WhatsApp"}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {children}
    </a>
  );
}
