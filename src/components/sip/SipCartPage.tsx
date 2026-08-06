"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { Banknote, Check, CreditCard, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import {
  findProductByName,
  formatPrice,
  parsePrice,
} from "@/lib/sip-content";

type PaymentMethod = "cash" | "card";

type FormState = {
  name: string;
  phone: string;
  address: string;
  note: string;
  payment: PaymentMethod;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  address: "",
  note: "",
  payment: "cash",
};

export function SipCartPage() {
  const cart = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const lines = useMemo(() => {
    if (!cart) return [];
    return Object.entries(cart.items)
      .map(([name, qty]) => {
        const product = findProductByName(name);
        if (!product) return null;
        const unit = parsePrice(product.price);
        return {
          product,
          qty,
          unit,
          lineTotal: unit * qty,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [cart]);

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  );

  if (!cart) return null;

  if (submitted) {
    return (
      <main>
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex min-h-[70svh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)]">
              <Check className="h-7 w-7" strokeWidth={2.25} />
            </span>
            <h1 className="sip-display mt-6 text-4xl tracking-[-0.03em] text-[var(--heading)] sm:text-5xl">
              Siparişin Alındı
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Ödeme kapıda{" "}
              {form.payment === "cash" ? "nakit" : "kart"} ile yapılacak.
              Hazırlanınca seni arayacağız.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/sip/menu" className="sip-btn-primary">
                Menüye Dön
              </Link>
              <Link href="/sip" className="sip-btn-secondary">
                Ana Sayfa
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main>
        <section className="bg-[var(--background)]">
          <div className="mx-auto flex min-h-[70svh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
            <h1 className="sip-display text-4xl tracking-[-0.03em] text-[var(--heading)] sm:text-5xl">
              Sepetin Boş
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Henüz ürün eklemedin. Menüden favorilerini seçip sepete ekleyebilirsin.
            </p>
            <Link href="/sip/menu" className="sip-btn-primary mt-8">
              Menüyü İncele
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Lütfen ad, telefon ve adres bilgilerini doldur.");
      return;
    }
    cart.clear();
    setSubmitted(true);
  };

  return (
    <main>
      <section className="bg-[var(--background)]">
        <div className="mx-auto max-w-7xl px-6 pt-36 pb-8 sm:pt-40 sm:pb-10 lg:px-10 lg:pt-36">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Sepet
          </p>
          <h1 className="sip-display mt-3 text-4xl tracking-[-0.03em] text-[var(--heading)] sm:text-5xl">
            Siparişini Tamamla
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Ödeme yalnızca kapıda nakit veya kart ile alınır.
          </p>
        </div>
      </section>

      <section className="sip-section bg-[var(--sip-alt)] !pt-6 sm:!pt-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8"
        >
          <div className="space-y-6">
            <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
                  Ürünler
                </h2>
                <button
                  type="button"
                  onClick={() => cart.clear()}
                  className="text-[11px] font-semibold tracking-[0.12em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--heading)]"
                >
                  Temizle
                </button>
              </div>

              <ul className="mt-5 space-y-3">
                {lines.map((line) => (
                  <li
                    key={line.product.name}
                    className="flex gap-3 rounded-[1.15rem] border border-[var(--border)] bg-[var(--background)] p-3 sm:gap-4 sm:p-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                      <Image
                        src={line.product.src}
                        alt={line.product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="sip-display truncate text-xl tracking-[-0.02em] text-[var(--heading)]">
                            {line.product.name}
                          </h3>
                          <p className="mt-0.5 text-sm text-[var(--muted)]">
                            {line.product.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.removeItem(line.product.name)}
                          aria-label={`${line.product.name} kaldır`}
                          className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--heading)]"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-0.5">
                          <button
                            type="button"
                            onClick={() => cart.decrement(line.product.name)}
                            aria-label="Adet azalt"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--heading)] transition-colors hover:bg-[var(--surface-hover)]"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.25} />
                          </button>
                          <span className="min-w-7 text-center text-sm font-semibold tabular-nums text-[var(--heading)]">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => cart.increment(line.product.name)}
                            aria-label="Adet artır"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--heading)] transition-colors hover:bg-[var(--surface-hover)]"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
                          </button>
                        </div>
                        <p className="sip-display text-xl tracking-[-0.02em] text-[var(--heading)]">
                          {formatPrice(line.lineTotal)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-6">
              <h2 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
                Teslimat Bilgileri
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Ad Soyad
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--heading)] outline-none transition-colors focus:border-[var(--accent)]"
                    placeholder="Adın Soyadın"
                  />
                </label>

                <label className="block sm:col-span-1">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Telefon
                  </span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--heading)] outline-none transition-colors focus:border-[var(--accent)]"
                    placeholder="05xx xxx xx xx"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Adres
                  </span>
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(event) => updateField("address", event.target.value)}
                    className="mt-2 w-full resize-none rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--heading)] outline-none transition-colors focus:border-[var(--accent)]"
                    placeholder="Mahalle, sokak, bina no, daire"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Sipariş Notu
                  </span>
                  <textarea
                    rows={2}
                    value={form.note}
                    onChange={(event) => updateField("note", event.target.value)}
                    className="mt-2 w-full resize-none rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--heading)] outline-none transition-colors focus:border-[var(--accent)]"
                    placeholder="Ekstra sos, zil çalışmıyor vb. (opsiyonel)"
                  />
                </label>
              </div>
            </article>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-6">
              <h2 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
                Ödeme
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Online ödeme yok. Kapıda nakit veya kart ile ödeyebilirsiniz.
              </p>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={() => updateField("payment", "cash")}
                  className={`flex items-center gap-3 rounded-[1.15rem] border px-4 py-4 text-left transition-all duration-300 ${
                    form.payment === "cash"
                      ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
                      : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]">
                    <Banknote className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--heading)]">
                      Kapıda Nakit
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--muted)]">
                      Teslimatta nakit ödeme
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => updateField("payment", "card")}
                  className={`flex items-center gap-3 rounded-[1.15rem] border px-4 py-4 text-left transition-all duration-300 ${
                    form.payment === "card"
                      ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
                      : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]">
                    <CreditCard className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--heading)]">
                      Kapıda Kart
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--muted)]">
                      Teslimatta POS ile ödeme
                    </span>
                  </span>
                </button>
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_5%,transparent)] sm:p-6">
              <h2 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
                Özet
              </h2>

              <dl className="mt-5 space-y-3 border-b border-[var(--border)] pb-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <dt className="text-[var(--muted)]">Ürün tutarı</dt>
                  <dd className="font-medium text-[var(--heading)]">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <dt className="text-[var(--muted)]">Teslimat</dt>
                  <dd className="font-medium text-[var(--heading)]">Ücretsiz</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
                  Toplam
                </p>
                <p className="sip-display text-3xl tracking-[-0.02em] text-[var(--heading)]">
                  {formatPrice(subtotal)}
                </p>
              </div>

              {error ? (
                <p className="mt-4 text-sm text-red-500">{error}</p>
              ) : null}

              <button type="submit" className="sip-btn-primary mt-6 w-full">
                Siparişi Onayla
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-[var(--muted)]">
                Onay sonrası ödeme kapıda alınır.
              </p>
            </article>
          </aside>
        </form>
      </section>
    </main>
  );
}
