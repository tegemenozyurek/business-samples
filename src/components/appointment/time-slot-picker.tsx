"use client";

import {
  getBookedSlotsForDate,
  getTimeSlotsForDate,
} from "@/lib/appointment-content";

type TimeSlotPickerProps = {
  date: string;
  value: string;
  onChange: (time: string) => void;
};

export function TimeSlotPicker({ date, value, onChange }: TimeSlotPickerProps) {
  const slots = getTimeSlotsForDate(date);
  const bookedSlots = getBookedSlotsForDate(date);

  if (slots.length === 0) {
    return null;
  }

  return (
    <div>
      <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-[var(--subtle)] uppercase">
        Saat
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {slots.map((slot) => {
          const booked = bookedSlots.includes(slot);
          const selected = value === slot;

          return (
            <button
              key={slot}
              type="button"
              disabled={booked}
              onClick={() => onChange(slot)}
              aria-pressed={selected}
              className={`rounded-xl border px-2 py-2.5 text-sm transition-all duration-300 ${
                booked
                  ? "cursor-not-allowed border-transparent bg-[var(--salon-gray)] text-[var(--faint)] line-through"
                  : selected
                    ? "border-[var(--heading)] bg-[var(--heading)] text-[#fbf9f7]"
                    : "border-[rgba(26,22,20,0.1)] bg-white text-[var(--heading)] hover:border-[rgba(26,22,20,0.2)]"
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
