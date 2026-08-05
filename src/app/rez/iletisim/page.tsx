import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/contact-page-view";

export const metadata: Metadata = {
  title: "İletişim | Qeva Nail Studio",
  description:
    "Qeva Nail Studio iletişim. Telefon, WhatsApp, Instagram, adres ve çalışma saatleri.",
};

export default function RezIletisimPage() {
  return <ContactPageView />;
}
