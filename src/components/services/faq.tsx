"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { servicesFaq } from "@/lib/services-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[var(--salon-gray)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <FadeUp>
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            SSS
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Sık sorulan sorular.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)]">
            Randevu öncesi merak ettiğiniz başlıkları sade ve net yanıtladık.
          </p>
        </FadeUp>

        <div className="space-y-3">
          {servicesFaq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeUp key={item.question} delay={index * 0.04}>
                <div className="overflow-hidden rounded-[1.25rem] border border-[rgba(26,22,20,0.06)] bg-white shadow-[0_10px_30px_rgba(26,22,20,0.04)]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-[var(--heading)] sm:text-[15px]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="border-t border-[rgba(26,22,20,0.06)] px-5 py-4 text-sm leading-relaxed text-[var(--muted)]">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
