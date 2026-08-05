"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { galleryHeroImage } from "@/lib/gallery-content";

export function GalleryHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[58svh] overflow-hidden bg-[var(--salon-beige)] sm:min-h-[64svh]">
      <div className="absolute inset-0">
        <Image
          src={galleryHeroImage}
          alt="Luxury nail salon studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#fbf9f7]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f7] via-[#fbf9f7]/55 to-[#fbf9f7]/35" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[58svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-28 sm:min-h-[64svh] lg:px-10 lg:pb-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
              <li>
                <Link
                  href="/rez"
                  className="transition-colors hover:text-[var(--heading)]"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--heading)]">Galeri</li>
            </ol>
          </nav>

          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl tracking-[-0.02em] text-[var(--heading)] sm:text-6xl lg:text-7xl">
            Galeri
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Yaptığımız çalışmaları keşfedin. Her tasarım özenle hazırlanır ve
            profesyonel dokunuşlarla tamamlanır.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
