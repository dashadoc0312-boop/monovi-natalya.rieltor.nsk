import { siteConfig } from "@/config/site.config";
import { t } from "@/i18n";
import { links } from "@/lib/links";
import { ButtonLink, external } from "./Button";
import { Fill } from "./Fill";
import { TelegramIcon } from "./icons";
import { Portrait } from "./Portrait";

export function Hero() {
  const { person, hero } = siteConfig;
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-16 sm:px-8 sm:pt-12 md:grid-cols-12 md:items-center md:gap-8 lg:pt-16 lg:pb-24"
    >
      <div className="reveal-text md:col-span-7">
        <p className="text-[0.95rem] text-slate">
          <Fill>{person.role}</Fill>
        </p>

        <h1
          id="hero-name"
          className="mt-3 font-display text-[2.75rem] leading-[1.02] tracking-[-0.01em] text-graphite sm:text-6xl lg:text-[5.25rem]"
        >
          <span className="block"><Fill>{person.firstName}</Fill></span>
          <span className="block md:pl-[0.9em]"><Fill>{person.lastName}</Fill></span>
        </h1>

        <p className="mt-6 max-w-[30ch] font-display text-[1.4rem] leading-[1.35] text-graphite sm:text-[1.65rem]">
          {hero.headline}
        </p>

        <p className="mt-4 max-w-[46ch] text-slate">{hero.description}</p>

        <div id="hero-actions" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#consultation">{t.cta.book}</ButtonLink>
          {links.telegram && (
            <ButtonLink href={links.telegram} {...external} variant="secondary">
              <TelegramIcon size={20} />
              {t.cta.telegram}
            </ButtonLink>
          )}
        </div>
      </div>

      <div className="flex md:col-span-5 md:justify-end">
        <Portrait
          priority
          className="aspect-[4/5] w-full max-w-[22rem] md:max-w-[26rem]"
        />
      </div>
    </section>
  );
}
