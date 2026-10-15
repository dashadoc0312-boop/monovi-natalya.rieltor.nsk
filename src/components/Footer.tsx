import { fullName } from "@/config/site.config";
import { t } from "@/i18n";
import { Fill } from "./Fill";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-8 text-sm text-slate sm:flex-row sm:justify-between sm:px-8">
        <span className="font-display text-base text-graphite"><Fill>{fullName}</Fill></span>
        <span>© {new Date().getFullYear()}. {t.footer.rights}</span>
      </div>
    </footer>
  );
}
