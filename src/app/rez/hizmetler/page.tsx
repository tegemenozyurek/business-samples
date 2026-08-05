import type { Metadata } from "next";
import { ServicesPageView } from "@/components/services/services-page-view";

export const metadata: Metadata = {
  title: "Hizmetler | Qeva Nail Studio",
  description:
    "Manikür, pedikür, kalıcı oje, jel tırnak, protez tırnak, french ve nail art. Süre, fiyat ve detaylarla premium nail hizmetlerimiz.",
};

export default function RezHizmetlerPage() {
  return <ServicesPageView />;
}
