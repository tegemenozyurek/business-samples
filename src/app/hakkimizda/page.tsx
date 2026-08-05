import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "Qeva",
  description:
    "QEVA Digital hakkında: dijital prestij, vizyon, misyon ve yaratıcılık, strateji ile teknolojiyi birleştiren yaklaşımımız.",
};

export default function HakkimizdaPage() {
  return <AboutPage />;
}
