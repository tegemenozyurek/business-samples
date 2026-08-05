"use client";

import Image from "next/image";
import { rezInstagram } from "@/lib/rez-content";
import { FadeUp } from "./FadeUp";

export function RezInstagram() {
  return (
    <section className="bg-[var(--salon-beige)] px-6 py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="flex items-center justify-between gap-4">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl tracking-[-0.02em] text-[var(--heading)] sm:text-4xl">
            Instagram
          </h2>
          <a
            href={rezInstagram.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rez-btn-secondary shrink-0"
          >
            Takip Et
          </a>
        </FadeUp>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {rezInstagram.posts.map((post, index) => (
            <FadeUp key={post.src} delay={index * 0.03}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={post.src}
                  alt={`Instagram önizleme ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
