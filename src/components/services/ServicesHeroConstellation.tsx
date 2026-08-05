"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language";

const labels = {
  tr: ["Web", "Reklam", "Sosyal Medya", "İçerik", "Strateji"],
  en: ["Web", "Ads", "Social", "Content", "Strategy"],
} as const;

type ActiveTag = {
  label: string;
  top: number;
  left: number;
  visible: boolean;
};

function randomPosition() {
  return {
    top: 10 + Math.random() * 70,
    left: 6 + Math.random() * 62,
  };
}

export function ServicesHeroConstellation() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<ActiveTag | null>(null);
  const timersRef = useRef<number[]>([]);
  const indexRef = useRef(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    indexRef.current = 0;

    const items = labels[lang];

    if (prefersReducedMotion.current) {
      setActive({
        label: items[0],
        top: 42,
        left: 28,
        visible: true,
      });
      return;
    }

    setActive(null);

    const showNext = () => {
      const label = items[indexRef.current % items.length];
      indexRef.current += 1;

      setActive({
        label,
        ...randomPosition(),
        visible: true,
      });

      const visibleMs = 1800 + Math.random() * 1800;
      const hideId = window.setTimeout(() => {
        setActive((prev) => (prev ? { ...prev, visible: false } : prev));

        const nextId = window.setTimeout(showNext, 550 + Math.random() * 450);
        timersRef.current.push(nextId);
      }, visibleMs);

      timersRef.current.push(hideId);
    };

    const startId = window.setTimeout(showNext, 300);
    timersRef.current.push(startId);

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, [lang]);

  return (
    <div
      className="relative mx-auto h-[176px] w-full max-w-md sm:h-[208px] sm:max-w-lg lg:mx-0 lg:h-[256px] lg:max-w-none xl:h-[288px]"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-[var(--orb)] blur-[90px]" />

      {active ? (
        <span
          className="pointer-events-none absolute whitespace-nowrap text-sm font-medium tracking-[0.22em] text-muted uppercase transition-opacity duration-500 ease-out sm:text-[15px] lg:text-base"
          style={{
            top: `${active.top}%`,
            left: `${active.left}%`,
            opacity: active.visible ? 1 : 0,
          }}
        >
          {active.label}
        </span>
      ) : null}
    </div>
  );
}
