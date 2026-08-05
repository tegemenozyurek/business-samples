"use client";

import Link from "next/link";
import { workingHours } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function WorkingHours() {
  const today = new Date().getDay();

  return (
    <section className="bg-[var(--salon-beige)] px-6 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <FadeUp>
            <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
              Saatler
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
              Çalışma saatleri
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <Link href="/rez/randevu" className="rez-btn-primary">
              Randevu Al
            </Link>
          </FadeUp>
        </div>

        <FadeUp delay={0.08} className="mt-8">
          <ul className="border-y border-[rgba(26,22,20,0.1)]">
            {workingHours.map((item) => {
              const isToday = item.days.includes(today);

              return (
                <li
                  key={item.id}
                  className="flex items-baseline justify-between gap-6 border-b border-[rgba(26,22,20,0.1)] py-5 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.02em] text-[var(--heading)]">
                      {item.label}
                    </p>
                    {isToday ? (
                      <p className="mt-1 text-[10px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
                        Bugün
                      </p>
                    ) : null}
                  </div>
                  <p
                    className={`shrink-0 text-sm tracking-[0.04em] ${
                      isToday
                        ? "font-medium text-[var(--heading)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {item.hours}
                  </p>
                </li>
              );
            })}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
