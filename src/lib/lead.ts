/** Общая логика заявки: используется и в браузере, и на сервере. */

export type LeadInput = {
  name: string;
  contact: string;
  comment?: string;
};

export type LeadErrors = Partial<Record<"name" | "contact", true>>;

export const LIMITS = { name: 80, contact: 120, comment: 1000 };

export function normalizeLead(raw: Partial<Record<keyof LeadInput, unknown>>): LeadInput {
  const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  return {
    name: s(raw.name, LIMITS.name),
    contact: s(raw.contact, LIMITS.contact),
    comment: s(raw.comment, LIMITS.comment),
  };
}

export function validateLead(lead: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (lead.name.replace(/[^\p{L}]/gu, "").length < 2) errors.name = true;
  // телефон (от 6 цифр), @ник, ссылка или e-mail
  const digits = lead.contact.replace(/\D/g, "").length;
  const looksLikeHandle = /^@?[\w.]{3,}$/.test(lead.contact) || /\S+@\S+\.\S+/.test(lead.contact);
  if (!(digits >= 6 || looksLikeHandle)) errors.contact = true;
  return errors;
}

export function leadToText(
  lead: LeadInput,
  labels: { header: string; name: string; contact: string; comment: string },
) {
  const lines = [labels.header, "", `${labels.name}: ${lead.name}`, `${labels.contact}: ${lead.contact}`];
  if (lead.comment) lines.push(`${labels.comment}: ${lead.comment}`);
  return lines.join("\n");
}
