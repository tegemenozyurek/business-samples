"use client";

import { useEffect, useState } from "react";
import {
  isSipAdminAuthenticated,
  logoutSipAdmin,
} from "@/lib/sip-admin-auth";
import { SipAdminLogin } from "./SipAdminLogin";

export function SipAdminPageView() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isSipAdminAuthenticated());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <main className="flex min-h-svh items-center bg-[var(--background)] px-6 py-10">
        <div className="mx-auto max-w-md text-sm text-[var(--muted)]">
          Yükleniyor...
        </div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main>
        <SipAdminLogin onSuccess={() => setAuthed(true)} />
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-[var(--background)] px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="sip-display text-4xl tracking-[-0.02em] text-[var(--heading)] sm:text-5xl">
              Siparişler
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Sipariş yönetim paneli yakında.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              logoutSipAdmin();
              setAuthed(false);
            }}
            className="sip-btn-secondary"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </main>
  );
}
