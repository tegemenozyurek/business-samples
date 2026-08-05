"use client";

import { Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { servicesWhy } from "@/lib/services-content";
import { FadeUp } from "@/components/rez/FadeUp";

const icons = [Star, ShieldCheck, Sparkles, Heart];

export function WhyUs() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Neden Biz
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Hizmetlerimizi özel kılan detaylar.
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesWhy.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <FadeUp key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-[1.5rem] border border-[rgba(26,22,20,0.06)] bg-white p-7 shadow-[0_12px_40px_rgba(26,22,20,0.04)] transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--salon-gray)] text-[var(--heading)]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
