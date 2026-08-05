"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/lib/gallery-content";

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  onOpen: (id: string) => void;
};

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index, 8) * 0.03 }}
      onClick={() => onOpen(item.id)}
      className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--salon-beige)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      <Image
        src={item.src}
        alt={item.title}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </motion.button>
  );
}
