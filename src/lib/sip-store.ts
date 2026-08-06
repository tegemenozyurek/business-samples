import {
  findProductByName as findBaseProductByName,
  formatPrice,
  parsePrice,
  sipImages,
  type SipProduct,
} from "@/lib/sip-content";

const ORDERS_KEY = "sip-orders";
const MENU_KEY = "sip-menu-overrides";
export const SIP_STORE_EVENT = "sip-store-change";

export type SipOrderStatus =
  | "new"
  | "preparing"
  | "delivered"
  | "cancelled";

export type SipOrderItem = {
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type SipOrderCustomer = {
  name: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  buildingNo: string;
  apartmentNo: string;
  note: string;
};

export type SipOrder = {
  id: string;
  createdAt: string;
  status: SipOrderStatus;
  payment: "cash" | "card";
  customer: SipOrderCustomer;
  items: SipOrderItem[];
  total: number;
};

export type SipMenuOverrides = {
  prices: Record<string, number>;
  hidden: string[];
};

const emptyOverrides: SipMenuOverrides = {
  prices: {},
  hidden: [],
};

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

function emitStoreChange(detail: "orders" | "menu") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SIP_STORE_EVENT, { detail: { type: detail } }),
  );
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSipOrders(): SipOrder[] {
  const orders = readJson<SipOrder[]>(ORDERS_KEY, []);
  return [...orders].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createSipOrder(
  input: Omit<SipOrder, "id" | "createdAt" | "status">,
): SipOrder {
  const order: SipOrder = {
    ...input,
    id: `sip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const next = [order, ...getSipOrders()];
  writeJson(ORDERS_KEY, next);
  emitStoreChange("orders");
  return order;
}

export function updateSipOrderStatus(
  id: string,
  status: SipOrderStatus,
): SipOrder[] {
  const next = getSipOrders().map((order) =>
    order.id === id ? { ...order, status } : order,
  );
  writeJson(ORDERS_KEY, next);
  emitStoreChange("orders");
  return next;
}

export function getSipMenuOverrides(): SipMenuOverrides {
  const stored = readJson<Partial<SipMenuOverrides>>(MENU_KEY, {});
  return {
    prices:
      stored.prices && typeof stored.prices === "object" ? stored.prices : {},
    hidden: Array.isArray(stored.hidden) ? stored.hidden : [],
  };
}

function saveMenuOverrides(overrides: SipMenuOverrides) {
  writeJson(MENU_KEY, overrides);
  emitStoreChange("menu");
}

export function setSipProductPrice(name: string, amount: number) {
  const overrides = getSipMenuOverrides();
  const nextAmount = Math.max(0, Math.round(amount));
  const base = findBaseProductByName(name);
  const baseAmount = base ? parsePrice(base.price) : null;

  if (baseAmount !== null && baseAmount === nextAmount) {
    const { [name]: _, ...rest } = overrides.prices;
    saveMenuOverrides({ ...overrides, prices: rest });
    return;
  }

  saveMenuOverrides({
    ...overrides,
    prices: { ...overrides.prices, [name]: nextAmount },
  });
}

export function hideSipProduct(name: string) {
  const overrides = getSipMenuOverrides();
  if (overrides.hidden.includes(name)) return;
  saveMenuOverrides({
    ...overrides,
    hidden: [...overrides.hidden, name],
  });
}

export function showSipProduct(name: string) {
  const overrides = getSipMenuOverrides();
  saveMenuOverrides({
    ...overrides,
    hidden: overrides.hidden.filter((item) => item !== name),
  });
}

export function applySipOverrides(
  product: SipProduct,
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): SipProduct {
  const overridePrice = overrides.prices[product.name];
  if (overridePrice == null) return product;
  return { ...product, price: formatPrice(overridePrice) };
}

export function isSipProductHidden(
  name: string,
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): boolean {
  return overrides.hidden.includes(name);
}

export function getVisibleSipMenu(
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): SipProduct[] {
  return sipImages.menu
    .filter((item) => !overrides.hidden.includes(item.name))
    .map((item) => applySipOverrides(item, overrides));
}

export function getVisibleSipPopular(
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): SipProduct[] {
  return sipImages.popular
    .filter((item) => !overrides.hidden.includes(item.name))
    .map((item) => applySipOverrides(item, overrides));
}

export function getVisibleMenuByCategory(
  category: string,
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): SipProduct[] {
  return getVisibleSipMenu(overrides).filter(
    (item) => item.category === category,
  );
}

export function findSipProduct(
  name: string,
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): SipProduct | undefined {
  const base = findBaseProductByName(name);
  if (!base) return undefined;
  if (overrides.hidden.includes(name)) return undefined;
  return applySipOverrides(base, overrides);
}

/** Cart lines keep items even if hidden after add; still apply price overrides. */
export function resolveSipCartProduct(
  name: string,
  overrides: SipMenuOverrides = getSipMenuOverrides(),
): SipProduct | undefined {
  const base = findBaseProductByName(name);
  if (!base) return undefined;
  return applySipOverrides(base, overrides);
}

export function getAllSipCatalogProducts(): SipProduct[] {
  const byName = new Map<string, SipProduct>();
  for (const item of sipImages.menu) byName.set(item.name, item);
  for (const item of sipImages.popular) {
    if (!byName.has(item.name)) byName.set(item.name, item);
  }
  return [...byName.values()];
}

export function formatSipOrderTime(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export const sipOrderStatusLabel: Record<SipOrderStatus, string> = {
  new: "Yeni",
  preparing: "Hazırlanıyor",
  delivered: "Teslim edildi",
  cancelled: "İptal",
};
