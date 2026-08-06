"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";
import {
  useTheme,
  type CorporateAccent,
  type ThemeId,
} from "@/lib/theme";

const copy = {
  tr: {
    title: "Tema",
    open: "Temaları aç",
    close: "Temaları kapat",
    themes: {
      dark: "Koyu",
      light: "Açık",
      latte: "Latte",
      mint: "Mint",
      corporate: "Kurumsal",
    },
    accent: "Ana renk",
  },
  en: {
    title: "Theme",
    open: "Open themes",
    close: "Close themes",
    themes: {
      dark: "Dark",
      light: "Light",
      latte: "Latte",
      mint: "Mint",
      corporate: "Corporate",
    },
    accent: "Accent",
  },
} as const;

const themeOrder: ThemeId[] = [
  "dark",
  "light",
  "latte",
  "mint",
  "corporate",
];

const swatches: Record<ThemeId, string[]> = {
  dark: ["#161616", "#a8a8a8", "#fafafa"],
  light: ["#f4f4f5", "#52525b", "#090909"],
  latte: ["#ebe0d4", "#a8724e", "#3a2a1e"],
  mint: ["#d8efe6", "#3fa887", "#16352e"],
  corporate: ["#ffffff", "#111111", "#ef4444"],
};

const accentColors: Record<CorporateAccent, string> = {
  red: "#dc2626",
  green: "#16a34a",
  blue: "#2563eb",
};

export function FloatingColorsButton() {
  const { lang } = useLanguage();
  const { theme, accent, setTheme, setAccent } = useTheme();
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 right-0 z-40 flex items-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="floating-colors-btn pointer-events-auto flex flex-col items-center gap-1 rounded-l-2xl border border-r-0 border-white/8 bg-[rgba(0,0,0,0.35)] px-2.5 py-4 backdrop-blur-md transition-colors duration-300 hover:bg-[rgba(0,0,0,0.5)]"
          aria-label={t.open}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <span className="h-1 w-1 rounded-full bg-[#ef4444]" />
          <span className="h-1 w-1 rounded-full bg-[#22c55e]" />
          <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label={t.close}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        />

        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={`relative w-full max-w-3xl origin-center rounded-3xl border border-border bg-[var(--nav-bg)] p-6 shadow-[0_28px_80px_var(--nav-shadow)] backdrop-blur-2xl transition-all duration-300 ease-out sm:p-8 ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-[0.97] opacity-0"
          }`}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2
              id={titleId}
              className="text-sm font-medium tracking-[0.2em] text-heading uppercase"
            >
              {t.title}
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-colors hover:border-[var(--icon-hover-border)] hover:bg-[var(--icon-hover-bg)] hover:text-heading"
              aria-label={t.close}
            >
              <span className="relative block h-3.5 w-3.5" aria-hidden="true">
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {themeOrder.map((id) => {
              const active = theme === id;
              const colors =
                id === "corporate"
                  ? ["#ffffff", "#111111", accentColors[accent]]
                  : swatches[id];

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTheme(id)}
                  className={`group flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                    active
                      ? "border-accent bg-surface-hover shadow-[0_0_0_1px_var(--accent)]"
                      : "border-border bg-surface-soft hover:border-border-strong hover:bg-surface-hover"
                  }`}
                  aria-pressed={active}
                >
                  <span className="flex h-16 overflow-hidden sm:h-20">
                    {colors.map((color) => (
                      <span
                        key={color}
                        className="h-full flex-1"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <span className="flex items-center justify-between gap-2 px-3 py-3">
                    <span className="text-xs font-medium tracking-[0.08em] text-heading uppercase">
                      {t.themes[id]}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-opacity ${
                        active ? "bg-accent opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {theme === "corporate" ? (
            <div className="mt-6 border-t border-border pt-5">
              <p className="mb-3 text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                {t.accent}
              </p>
              <div className="flex flex-wrap gap-3">
                {(["red", "green", "blue"] as CorporateAccent[]).map(
                  (value) => {
                    const selected = accent === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAccent(value)}
                        className={`flex h-11 items-center gap-2.5 rounded-full border px-4 transition-all duration-200 ${
                          selected
                            ? "border-accent bg-surface-hover"
                            : "border-border hover:border-border-strong hover:bg-surface-soft"
                        }`}
                        aria-label={value}
                        aria-pressed={selected}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full"
                          style={{ backgroundColor: accentColors[value] }}
                        />
                        <span className="text-xs font-medium tracking-[0.1em] text-heading uppercase">
                          {value}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
