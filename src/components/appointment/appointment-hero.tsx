"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { appointmentHeroImage } from "@/lib/appointment-content";

export function AppointmentHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[52svh] overflow-hidden bg-[var(--salon-beige)] sm:min-h-[58svh]">
      <div className="absolute inset-0">
        <Image
          src={appointmentHeroImage}
          alt="Premium nail salon randevu deneyimi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="rez-hero-wash absolute inset-0" />
        <div className="rez-hero-fade absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-7xl flex-col justify-end px-6 pb-12 pt-28 sm:min-h-[58svh] lg:px-10 lg:pb-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl tracking-[-0.02em] text-[var(--heading)] sm:text-6xl lg:text-7xl">
            Randevu Al
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Size en uygun tarih ve saati seçerek kolayca randevunuzu oluşturun.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
