"use client";

import Image from "next/image";
import { sipImages } from "@/lib/sip-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function SipPopular() {
  return (
    <section className="sip-section bg-[var(--sip-alt)]">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <h2 className="sip-display text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-5xl">
            En Çok Tercih Edilenler
          </h2>
          <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
            Müşterilerimizin favori lezzetleri.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {sipImages.popular.map((item, index) => (
            <FadeUp key={item.name} delay={index * 0.05}>
              <article className="group h-full overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-transform duration-500 ease-out hover:-translate-y-1.5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[color-mix(in_srgb,var(--background)_82%,transparent)] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--heading)] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
