import { fullName } from "@/config/site.config";
import { Fill } from "./Fill";
import { t } from "@/i18n";
import { links } from "@/lib/links";
import { TelegramIcon } from "./icons";
import { external } from "./Button";

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-4 sm:px-8 lg:pt-6">
      <a href="#top" className="flex min-h-11 items-center font-display text-[1.05rem] text-graphite">
        <Fill>{fullName}</Fill>
      </a>

      <nav aria-label={t.nav.main} className="hidden items-center gap-8 text-[0.95rem] text-slate md:flex">
        <a className="py-2 hover:text-graphite" href="#about">{t.nav.about}</a>
        <a className="py-2 hover:text-graphite" href="#services">{t.nav.services}</a>
        <a className="py-2 hover:text-graphite" href="#contacts">{t.nav.contacts}</a>
        <a
          className="rounded-full border border-graphite/25 px-5 py-2 text-graphite transition-colors hover:border-graphite/60 hover:bg-linen"
          href="#consultation"
        >
          {t.cta.bookShort}
        </a>
      </nav>

      {links.telegram && (
        <a
          href={links.telegram}
          {...external}
          aria-label={t.cta.telegram}
          className="-mr-2 flex size-11 items-center justify-center rounded-full text-graphite hover:bg-linen md:hidden"
        >
          <TelegramIcon size={22} />
        </a>
      )}
    </header>
  );
}
