"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { sipImages } from "@/lib/sip-content";

export function SipHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--background)]">
      <div className="sip-section relative z-10 mx-auto grid max-w-7xl items-center gap-12 !pt-36 sm:!pt-40 lg:grid-cols-2 lg:gap-16 lg:!pt-36">
        <div>
          <motion.h1
            className="sip-display text-4xl leading-[1.05] tracking-[-0.03em] text-[var(--heading)] sm:text-5xl lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Lezzetin Buluşma Noktası
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Günlük hazırlanan tostlar, sandviçler, burgerler, atıştırmalıklar ve
            ferahlatıcı içeceklerle günün her saatinde taze lezzetler sunuyoruz.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/sip/menu" className="sip-btn-primary">
              Menüyü İncele
            </Link>
            <Link href="/sip/iletisim" className="sip-btn-secondary">
              İletişime Geç
            </Link>
          </motion.div>
        </div>

        <div className="relative mx-auto w-[88%] max-w-sm sm:max-w-md lg:w-full lg:max-w-[22rem] xl:max-w-md">
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-8 -left-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--heading)_10%,transparent),transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/3 -left-4 h-16 w-16 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]/50"
          />
          <div
            aria-hidden="true"
            className="absolute right-4 bottom-16 h-10 w-10 rounded-full border border-[var(--border-strong)]"
          />

          <motion.div
            className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_30px_80px_color-mix(in_srgb,var(--foreground)_18%,transparent)]"
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={sipImages.hero}
              alt="Taze hazırlanmış premium burger"
              fill
              priority
              sizes="(max-width: 1024px) 360px, 400px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
