"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { en } from "./translations/en";
import { ja } from "./translations/ja";

export type Language = "en" | "ja";

export type Translations = typeof en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Load language from localStorage on mount
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang === "en" || savedLang === "ja") {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
  };

  const translations: Translations = language === "ja" ? ja : en;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

// Helper function to replace placeholders in translation strings
export function translate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;

  let result = template;
  Object.entries(params).forEach(([key, value]) => {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp("\\{" + escapedKey + "\\}", "g");
    result = result.replace(pattern, String(value));
  });

  return result;
}
