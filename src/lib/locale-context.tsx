"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "id" | "en";

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
    dictionary: Record<string, unknown>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Helper to get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const keys = path.split(".");
    let current: unknown = obj;

    for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
            current = (current as Record<string, unknown>)[key];
        } else {
            return path; // Return the key if not found
        }
    }

    return typeof current === "string" ? current : path;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("id");
    const [dictionary, setDictionary] = useState<Record<string, unknown>>({});

    useEffect(() => {
        // Load saved locale from localStorage
        const savedLocale = localStorage.getItem("locale") as Locale;
        if (savedLocale && (savedLocale === "id" || savedLocale === "en")) {
            setLocaleState(savedLocale);
        }
    }, []);

    useEffect(() => {
        // Load dictionary when locale changes
        const loadDictionary = async () => {
            try {
                const dict = await import(`@/dictionaries/${locale}.json`);
                setDictionary(dict.default);
            } catch (error) {
                console.error("Failed to load dictionary:", error);
            }
        };
        loadDictionary();
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);
    };

    const t = (key: string): string => {
        return getNestedValue(dictionary, key);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t, dictionary }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error("useLocale must be used within a LocaleProvider");
    }
    return context;
}
