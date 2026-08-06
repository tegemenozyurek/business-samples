"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { sipImages } from "@/lib/sip-content";
import { useCart } from "@/lib/cart";
import { FadeUp } from "@/components/rez/FadeUp";

function AddToCartButton({ id, name }: { id: string; name: string }) {
  const cart = useCart();
  const qty = cart?.getQty(id) ?? 0;
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 700);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  if (!cart) return null;

  if (qty > 0 && !justAdded) {
    return (
      <div className="inline-flex w-full items-center justify-between gap-1 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] p-0.5 sm:w-auto sm:justify-center sm:gap-1 sm:p-1">
        <button
          type="button"
          onClick={() => cart.decrement(id)}
          aria-label={`${name} adet azalt`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--heading)] transition-colors hover:bg-[var(--surface-hover)] sm:h-9 sm:w-9"
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={2.25} />
        </button>
        <span className="min-w-6 text-center text-sm font-semibold tabular-nums text-[var(--heading)] sm:min-w-8">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => cart.increment(id)}
          aria-label={`${name} adet artır`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--heading)] transition-colors hover:bg-[var(--surface-hover)] sm:h-9 sm:w-9"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
        </button>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => {
        cart.addItem(id);
        setJustAdded(true);
      }}
      whileTap={{ scale: 0.96 }}
      aria-label={`${name} sepete ekle`}
      className={`inline-flex w-full min-h-9 items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 sm:min-h-11 sm:w-auto sm:min-w-[8.5rem] sm:gap-2 sm:px-3.5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.12em] ${
        justAdded
          ? "bg-emerald-500 text-white"
          : "bg-[var(--accent)] text-[var(--background)] hover:opacity-90"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="added"
            className="inline-flex items-center gap-1.5 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Eklendi
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="add"
            className="inline-flex items-center gap-1.5 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span className="sm:hidden">Ekle</span>
            <span className="hidden sm:inline">Sepete Ekle</span>
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function SipPopular() {
  return (
    <section className="sip-section bg-[var(--sip-alt)]">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="max-w-2xl">
          <h2 className="sip-display text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-5xl">
            En Çok Tercih Edilenler
          </h2>
          <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
            Müşterilerimizin favori lezzetleri.
          </p>
        </FadeUp>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {sipImages.popular.map((item, index) => (
            <FadeUp key={item.name} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:rounded-[1.5rem]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-[color-mix(in_srgb,var(--background)_82%,transparent)] px-2 py-0.5 text-[9px] font-semibold tracking-[0.06em] text-[var(--heading)] backdrop-blur-md sm:top-3 sm:left-3 sm:px-3 sm:py-1 sm:text-[11px] sm:tracking-[0.08em]">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-5 md:p-6">
                  <h3 className="sip-display text-lg leading-tight tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-[var(--muted)] sm:mt-2 sm:line-clamp-none sm:text-sm">
                    {item.description}
                  </p>

                  <div className="mt-3 flex flex-col gap-2 border-t border-[var(--border)] pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
                    <p className="sip-display text-right text-xl tracking-[-0.02em] text-[var(--heading)] sm:text-left sm:text-2xl">
                      {item.price}
                    </p>
                    <AddToCartButton id={item.name} name={item.name} />
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
