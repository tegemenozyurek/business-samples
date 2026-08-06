"use client";

import { useEffect, useState } from "react";
import { isAdminAuthenticated } from "@/lib/appointments-store";
import { AdminLogin } from "./admin-login";
import { AdminPanel } from "./admin-panel";

export function AdminPageView() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
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
        <AdminPanel onLogout={() => setAuthed(false)} />
      ) : (
        <AdminLogin onSuccess={() => setAuthed(true)} />
      )}
    </main>
  );
}
