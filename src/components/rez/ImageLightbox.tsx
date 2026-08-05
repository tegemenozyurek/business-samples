"use client";

import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

type ImageLightboxProps = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
};

export function ImageLightbox({ open, src, alt, onClose }: ImageLightboxProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            aria-label="Kapat"
            onClick={onClose}
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:top-5 sm:right-5"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <motion.div
            className="relative z-10 w-full max-w-[min(92vw,720px)]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-h-[82svh] overflow-hidden rounded-2xl bg-black sm:aspect-[3/4] sm:rounded-3xl">
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 768px) 92vw, 720px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
