import type { Metadata } from "next";
import { SipAdminPageView } from "@/components/sip/SipAdminPageView";

export const metadata: Metadata = {
  title: "Admin | Sipariş",
  description: "Sipariş yönetim paneline giriş.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SipAdminPage() {
  return <SipAdminPageView />;
}
