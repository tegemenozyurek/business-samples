"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartItems = Record<string, number>;

type CartContextValue = {
  items: CartItems;
  count: number;
  pulse: number;
  getQty: (id: string) => number;
  addItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sip-cart-items";

function totalCount(items: CartItems) {
  return Object.values(items).reduce((sum, qty) => sum + qty, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems>({});
  const [pulse, setPulse] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as CartItems;
      if (parsed && typeof parsed === "object") {
        setItems(parsed);
      }
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  const bumpPulse = useCallback(() => {
    setPulse((current) => current + 1);
  }, []);

  const addItem = useCallback(
    (id: string) => {
      setItems((current) => ({
        ...current,
        [id]: (current[id] ?? 0) + 1,
      }));
      bumpPulse();
    },
    [bumpPulse],
  );

  const increment = useCallback(
    (id: string) => {
      setItems((current) => ({
        ...current,
        [id]: (current[id] ?? 0) + 1,
      }));
      bumpPulse();
    },
    [bumpPulse],
  );

  const decrement = useCallback(
    (id: string) => {
      setItems((current) => {
        const nextQty = (current[id] ?? 0) - 1;
        if (nextQty <= 0) {
          const { [id]: _, ...rest } = current;
          return rest;
        }
        return { ...current, [id]: nextQty };
      });
      bumpPulse();
    },
    [bumpPulse],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((current) => {
        const { [id]: _, ...rest } = current;
        return rest;
      });
      bumpPulse();
    },
    [bumpPulse],
  );

  const clear = useCallback(() => {
    setItems({});
    bumpPulse();
  }, [bumpPulse]);

  const getQty = useCallback((id: string) => items[id] ?? 0, [items]);

  const count = useMemo(() => totalCount(items), [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      pulse,
      getQty,
      addItem,
      increment,
      decrement,
      removeItem,
      clear,
    }),
    [
      items,
      count,
      pulse,
      getQty,
      addItem,
      increment,
      decrement,
      removeItem,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
