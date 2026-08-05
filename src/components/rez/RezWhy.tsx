"use client";

import { Droplets, Sparkles, ShieldCheck, HandHeart } from "lucide-react";
import { rezWhy } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

const icons = [Sparkles, ShieldCheck, HandHeart, Droplets];

export function RezWhy() {
  return (
    <section className="bg-[var(--background)] px-6 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="max-w-xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Neden Biz
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
            Lüks, hijyen ve kişisellik bir arada.
          </h2>
        </FadeUp>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {rezWhy.map((item, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <FadeUp key={item.title} delay={index * 0.04}>
                <article className="flex h-full items-start gap-4 rounded-[1.15rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition-colors duration-300 hover:bg-[var(--surface-hover)] sm:px-5 sm:py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--heading)]">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl leading-tight tracking-[-0.02em] text-[var(--heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                      {item.description}
                    </p>
                  </div>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
