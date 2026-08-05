"use client";

import { useLanguage, type Lang } from "@/lib/language";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const buttonClass = (value: Lang) =>
    `transition-colors ${
      lang === value
        ? "text-[var(--switcher-active)]"
        : "text-[var(--switcher-idle)] hover:text-[var(--switcher-hover)]"
    }`;

  return (
    <div className="flex items-center gap-1.5 text-xs tracking-wide">
      <button
        type="button"
        onClick={() => setLang("tr")}
        className={buttonClass("tr")}
        aria-current={lang === "tr" ? "true" : undefined}
      >
        TR
      </button>
      <span className="text-[var(--switcher-divider)]" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={buttonClass("en")}
        aria-current={lang === "en" ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
}
