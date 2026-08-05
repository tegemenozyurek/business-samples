"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import type { ServiceItem } from "@/lib/services-content";
import { FadeUp } from "@/components/rez/FadeUp";

type ServiceCardProps = {
  service: ServiceItem;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <FadeUp delay={index * 0.05}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[rgba(26,22,20,0.06)] bg-white shadow-[0_12px_40px_rgba(26,22,20,0.04)] transition-transform duration-500 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--heading)] sm:text-[1.7rem]">
              {service.name}
            </h2>
            <p className="shrink-0 text-sm font-medium text-[var(--accent)]">
              {service.price}
            </p>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {service.description}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.04em] text-[var(--subtle)]">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
            {service.duration}
          </p>

          <ul className="mt-5 space-y-2 border-t border-[rgba(26,22,20,0.06)] pt-5">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs text-[var(--muted)]"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.75}
                />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/rez/randevu"
            className="rez-btn-primary mt-6 w-full text-center"
          >
            Randevu Al
          </Link>
        </div>
      </article>
    </FadeUp>
  );
}
