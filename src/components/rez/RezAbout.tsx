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
    <section className="bg-[var(--salon-beige)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(26,22,20,0.08)]">
            <Image
              src={rezImages.about}
              alt="Modern ve aydınlık tırnak stüdyosu iç mekanı"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Hakkımızda
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Sakin, temiz ve özenli bir stüdyo deneyimi.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--muted)]">
            Qeva Nail Studio; yumuşak aydınlatma, premium ürünler ve steril
            protokollerle her randevuyu kişisel bir bakım ritüeline çevirir.
            Amacımız gösteriş değil, uzun süre güzel duran, doğal ve zarif
            sonuçlar.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[rgba(26,22,20,0.08)] pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--heading)] sm:text-4xl">
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
