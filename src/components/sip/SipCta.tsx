"use client";

import Link from "next/link";
import { FadeUp } from "@/components/rez/FadeUp";

export function SipCta() {
  return (
    <section className="sip-section bg-[var(--background)]">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--heading)_92%,var(--background))] px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/4 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_45%,transparent),transparent_70%)] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[18%] -bottom-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_72%)] blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="sip-display text-3xl tracking-[-0.03em] text-[var(--background)] sm:text-4xl lg:text-5xl">
                Bugün Ne Yiyeceğine Karar Ver!
              </h2>
              <p className="mt-4 text-base text-[color-mix(in_srgb,var(--background)_72%,transparent)] sm:text-lg">
                Taptaze ürünlerimiz seni bekliyor.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/sip/menu" className="sip-btn-primary">
                  Menüyü İncele
                </Link>
                <Link
                  href="/sip/iletisim"
                  className="inline-flex items-center justify-center rounded-[1rem] border border-[color-mix(in_srgb,var(--background)_35%,transparent)] bg-transparent px-[1.8rem] py-[0.95rem] text-[12px] font-semibold tracking-[0.14em] text-[var(--background)] uppercase transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--background)_12%,transparent)]"
                >
                  İletişime Geç
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
