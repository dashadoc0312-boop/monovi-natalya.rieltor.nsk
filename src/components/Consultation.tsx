import { siteConfig } from "@/config/site.config";
import { LeadForm } from "./LeadForm";

export function Consultation() {
  const { consultation } = siteConfig;
  return (
    <section id="consultation" aria-labelledby="consultation-title" className="bg-pine text-milk">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-12 md:gap-8 lg:py-24">
        <div className="md:col-span-5">
          <h2 id="consultation-title" className="font-display text-[2rem] leading-tight sm:text-[2.75rem]">
            {consultation.title}
          </h2>
          <p className="mt-4 max-w-[36ch] text-[1.125rem] text-milk/80">{consultation.text}</p>
        </div>

        <div className="rounded-2xl bg-milk p-6 text-graphite sm:p-8 md:col-span-6 md:col-start-7">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
