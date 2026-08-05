import type { Metadata } from "next";
import { AppointmentPageView } from "@/components/appointment/appointment-page-view";

export const metadata: Metadata = {
  title: "Randevu Al | Qeva Nail Studio",
  description:
    "Online randevu oluşturun. Manikür, pedikür, kalıcı oje, jel tırnak ve nail art için tarih ve saat seçin.",
};

export default function RezRandevuPage() {
  return <AppointmentPageView />;
}
