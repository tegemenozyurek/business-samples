"use client";

import Image from "next/image";
import { rezInstagram } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RezInstagram() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-[var(--accent)] uppercase">
              Instagram
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
              {rezInstagram.handle}
            </h2>
          </div>
          <a
            href={rezInstagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rez-btn-primary inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram&apos;da Takip Et
          </a>
        </FadeUp>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {rezInstagram.posts.map((post, index) => (
            <FadeUp key={post.src} delay={index * 0.04}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-[1.25rem]"
              >
                <Image
                  src={post.src}
                  alt={`Instagram önizleme ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
