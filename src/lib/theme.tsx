"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeId = "dark" | "light" | "latte" | "mint" | "corporate";
export type CorporateAccent = "red" | "green" | "blue";

export type Theme = ThemeId;

export const THEME_IDS: ThemeId[] = [
  "dark",
  "light",
  "latte",
  "mint",
  "corporate",
];

export const CORPORATE_ACCENTS: CorporateAccent[] = ["red", "green", "blue"];

type ThemeContextValue = {
  theme: ThemeId;
  accent: CorporateAccent;
  setTheme: (theme: ThemeId) => void;
  setAccent: (accent: CorporateAccent) => void;
};

const THEME_KEY = "qeva-theme";
const ACCENT_KEY = "qeva-accent";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function normalizeTheme(value: string | null): ThemeId {
  if (value === "ember") {
    return "latte";
  }
  if (value === "meadow") {
    return "mint";
  }
  if (
    value === "dark" ||
    value === "light" ||
    value === "latte" ||
    value === "mint" ||
    value === "corporate"
  ) {
    return value;
  }
  return "dark";
}

function isAccent(value: string | null): value is CorporateAccent {
  return value === "red" || value === "green" || value === "blue";
}

function applyTheme(theme: ThemeId, accent: CorporateAccent) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  if (theme === "corporate") {
    root.setAttribute("data-accent", accent);
  } else {
    root.removeAttribute("data-accent");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("dark");
  const [accent, setAccentState] = useState<CorporateAccent>("red");

  useEffect(() => {
    const nextTheme = normalizeTheme(window.localStorage.getItem(THEME_KEY));
    const storedAccent = window.localStorage.getItem(ACCENT_KEY);
    const nextAccent = isAccent(storedAccent) ? storedAccent : "red";

    setThemeState(nextTheme);
    setAccentState(nextAccent);
    applyTheme(nextTheme, nextAccent);
  }, []);

  useEffect(() => {
    applyTheme(theme, accent);
    window.localStorage.setItem(THEME_KEY, theme);
    window.localStorage.setItem(ACCENT_KEY, accent);
  }, [theme, accent]);

  const setTheme = (next: ThemeId) => {
    setThemeState(next);
  };

  const setAccent = (next: CorporateAccent) => {
    setAccentState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
