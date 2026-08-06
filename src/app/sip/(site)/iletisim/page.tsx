import type { Metadata } from "next";
import { SipContactPage } from "@/components/sip/SipContactPage";

export const metadata: Metadata = {
  title: "İletişim | ABC Büfe",
  description:
    "ABC Büfe iletişim. Telefon, WhatsApp, adres, çalışma saatleri ve yol tarifi.",
};

export default function SipIletisimPage() {
  return <SipContactPage />;
}
