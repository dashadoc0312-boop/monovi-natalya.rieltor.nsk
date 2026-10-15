import { siteConfig } from "@/config/site.config";

const c = siteConfig.contacts;

export const links = {
  phone: c.phone ? `tel:${c.phone.replace(/[^\d+]/g, "")}` : "",
  telegram: c.telegram ? `https://t.me/${c.telegram.replace(/^@/, "")}` : "",
  whatsapp: c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : "",
  telegramChannel: c.telegramChannel || "",
  instagram: c.instagram ? `https://instagram.com/${c.instagram.replace(/^@/, "")}` : "",
  email: c.email ? `mailto:${c.email}` : "",
};

export function whatsappWithText(text: string) {
  return links.whatsapp ? `${links.whatsapp}?text=${encodeURIComponent(text)}` : "";
}

/** Плейсхолдеры в конфиге пишутся в квадратных скобках: "[Имя]" */
export function isPlaceholder(value: string) {
  return /\[[^\]]+\]/.test(value);
}
