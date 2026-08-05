"use client";

import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import { FloatingColorsButton } from "./FloatingColorsButton";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        {children}
        <Footer />
        <FloatingColorsButton />
      </LanguageProvider>
    </ThemeProvider>
  );
}
