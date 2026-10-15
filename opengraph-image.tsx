import { ImageResponse } from "next/og";
import { fullName, siteConfig } from "@/config/site.config";

/**
 * Картинка-превью ссылки (Telegram, WhatsApp, Instagram-директ и т.д.).
 * Генерируется автоматически из данных конфига при сборке сайта.
 */

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const clean = (s: string) => s.replace(/[[\]]/g, "");

/** Загружает шрифт с кириллицей с Google Fonts только для нужных символов. */
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const name = clean(fullName);
  const role = clean(siteConfig.person.role);
  const headline = siteConfig.hero.headline;
  const font = await loadFont("Prata", name + role + headline);

  const arch = (
    <div
      style={{
        position: "absolute",
        right: 90,
        bottom: 0,
        width: 340,
        height: 500,
        borderRadius: "170px 170px 0 0",
        background: "#2f4237",
        display: "flex",
      }}
    />
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#f7f5f0",
          color: "#26292b",
          padding: "80px 90px",
        }}
      >
        {arch}
        {font && (
          <div style={{ display: "flex", flexDirection: "column", width: 640, fontFamily: "Prata" }}>
            <div style={{ fontSize: 30, color: "#595d5a", display: "flex" }}>{role}</div>
            <div style={{ fontSize: 76, lineHeight: 1.05, marginTop: 24, display: "flex" }}>{name}</div>
            <div style={{ fontSize: 34, lineHeight: 1.35, marginTop: 36, display: "flex" }}>{headline}</div>
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Prata", data: font, style: "normal", weight: 400 }] : [],
    },
  );
}
