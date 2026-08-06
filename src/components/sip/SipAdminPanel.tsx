"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Phone,
  Truck,
  X,
} from "lucide-react";
import {
  formatPrice,
  parsePrice,
  sipCategoryOrder,
} from "@/lib/sip-content";
import {
  formatSipOrderTime,
  getAllSipCatalogProducts,
  hideSipProduct,
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

const tabs: { id: TabId; label: string }[] = [
  { id: "orders", label: "Siparişler" },
  { id: "menu", label: "Menü" },
];

type SipAdminPanelProps = {
  onLogout: () => void;
};

function statusTone(status: SipOrderStatus) {
  switch (status) {
    case "new":
      return "bg-amber-400 text-white";
    case "preparing":
      return "bg-[var(--accent)] text-[var(--background)]";
    case "delivered":
      return "bg-emerald-500 text-white";
    case "cancelled":
      return "bg-[var(--muted)] text-white";
  }
}

function OrderCard({
  order,
  onStatus,
}: {
  order: SipOrder;
  onStatus: (id: string, status: SipOrderStatus) => void;
}) {
  const address = [
    order.customer.street,
    `No: ${order.customer.buildingNo}`,
    `Daire: ${order.customer.apartmentNo}`,
    order.customer.neighborhood,
    order.customer.district,
    order.customer.city,
  ].join(", ");

  return (
    <article className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_12px_36px_color-mix(in_srgb,var(--foreground)_5%,transparent)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)]">
              {order.customer.name}
            </h3>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase ${statusTone(order.status)}`}
            >
              {sipOrderStatusLabel[order.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {formatSipOrderTime(order.createdAt)} · Kapıda{" "}
            {order.payment === "cash" ? "nakit" : "kart"}
          </p>
        </div>
        <p className="sip-display text-2xl tracking-[-0.02em] text-[var(--heading)]">
          {formatPrice(order.total)}
        </p>
      </div>

      <ul className="mt-4 space-y-1.5 border-t border-[var(--border)] pt-4">
        {order.items.map((item) => (
          <li
            key={`${order.id}-${item.name}`}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="text-[var(--heading)]">
              {item.qty}× {item.name}
            </span>
            <span className="tabular-nums text-[var(--muted)]">
              {formatPrice(item.lineTotal)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        <p>{address}</p>
        {order.customer.note ? (
          <p className="rounded-xl bg-[var(--sip-alt)] px-3 py-2 text-[var(--heading)]">
            Not: {order.customer.note}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={`tel:${order.customer.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[var(--heading)] uppercase transition-colors hover:border-[var(--accent)]"
        >
          <Phone className="h-3.5 w-3.5" strokeWidth={2} />
          Ara
        </a>

        {order.status === "new" ? (
          <button
            type="button"
            onClick={() => onStatus(order.id, "preparing")}
            className="sip-btn-primary !px-4 !py-2.5"
          >
            Hazırlığa Al
          </button>
        ) : null}

        {order.status === "preparing" ? (
          <button
            type="button"
            onClick={() => onStatus(order.id, "delivered")}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-opacity hover:opacity-90"
          >
            <Truck className="h-3.5 w-3.5" strokeWidth={2} />
            Teslim Edildi
          </button>
        ) : null}

        {order.status === "new" || order.status === "preparing" ? (
          <button
            type="button"
            onClick={() => onStatus(order.id, "cancelled")}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] px-4 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase transition-colors hover:border-red-500 hover:text-red-600"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            İptal
          </button>
        ) : null}

        {order.status === "delivered" ? (
          <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-emerald-700 uppercase">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Tamamlandı
          </span>
        ) : null}
      </div>
    </article>
  );
}

function MenuEditor() {
  const { overrides, refresh } = useSipMenuOverrides();
  const [draftPrices, setDraftPrices] = useState<Record<string, string>>({});
  const [menuFilter, setMenuFilter] = useState<"active" | "hidden">("active");

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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMenuFilter("active")}
          className={`rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
            menuFilter === "active"
              ? "bg-[var(--accent)] text-[var(--background)]"
              : "border border-[var(--border-strong)] text-[var(--muted)]"
          }`}
        >
          Aktif ({catalog.length - overrides.hidden.length})
        </button>
        <button
          type="button"
          onClick={() => setMenuFilter("hidden")}
          className={`rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
            menuFilter === "hidden"
              ? "bg-[var(--accent)] text-[var(--background)]"
              : "border border-[var(--border-strong)] text-[var(--muted)]"
          }`}
        >
          Gizli ({overrides.hidden.length})
        </button>
      </div>

      {grouped.length === 0 ? (
        <p className="rounded-[1.25rem] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-5 py-10 text-center text-sm text-[var(--muted)]">
          {menuFilter === "hidden"
            ? "Gizli ürün yok."
            : "Aktif ürün bulunamadı."}
        </p>
      ) : (
        grouped.map((group) => (
          <section key={group.category} className="space-y-3">
            <h3 className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
              {group.category}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => {
                const hidden = overrides.hidden.includes(item.name);
                return (
                  <li
                    key={item.name}
                    className="flex flex-col gap-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center"
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
        ))
      )}
    </div>
  );
}

export function SipAdminPanel({ onLogout }: SipAdminPanelProps) {
  const [tab, setTab] = useState<TabId>("orders");
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("active");
  const { orders, refresh } = useSipOrders();

  const filteredOrders = useMemo(() => {
    if (orderFilter === "all") return orders;
    if (orderFilter === "done") {
      return orders.filter(
        (order) =>
          order.status === "delivered" || order.status === "cancelled",
      );
    }
    return orders.filter(
      (order) => order.status === "new" || order.status === "preparing",
    );
  }, [orderFilter, orders]);

  const activeCount = orders.filter(
    (order) => order.status === "new" || order.status === "preparing",
  ).length;

  return (
    <section className="min-h-svh bg-[var(--background)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="sip-display text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
              Admin
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Siparişleri takip et, menü fiyatlarını yönet.
            </p>
          </div>
          <button type="button" onClick={onLogout} className="sip-btn-secondary">
            Çıkış Yap
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                tab === item.id
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "border border-[var(--border-strong)] text-[var(--muted)] hover:text-[var(--heading)]"
              }`}
            >
              {item.label}
              {item.id === "orders" && activeCount > 0 ? (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--background)] px-1.5 text-[10px] text-[var(--accent)]">
                  {activeCount}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {tab === "orders" ? (
          <div className="mt-8 space-y-5">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["active", "Aktif"],
                  ["done", "Tamamlanan"],
                  ["all", "Tümü"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setOrderFilter(id)}
                  className={`rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                    orderFilter === id
                      ? "bg-[var(--sip-alt)] text-[var(--heading)] ring-1 ring-[var(--border-strong)]"
                      : "text-[var(--muted)] hover:text-[var(--heading)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {filteredOrders.length === 0 ? (
              <p className="rounded-[1.25rem] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-5 py-12 text-center text-sm text-[var(--muted)]">
                Henüz sipariş yok. Müşteri sipariş verince burada görünür.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatus={(id, status) => {
                      updateSipOrderStatus(id, status);
                      refresh();
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <MenuEditor />
          </div>
        )}
      </div>
    </section>
  );
}
