"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { rezImages } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";
import { ImageLightbox } from "./ImageLightbox";

export function RezServices() {
  const [active, setActive] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <section className="bg-[var(--background)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Hizmetler
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Bakımın her detayı düşünülmüş.
          </h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {rezImages.services.map((service, index) => (
            <FadeUp key={service.title} delay={index * 0.05} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-500 hover:shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
                <button
                  type="button"
                  onClick={() =>
                    setActive({ src: service.src, alt: service.title })
                  }
                  className="relative aspect-[16/10] w-full shrink-0 overflow-hidden text-left sm:aspect-[3/2]"
                  aria-label={`${service.title} görselini büyüt`}
                >
                  <Image
                    src={service.src}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </button>

                <div className="flex flex-1 flex-col items-center px-4 py-4 text-center sm:px-5 sm:py-5">
                  <h3 className="flex min-h-[2.5rem] items-center justify-center font-[family-name:var(--font-cormorant)] text-xl leading-tight tracking-[-0.02em] text-[var(--heading)] sm:min-h-[2.75rem] sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-[var(--accent)]">
                    {service.price}
                  </p>
                  <p className="mt-2 line-clamp-2 min-h-[2.25rem] flex-1 text-sm leading-snug text-[var(--muted)]">
                    {service.description}
                  </p>
                  <div className="mt-auto w-full pt-4">
                    <Link
                      href="/rez/randevu"
                      className="rez-btn-primary w-full px-4 py-3 text-center"
                    >
                      Randevu Al
                    </Link>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>

      <ImageLightbox
        open={Boolean(active)}
        src={active?.src ?? ""}
        alt={active?.alt ?? ""}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
