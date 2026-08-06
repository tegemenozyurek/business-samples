"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { sipImages } from "@/lib/sip-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function SipReviews() {
  return (
    <section className="sip-section bg-[var(--sip-alt)]">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <h2 className="sip-display text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-5xl">
            Müşterilerimiz Ne Diyor?
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-14">
          {sipImages.testimonials.map((item, index) => (
            <FadeUp key={item.name} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      loading="lazy"
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--heading)]">
                      {item.name}
                    </h3>
                    <div
                      className="mt-1 flex gap-0.5 text-[var(--accent)]"
                      aria-label="5 yıldız"
                    >
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
