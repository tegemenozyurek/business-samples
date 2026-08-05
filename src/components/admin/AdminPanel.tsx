"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { LogOut, RefreshCw } from "lucide-react";
import {
  FormSubmissionCard,
  type FormSubmission,
} from "@/components/admin/FormSubmissionCard";
import { getFirebaseAuth, getFirebaseFirestore } from "@/lib/firebase";

const ADMIN_EMAIL = "admin@qeva.local";

type AdminFormSubmission = FormSubmission;

function resolveAdminEmail(username: string) {
  const trimmed = username.trim();

  if (trimmed.includes("@")) {
    return trimmed;
  }

  return ADMIN_EMAIL;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("network-request-failed")) {
      return "Bağlantı hatası. İnternet bağlantınızı ve Firebase erişimini kontrol edin.";
    }

    if (error.message.includes("auth/invalid-credential")) {
      return "Kullanıcı adı veya şifre hatalı.";
    }

    if (error.message.includes("auth/too-many-requests")) {
      return "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.";
    }

    return error.message;
  }

  return "Beklenmeyen bir hata oluştu.";
}

const inputClassName =
  "w-full rounded-xl border border-[var(--icon-border)] bg-[var(--icon-bg)] px-4 py-3 text-sm text-heading placeholder:text-faint transition-all duration-300 outline-none focus:border-[var(--icon-hover-border)] focus:bg-surface-hover";

const iconButtonClassName =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--icon-border)] bg-[var(--icon-bg)] text-muted transition-all duration-300 hover:border-[var(--icon-hover-border)] hover:bg-[var(--icon-hover-bg)] hover:text-heading disabled:cursor-not-allowed disabled:opacity-60";

export function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [forms, setForms] = useState<AdminFormSubmission[]>([]);
  const [isLoadingForms, setIsLoadingForms] = useState(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [formsError, setFormsError] = useState<string | null>(null);

  const loadForms = useCallback(async () => {
    setIsLoadingForms(true);
    setFormsError(null);

    try {
      const db = getFirebaseFirestore();
      const snapshot = await getDocs(
        query(collection(db, "website-form"), orderBy("createdAt", "desc")),
      );

      const nextForms = snapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt as Timestamp | undefined;

        return {
          id: doc.id,
          name: String(data.name ?? ""),
          company: String(data.company ?? ""),
          email: String(data.email ?? ""),
          phone: String(data.phone ?? ""),
          serviceType: String(data.serviceType ?? ""),
          message: String(data.message ?? ""),
          createdAt: createdAt?.toDate?.()?.toISOString?.() ?? null,
        };
      });

      setForms(nextForms);
    } catch (error) {
      setFormsError(getErrorMessage(error));
    } finally {
      setIsLoadingForms(false);
    }
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      void loadForms();
      return;
    }

    setForms([]);
  }, [user, loadForms]);

  const handleDeleteForm = async (id: string) => {
    const db = getFirebaseFirestore();
    await deleteDoc(doc(db, "website-form", id));
    setForms((current) => current.filter((form) => form.id !== id));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingLogin(true);
    setLoginError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      await signInWithEmailAndPassword(
        getFirebaseAuth(),
        resolveAdminEmail(username),
        password,
      );
      form.reset();
    } catch (error) {
      setLoginError(getErrorMessage(error));
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleLogout = async () => {
    await signOut(getFirebaseAuth());
    setLoginError(null);
  };

  if (isAuthLoading) {
    return (
      <div className="flex flex-1 items-center justify-center px-6">
        <p className="text-sm text-subtle">Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-surface-soft p-8">
          <h1 className="text-2xl font-semibold text-heading">Giriş Yap</h1>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-subtle uppercase"
              >
                Kullanıcı Adı
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="admin"
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-medium tracking-[0.14em] text-subtle uppercase"
              >
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClassName}
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-500/90" role="alert">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className="mt-2 w-full rounded-full border border-heading bg-background px-6 py-3 text-sm font-medium text-heading transition-all duration-300 hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmittingLogin ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-10 lg:px-10">
      <div className="mx-auto min-w-0 max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-heading">
              Gelen Formlar
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void loadForms()}
              disabled={isLoadingForms}
              className={iconButtonClassName}
              aria-label="Yenile"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoadingForms ? "animate-spin" : ""}`}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className={iconButtonClassName}
              aria-label="Çıkış yap"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        {formsError && (
          <div className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-600">
            {formsError}
          </div>
        )}

        {isLoadingForms ? (
          <p className="mt-10 text-sm text-subtle">Formlar yükleniyor...</p>
        ) : forms.length === 0 ? (
          <p className="mt-10 text-sm text-subtle">Henüz form gönderisi yok.</p>
        ) : (
          <div className="mt-6 grid min-w-0 grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-3">
            {forms.map((form) => (
              <div key={form.id} className="min-w-0">
                <FormSubmissionCard form={form} onDelete={handleDeleteForm} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
