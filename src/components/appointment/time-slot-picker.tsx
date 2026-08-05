"use client";

import { bookedSlots, timeSlots } from "@/lib/appointment-content";

type TimeSlotPickerProps = {
  value: string;
  onChange: (time: string) => void;
};

export function TimeSlotPicker({ value, onChange }: TimeSlotPickerProps) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-[var(--subtle)] uppercase">
        Saat
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {timeSlots.map((slot) => {
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
                  ? "cursor-not-allowed border-transparent bg-[var(--salon-gray)] text-[var(--faint)]"
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
