"use client";

import Link from "next/link";
import { workingHours } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function WorkingHours() {
  const today = new Date().getDay();

  return (
    <section className="bg-[var(--heading)] px-6 py-16 text-[#fbf9f7] lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
        <FadeUp>
          <p className="text-[11px] font-medium tracking-[0.24em] text-white/50 uppercase">
            Saatler
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] sm:text-5xl">
            Çalışma saatleri
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Randevulu çalışıyoruz. Uygun saatinizi seçmek için online randevu
            alın.
          </p>
          <Link
            href="/rez/randevu"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-[12px] font-medium tracking-[0.16em] text-[var(--heading)] uppercase transition-opacity hover:opacity-90"
          >
            Randevu Al
          </Link>
        </FadeUp>

        <ul className="space-y-1">
          {workingHours.map((item, index) => {
            const isToday = item.days.includes(today);

            return (
              <li key={item.id}>
                <FadeUp delay={index * 0.05}>
                  <div
                    className={`flex items-center justify-between gap-6 rounded-2xl px-5 py-4 transition-colors ${
                      isToday ? "bg-white/10" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isToday ? "bg-white" : "bg-white/25"
                        }`}
                      />
                      <div>
                        <p className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.01em]">
                          {item.label}
                        </p>
                        {isToday ? (
                          <p className="mt-0.5 text-[10px] font-medium tracking-[0.16em] text-white/55 uppercase">
                            Bugün
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <p
                      className={`text-sm tracking-[0.04em] ${
                        isToday ? "text-white" : "text-white/55"
                      }`}
                    >
                      {item.hours}
                    </p>
                  </div>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
