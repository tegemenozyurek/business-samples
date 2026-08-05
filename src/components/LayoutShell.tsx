"use client";

import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "./Navbar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
