"use client";

import Image from "next/image";
import Link from "next/link";
import { rezImages } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

export function RezServices() {
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rezImages.services.map((service, index) => (
            <FadeUp key={service.title} delay={index * 0.05}>
              <article className="group overflow-hidden rounded-[1.5rem] border border-[rgba(26,22,20,0.06)] bg-white shadow-[0_12px_40px_rgba(26,22,20,0.04)] transition-transform duration-500 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.src}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)]">
                      {service.title}
                    </h3>
                    <p className="shrink-0 text-sm font-medium text-[var(--accent)]">
                      {service.price}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {service.description}
                  </p>
                  <Link
                    href="/rez/randevu"
                    className="mt-6 inline-flex text-[12px] font-medium tracking-[0.16em] text-[var(--heading)] uppercase transition-opacity hover:opacity-70"
                  >
                    Randevu Al
                  </Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
