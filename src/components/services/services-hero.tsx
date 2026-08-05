"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { servicesHeroImage } from "@/lib/services-content";

export function ServicesHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[58svh] overflow-hidden bg-[var(--salon-beige)] sm:min-h-[64svh]">
      <div className="absolute inset-0">
        <Image
          src={servicesHeroImage}
          alt="Luxury nail salon hizmet alanı"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="rez-hero-wash absolute inset-0" />
        <div className="rez-hero-fade absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[58svh] max-w-7xl flex-col justify-end px-6 pb-14 pt-28 sm:min-h-[64svh] lg:px-10 lg:pb-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl tracking-[-0.02em] text-[var(--heading)] sm:text-6xl lg:text-7xl">
            Hizmetlerimiz
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Bakımlı eller ve kusursuz tırnak tasarımları için profesyonel
            hizmetler sunuyoruz.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
