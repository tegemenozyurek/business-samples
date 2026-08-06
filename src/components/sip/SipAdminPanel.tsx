"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Eye, EyeOff, Phone } from "lucide-react";
import {
  formatPrice,
  parsePrice,
  sipCategoryOrder,
  sipImages,
} from "@/lib/sip-content";
import {
  formatSipOrderTime,
  getAllSipCatalogProducts,
  hideSipProduct,
  deleteSipOrder,
  setSipProductPrice,
  showSipProduct,
  sipOrderStatusLabel,
  updateSipOrderStatus,
  type SipOrder,
  type SipOrderStatus,
} from "@/lib/sip-store";
import { useSipMenuOverrides, useSipOrders } from "@/lib/use-sip-store";

type TabId = "orders" | "menu";
type OrderFilter = "active" | "done" | "all";

const orderFilterOptions: { id: OrderFilter; label: string }[] = [
  { id: "active", label: "Aktif" },
  { id: "done", label: "Tamamlanan" },
  { id: "all", label: "Tümü" },
];

type MenuFilter = "active" | "hidden";

const menuFilterOptions: { id: MenuFilter; label: string }[] = [
  { id: "active", label: "Aktif" },
  { id: "hidden", label: "Gizli" },
];

type SipAdminPanelProps = {
  onLogout: () => void;
};

function isActiveOrder(status: SipOrderStatus) {
  return status === "new" || status === "preparing";
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  confirmTone = "accent",
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  confirmTone?: "accent" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[color-mix(in_srgb,var(--heading)_45%,transparent)] p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sip-confirm-title"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_color-mix(in_srgb,var(--foreground)_18%,transparent)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h3
          id="sip-confirm-title"
          className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)]"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {message}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="sip-btn-secondary flex-1"
          >
            Hayır
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 rounded-[1rem] px-5 py-3.5 text-[12px] font-semibold tracking-[0.14em] uppercase transition-opacity hover:opacity-90 ${
              confirmTone === "danger"
                ? "bg-red-600 text-white"
                : "bg-[var(--accent)] text-[var(--background)]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function phoneToWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `90${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function OrderCard({
  order,
  onAskStatus,
}: {
  order: SipOrder;
  onAskStatus: (order: SipOrder, status: "delivered" | "delete") => void;
}) {
  const [open, setOpen] = useState(false);
  const active = isActiveOrder(order.status);
  const address = `${order.customer.street} No:${order.customer.buildingNo} D:${order.customer.apartmentNo}, ${order.customer.neighborhood} / ${order.customer.district}`;

  return (
    <li>
      <article
        className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-colors ${
          open ? "border-[var(--border-strong)]" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="flex w-full flex-col gap-3 px-4 py-4 text-left sm:px-5 sm:py-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="sip-display text-xl tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">
                {order.customer.name}
              </h3>
              <p className="mt-1 text-sm leading-snug text-[var(--muted)]">
                {address}
              </p>
            </div>
            <p className="sip-display shrink-0 text-xl tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">
              {formatPrice(order.total)}
            </p>
          </div>
        </button>

        <div className="flex flex-wrap gap-2 border-t border-[var(--border)] px-4 py-3 sm:px-5">
          <a
            href={`tel:${order.customer.phone.replace(/\s/g, "")}`}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-[var(--heading)] uppercase transition-colors hover:border-[var(--accent)]"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2} />
            Ara
          </a>
          <a
            href={phoneToWhatsApp(order.customer.phone)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-[var(--heading)] uppercase transition-colors hover:border-[var(--accent)]"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          {active ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onAskStatus(order, "delivered");
              }}
              className="rounded-xl bg-emerald-600 px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-opacity hover:opacity-90"
            >
              Teslim Edildi
            </button>
          ) : (
            <span className="inline-flex items-center px-1 text-[11px] font-semibold tracking-[0.1em] text-[var(--muted)] uppercase">
              {sipOrderStatusLabel[order.status]}
            </span>
          )}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAskStatus(order, "delete");
            }}
            className="rounded-xl border border-red-200 px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-red-600 uppercase transition-colors hover:border-red-500"
          >
            Sil
          </button>
        </div>

        {open ? (
          <div className="border-t border-[var(--border)] px-4 py-4 sm:px-5">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
              Sipariş
            </p>
            <ul className="mt-3 space-y-2">
              {order.items.map((item) => (
                <li
                  key={`${order.id}-${item.name}`}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="text-[var(--heading)]">
                    <span className="tabular-nums text-[var(--muted)]">
                      {item.qty}×
                    </span>{" "}
                    {item.name}
                  </span>
                  <span className="tabular-nums text-[var(--muted)]">
                    {formatPrice(item.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            {order.customer.note ? (
              <p className="mt-4 text-sm leading-relaxed text-[var(--heading)]">
                <span className="text-[var(--muted)]">Not:</span>{" "}
                {order.customer.note}
              </p>
            ) : (
              <p className="mt-4 text-sm text-[var(--muted)]">Not yok.</p>
            )}
            <p className="mt-3 text-xs text-[var(--muted)]">
              {formatSipOrderTime(order.createdAt)} · Kapıda{" "}
              {order.payment === "cash" ? "nakit" : "kart"}
            </p>
          </div>
        ) : null}
      </article>
    </li>
  );
}

function MenuEditor({
  menuFilter,
}: {
  menuFilter: MenuFilter;
}) {
  const { overrides, refresh } = useSipMenuOverrides();
  const [draftPrices, setDraftPrices] = useState<Record<string, string>>({});

  const catalog = useMemo(() => getAllSipCatalogProducts(), []);

  const visible = useMemo(
    () =>
      catalog.filter((item) =>
        menuFilter === "hidden"
          ? overrides.hidden.includes(item.name)
          : !overrides.hidden.includes(item.name),
      ),
    [catalog, menuFilter, overrides.hidden],
  );

  const grouped = useMemo(() => {
    return sipCategoryOrder
      .map((category) => ({
        category,
        items: visible.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [visible]);

  const currentPriceValue = (name: string, fallback: string) => {
    if (draftPrices[name] != null) return draftPrices[name];
    if (overrides.prices[name] != null) {
      return String(overrides.prices[name]);
    }
    return String(parsePrice(fallback));
  };

  const savePrice = (name: string, fallback: string) => {
    const raw = currentPriceValue(name, fallback).replace(/[^\d]/g, "");
    const amount = Number.parseInt(raw, 10);
    if (!Number.isFinite(amount)) return;
    setSipProductPrice(name, amount);
    setDraftPrices((current) => {
      const { [name]: _, ...rest } = current;
      return rest;
    });
    refresh();
  };

  return (
    <div className="space-y-10">
      {grouped.length === 0 ? (
        <p className="py-8 text-sm text-[var(--muted)]">
          {menuFilter === "hidden"
            ? "Gizli ürün yok."
            : "Aktif ürün bulunamadı."}
        </p>
      ) : (
        grouped.map((group) => {
          const categoryMeta = sipImages.categories.find(
            (item) => item.title === group.category,
          );
          return (
            <section key={group.category} className="space-y-4">
              <header className="max-w-xl">
                <h3 className="sip-display text-xl tracking-[-0.02em] text-[var(--heading)] sm:text-2xl">
                  {group.category}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  {categoryMeta?.text ?? `${group.items.length} ürün`}
                  <span className="text-[var(--border-strong)]"> · </span>
                  <span className="tabular-nums">{group.items.length} ürün</span>
                </p>
              </header>
              <ul className="space-y-3">
                {group.items.map((item) => {
                  const hidden = overrides.hidden.includes(item.name);
                  return (
                    <li
                      key={item.name}
                      className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.src}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="sip-display truncate text-xl tracking-[-0.02em] text-[var(--heading)]">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-xs text-[var(--muted)]">
                            Varsayılan {item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        {!hidden ? (
                          <>
                            <label className="flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-3 py-2">
                              <span className="text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
                                ₺
                              </span>
                              <input
                                inputMode="numeric"
                                value={currentPriceValue(item.name, item.price)}
                                onChange={(event) =>
                                  setDraftPrices((current) => ({
                                    ...current,
                                    [item.name]: event.target.value.replace(
                                      /[^\d]/g,
                                      "",
                                    ),
                                  }))
                                }
                                onBlur={() => savePrice(item.name, item.price)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") {
                                    event.currentTarget.blur();
                                  }
                                }}
                                className="w-20 bg-transparent text-sm tabular-nums text-[var(--heading)] outline-none"
                                aria-label={`${item.name} fiyat`}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => savePrice(item.name, item.price)}
                              className="rounded-xl border border-[var(--border-strong)] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-[var(--heading)] uppercase transition-colors hover:border-[var(--accent)]"
                            >
                              Kaydet
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                hideSipProduct(item.name);
                                refresh();
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-strong)] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] text-[var(--muted)] uppercase transition-colors hover:border-red-500 hover:text-red-600"
                            >
                              <EyeOff className="h-3.5 w-3.5" strokeWidth={2} />
                              Gizle
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              showSipProduct(item.name);
                              refresh();
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-3.5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[var(--background)] uppercase transition-opacity hover:opacity-90"
                          >
                            <Eye className="h-3.5 w-3.5" strokeWidth={2} />
                            Ortaya Çıkar
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}

export function SipAdminPanel({ onLogout }: SipAdminPanelProps) {
  const [tab, setTab] = useState<TabId>("orders");
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("active");
  const [menuFilter, setMenuFilter] = useState<MenuFilter>("active");
  const [ordersMenuOpen, setOrdersMenuOpen] = useState(false);
  const [menuMenuOpen, setMenuMenuOpen] = useState(false);
  const ordersMenuRef = useRef<HTMLDivElement>(null);
  const menuMenuRef = useRef<HTMLDivElement>(null);
  const [pendingAction, setPendingAction] = useState<{
    order: SipOrder;
    status: "delivered" | "delete";
  } | null>(null);
  const { orders, refresh } = useSipOrders();
  const { overrides } = useSipMenuOverrides();

  const filteredOrders = useMemo(() => {
    if (orderFilter === "all") return orders;
    if (orderFilter === "done") {
      return orders.filter(
        (order) =>
          order.status === "delivered" || order.status === "cancelled",
      );
    }
    return orders.filter((order) => isActiveOrder(order.status));
  }, [orderFilter, orders]);

  const activeCount = orders.filter((order) =>
    isActiveOrder(order.status),
  ).length;

  const catalogCount = getAllSipCatalogProducts().length;
  const hiddenCount = overrides.hidden.length;
  const activeMenuCount = catalogCount - hiddenCount;

  const orderFilterLabel =
    orderFilterOptions.find((option) => option.id === orderFilter)?.label ??
    "Aktif";

  useEffect(() => {
    if (!ordersMenuOpen && !menuMenuOpen) return;

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        ordersMenuOpen &&
        !ordersMenuRef.current?.contains(target)
      ) {
        setOrdersMenuOpen(false);
      }
      if (menuMenuOpen && !menuMenuRef.current?.contains(target)) {
        setMenuMenuOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOrdersMenuOpen(false);
        setMenuMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [ordersMenuOpen, menuMenuOpen]);

  return (
    <section className="min-h-svh bg-[var(--background)] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
              Sipariş Paneli
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Sipariş, fiyat ve menü takibi.
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center justify-center rounded-2xl border border-[var(--border-strong)] px-5 py-3 text-[12px] font-medium tracking-[0.14em] text-[var(--heading)] uppercase transition-colors hover:bg-[var(--salon-beige)]"
          >
            Çıkış
          </button>
        </div>

        <div
          className="mt-8 flex gap-6 border-b border-[var(--border)]"
          role="tablist"
          aria-label="Admin sekmeleri"
        >
          <div ref={ordersMenuRef} className="relative -mb-px">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "orders"}
              aria-expanded={ordersMenuOpen}
              aria-haspopup="menu"
              onClick={() => {
                setTab("orders");
                setMenuMenuOpen(false);
                setOrdersMenuOpen((open) => !open);
              }}
              className={`relative inline-flex items-center gap-1.5 pb-3 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                tab === "orders"
                  ? "text-[var(--heading)]"
                  : "text-[var(--muted)] hover:text-[var(--heading)]"
              }`}
            >
              Siparişler
              {activeCount > 0 ? (
                <span className="inline-flex min-w-5 justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--background)] tabular-nums">
                  {activeCount}
                </span>
              ) : null}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${ordersMenuOpen ? "rotate-180" : ""}`}
                strokeWidth={2}
              />
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)] transition-transform duration-300 ${
                  tab === "orders" ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>

            {ordersMenuOpen ? (
              <div
                role="menu"
                className="absolute top-full left-0 z-20 mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] py-1 shadow-[0_16px_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)]"
              >
                {orderFilterOptions.map((option) => {
                  const selected = orderFilter === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selected}
                      onClick={() => {
                        setOrderFilter(option.id);
                        setTab("orders");
                        setOrdersMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--sip-alt)] ${
                        selected
                          ? "font-semibold text-[var(--heading)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {option.label}
                      {selected ? (
                        <span className="text-[10px] tracking-[0.12em] text-[var(--accent)] uppercase">
                          Seçili
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div ref={menuMenuRef} className="relative -mb-px">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "menu"}
              aria-expanded={menuMenuOpen}
              aria-haspopup="menu"
              onClick={() => {
                setTab("menu");
                setOrdersMenuOpen(false);
                setMenuMenuOpen((open) => !open);
              }}
              className={`relative inline-flex items-center gap-1.5 pb-3 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors ${
                tab === "menu"
                  ? "text-[var(--heading)]"
                  : "text-[var(--muted)] hover:text-[var(--heading)]"
              }`}
            >
              Menü
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${menuMenuOpen ? "rotate-180" : ""}`}
                strokeWidth={2}
              />
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)] transition-transform duration-300 ${
                  tab === "menu" ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>

            {menuMenuOpen ? (
              <div
                role="menu"
                className="absolute top-full left-0 z-20 mt-2 min-w-[11rem] overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] py-1 shadow-[0_16px_40px_color-mix(in_srgb,var(--foreground)_12%,transparent)]"
              >
                {menuFilterOptions.map((option) => {
                  const selected = menuFilter === option.id;
                  const count =
                    option.id === "active" ? activeMenuCount : hiddenCount;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selected}
                      onClick={() => {
                        setMenuFilter(option.id);
                        setTab("menu");
                        setMenuMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--sip-alt)] ${
                        selected
                          ? "font-semibold text-[var(--heading)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      <span>
                        {option.label}
                        <span className="ml-1.5 tabular-nums text-[var(--muted)]">
                          {count}
                        </span>
                      </span>
                      {selected ? (
                        <span className="text-[10px] tracking-[0.12em] text-[var(--accent)] uppercase">
                          Seçili
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        {tab === "orders" ? (
          <div className="mt-8">
            <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
              {orderFilterLabel} siparişler
            </p>

            {filteredOrders.length === 0 ? (
              <p className="mt-6 text-sm text-[var(--muted)]">
                Henüz sipariş yok. Müşteri sipariş verince burada görünür.
              </p>
            ) : (
              <ul className="space-y-3">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onAskStatus={(selected, status) =>
                      setPendingAction({ order: selected, status })
                    }
                  />
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <MenuEditor menuFilter={menuFilter} />
          </div>
        )}
      </div>

      {pendingAction ? (
        <ConfirmDialog
          title={
            pendingAction.status === "delivered"
              ? "Teslim edildi mi?"
              : "Sipariş silinsin mi?"
          }
          message={
            pendingAction.status === "delivered"
              ? `${pendingAction.order.customer.name} siparişini teslim edildi olarak işaretlemek istediğinize emin misiniz?`
              : `${pendingAction.order.customer.name} siparişini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`
          }
          confirmLabel="Evet"
          confirmTone={
            pendingAction.status === "delete" ? "danger" : "accent"
          }
          onCancel={() => setPendingAction(null)}
          onConfirm={() => {
            if (pendingAction.status === "delete") {
              deleteSipOrder(pendingAction.order.id);
            } else {
              updateSipOrderStatus(
                pendingAction.order.id,
                pendingAction.status,
              );
            }
            refresh();
            setPendingAction(null);
          }}
        />
      ) : null}
    </section>
  );
}
