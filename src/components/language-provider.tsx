"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dictionary, type Lang, type TextKey } from "@/lib/translations";

const LangContext = createContext<Lang>("en");

type ProviderProps = {
  lang: Lang;
  children: React.ReactNode;
};

export function LanguageProvider({ lang, children }: ProviderProps) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

// Returns a function that turns a key into text in the current language
export function useT() {
  const lang = useLang();

  function t(key: TextKey): string {
    return dictionary[lang][key];
  }

  return t;
}

export function LanguageToggle() {
  const lang = useLang();
  const router = useRouter();
  const t = useT();

  function handleClick() {
    const next = lang === "en" ? "hi" : "en";
    document.cookie =
      "lang=" + next + "; path=/; max-age=31536000; samesite=lax";
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={t("changeLanguage")}
      onClick={handleClick}
    >
      <Languages className="mr-2 h-4 w-4" />
      {lang === "en" ? "हिंदी" : "English"}
    </Button>
  );
}