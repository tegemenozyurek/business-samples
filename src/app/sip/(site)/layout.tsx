"use client";

import { TemplateShell } from "@/components/TemplateShell";
import { CartProvider } from "@/lib/cart";

export default function SipSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <TemplateShell template="sip">{children}</TemplateShell>
    </CartProvider>
  );
}
