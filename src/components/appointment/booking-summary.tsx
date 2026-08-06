"use client";

import { Calendar, Clock, Sparkles } from "lucide-react";

type BookingSummaryProps = {
  serviceName?: string;
  date?: string;
  time?: string;
  duration?: string;
  price?: string;
};

export function BookingSummary({
  serviceName,
  date,
  time,
  duration,
  price,
}: BookingSummaryProps) {
  const rows = [
    {
      icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} />,
      label: "Hizmet",
      value: serviceName ?? "Seçilmedi",
    },
    {
      icon: <Calendar className="h-4 w-4" strokeWidth={1.5} />,
      label: "Tarih",
      value: date || "Seçilmedi",
    },
    {
      icon: <Clock className="h-4 w-4" strokeWidth={1.5} />,
      label: "Saat",
      value: time || "Seçilmedi",
    },
  ];

  return (
    <aside className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_16px_50px_rgba(26,22,20,0.05)] lg:sticky lg:top-28">
      <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--heading)]">
        Özet
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Seçimleriniz anlık güncellenir.
      </p>

      <dl className="mt-6 space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4"
          >
            <dt className="flex items-center gap-2 text-xs tracking-[0.12em] text-[var(--subtle)] uppercase">
              {row.icon}
              {row.label}
            </dt>
            <dd className="text-right text-sm font-medium text-[var(--heading)]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[var(--salon-beige)] px-4 py-3">
          <p className="text-[10px] tracking-[0.14em] text-[var(--subtle)] uppercase">
            Süre
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--heading)]">
            {duration ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl bg-[var(--salon-beige)] px-4 py-3">
          <p className="text-[10px] tracking-[0.14em] text-[var(--subtle)] uppercase">
            Fiyat
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--accent)]">
            {price ?? "—"}
          </p>
        </div>
      </div>

      <p className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--salon-gray)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
        Lütfen randevu saatinden 10 dakika önce salonda olun.
      </p>
    </aside>
  );
}
