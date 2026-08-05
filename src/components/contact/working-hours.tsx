"use client";

import { workingHours } from "@/lib/contact-content";
import { FadeUp } from "@/components/rez/FadeUp";

export function WorkingHours() {
  const today = new Date().getDay();

  return (
    <section className="bg-[var(--salon-beige)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
            Saatler
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
            Çalışma saatlerimiz.
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {workingHours.map((item, index) => {
            const isToday = item.days.includes(today);
            return (
              <FadeUp key={item.id} delay={index * 0.06}>
                <article
                  className={`rounded-[1.5rem] border p-7 shadow-[0_12px_40px_rgba(26,22,20,0.04)] transition-transform duration-500 hover:-translate-y-1 ${
                    isToday
                      ? "border-[var(--heading)] bg-[var(--heading)] text-[#fbf9f7]"
                      : "border-[rgba(26,22,20,0.06)] bg-white text-[var(--heading)]"
                  }`}
                >
                  {isToday ? (
                    <p className="text-[10px] font-medium tracking-[0.18em] text-white/70 uppercase">
                      Bugün
                    </p>
                  ) : (
                    <p className="text-[10px] font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
                      Saat
                    </p>
                  )}
                  <h3 className="mt-3 font-[family-name:var(--font-cormorant)] text-2xl">
                    {item.label}
                  </h3>
                  <p
                    className={`mt-3 text-sm ${
                      isToday ? "text-white/75" : "text-[var(--muted)]"
                    }`}
                  >
                    {item.hours}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
