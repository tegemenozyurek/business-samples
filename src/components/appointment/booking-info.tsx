"use client";

import { bookingInfoCards } from "@/lib/appointment-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function BookingInfo() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Bilgilendirme
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Randevu öncesi bilmeniz gerekenler.
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {bookingInfoCards.map((card, index) => (
            <FadeUp key={card.title} delay={index * 0.05}>
              <article className="h-full rounded-[1.5rem] border border-[rgba(26,22,20,0.06)] bg-white p-6 shadow-[0_12px_40px_rgba(26,22,20,0.04)] transition-transform duration-500 hover:-translate-y-1">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {card.description}
                </p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
