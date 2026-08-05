import type { Metadata } from "next";
import { GalleryPageView } from "@/components/gallery/gallery-page-view";

export const metadata: Metadata = {
  title: "Galeri | Qeva Nail Studio",
  description:
    "Qeva Nail Studio galerisi. Manikür, pedikür, kalıcı oje, jel tırnak, french ve nail art çalışmalarımızı keşfedin.",
};

export default function RezGalleryPage() {
  return <GalleryPageView />;
}
