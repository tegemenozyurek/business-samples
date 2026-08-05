"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { appointmentServices } from "@/lib/appointment-content";

type ServiceSelectorProps = {
  value: string;
  onChange: (serviceId: string) => void;
};

export function ServiceSelector({ value, onChange }: ServiceSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {appointmentServices.map((service) => {
        const selected = value === service.id;

        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onChange(service.id)}
            aria-pressed={selected}
            className={`group flex w-full overflow-hidden rounded-[1.25rem] border text-left transition-all duration-300 ${
              selected
                ? "border-[var(--heading)] bg-white shadow-[0_0_0_1px_var(--heading)]"
                : "border-[rgba(26,22,20,0.08)] bg-white hover:border-[rgba(26,22,20,0.16)]"
            }`}
          >
            <span className="relative w-24 shrink-0 self-stretch sm:w-28">
              <Image
                src={service.image}
                alt={service.name}
                fill
                loading="lazy"
                sizes="112px"
                className="object-cover"
              />
            </span>
            <span className="flex min-w-0 flex-1 flex-col justify-between p-4">
              <span className="flex items-start justify-between gap-2">
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--heading)]">
                  {service.name}
                </span>
                {selected ? (
                  <Check
                    className="h-4 w-4 shrink-0 text-[var(--heading)]"
                    strokeWidth={1.75}
                  />
                ) : null}
              </span>
              <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                {service.description}
              </span>
              <span className="mt-3 flex items-center justify-between gap-2 text-[11px]">
                <span className="text-[var(--subtle)]">{service.duration}</span>
                <span className="font-medium text-[var(--accent)]">
                  {service.price}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
