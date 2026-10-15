"use client";

import { useEffect, useState } from "react";
import { t } from "@/i18n";
import { links } from "@/lib/links";
import { buttonClass, external } from "./Button";
import { TelegramIcon } from "./icons";

/**
 * Фиксированная кнопка записи на смартфонах.
 * Появляется, когда кнопки первого экрана ушли из виду, и прячется у формы,
 * чтобы не перекрывать её и не дублировать.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroActions = document.getElementById("hero-actions");
    const form = document.getElementById("consultation");
    if (!heroActions || !form || !("IntersectionObserver" in window)) return;

    const state = { hero: true, form: false };
    const update = () => setVisible(!state.hero && !state.form);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroActions) state.hero = e.isIntersecting || e.boundingClientRect.top > 0;
        if (e.target === form) state.form = e.isIntersecting;
      }
      update();
    });
    io.observe(heroActions);
    io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-milk/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-3">
        <a href="#consultation" tabIndex={visible ? 0 : -1} className={buttonClass("primary", "min-w-0 flex-1 whitespace-nowrap", "sm")}>
          {t.cta.book}
        </a>
        {links.telegram && (
          <a
            href={links.telegram}
            {...external}
            tabIndex={visible ? 0 : -1}
            aria-label={t.cta.telegram}
            className={buttonClass("secondary", "", "icon")}
          >
            <TelegramIcon size={22} />
          </a>
        )}
      </div>
    </div>
  );
}
