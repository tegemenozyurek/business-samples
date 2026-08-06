import type { Metadata } from "next";
import { RezHomePage } from "@/components/rez/RezHomePage";

export const metadata: Metadata = {
  title: "Qeva Nail Studio",
  description:
    "Premium nail studio. Manikür, pedikür, kalıcı oje, jel tırnak ve nail art. Online randevu alın.",
};

export default function RezPage() {
  return <RezHomePage />;
}
