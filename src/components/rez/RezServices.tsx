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
            <FadeUp key={service.title} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-500 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                <button
                  type="button"
                  onClick={() =>
                    setActive({ src: service.src, alt: service.title })
                  }
                  className="relative aspect-[4/3] w-full overflow-hidden text-left sm:aspect-[5/4]"
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

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.02em] text-[var(--heading)]">
                      {service.title}
                    </h3>
                    <p className="shrink-0 pt-1 text-sm font-medium text-[var(--accent)]">
                      {service.price}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {service.description}
                  </p>
                  <Link
                    href="/rez/randevu"
                    className="rez-btn-primary mt-6 w-full text-center"
                  >
                    Randevu Al
                  </Link>
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
