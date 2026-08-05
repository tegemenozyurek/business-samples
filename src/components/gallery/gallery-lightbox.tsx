"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/gallery-content";

type GalleryLightboxProps = {
  items: GalleryItem[];
  activeId: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function GalleryLightbox({
  items,
  activeId,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const active = activeIndex >= 0 ? items[activeIndex] : null;

  useEffect(() => {
    if (!active) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onPrev();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label="Kapat"
            onClick={onClose}
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:top-6 sm:right-6"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:left-6"
            aria-label="Önceki"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 sm:right-6"
            aria-label="Sonraki"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <motion.div
            className="relative z-10 w-full max-w-4xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative aspect-[4/5] w-full max-h-[80svh] sm:aspect-[4/3]">
              <Image
                src={active.src}
                alt={active.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 896px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
