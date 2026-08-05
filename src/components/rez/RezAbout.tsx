"use client";

import Image from "next/image";
import { rezImages } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

const stats = [
  { value: "500+", label: "Mutlu Misafir" },
  { value: "5+", label: "Yıl Deneyim" },
  { value: "1000+", label: "Randevu" },
] as const;

export function RezAbout() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
        <FadeUp>
          <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[1.25rem] shadow-[0_16px_40px_rgba(26,22,20,0.08)] lg:mx-0">
            <Image
              src={rezImages.about}
              alt="Modern ve aydınlık tırnak stüdyosu iç mekanı"
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Hakkımızda
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
            Sakin, temiz ve özenli bir stüdyo deneyimi.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Qeva Nail Studio; yumuşak aydınlatma, premium ürünler ve steril
            protokollerle her randevuyu kişisel bir bakım ritüeline çevirir.
            Amacımız gösteriş değil, uzun süre güzel duran, doğal ve zarif
            sonuçlar.
          </p>

          <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-[rgba(26,22,20,0.08)] pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)] sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs tracking-[0.04em] text-[var(--muted)]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>
    </section>
  );
}
