"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { t } from "@/i18n";
import { LIMITS, leadToText, normalizeLead, validateLead, type LeadErrors, type LeadInput } from "@/lib/lead";
import { links, whatsappWithText } from "@/lib/links";
import { Button, buttonClass, external } from "./Button";
import { CheckIcon, TelegramIcon, WhatsappIcon } from "./icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; via: "api" | "messenger" }
  | { kind: "error"; text: string };

const f = t.form;

function messageText(lead: LeadInput) {
  return leadToText(lead, {
    header: f.messageHeader,
    name: f.messageName,
    contact: f.messageContact,
    comment: f.messageComment,
  });
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function LeadForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [lastLead, setLastLead] = useState<LeadInput | null>(null);
  const [copied, setCopied] = useState(false);

  function readForm(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      lead: normalizeLead({ name: data.get("name"), contact: data.get("contact"), comment: data.get("comment") }),
      website: String(data.get("website") ?? ""),
    };
  }

  function focusFirstError(errs: LeadErrors) {
    const first = errs.name ? "name" : errs.contact ? "contact" : null;
    if (first) formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;

    const { lead, website } = readForm(e.currentTarget);
    const errs = validateLead(lead);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }
    setLastLead(lead);
    setCopied(false);

    // Режимы без сервера: заявка уходит через мессенджер посетителя.
    if (siteConfig.leadDelivery === "whatsapp") {
      window.open(whatsappWithText(messageText(lead)), "_blank", "noopener");
      setStatus({ kind: "success", via: "messenger" });
      return;
    }
    if (siteConfig.leadDelivery === "telegram") {
      window.open(links.telegram, "_blank", "noopener");
      setCopied(await copy(messageText(lead)));
      setStatus({ kind: "success", via: "messenger" });
      return;
    }

    // Режим "api": отправка на сервер → Telegram-бот.
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, website }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: LeadErrors };

      if (res.ok && json.ok) {
        setStatus({ kind: "success", via: "api" });
        formRef.current?.reset();
        return;
      }
      if (json.error === "validation" && json.fields) {
        setErrors(json.fields);
        setStatus({ kind: "idle" });
        focusFirstError(json.fields);
        return;
      }
      setStatus({ kind: "error", text: f.failure.text });
    } catch {
      setStatus({ kind: "error", text: f.failure.text });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-4" role="status" aria-live="polite">
        <span className="flex size-12 items-center justify-center rounded-full bg-sage text-pine-deep">
          <CheckIcon size={24} />
        </span>
        <h3 className="font-display text-[1.6rem] leading-tight">
          {status.via === "api" ? f.success.title : f.messenger.openedTitle}
        </h3>
        <p className="text-slate">
          {status.via === "api" ? f.success.text : copied ? f.messenger.copied : f.messenger.opened}
        </p>
        <button
          type="button"
          className="min-h-11 text-pine underline decoration-pine/40 underline-offset-4 hover:decoration-pine"
          onClick={() => setStatus({ kind: "idle" })}
        >
          {f.success.again}
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const inputClass =
    "mt-2 block w-full rounded-xl border bg-white px-4 py-3.5 text-[1.0625rem] text-graphite placeholder:text-slate/60 transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-pine";
  const border = (bad?: boolean) => (bad ? "border-[#a2402f]" : "border-line hover:border-graphite/30");

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-consent`}>
      <h3 className="font-display text-[1.6rem] leading-tight">{f.title}</h3>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor={`${id}-name`} className="text-[0.95rem] font-medium">
            {f.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            placeholder={f.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={`${inputClass} ${border(errors.name)}`}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-sm text-[#a2402f]">
              {f.errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-contact`} className="text-[0.95rem] font-medium">
            {f.contact}
          </label>
          <input
            id={`${id}-contact`}
            name="contact"
            type="text"
            inputMode="text"
            autoComplete="tel"
            maxLength={LIMITS.contact}
            required
            placeholder={f.contactPlaceholder}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={`${id}-contact-hint${errors.contact ? ` ${id}-contact-err` : ""}`}
            className={`${inputClass} ${border(errors.contact)}`}
          />
          <p id={`${id}-contact-hint`} className="mt-1.5 text-sm text-slate">
            {f.contactHint}
          </p>
          {errors.contact && (
            <p id={`${id}-contact-err`} className="mt-1 text-sm text-[#a2402f]">
              {f.errors.contact}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${id}-comment`} className="text-[0.95rem] font-medium">
            {f.comment} <span className="font-normal text-slate">({f.optional})</span>
          </label>
          <textarea
            id={`${id}-comment`}
            name="comment"
            rows={3}
            maxLength={LIMITS.comment}
            placeholder={f.commentPlaceholder}
            className={`${inputClass} ${border()} resize-y`}
          />
        </div>

        {/* Ловушка для спам-ботов: скрыта от людей и экранных дикторов */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div aria-live="polite">
        {status.kind === "error" && (
          <div role="alert" className="mt-6 rounded-xl border border-[#a2402f]/30 bg-[#a2402f]/[0.06] p-4">
            <p className="font-medium text-[#8a3527]">{f.failure.title}</p>
            <p className="mt-1 text-[0.95rem] text-graphite">{status.text}</p>
            {lastLead && (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {links.whatsapp && (
                  <a
                    href={whatsappWithText(messageText(lastLead))}
                    {...external}
                    className={buttonClass("secondary", "bg-white", "sm")}
                  >
                    <WhatsappIcon size={18} />
                    {f.messenger.whatsapp}
                  </a>
                )}
                {links.telegram && (
                  <a
                    href={links.telegram}
                    {...external}
                    onClick={() => void copy(messageText(lastLead)).then(setCopied)}
                    className={buttonClass("secondary", "bg-white", "sm")}
                  >
                    <TelegramIcon size={18} />
                    {f.messenger.telegram}
                  </a>
                )}
              </div>
            )}
            {copied && <p className="mt-2 text-sm text-slate">{f.messenger.copied}</p>}
          </div>
        )}
      </div>

      <Button type="submit" disabled={sending} aria-busy={sending} className="mt-6 w-full">
        {sending && (
          <span
            className="size-4 animate-spin rounded-full border-2 border-milk/40 border-t-milk"
            aria-hidden="true"
          />
        )}
        {sending ? f.sending : status.kind === "error" ? f.failure.retry : f.submit}
      </Button>

      <p id={`${id}-consent`} className="mt-3 text-[0.8125rem] leading-snug text-slate">
        {f.consent}
      </p>
    </form>
  );
}
