"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { rezImages } from "@/lib/rez-content";

export function RezHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--salon-beige)]">
      <div className="absolute inset-0">
        <Image
          src={rezImages.hero}
          alt="Premium tırnak stüdyosunda manikür uygulaması"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="rez-hero-fade-side absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[color-mix(in_srgb,var(--background)_35%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 pt-32 lg:items-center lg:px-10 lg:pb-24 lg:pt-28">
        <motion.div
          className="max-w-xl"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl leading-[1.05] tracking-[-0.02em] text-[var(--heading)] sm:text-6xl lg:text-7xl">
            Ellerinize yakışan sakin bir lüks.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Soft nude tonlar, steril uygulama ve kişiye özel nail care ile
            randevunuzu premium bir ritüele dönüştürüyoruz.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/rez/randevu" className="rez-btn-primary">
              Randevu Al
            </Link>
            <Link href="/rez/hizmetler" className="rez-btn-secondary">
              Hizmetleri İncele
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
