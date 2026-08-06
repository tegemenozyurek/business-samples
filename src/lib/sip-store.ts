import {
  findProductByName as findBaseProductByName,
  formatPrice,
  parsePrice,
  sipImages,
  type SipProduct,
} from "@/lib/sip-content";

const ORDERS_KEY = "sip-orders-v2";
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

function minutesAgo(minutes: number) {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function line(name: string, qty: number, unitPrice: number): SipOrderItem {
  return { name, qty, unitPrice, lineTotal: qty * unitPrice };
}

function seedSipOrders(): SipOrder[] {
  const samples: SipOrder[] = [
    {
      id: "sip-mock-001",
      createdAt: minutesAgo(12),
      status: "new",
      payment: "cash",
      customer: {
        name: "Ayşe Yılmaz",
        phone: "0532 411 22 33",
        city: "İzmir",
        district: "Bayraklı",
        neighborhood: "Manavkuyu",
        street: "1620/3. Sokak",
        buildingNo: "8",
        apartmentNo: "4",
        note: "Zil çalışmıyor, kapıya bırakın.",
      },
      items: [
        line("Karışık Tost", 2, 185),
        line("Ayran", 2, 55),
        line("Patates Kızartması", 1, 120),
      ],
      total: 600,
    },
    {
      id: "sip-mock-002",
      createdAt: minutesAgo(28),
      status: "new",
      payment: "card",
      customer: {
        name: "Emre Demir",
        phone: "0541 778 90 12",
        city: "İzmir",
        district: "Karşıyaka",
        neighborhood: "Bostanlı",
        street: "Cemal Gürsel Caddesi",
        buildingNo: "142",
        apartmentNo: "7",
        note: "",
      },
      items: [
        line("Cheeseburger", 1, 320),
        line("Soğan Halkası", 1, 145),
        line("Pepsi", 1, 75),
      ],
      total: 540,
    },
    {
      id: "sip-mock-003",
      createdAt: minutesAgo(45),
      status: "new",
      payment: "card",
      customer: {
        name: "Selin Kara",
        phone: "0533 204 55 61",
        city: "İzmir",
        district: "Bornova",
        neighborhood: "Kazımdirik",
        street: "Ankara Caddesi",
        buildingNo: "56",
        apartmentNo: "12",
        note: "Ekstra sos olsun.",
      },
      items: [
        line("Tavuklu Sandviç", 1, 210),
        line("Ice Latte", 2, 130),
        line("Cheesecake", 1, 160),
      ],
      total: 630,
    },
    {
      id: "sip-mock-004",
      createdAt: minutesAgo(90),
      status: "delivered",
      payment: "cash",
      customer: {
        name: "Burak Şahin",
        phone: "0505 667 18 40",
        city: "İzmir",
        district: "Konak",
        neighborhood: "Alsancak",
        street: "Kıbrıs Şehitleri Caddesi",
        buildingNo: "91",
        apartmentNo: "3",
        note: "",
      },
      items: [
        line("Double Burger", 2, 390),
        line("Fresh Limonata", 2, 110),
      ],
      total: 1000,
    },
    {
      id: "sip-mock-005",
      createdAt: minutesAgo(140),
      status: "cancelled",
      payment: "cash",
      customer: {
        name: "Merve Aksoy",
        phone: "0536 889 01 27",
        city: "İzmir",
        district: "Çiğli",
        neighborhood: "Ataşehir",
        street: "Ataşehir Caddesi",
        buildingNo: "18",
        apartmentNo: "9",
        note: "Yanlış adres girmişim.",
      },
      items: [line("Sucuklu Tost", 1, 165), line("Su", 1, 25)],
      total: 190,
    },
    {
      id: "sip-mock-006",
      createdAt: minutesAgo(18),
      status: "new",
      payment: "cash",
      customer: {
        name: "Deniz Acar",
        phone: "0542 130 44 58",
        city: "İzmir",
        district: "Bayraklı",
        neighborhood: "Mansuroğlu",
        street: "205/2. Sokak",
        buildingNo: "3",
        apartmentNo: "1",
        note: "Hızlı gelsin lütfen.",
      },
      items: [
        line("Patso", 1, 245),
        line("Chicken Burger", 1, 290),
        line("Filtre Kahve", 1, 95),
      ],
      total: 630,
    },
  ];

  return samples;
}

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
  if (!canUseStorage()) return seedSipOrders();

  const raw = window.localStorage.getItem(ORDERS_KEY);
  if (!raw) {
    const seeded = seedSipOrders();
    writeJson(ORDERS_KEY, seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw) as SipOrder[];
    if (!Array.isArray(parsed)) {
      const seeded = seedSipOrders();
      writeJson(ORDERS_KEY, seeded);
      return seeded;
    }
    return [...parsed].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    const seeded = seedSipOrders();
    writeJson(ORDERS_KEY, seeded);
    return seeded;
  }
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

export function deleteSipOrder(id: string): SipOrder[] {
  const next = getSipOrders().filter((order) => order.id !== id);
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
  new: "Bekliyor",
  preparing: "Bekliyor",
  delivered: "Teslim edildi",
  cancelled: "İptal",
};
