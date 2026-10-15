import { NextResponse } from "next/server";
import { normalizeLead, validateLead } from "@/lib/lead";

/**
 * Приём заявок с сайта и пересылка в Telegram через бота.
 * Нужны переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (см. README и .env.example).
 *
 * Ответы:
 *  200 { ok: true }
 *  400 { ok: false, error: "validation", fields: {...} }
 *  503 { ok: false, error: "not_configured" } — бот ещё не подключён
 *  502 { ok: false, error: "delivery_failed" } — Telegram не принял сообщение
 */

export const dynamic = "force-dynamic";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Ловушка для спам-ботов: скрытое поле, которое человек не заполняет.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const lead = normalizeLead(body);
  const fields = validateLead(lead);
  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — заявка не доставлена");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const text = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Контакт:</b> ${escapeHtml(lead.contact)}`,
    lead.comment ? `<b>Комментарий:</b> ${escapeHtml(lead.comment)}` : "",
  ]
    .filter((line, i) => line !== "" || i === 1)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[lead] Telegram ответил", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Ошибка отправки в Telegram", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
