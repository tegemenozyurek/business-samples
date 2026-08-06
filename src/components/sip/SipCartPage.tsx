"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Banknote,
  Check,
  ChevronDown,
  CreditCard,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import {
  findProductByName,
  formatPrice,
  parsePrice,
  sipImages,
} from "@/lib/sip-content";
import {
  getIzmirNeighborhoods,
  getIzmirStreets,
  izmirDistricts,
  IZMIR_STREET_OTHER,
} from "@/lib/izmir-address";

type PaymentMethod = "cash" | "card";

type FormState = {
  name: string;
  phone: string;
  district: string;
  neighborhood: string;
  street: string;
  streetOther: string;
  buildingNo: string;
  apartmentNo: string;
  note: string;
  payment: PaymentMethod;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  district: "",
  neighborhood: "",
  street: "",
  streetOther: "",
  buildingNo: "",
  apartmentNo: "",
  note: "",
  payment: "cash",
};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--heading)] outline-none transition-colors focus:border-[var(--accent)]";

const selectClassName = `${fieldClassName}`;

function CompactSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  searchPlaceholder = "Ara...",
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
  searchPlaceholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return options;
    return options.filter((option) =>
      option.toLocaleLowerCase("tr").includes(q),
    );
  }, [options, query]);

  return (
    <div ref={rootRef} className="relative mt-2">
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-4 py-3 text-left text-sm outline-none transition-colors focus:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          className={`truncate ${value ? "text-[var(--heading)]" : "text-[var(--muted)]"}`}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      {open && !disabled ? (
        <div
          id={listId}
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_14px_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)]"
        >
          <div className="border-b border-[var(--border)] p-2">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--heading)] outline-none focus:border-[var(--accent)]"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto overscroll-contain py-1">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-[var(--muted)]">Sonuç yok</li>
            ) : (
              filtered.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--surface-hover)] ${
                      option === value
                        ? "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] font-medium text-[var(--heading)]"
                        : "text-[var(--heading)]"
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function SipCartPage() {
  const cart = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const neighborhoods = useMemo(
    () => getIzmirNeighborhoods(form.district),
    [form.district],
  );
  const streets = useMemo(
    () => getIzmirStreets(form.district, form.neighborhood),
    [form.district, form.neighborhood],
  );
  const streetIsOther = form.street === IZMIR_STREET_OTHER;

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
    const highlights = sipImages.popular.slice(0, 3);

    return (
      <main>
        <section className="relative overflow-hidden bg-[var(--background)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[-8%] h-64 w-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--heading)_8%,transparent),transparent_70%)] blur-3xl"
          />

          <div className="sip-section relative z-10 mx-auto grid max-w-7xl items-center gap-12 !pt-36 sm:!pt-40 lg:grid-cols-2 lg:gap-16 lg:!pt-36">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                Sepet
              </p>
              <h1 className="sip-display mt-3 text-4xl leading-[1.05] tracking-[-0.03em] text-[var(--heading)] sm:text-5xl lg:text-6xl">
                Henüz bir şey yok
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Menüden tost, burger veya içecek seçip sepetini doldur.
                Kapıda nakit veya kart ile ödeyebilirsiniz.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/sip/menu" className="sip-btn-primary">
                  Menüyü İncele
                </Link>
                <Link href="/sip" className="sip-btn-secondary">
                  Ana Sayfa
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]">
                  <Image
                    src={highlights[0].src}
                    alt={highlights[0].name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 45vw, 240px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]">
                    <Image
                      src={highlights[1].src}
                      alt={highlights[1].name}
                      fill
                      sizes="(max-width: 1024px) 40vw, 200px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative min-h-[7.5rem] flex-1 overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]">
                    <Image
                      src={highlights[2].src}
                      alt={highlights[2].name}
                      fill
                      sizes="(max-width: 1024px) 40vw, 200px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--heading)_55%,transparent)] to-transparent" />
                    <p className="absolute inset-x-0 bottom-0 p-4 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                      Bugünün favorileri
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sip-section bg-[var(--sip-alt)] !pt-2 sm:!pt-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                  Öneri
                </p>
                <h2 className="sip-display mt-2 text-3xl tracking-[-0.03em] text-[var(--heading)] sm:text-4xl">
                  Nereden başlasan?
                </h2>
              </div>
              <Link
                href="/sip/menu"
                className="hidden text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--heading)] sm:inline"
              >
                Tüm menü
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <li key={item.name}>
                  <Link
                    href="/sip/menu"
                    className="group flex h-full items-center gap-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] sm:p-4"
                  >
                    <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-[4.5rem] sm:w-[4.5rem]">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                        {item.category}
                      </span>
                      <span className="sip-display mt-1 block truncate text-xl tracking-[-0.02em] text-[var(--heading)]">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-sm text-[var(--muted)]">
                        {item.price}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    );
  }

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const handleDistrictChange = (district: string) => {
    setForm((current) => ({
      ...current,
      district,
      neighborhood: "",
      street: "",
      streetOther: "",
    }));
    setError("");
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setForm((current) => ({
      ...current,
      neighborhood,
      street: "",
      streetOther: "",
    }));
    setError("");
  };

  const handleStreetChange = (street: string) => {
    setForm((current) => ({
      ...current,
      street,
      streetOther: street === IZMIR_STREET_OTHER ? current.streetOther : "",
    }));
    setError("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const streetValue = streetIsOther ? form.streetOther.trim() : form.street;
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.district ||
      !form.neighborhood ||
      !streetValue ||
      !form.buildingNo.trim() ||
      !form.apartmentNo.trim()
    ) {
      setError("Lütfen teslimat bilgilerini eksiksiz doldurun.");
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

                <div className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Şehir
                  </span>
                  <p className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--muted)_8%,var(--background))] px-4 py-3 text-sm text-[var(--heading)] select-none pointer-events-none">
                    İzmir
                  </p>
                </div>

                <label className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    İlçe
                  </span>
                  <select
                    value={form.district}
                    onChange={(event) => handleDistrictChange(event.target.value)}
                    className={selectClassName}
                  >
                    <option value="">İlçe seçin</option>
                    {izmirDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Mahalle
                  </span>
                  <CompactSelect
                    value={form.neighborhood}
                    onChange={handleNeighborhoodChange}
                    options={neighborhoods}
                    disabled={!form.district}
                    placeholder={
                      form.district ? "Mahalle seçin" : "Önce ilçe seçin"
                    }
                    searchPlaceholder="Mahalle ara..."
                  />
                </div>

                <div className="block sm:col-span-2">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Sokak
                  </span>
                  <CompactSelect
                    value={form.street}
                    onChange={handleStreetChange}
                    options={streets}
                    disabled={!form.neighborhood}
                    placeholder={
                      form.neighborhood ? "Sokak seçin" : "Önce mahalle seçin"
                    }
                    searchPlaceholder="Sokak ara..."
                  />
                </div>

                {streetIsOther ? (
                  <label className="block sm:col-span-2">
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                      Sokak Adı
                    </span>
                    <input
                      value={form.streetOther}
                      onChange={(event) =>
                        updateField("streetOther", event.target.value)
                      }
                      className={fieldClassName}
                      placeholder="Sokak / cadde adını yazın"
                    />
                  </label>
                ) : null}

                <label className="block sm:col-span-1">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Bina No
                  </span>
                  <input
                    value={form.buildingNo}
                    onChange={(event) =>
                      updateField("buildingNo", event.target.value)
                    }
                    className={fieldClassName}
                    placeholder="Örn. 8"
                  />
                </label>

                <label className="block sm:col-span-1">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                    Daire
                  </span>
                  <input
                    value={form.apartmentNo}
                    onChange={(event) =>
                      updateField("apartmentNo", event.target.value)
                    }
                    className={fieldClassName}
                    placeholder="Örn. 4"
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
                    className={`${fieldClassName} resize-none`}
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
