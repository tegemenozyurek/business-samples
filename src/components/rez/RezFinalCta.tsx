"use client";

import Link from "next/link";
import { FadeUp } from "./FadeUp";

export function RezFinalCta() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-16 lg:px-10 lg:py-20">
      <FadeUp className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[2.35rem] leading-[1.12] tracking-[-0.03em] text-[var(--heading)] sm:text-5xl">
          Bir sonraki randevunuz
          <br className="hidden sm:block" /> sizi bekliyor.
        </h2>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/rez/randevu" className="rez-btn-primary min-w-[160px]">
            Randevu Al
          </Link>
          <Link href="/rez/hizmetler" className="rez-btn-secondary min-w-[160px]">
            Hizmetler
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
