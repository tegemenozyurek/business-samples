"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/rez/FadeUp";
import { sipImages } from "@/lib/sip-content";

export function SipCta() {
  return (
    <section className="sip-section bg-[var(--sip-alt)]">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_60px_color-mix(in_srgb,var(--foreground)_6%,transparent)] sm:rounded-[2rem]">
            <div className="grid lg:grid-cols-2">
              <div className="relative order-2 min-h-[240px] sm:min-h-[300px] lg:order-1 lg:min-h-[380px]">
                <Image
                  src={sipImages.popular[2].src}
                  alt="Taze hazırlanmış burger"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--heading)_35%,transparent)] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[color-mix(in_srgb,var(--surface)_55%,transparent)]" />
              </div>

              <div className="order-1 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:order-2 lg:px-12 xl:px-16">
                <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                  Sipariş Zamanı
                </p>
                <h2 className="sip-display mt-3 max-w-md text-3xl leading-[1.08] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-[2.75rem]">
                  Bugün Ne Yiyeceğine Karar Ver!
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                  Taptaze ürünlerimiz seni bekliyor.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/sip/menu" className="sip-btn-primary">
                    Menüyü İncele
                  </Link>
                  <Link href="/sip/iletisim" className="sip-btn-secondary">
                    İletişime Geç
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
