import "server-only";
import { Locale } from "@/lib/i18n-config";

const dictionaries = {
    id: () => import("./id.json").then((module) => module.default),
    en: () => import("./en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]?.() ?? dictionaries.id();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

