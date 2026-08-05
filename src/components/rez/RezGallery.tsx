"use client";

import Image from "next/image";
import Link from "next/link";
import { rezImages } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

export function RezGallery() {
  return (
    <section className="bg-[var(--salon-gray)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
              Galeri
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
              Seçilmiş işlerimiz.
            </h2>
          </div>
          <Link href="/rez/gallery" className="rez-btn-secondary self-start sm:self-auto">
            Tüm Galeriyi Gör
          </Link>
        </FadeUp>

        <div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4">
          {rezImages.gallery.map((src, index) => (
            <FadeUp key={src} delay={(index % 4) * 0.04} className="mb-4 break-inside-avoid">
              <div
                className={`relative overflow-hidden rounded-[1.25rem] ${
                  index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Nail studio galeri görseli ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
