"use client";

import { workingHours } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function WorkingHours() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Çalışma saatleri
          </h2>
        </FadeUp>

        <ul className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {workingHours.map((item, index) => (
            <li key={item.id}>
              <FadeUp delay={index * 0.04}>
                <div className="flex items-baseline justify-between gap-6 py-5">
                  <p className="font-[family-name:var(--font-cormorant)] text-xl tracking-[-0.01em] text-[var(--heading)] sm:text-2xl">
                    {item.label}
                  </p>
                  <p className="shrink-0 text-sm tracking-[0.04em] text-[var(--muted)]">
                    {item.hours}
                  </p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
