"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  densityLegend,
  getDayDensity,
  getSelectableRange,
  toDateKey,
  type DensityLevel,
} from "@/lib/appointment-content";

const weekDays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"] as const;

const beadClass: Record<DensityLevel, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  orange: "bg-orange-500",
  red: "bg-red-500",
};

type DateCalendarProps = {
  value: string;
  onChange: (dateKey: string) => void;
};

function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("tr-TR", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));
}

export function DateCalendar({ value, onChange }: DateCalendarProps) {
  const { today, end } = useMemo(() => getSelectableRange(), []);
  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));

  const minMonth = today.getMonth();
  const minYear = today.getFullYear();
  const maxMonth = end.getMonth();
  const maxYear = end.getFullYear();

  const canGoPrev =
    view.year > minYear || (view.year === minYear && view.month > minMonth);
  const canGoNext =
    view.year < maxYear || (view.year === maxYear && view.month < maxMonth);

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    // Monday-first: JS Sunday=0 → convert
    const startOffset = (first.getDay() + 6) % 7;
    const items: ({ type: "empty" } | { type: "day"; date: Date; key: string })[] =
      [];

    for (let i = 0; i < startOffset; i += 1) {
      items.push({ type: "empty" });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(view.year, view.month, day);
      items.push({ type: "day", date, key: toDateKey(date) });
    }

    return items;
  }, [view.month, view.year]);

  const goPrev = () => {
    if (!canGoPrev) return;
    setView((current) => {
      if (current.month === 0) {
        return { year: current.year - 1, month: 11 };
      }
      return { year: current.year, month: current.month - 1 };
    });
  };

  const goNext = () => {
    if (!canGoNext) return;
    setView((current) => {
      if (current.month === 11) {
        return { year: current.year + 1, month: 0 };
      }
      return { year: current.year, month: current.month + 1 };
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          aria-label="Önceki ay"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(26,22,20,0.12)] text-[var(--heading)] transition-colors hover:bg-[var(--salon-beige)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.02em] text-[var(--heading)] capitalize">
          {monthLabel(view.year, view.month)}
        </h3>
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Sonraki ay"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(26,22,20,0.12)] text-[var(--heading)] transition-colors hover:bg-[var(--salon-beige)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase sm:gap-1.5">
        {weekDays.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-1.5">
        {cells.map((cell, index) => {
          if (cell.type === "empty") {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const { date, key } = cell;
          const beforeToday = date < today;
          const afterEnd = date > end;
          const isSunday = date.getDay() === 0;
          const outOfRange = beforeToday || afterEnd || isSunday;
          const selected = value === key;
          const density = getDayDensity(key);
          const fullyBooked = !outOfRange && density === "red";
          const cannotSelect = outOfRange || fullyBooked;

          return (
            <button
              key={key}
              type="button"
              disabled={cannotSelect}
              onClick={() => onChange(key)}
              aria-pressed={selected}
              aria-label={`${key}, ${densityLegend.find((item) => item.level === density)?.label}`}
              className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm transition-all duration-300 ${
                cannotSelect
                  ? "cursor-not-allowed border-transparent text-[var(--faint)]"
                  : selected
                    ? "border-[var(--heading)] bg-[var(--heading)] text-[var(--background)]"
                    : "border-transparent text-[var(--heading)] hover:bg-[var(--salon-beige)]"
              }`}
            >
              <span className="leading-none">{date.getDate()}</span>
              <span
                className={`mt-1 h-1.5 w-1.5 rounded-full ${
                  outOfRange
                    ? "bg-[rgba(26,22,20,0.12)]"
                    : selected
                      ? "bg-white/90"
                      : beadClass[density]
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
