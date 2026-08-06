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
      <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] p-1">
        <button
          type="button"
          onClick={() => cart.decrement(id)}
          aria-label={`${name} adet azalt`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--heading)] transition-colors hover:bg-[var(--surface-hover)]"
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={2.25} />
        </button>
        <span className="min-w-8 text-center text-sm font-semibold tabular-nums text-[var(--heading)]">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => cart.increment(id)}
          aria-label={`${name} adet artır`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--heading)] transition-colors hover:bg-[var(--surface-hover)]"
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
      className={`inline-flex min-h-11 min-w-[8.5rem] items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
        justAdded
          ? "bg-emerald-500 text-white"
          : "bg-[var(--accent)] text-[var(--background)] hover:opacity-90"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="added"
            className="inline-flex items-center gap-2"
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
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            Sepete Ekle
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

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {sipImages.popular.map((item, index) => (
            <FadeUp key={item.name} delay={index * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] transition-transform duration-500 ease-out hover:-translate-y-1.5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[color-mix(in_srgb,var(--background)_82%,transparent)] px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[var(--heading)] backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                    <p className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)]">
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
