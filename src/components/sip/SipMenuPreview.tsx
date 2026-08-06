"use client";

import Image from "next/image";
import Link from "next/link";
import { sipImages } from "@/lib/sip-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function SipMenuPreview() {
  return (
    <section className="sip-section bg-[var(--sip-alt)]">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Menü
          </p>
          <h2 className="sip-display mt-3 text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-5xl">
            Kategorilere Göz At
          </h2>
        </FadeUp>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mt-14 xl:grid-cols-6">
          {sipImages.categories.map((item, index) => (
            <FadeUp key={item.title} delay={index * 0.04}>
              <article className="group h-full overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-[var(--surface)] transition-transform duration-300 hover:-translate-y-1 sm:rounded-[1.35rem]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="sip-display text-lg tracking-[-0.02em] text-[var(--heading)] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)] sm:mt-1.5 sm:text-sm">
                    {item.text}
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-10 flex justify-center lg:mt-12">
          <Link href="/sip/menu" className="sip-btn-primary">
            Tüm Menüyü Gör
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
