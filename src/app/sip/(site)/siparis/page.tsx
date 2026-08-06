import type { Metadata } from "next";
import { SipCartPage } from "@/components/sip/SipCartPage";

export const metadata: Metadata = {
  title: "Sepet | ABC Büfe",
  description: "Sepetini kontrol et, kapıda nakit veya kart ile sipariş ver.",
};

export default function SipSiparisPage() {
  return <SipCartPage />;
}
