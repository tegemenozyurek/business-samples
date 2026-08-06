"use client";

import { useEffect, useState } from "react";
import {
  isSipAdminAuthenticated,
  logoutSipAdmin,
} from "@/lib/sip-admin-auth";
import { SipAdminLogin } from "./SipAdminLogin";
import { SipAdminPanel } from "./SipAdminPanel";

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

  return (
    <main>
      {authed ? (
        <SipAdminPanel
          onLogout={() => {
            logoutSipAdmin();
            setAuthed(false);
          }}
        />
      ) : (
        <SipAdminLogin onSuccess={() => setAuthed(true)} />
      )}
    </main>
  );
}
