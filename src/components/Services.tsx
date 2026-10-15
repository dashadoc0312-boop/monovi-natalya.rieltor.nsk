import { siteConfig } from "@/config/site.config";
import { t } from "@/i18n";
import { serviceIcons } from "./icons";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-linen">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <h2 id="services-title" className="font-display text-[2rem] leading-tight sm:text-[2.5rem]">
          {t.services.title}
        </h2>

        <ul className="mt-8 grid border-t border-graphite/15 sm:grid-cols-2 sm:gap-x-12">
          {siteConfig.services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.title} className="flex gap-5 border-b border-graphite/15 py-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-milk text-pine">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] leading-snug">{s.title}</h3>
                  <p className="mt-1.5 max-w-[42ch] text-slate">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
