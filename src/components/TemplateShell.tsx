"use client";

import { LanguageProvider } from "@/lib/language";
import { TemplateProvider } from "@/lib/template";
import { ThemeProvider } from "@/lib/theme";
import type { TemplateId } from "@/lib/translations";
import { FloatingColorsButton } from "./FloatingColorsButton";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

export function TemplateShell({
  template,
  children,
}: {
  template: TemplateId;
  children: React.ReactNode;
}) {
  return (
    <TemplateProvider template={template}>
      <Navbar />
      {children}
      <Footer />
      <FloatingColorsButton />
    </TemplateProvider>
  );
}
