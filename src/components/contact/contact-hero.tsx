"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function ContactHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--salon-beige)] px-6 pt-28 pb-14 lg:px-10 lg:pt-36 lg:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--accent)_18%,transparent)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[color-mix(in_srgb,var(--heading)_6%,transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase">
              <li>
                <Link
                  href="/rez"
                  className="transition-colors hover:text-[var(--heading)]"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--heading)]">İletişim</li>
            </ol>
          </nav>

          <p className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
            Qeva Nail Studio
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-cormorant)] text-[2.75rem] leading-[1.08] tracking-[-0.03em] text-[var(--heading)] sm:text-6xl lg:text-[4.25rem]">
            Güzelliğinize profesyonel bir dokunuş katmaya hazır mısınız?
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
