import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { isPlaceholder } from "@/lib/links";
import { t } from "@/i18n";

/** Портрет в арочной рамке. Если фото ещё не добавлено — показывает заглушку. */
export function Portrait({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  const { src, alt } = siteConfig.portrait;
  const { firstName, lastName } = siteConfig.person;
  const initials = [firstName, lastName]
    .map((w) => (isPlaceholder(w) ? "" : w.trim()[0] ?? ""))
    .join("");

  return (
    <div className={`reveal-arch arch relative overflow-hidden bg-linen ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 88vw"
          className="object-cover object-[50%_25%]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate" role="img" aria-label={t.portrait.placeholder}>
          {/* Тонкий контур внутренней арки — ритм рамки, пока нет фото */}
          <div className="arch absolute inset-3 border border-line" aria-hidden="true" />
          <span className="font-display text-6xl text-graphite/70" aria-hidden="true">
            {initials || "—"}
          </span>
          <span className="max-w-[12rem] text-center text-sm">{t.portrait.placeholder}</span>
        </div>
      )}
    </div>
  );
}
