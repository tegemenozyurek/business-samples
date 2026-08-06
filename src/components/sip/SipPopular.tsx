"use client";

import { useMemo } from "react";
import { getVisibleSipPopular } from "@/lib/sip-store";
import { useSipMenuOverrides } from "@/lib/use-sip-store";
import { FadeUp } from "@/components/rez/FadeUp";
import { SipProductGrid } from "./SipProductCard";

export function SipPopular() {
  const { overrides, ready } = useSipMenuOverrides();
  const products = useMemo(
    () => (ready ? getVisibleSipPopular(overrides) : []),
    [overrides, ready],
  );

  if (ready && products.length === 0) return null;

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

        <SipProductGrid products={products} />
      </div>
    </section>
  );
}
