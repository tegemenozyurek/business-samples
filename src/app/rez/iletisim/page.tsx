import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/contact-page-view";

export const metadata: Metadata = {
  title: "İletişim | Qeva Nail Studio",
  description:
    "Qeva Nail Studio iletişim. Telefon, WhatsApp, e-posta, adres ve çalışma saatleri. Mesaj gönderin veya randevu alın.",
};

export default function RezIletisimPage() {
  return <ContactPageView />;
}
