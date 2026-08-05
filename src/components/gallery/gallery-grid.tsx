"use client";

import { AnimatePresence } from "framer-motion";
import type { GalleryItem } from "@/lib/gallery-content";
import { GalleryCard } from "./gallery-card";

type GalleryGridProps = {
  items: GalleryItem[];
  onOpen: (id: string) => void;
};

export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      {items.length === 0 ? (
        <p className="py-20 text-center text-sm text-[var(--muted)]">
          Bu kategoride henüz çalışma yok.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                onOpen={onOpen}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
