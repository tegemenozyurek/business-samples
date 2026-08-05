"use client";

import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { useTheme, type Theme } from "@/lib/theme";

const themeCopy = {
  tr: {
    ariaLabel: "Tema",
    dark: "Koyu tema",
    light: "Açık tema",
  },
  en: {
    ariaLabel: "Theme",
    dark: "Dark theme",
    light: "Light theme",
  },
} as const;

export function ThemeSwitcher() {
  const { lang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const copy = themeCopy[lang];

  const buttonClass = (value: Theme) =>
    `flex items-center transition-colors ${
      theme === value
        ? "text-[var(--switcher-active)]"
        : "text-[var(--switcher-idle)] hover:text-[var(--switcher-hover)]"
    }`;

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label={copy.ariaLabel}
    >
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={buttonClass("dark")}
        aria-label={copy.dark}
        aria-current={theme === "dark" ? "true" : undefined}
      >
        <Moon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <span className="text-xs text-[var(--switcher-divider)]" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={buttonClass("light")}
        aria-label={copy.light}
        aria-current={theme === "light" ? "true" : undefined}
      >
        <Sun className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
