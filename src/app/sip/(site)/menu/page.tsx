import type { Metadata } from "next";
import { SipMenuPage } from "@/components/sip/SipMenuPage";

export const metadata: Metadata = {
  title: "Menü | ABC Büfe",
  description:
    "Tostlar, sandviçler, burgerler, atıştırmalıklar, içecekler ve tatlılar.",
};

export default function SipMenuRoute() {
  return <SipMenuPage />;
}
