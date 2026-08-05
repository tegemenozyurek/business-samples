"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/lib/gallery-content";

type GalleryCardProps = {
  item: GalleryItem;
  index: number;
  onOpen: (id: string) => void;
};

const heightClass = {
  tall: "aspect-[3/4]",
  medium: "aspect-[4/5]",
  square: "aspect-square",
} as const;

export function GalleryCard({ item, index, onOpen }: GalleryCardProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04 }}
      onClick={() => onOpen(item.id)}
      className="group relative mb-4 w-full break-inside-avoid overflow-hidden rounded-[1.25rem] bg-white text-left shadow-[0_12px_36px_rgba(26,22,20,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      <span className={`relative block overflow-hidden ${heightClass[item.height]}`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,22,20,0.72),rgba(26,22,20,0.18)_42%,transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute inset-x-0 bottom-0 flex translate-y-3 flex-col gap-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="w-fit rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase">
            {item.category}
          </span>
          <span className="flex items-end justify-between gap-3">
            <span>
              <span className="block font-[family-name:var(--font-cormorant)] text-xl text-white">
                {item.title}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-white/80">
                {item.description}
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-[var(--heading)]">
              <ZoomIn className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </span>
        </span>
      </span>
    </motion.button>
  );
}
