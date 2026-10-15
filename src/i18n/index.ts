import { siteConfig } from "@/config/site.config";
import { ru, type Dictionary } from "./ru";

const dictionaries: Record<string, Dictionary> = { ru };

/** Тексты интерфейса для языка из siteConfig.locale */
export const t: Dictionary = dictionaries[siteConfig.locale] ?? ru;
