"use client";

import { useMemo, useState } from "react";
import {
  getMenuByCategory,
  sipCategoryOrder,
  sipImages,
  type SipProduct,
} from "@/lib/sip-content";
import { SipProductGrid } from "./SipProductCard";

type MenuTab = "Favoriler" | (typeof sipCategoryOrder)[number];

const tabs: MenuTab[] = ["Favoriler", ...sipCategoryOrder];

export function SipMenuPage() {
  const [active, setActive] = useState<MenuTab>("Favoriler");

  const products = useMemo<readonly SipProduct[]>(() => {
    if (active === "Favoriler") return sipImages.popular;
    return getMenuByCategory(active);
  }, [active]);

  const subtitle =
    active === "Favoriler"
      ? "Müşterilerimizin favori lezzetleri."
      : (sipImages.categories.find((item) => item.title === active)?.text ?? "");

  return (
    <main>
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-6 pt-36 pb-10 sm:pt-40 sm:pb-12 lg:px-10 lg:pt-36">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Menü
          </p>
          <h1 className="sip-display mt-3 text-4xl tracking-[-0.03em] text-[var(--heading)] sm:text-5xl">
            Lezzet Menümüz
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Kategori seç, ürünlere göz at, sepete ekle.
          </p>
        </div>
      </section>

      <section className="bg-[var(--sip-alt)]">
        <div className="mx-auto max-w-7xl px-6 pt-6 pb-[3.75rem] sm:pt-8 sm:pb-20 lg:px-10 lg:pb-[7.5rem]">
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Menü kategorileri"
          >
            {tabs.map((tab) => {
              const selected = active === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(tab)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 ${
                    selected
                      ? "bg-[var(--accent)] text-[var(--background)]"
                      : "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--heading)] hover:text-[var(--heading)]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {subtitle ? (
            <p className="mt-6 max-w-2xl text-base text-[var(--muted)] sm:mt-8 sm:text-lg">
              {subtitle}
            </p>
          ) : null}

          <SipProductGrid
            key={active}
            products={products}
            className="!mt-4 sm:!mt-5 lg:!mt-6"
          />
        </div>
      </section>
    </main>
  );
}
