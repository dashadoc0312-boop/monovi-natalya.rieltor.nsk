import { siteConfig } from "@/config/site.config";

const c = siteConfig.contacts;

export const links = {
  phone: c.phone ? `tel:${c.phone.replace(/[^\d+]/g, "")}` : "",
  // Номер телефона → t.me/+79991234567, ник → t.me/username
  telegram: c.telegram
    ? c.telegram.startsWith("+")
      ? `https://t.me/+${c.telegram.replace(/\D/g, "")}`
      : `https://t.me/${c.telegram.replace(/^@/, "")}`
    : "",
  whatsapp: c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, "")}` : "",
  telegramChannel: c.telegramChannel || "",
  instagram: c.instagram ? `https://instagram.com/${c.instagram.replace(/^@/, "")}` : "",
  email: c.email ? `mailto:${c.email}` : "",
  map: c.map?.mapUrl || "",
};

export function whatsappWithText(text: string) {
  return links.whatsapp ? `${links.whatsapp}?text=${encodeURIComponent(text)}` : "";
}

/** Плейсхолдеры в конфиге пишутся в квадратных скобках: "[Имя]" */
export function isPlaceholder(value: string) {
  return /\[[^\]]+\]/.test(value);
}
