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
  titleAs?: "h2" | "h3";
};

export function ServiceCard({
  service,
  index,
  titleAs = "h2",
}: ServiceCardProps) {
  const [open, setOpen] = useState(false);
  const Title = titleAs;

  return (
    <FadeUp delay={index * 0.05} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] transition-shadow duration-500 hover:shadow-[0_14px_40px_rgba(0,0,0,0.07)]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden text-left sm:aspect-[3/2]"
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

        <div className="flex flex-1 flex-col items-center px-4 py-4 text-center sm:px-5 sm:py-5">
          <Title className="flex min-h-[2.5rem] items-center justify-center font-[family-name:var(--font-cormorant)] text-xl leading-tight tracking-[-0.02em] text-[var(--heading)] sm:min-h-[2.75rem] sm:text-2xl">
            {service.name}
          </Title>

          <div className="mt-1.5 flex items-center justify-center gap-2.5 text-sm">
            <p className="inline-flex items-center gap-1.5 text-[var(--subtle)]">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              {service.duration}
            </p>
            <p className="font-medium text-[var(--accent)]">{service.price}</p>
          </div>

          <p className="mt-2 line-clamp-2 min-h-[2.25rem] text-sm leading-snug text-[var(--muted)]">
            {service.description}
          </p>

          <div className="mt-auto w-full pt-4">
            <Link
              href="/rez/randevu"
              className="rez-btn-primary w-full px-4 py-3 text-center"
            >
              Randevu Al
            </Link>
          </div>
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
