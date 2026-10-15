import { siteConfig } from "@/config/site.config";
import { t } from "@/i18n";
import { links } from "@/lib/links";
import { external } from "./Button";
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, TelegramIcon, WhatsappIcon } from "./icons";

export function Contacts() {
  const c = siteConfig.contacts;
  const items = [
    { href: links.phone, label: t.contacts.phone, value: c.phoneDisplay || c.phone, Icon: PhoneIcon, ext: false },
    { href: links.telegram, label: t.contacts.telegram, value: c.telegram.startsWith("+") ? c.phoneDisplay || c.telegram : `@${c.telegram.replace(/^@/, "")}`, Icon: TelegramIcon, ext: true },
    { href: links.telegramChannel, label: t.contacts.telegramChannel, value: t.contacts.telegramChannelValue, Icon: TelegramIcon, ext: true },
    { href: links.whatsapp, label: t.contacts.whatsapp, value: c.phoneDisplay || `+${c.whatsapp}`, Icon: WhatsappIcon, ext: true },
    { href: links.instagram, label: t.contacts.instagram, value: `@${c.instagram.replace(/^@/, "")}`, Icon: InstagramIcon, ext: true },
    { href: links.email, label: t.contacts.email, value: c.email, Icon: MailIcon, ext: false },
  ].filter((i) => i.href);

  return (
    <section id="contacts" aria-labelledby="contacts-title">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 lg:py-24">
        <div className="md:col-span-4">
          <h2 id="contacts-title" className="font-display text-[2rem] leading-tight sm:text-[2.5rem]">
            {t.contacts.title}
          </h2>
          <p className="mt-3 text-slate">{t.contacts.lead}</p>
        </div>

        <ul className="border-t border-line md:col-span-7 md:col-start-6">
          {items.map(({ href, label, value, Icon, ext }) => (
            <li key={label} className="border-b border-line">
              <a
                href={href}
                {...(ext ? external : {})}
                className="group flex min-h-[4.25rem] items-center gap-4 py-3 transition-colors hover:text-pine"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linen text-pine transition-colors group-hover:bg-sage">
                  <Icon size={20} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-sm text-slate">{label}</span>
                  <span className="truncate text-[1.0625rem]">{value}</span>
                </span>
              </a>
            </li>
          ))}

          {(c.office.address || c.office.yandexMapsUrl || c.office.googleMapsUrl) && (
            <li className="flex gap-4 border-b border-line py-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linen text-pine">
                <MapPinIcon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-sm text-slate">{t.contacts.office}</span>
                {c.office.address && <address className="not-italic text-[1.0625rem]">{c.office.address}</address>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { href: c.office.yandexMapsUrl, label: t.contacts.yandexMaps },
                    { href: c.office.googleMapsUrl, label: t.contacts.googleMaps },
                  ]
                    .filter((m) => m.href)
                    .map((m) => (
                      <a
                        key={m.label}
                        href={m.href}
                        {...external}
                        className="inline-flex min-h-11 items-center rounded-full border border-graphite/20 px-4 text-[0.95rem] transition-colors hover:border-pine hover:text-pine"
                      >
                        {m.label}
                      </a>
                    ))}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
