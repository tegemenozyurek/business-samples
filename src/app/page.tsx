import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Qeva",
  description:
    "Dijitalin sınırlarını QEVA ile yeniden tanımlayın. Premium dijital deneyimler için tasarım, teknoloji ve strateji.",
};

export default function Home() {
  return <HomePage />;
}
