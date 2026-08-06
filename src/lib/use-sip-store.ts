"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getSipMenuOverrides,
  getSipOrders,
  SIP_STORE_EVENT,
  type SipMenuOverrides,
  type SipOrder,
} from "@/lib/sip-store";

export function useSipOrders() {
  const [orders, setOrders] = useState<SipOrder[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setOrders(getSipOrders());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);

    const onStore = (event: Event) => {
      const detail = (event as CustomEvent<{ type?: string }>).detail;
      if (!detail?.type || detail.type === "orders") refresh();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "sip-orders") refresh();
    };

    window.addEventListener(SIP_STORE_EVENT, onStore);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SIP_STORE_EVENT, onStore);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  return { orders, ready, refresh };
}

export function useSipMenuOverrides() {
  const [overrides, setOverrides] = useState<SipMenuOverrides>({
    prices: {},
    hidden: [],
  });
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setOverrides(getSipMenuOverrides());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);

    const onStore = (event: Event) => {
      const detail = (event as CustomEvent<{ type?: string }>).detail;
      if (!detail?.type || detail.type === "menu") refresh();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === "sip-menu-overrides") refresh();
    };

    window.addEventListener(SIP_STORE_EVENT, onStore);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SIP_STORE_EVENT, onStore);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  return { overrides, ready, refresh };
}
