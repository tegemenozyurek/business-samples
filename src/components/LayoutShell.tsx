"use client";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/lib/language";
import { ThemeProvider } from "@/lib/theme";
import { FloatingQuoteButton } from "./FloatingQuoteButton";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      <LanguageProvider>
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
        <FloatingQuoteButton />
      </LanguageProvider>
    </ThemeProvider>
  );
}
