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
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Kapat"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src={active.src}
                alt={active.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-[0.18em] text-white/55 uppercase">
                  {active.category}
                </p>
                <h2 className="mt-1 truncate font-[family-name:var(--font-cormorant)] text-2xl text-white">
                  {active.title}
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                  aria-label="Önceki"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                  aria-label="Sonraki"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
                  aria-label="Kapat"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
