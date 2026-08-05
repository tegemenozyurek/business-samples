import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Qeva",
  description:
    "Qeva Digital ile iletişime geçin. Projeleriniz için teklif alın.",
};

export default function IletisimPage() {
  return <ContactPage />;
}
