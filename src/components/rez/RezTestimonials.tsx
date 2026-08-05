"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { rezImages } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

export function RezTestimonials() {
  return (
    <section className="bg-[var(--background)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Yorumlar
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Misafirlerimizin sessiz lüksü.
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {rezImages.testimonials.map((item, index) => (
            <FadeUp key={item.name} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[rgba(26,22,20,0.06)] bg-white p-7 shadow-[0_12px_40px_rgba(26,22,20,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[var(--heading)]">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex gap-0.5 text-[var(--accent)]" aria-label="5 yıldız">
                      {Array.from({ length: 5 }).map((_, star) => (
                        <Star
                          key={star}
                          className="h-3.5 w-3.5 fill-current"
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-6 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  “{item.review}”
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
