"use client";

import Link from "next/link";
import { FadeUp } from "./FadeUp";

export function RezFinalCta() {
  return (
    <section className="bg-[var(--heading)] px-6 py-24 text-[var(--background)] lg:px-10 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            Bir sonraki randevunuz sizi bekliyor.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Birkaç dakikada yerinizi ayırtın; stüdyomuzda sakin, steril ve size
            özel bir bakım deneyimi sizi karşılıyor.
          </p>
          <Link
            href="/rez/randevu"
            className="mt-9 inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-[12px] font-medium tracking-[0.16em] text-[var(--heading)] uppercase transition-opacity hover:opacity-90"
          >
            Randevu Al
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
