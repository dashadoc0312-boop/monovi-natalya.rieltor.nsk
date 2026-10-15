import { siteConfig } from "@/config/site.config";
import { t } from "@/i18n";
import { Fill } from "./Fill";
import { CheckIcon } from "./icons";

export function About() {
  const { about } = siteConfig;
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-8 lg:py-24">
        <div className="md:col-span-4">
          <h2 id="about-title" className="font-display text-[2rem] leading-tight sm:text-[2.5rem]">
            {t.about.title}
          </h2>

          <dl className="mt-8 grid gap-5">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-l border-pine/40 pl-4">
                <dt className="text-sm text-slate">{fact.label}</dt>
                <dd className="mt-0.5 text-graphite"><Fill>{fact.value}</Fill></dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="space-y-4 font-display text-[1.25rem] leading-[1.55] text-graphite sm:text-[1.4rem]">
            {about.bio.map((p, i) => (
              <p key={i} className="max-w-[40ch]"><Fill>{p}</Fill></p>
            ))}
          </div>

          <h3 className="mt-10 text-base font-medium text-graphite">{t.about.principles}</h3>
          <ul className="mt-4 space-y-3">
            {about.principles.map((item) => (
              <li key={item} className="flex gap-3 text-slate">
                <CheckIcon size={20} className="mt-[0.2rem] shrink-0 text-pine" />
                <span className="max-w-[52ch]"><Fill>{item}</Fill></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
