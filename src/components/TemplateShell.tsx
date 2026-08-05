"use client";

import { TemplateProvider } from "@/lib/template";
import type { TemplateId } from "@/lib/translations";
import { FloatingColorsButton } from "./FloatingColorsButton";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
        <FloatingColorsButton />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export function TemplateShell({
  template,
  children,
  footer,
}: {
  template: TemplateId;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <TemplateProvider template={template}>
      <Navbar />
      {children}
      {footer ?? <Footer />}
    </TemplateProvider>
  );
}
