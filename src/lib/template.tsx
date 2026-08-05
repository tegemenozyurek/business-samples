"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { TemplateId } from "@/lib/translations";

const TemplateContext = createContext<TemplateId | null>(null);

export function TemplateProvider({
  template,
  children,
}: {
  template: TemplateId;
  children: ReactNode;
}) {
  return (
    <TemplateContext.Provider value={template}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const template = useContext(TemplateContext);
  if (!template) {
    throw new Error("useTemplate must be used within TemplateProvider");
  }
  return template;
}
