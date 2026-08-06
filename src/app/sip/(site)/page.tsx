import type { Metadata } from "next";
import { SipHomePage } from "@/components/sip/SipHomePage";

export const metadata: Metadata = {
  title: "Snack Bar | Qeva",
  description:
    "Günlük tostlar, sandviçler, burgerler ve içeceklerle taze lezzetlerin buluşma noktası.",
};

export default function SipPage() {
  return <SipHomePage />;
}
