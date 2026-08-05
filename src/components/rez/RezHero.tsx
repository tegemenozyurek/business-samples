"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contactDetails, getDirectionsUrl } from "@/lib/contact-content";
import { rezImages } from "@/lib/rez-content";

export function RezHero() {
  const reduceMotion = useReducedMotion();
  const [directionsUrl, setDirectionsUrl] = useState(
    contactDetails.directionsGoogleUrl,
  );

  useEffect(() => {
    setDirectionsUrl(getDirectionsUrl());
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[var(--salon-beige)]">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={rezImages.hero}
          alt="Premium tırnak stüdyosunda manikür uygulaması"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_srgb,var(--background)_92%,transparent)_0%,color-mix(in_srgb,var(--background)_72%,transparent)_38%,color-mix(in_srgb,var(--background)_28%,transparent)_68%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[color-mix(in_srgb,var(--background)_40%,transparent)]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 sm:pb-20 lg:justify-center lg:px-10 lg:pb-24 lg:pt-28">
        <div className="max-w-2xl">
          <motion.p
            className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl lg:text-5xl"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Qeva Nail Studio
          </motion.p>

          <motion.h1
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] tracking-[-0.02em] text-[var(--heading)] sm:text-5xl lg:mt-5 lg:text-6xl"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Ellerinize yakışan sakin bir lüks.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Soft nude tonlar, steril uygulama ve kişiye özel nail care.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/rez/randevu" className="rez-btn-primary">
              Randevu Al
            </Link>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rez-btn-secondary"
            >
              Yol Tarifi Al
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
