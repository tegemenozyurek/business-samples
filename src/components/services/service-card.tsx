"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock } from "lucide-react";
import type { ServiceItem } from "@/lib/services-content";
import { FadeUp } from "@/components/rez/FadeUp";
import { ImageLightbox } from "@/components/rez/ImageLightbox";

type ServiceCardProps = {
  service: ServiceItem;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <FadeUp delay={index * 0.05}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-500 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[4/3] w-full overflow-hidden text-left sm:aspect-[5/4]"
          aria-label={`${service.name} görselini büyüt`}
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </button>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-[1.7rem]">
              {service.name}
            </h2>
            <p className="shrink-0 pt-1 text-sm font-medium text-[var(--accent)]">
              {service.price}
            </p>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            {service.description}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--subtle)]">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
            {service.duration}
          </p>

          <ul className="mt-4 space-y-1.5 border-t border-[var(--border)] pt-4">
            {service.features.map((feature) => (
              <li key={feature} className="text-xs text-[var(--muted)]">
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

      <ImageLightbox
        open={open}
        src={service.image}
        alt={service.name}
        onClose={() => setOpen(false)}
      />
    </FadeUp>
  );
}
