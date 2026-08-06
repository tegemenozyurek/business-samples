"use client";

import { sipImages } from "@/lib/sip-content";
import { FadeUp } from "@/components/rez/FadeUp";
import { SipProductGrid } from "./SipProductCard";

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

        <SipProductGrid products={sipImages.popular} />
      </div>
    </section>
  );
}
