import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Qeva",
  description:
    "QEVA Digital'in strateji, tasarım, içerik üretimi ve reklam yönetimi hizmetlerini keşfedin.",
};

export default function HizmetlerPage() {
  return <ServicesPage />;
}
