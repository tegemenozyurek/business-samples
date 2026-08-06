"use client";

import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { contactDetails } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function AppointmentCta() {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <FadeUp>
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Destek
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl lg:text-6xl">
            Sorularınız için.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
            Randevu öncesi emin olmak istediğiniz bir detay varsa WhatsApp’tan
            yazın ya da doğrudan arayın.
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <a
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 py-6 transition-colors"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--heading)] transition-transform duration-500 group-hover:-translate-y-0.5">
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
                  WhatsApp
                </span>
                <span className="mt-1.5 block font-[family-name:var(--font-cormorant)] text-xl tracking-[-0.01em] text-[var(--heading)] sm:text-2xl">
                  Hemen yazın
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--heading)]"
                strokeWidth={1.5}
              />
            </a>

            <a
              href={contactDetails.phoneHref}
              className="group flex items-center gap-4 py-6 transition-colors"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--heading)] transition-transform duration-500 group-hover:-translate-y-0.5">
                <Phone className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
                  Telefon
                </span>
                <span className="mt-1.5 block font-[family-name:var(--font-cormorant)] text-xl tracking-[-0.01em] text-[var(--heading)] sm:text-2xl">
                  {contactDetails.phone}
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-[var(--muted)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--heading)]"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
